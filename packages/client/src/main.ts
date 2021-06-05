import * as Phaser from 'phaser';
import {
  Stitch,
  AnonymousCredential,
  StitchAppClient,
  RemoteMongoClient,
  RemoteMongoDatabase,
  RemoteMongoCollection,
} from 'mongodb-stitch-browser-sdk';
import AsteroidMain from './scenes/AsteroidMain';

class Game {
  public phaserConfig: Phaser.Types.Core.GameConfig;
  private game: Phaser.Game;
  private client: StitchAppClient;
  private database: RemoteMongoDatabase;
  private collection: RemoteMongoCollection<any>;

  constructor(
    config = {
      id: 'game',
      width: 800,
      height: 600,
      realmAppId: '',
      databaseName: '',
      collectionName: '',
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

    this.client = Stitch.initializeDefaultAppClient(config.realmAppId);
    this.database = this.client
      .getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas')
      .db(config.databaseName);
    this.collection = this.database.collection(config.collectionName);
  }

  async authenticate() {
    return this.client.auth.loginWithCredential(new AnonymousCredential());
  }
  async joinOrCreateGame(id) {
    try {
      let auth = await this.authenticate();
      let result = await this.joinGame(id, auth.id);
      if (result == null) {
        result = await this.createGame(id, auth.id);
      }
      return result;
    } catch (e) {
      console.error(e);
    }
  }
  async joinGame(id, authId) {
    try {
      let result = await this.collection.findOne({ _id: id });
      if (!this.playerInGame(result)) {
        localStorage.setItem('playerId', result.players.length + 1);
        const playerId = this.getPlayerId();
        this.collection.updateOne(
          { _id: id },
          {
            players: { ...result.players, id: { x: 0, y: 0, id: playerId } },
          }
        );
      }
      if (result != null) {
        this.game = new Phaser.Game(this.phaserConfig);
        this.game.scene.start('asteroidMain', {
          playerId: this.getPlayerId(),
          gameId: id,
          collection: this.collection,
          authId: authId,
          ownerId: result.owner_id,
          players: result.players,
        });
      }
      return result;
    } catch (e) {
      console.error(e);
    }
  }
  playerInGame(game) {
    const playerId = this.getPlayerId();
    return Boolean(game.players[playerId]);
  }
  async createGame(id, authId) {
    try {
      const players = { '1': { id: '1', x: 0, y: 0 } };
      localStorage.setItem('playerId', JSON.stringify(1));
      let game = await this.collection.insertOne({
        _id: id,
        owner_id: authId,
        players,
      });

      this.game = new Phaser.Game(this.phaserConfig);
      this.game.scene.start('asteroidMain', {
        playerId: this.getPlayerId(),
        gameId: id,
        collection: this.collection,
        authId: authId,
        ownerId: authId,
        players: {},
      });
      return { gameId: id, authId: authId, owner_id: authId };
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
    collectionName: 'games',
    databaseName: 'mongo-asteroid-heroes',
    realmAppId: 'asteroid-heroes-pmwjl',
  });
  let result = await game.joinOrCreateGame('aburdNew2');
})();
