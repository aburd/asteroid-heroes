import * as Phaser from 'phaser';
import { Socket } from 'socket.io-client';
import { Player } from '../types';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'asteroidMain',
};

type KeyMap<T> = Record<keyof T, Phaser.Input.Keyboard.Key>;

const WAIT_TIME = 120;

export default class AsteroidMainScene extends Phaser.Scene {
  private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private stars: Phaser.Physics.Arcade.Group;
  private bombs: Phaser.Physics.Arcade.Group;
  private keys: KeyMap<{
    up: 'W';
    down: 'S';
    left: 'A';
    right: 'D';
    shift: 'shift';
    space: 'space';
  }>;
  private direction: 'right' | 'left';
  private waitCounter: number;
  private score: number;
  private scoreText: Phaser.GameObjects.Text;
  private socket: Socket;
  private gameId: string;
  private playerId: string;
  private players: Record<string, Player>;

  constructor() {
    super(sceneConfig);
    this.score = 0;
    this.waitCounter = WAIT_TIME;
  }

  public init(data) {
    this.gameId = data.gameId;
    this.players = data.players;
    this.playerId = data.playerId;
    this.socket = data.socket;
  }

  public preload() {
    this.load.image('sky', './assets/sky.png');
    this.load.image('ground', './assets/platform.png');
    this.load.image('star', './assets/star.png');
    this.load.image('bomb', './assets/bomb.png');
    this.load.spritesheet('dude', './assets/dude.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  public async create() {
    this.initSocketHandlers();

    // Draw world
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
    this.scoreText = this.add.text(16, 16, `score: ${this.score}`, {
      fontSize: '32px',
      // @ts-ignore
      fill: '#000',
    });

    // Controls
    this.keys = this.addKeys({
      up: 'W',
      down: 'S',
      left: 'A',
      right: 'D',
      shift: 'shift',
      space: 'space',
    });

    const platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    // Draw players
    this.createPlayer(platforms);
    this.createStars(platforms);
    this.createBombs(platforms);

    this.createAnimations();
  }

  public update() {
    let keyPressed = false;
    const baseSpeed = 250;
    const isRunning = this.keys.shift.isDown;
    const speed = isRunning ? baseSpeed * 2 : baseSpeed;

    if (this.keys.space.isDown) {
      this.player.setVelocityY(-300);
      keyPressed = true;
    }
    if (this.keys.right.isDown) {
      this.player.body.setVelocityX(speed);
      this.player.anims.play('rightWalking', true);
      this.direction = 'right';

      keyPressed = true;
    } else if (this.keys.left.isDown) {
      this.player.body.setVelocityX(-speed);
      this.player.anims.play('leftWalking', true);
      this.direction = 'left';
      keyPressed = true;
    } else {
      this.player.body.setVelocityX(0);
      if (!this.waitCounter) {
        this.player.anims.play('waiting', true);
      } else if (this.direction === 'left') {
        this.player.anims.play('left');
      } else {
        this.player.anims.play('right');
      }

      if (this.waitCounter) this.waitCounter--;
    }
    if (keyPressed) {
      this.waitCounter = WAIT_TIME;
    }
  }

  addKeys<K extends Record<string, string>>(keys: K): KeyMap<K> {
    return this.input.keyboard.addKeys(keys) as KeyMap<K>;
  }

  createAnimations() {
    this.anims.create({
      key: 'leftWalking',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'left',
      frames: [{ key: 'dude', frame: 2 }],
      frameRate: 20,
    });
    this.anims.create({
      key: 'rightWalking',
      frames: this.anims.generateFrameNumbers('dude', { start: 9, end: 10 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'right',
      frames: [{ key: 'dude', frame: 8 }],
      frameRate: 20,
    });
    this.anims.create({
      key: 'waiting',
      frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 7 }),
      frameRate: 5,
      repeat: -1,
    });
  }

  createStars(platforms: Phaser.Physics.Arcade.StaticGroup) {
    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    this.stars.children.iterate(function (child) {
      // @ts-ignore
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
    this.physics.add.collider(this.stars, platforms);
    this.physics.add.overlap(
      this.player,
      this.stars,
      (player, star) => {
        //@ts-ignore
        star.disableBody(true, true);
        this.score++;
        this.scoreText.setText(`Score: ${this.score}`);

        if (this.stars.countActive(true) === 0) {
          this.stars.children.iterate(function (child) {
            //@ts-ignore
            child.enableBody(true, child.x, 0, true, true);
          });

          const x =
            this.player.x < 400
              ? Phaser.Math.Between(400, 800)
              : Phaser.Math.Between(0, 400);

          const bomb = this.bombs.create(x, 16, 'bomb');
          bomb.setBounce(1);
          bomb.setCollideWorldBounds(true);
          bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }
      },
      null,
      this
    );
  }

  createBombs(platforms: Phaser.Physics.Arcade.StaticGroup) {
    this.bombs = this.physics.add.group();
    this.physics.add.collider(this.bombs, platforms);

    this.physics.add.collider(
      this.player,
      this.bombs,
      function (player, bomb) {
        bomb.destroy();
        this.physics.pause();

        this.player.setTint(0xff0000);
        this.player.anims.play('waiting');

        this.gameOver = true;
      },
      null,
      this
    );
  }

  createPlayer(platforms) {
    this.player = this.physics.add.sprite(0, 0, 'dude');
    this.player.setVisible(false);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, platforms);
  }

  initSocketHandlers() {
    this.socket.on('connect_player', (player) => {
      this.score = player.score;
      this.player.setPosition(player.x, player.y);
      this.player.setVisible(true);
    });
  }
}
