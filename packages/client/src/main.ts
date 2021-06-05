import * as Phaser from 'phaser';
import AsteroidMain from './scenes/AsteroidMain';

class Game {
  public phaserConfig: Phaser.Types.Core.GameConfig;
  private game: Phaser.Game;

  constructor(
    config = {
      id: 'game',
      width: 800,
      height: 600,
    }
  ) {
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
  async joinOrCreateGame(id) {
    try {
      // let result = await this.joinGame(id);
      await this.createGame(id);
    } catch (e) {
      console.error(e);
    }
  }
  // async joinGame(id) {
  //   try {
  //     const playerId = this.getPlayerId();
  //     this.game = new Phaser.Game(this.phaserConfig);
  //     this.game.scene.start('asteroidMain', {
  //       playerId: this.getPlayerId(),
  //       gameId: id,
  //       players: {},
  //     });
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }
  playerInGame(game) {
    const playerId = this.getPlayerId();
    return Boolean(game.players[playerId]);
  }
  async createGame(id) {
    try {
      const players = { '1': { id: '1', x: 0, y: 0 } };
      localStorage.setItem('playerId', JSON.stringify(1));

      this.game = new Phaser.Game(this.phaserConfig);
      this.game.scene.start('asteroidMain', {
        playerId: this.getPlayerId(),
        gameId: id,
        players: {},
      });
      return { gameId: id };
    } catch (e) {
      console.error(e);
    }
  }

  getPlayerId() {
    return localStorage.getItem('playerId');
  }
}

(async function () {
  const game = new Game({
    id: 'Asteroid Heroes',
    width: window.innerWidth,
    height: window.innerHeight,
  });
  let result = await game.joinOrCreateGame('aburd');
})();
