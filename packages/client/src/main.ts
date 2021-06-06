import * as Phaser from 'phaser';
import { io, Socket } from 'socket.io-client';
import LoginScene from './scenes/Login';
import AsteroidMainScene from './scenes/AsteroidMain';

interface ConfigOptions {
  id?: string;
  width?: number;
  height?: number;
}

function createConfig(
  id: string,
  options: ConfigOptions = {}
): Phaser.Types.Core.GameConfig {
  return {
    title: id,
    type: Phaser.AUTO,
    parent: 'asteroid-container',
    width: options.width ? options.width : 800,
    height: options.height ? options.height : 600,
    scene: [LoginScene, AsteroidMainScene],
    dom: {
      createContainer: true,
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 500 },
        debug: true,
      },
    },
    backgroundColor: '#000000',
  };
}

function phaserStart(config, socket: Socket) {
  const game = new Phaser.Game(config);
  game.scene.start('login', { socket });
}

(async function () {
  const phaserConfig = createConfig('Asteroid Heroes', {
    width: 800,
    height: 600,
  });

  const socket = io();
  socket.on('connect', async () => {
    console.log('Connected to server with id:', socket.id);
    phaserStart(phaserConfig, socket);
  });
  socket.on('disconnect', () => console.log('Disconnected from server'));
  socket.on('error', function (err) {
    console.error(err);
    alert('Unable to connect to server.');
  });
})();
