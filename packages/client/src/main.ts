import * as Phaser from 'phaser';
import { io, Socket } from 'socket.io-client';
import AsteroidMain from './scenes/AsteroidMain';

const defaultConfig = {
  id: 'game',
  width: 800,
  height: 600,
};
class Game {
  public phaserConfig: Phaser.Types.Core.GameConfig;
  private game: Phaser.Game;

  constructor(config = defaultConfig) {
    this.phaserConfig = {
      title: config.id,
      type: Phaser.AUTO,
      parent: config.id,
      width: config.width ? config.width : 800,
      height: config.height ? config.height : 600,
      scene: AsteroidMain,
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

  getPlayerId() {
    return localStorage.getItem('playerId');
  }

  start(gameId: string, players: any, socket: Socket) {
    this.game = new Phaser.Game(this.phaserConfig);
    this.game.scene.start('asteroidMain', {
      gameId,
      players,
      socket,
    });
  }
}

(async function () {
  const game = new Game({
    id: 'Asteroid Heroes',
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const socket = io();
  socket.on('connect', async () => {
    console.log('Connected to server with id:', socket.id);
    socket.emit('get_game', 'aburd');
  });
  socket.on('disconnect', () => console.log('Disconnected from server'));
  socket.on('game', async (gameData) => {
    await game.start(gameData.id, gameData.players, socket);
  });
})();
