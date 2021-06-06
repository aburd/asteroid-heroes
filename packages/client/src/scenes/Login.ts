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
  }

  create() {
    var text = this.createLoginMessage();

    var element = this.add.dom(400, 600).createFromCache('nameform');
    console.log('element', element);
    // element.setPerspective(800);
    element.addListener('click');

    element.on('click', function (event) {
      if (event.target.name === 'loginButton') {
        var inputUsername = this.getChildByName('username');
        var inputGameId = this.getChildByName('gameid');

        if (!(inputUsername.value && inputGameId.value)) {
          //  Flash the prompt
          this.scene.tweens.add({
            targets: text,
            alpha: 0.1,
            duration: 200,
            ease: 'Power3',
            yoyo: true,
          });
          return;
        }

        //  Turn off the click events
        this.removeListener('click');

        //  Tween the login form out
        this.scene.tweens.add({
          targets: element.rotate3d,
          x: 1,
          w: 90,
          duration: 3000,
          ease: 'Power3',
        });

        this.scene.tweens.add({
          targets: element,
          scaleX: 2,
          scaleY: 2,
          y: 700,
          duration: 3000,
          ease: 'Power3',
          onComplete: () => element.setVisible(false),
        });

        //  Populate the text with whatever they typed in as the username!
        text.setText('Welcome ' + inputUsername.value);
      }
    });

    this.tweens.add({
      targets: element,
      y: 300,
      duration: 3000,
      ease: 'Power3',
    });
  }

  socketSetup() {
    if (!this.socket)
      throw new Error(
        'Socket not available for connecting to game server in Login screen'
      );

    // Attempt to start game
    this.socket.emit('get_game', 'aburd');

    this.socket.on('game', async (gameData: SocketGameRes) => {
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
