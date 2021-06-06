import * as Phaser from 'phaser';
import { Socket } from 'socket.io-client';
import { SocketGameRes } from '../types';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  key: 'login',
};

export default class Login extends Phaser.Scene {
  private socket: Socket;

  constructor() {
    super(sceneConfig);
  }

  init(data) {
    this.socket = data.socket;
  }

  preload() {
    this.load.html('nameform', './assets/dom/login.html');
    this.load.image('sky', './assets/sky.png');
  }

  create() {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
    var text = this.createLoginMessage();

    this.add
      .dom(this.scale.width / 2, this.scale.height / 2)
      .createFromCache('nameform');
    const id = localStorage.getItem('id');
    var inputGameId: HTMLInputElement =
      document.querySelector('[name="gameid"]');
    var inputUsername: HTMLInputElement =
      document.querySelector('[name="username"]');
    if (id) {
      inputUsername.value = id;
    }
    const loginBtn = document.querySelector('[name="loginButton"]');

    loginBtn.addEventListener('click', (event) => {
      if (!(inputGameId.value && inputUsername.value)) {
        this.tweens.add({
          targets: text,
          alpha: 0.1,
          duration: 200,
          ease: 'Power3',
          yoyo: true,
        });
        text.setText(`Must add a Game ID and Username to continue`);
        return;
      }

      //  Populate the text with whatever they typed in as the username!
      text.setText(`Logged in as ${inputUsername.value}`);
      this.gameSetup();
    });
  }

  gameSetup() {
    if (!this.socket)
      throw new Error(
        'Socket not available for connecting to game server in Login screen'
      );

    // Attempt to start game
    this.socket.emit('get_game', 'aburd');

    this.socket.on('game', async (gameData: SocketGameRes) => {
      console.log({ gameData });
      this.scene.start('asteroidMain', {
        socket: this.socket,
        gameId: gameData.id,
        players: gameData.players,
      });
      // TODO: Add in main game scene
      // await phaserStart(phaserConfig, gameData.id, gameData.players, socket);
    });
  }

  createLoginMessage() {
    return this.add.text(10, 10, 'Please login to play', {
      color: 'white',
      fontFamily: 'Arial',
      fontSize: '32px ',
    });
  }
}
