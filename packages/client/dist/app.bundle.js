/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar Phaser = __webpack_require__(/*! phaser */ \"../../node_modules/phaser/dist/phaser.js\");\nvar mongodb_stitch_browser_sdk_1 = __webpack_require__(/*! mongodb-stitch-browser-sdk */ \"../../node_modules/mongodb-stitch-browser-sdk/dist/esm/index.js\");\nvar AsteroidMain_1 = __webpack_require__(/*! ./scenes/AsteroidMain */ \"./src/scenes/AsteroidMain.ts\");\nvar Game = /** @class */ (function () {\n    function Game(config) {\n        if (config === void 0) { config = {\n            id: 'game',\n            width: 800,\n            height: 600,\n            realmAppId: '',\n            databaseName: '',\n            collectionName: '',\n        }; }\n        this.phaserConfig = {\n            title: config.id,\n            type: Phaser.AUTO,\n            parent: config.id,\n            width: config.width ? config.width : 800,\n            height: config.height ? config.height : 600,\n            scene: AsteroidMain_1.default,\n            physics: {\n                default: 'arcade',\n                arcade: {\n                    gravity: { y: 500 },\n                    debug: true,\n                },\n            },\n            backgroundColor: '#000000',\n        };\n        this.client = mongodb_stitch_browser_sdk_1.Stitch.initializeDefaultAppClient(config.realmAppId);\n        this.database = this.client\n            .getServiceClient(mongodb_stitch_browser_sdk_1.RemoteMongoClient.factory, 'mongodb-atlas')\n            .db(config.databaseName);\n        this.collection = this.database.collection(config.collectionName);\n    }\n    Game.prototype.authenticate = function () {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.client.auth.loginWithCredential(new mongodb_stitch_browser_sdk_1.AnonymousCredential())];\n            });\n        });\n    };\n    Game.prototype.joinOrCreateGame = function (id) {\n        return __awaiter(this, void 0, void 0, function () {\n            var auth, result, e_1;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        _a.trys.push([0, 5, , 6]);\n                        return [4 /*yield*/, this.authenticate()];\n                    case 1:\n                        auth = _a.sent();\n                        return [4 /*yield*/, this.joinGame(id, auth.id)];\n                    case 2:\n                        result = _a.sent();\n                        if (!(result == null)) return [3 /*break*/, 4];\n                        return [4 /*yield*/, this.createGame(id, auth.id)];\n                    case 3:\n                        result = _a.sent();\n                        _a.label = 4;\n                    case 4: return [2 /*return*/, result];\n                    case 5:\n                        e_1 = _a.sent();\n                        console.error(e_1);\n                        return [3 /*break*/, 6];\n                    case 6: return [2 /*return*/];\n                }\n            });\n        });\n    };\n    Game.prototype.joinGame = function (id, authId) {\n        return __awaiter(this, void 0, void 0, function () {\n            var result, playerId, e_2;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        _a.trys.push([0, 2, , 3]);\n                        return [4 /*yield*/, this.collection.findOne({ _id: id })];\n                    case 1:\n                        result = _a.sent();\n                        if (!this.playerInGame(result)) {\n                            localStorage.setItem('playerId', result.players.length + 1);\n                            playerId = this.getPlayerId();\n                            this.collection.updateOne({ _id: id }, {\n                                players: __assign(__assign({}, result.players), { id: { x: 0, y: 0, id: playerId } }),\n                            });\n                        }\n                        if (result != null) {\n                            this.game = new Phaser.Game(this.phaserConfig);\n                            this.game.scene.start('asteroidMain', {\n                                playerId: this.getPlayerId(),\n                                gameId: id,\n                                collection: this.collection,\n                                authId: authId,\n                                ownerId: result.owner_id,\n                                players: result.players,\n                            });\n                        }\n                        return [2 /*return*/, result];\n                    case 2:\n                        e_2 = _a.sent();\n                        console.error(e_2);\n                        return [3 /*break*/, 3];\n                    case 3: return [2 /*return*/];\n                }\n            });\n        });\n    };\n    Game.prototype.playerInGame = function (game) {\n        var playerId = this.getPlayerId();\n        return Boolean(game.players[playerId]);\n    };\n    Game.prototype.createGame = function (id, authId) {\n        return __awaiter(this, void 0, void 0, function () {\n            var players, game, e_3;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        _a.trys.push([0, 2, , 3]);\n                        players = { '1': { id: '1', x: 0, y: 0 } };\n                        localStorage.setItem('playerId', JSON.stringify(1));\n                        return [4 /*yield*/, this.collection.insertOne({\n                                _id: id,\n                                owner_id: authId,\n                                players: players,\n                            })];\n                    case 1:\n                        game = _a.sent();\n                        this.game = new Phaser.Game(this.phaserConfig);\n                        this.game.scene.start('asteroidMain', {\n                            playerId: this.getPlayerId(),\n                            gameId: id,\n                            collection: this.collection,\n                            authId: authId,\n                            ownerId: authId,\n                            players: {},\n                        });\n                        return [2 /*return*/, { gameId: id, authId: authId, owner_id: authId }];\n                    case 2:\n                        e_3 = _a.sent();\n                        console.error(e_3);\n                        return [3 /*break*/, 3];\n                    case 3: return [2 /*return*/];\n                }\n            });\n        });\n    };\n    Game.prototype.getPlayerId = function () {\n        return localStorage.getItem('playerId');\n    };\n    return Game;\n}());\n(function () {\n    return __awaiter(this, void 0, void 0, function () {\n        var game, result;\n        return __generator(this, function (_a) {\n            switch (_a.label) {\n                case 0:\n                    game = new Game({\n                        id: 'Asteroid Heroes',\n                        width: window.innerWidth,\n                        height: window.innerHeight,\n                        collectionName: 'games',\n                        databaseName: 'mongo-asteroid-heroes',\n                        realmAppId: 'asteroid-heroes-pmwjl',\n                    });\n                    return [4 /*yield*/, game.joinOrCreateGame('aburdNew2')];\n                case 1:\n                    result = _a.sent();\n                    return [2 /*return*/];\n            }\n        });\n    });\n})();\n\n\n//# sourceURL=webpack://client/./src/main.ts?");

/***/ }),

/***/ "./src/scenes/AsteroidMain.ts":
/*!************************************!*\
  !*** ./src/scenes/AsteroidMain.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar Phaser = __webpack_require__(/*! phaser */ \"../../node_modules/phaser/dist/phaser.js\");\nvar sceneConfig = {\n    active: false,\n    visible: false,\n    key: 'asteroidMain',\n};\nvar WAIT_TIME = 120;\nvar AsteroidMainScene = /** @class */ (function (_super) {\n    __extends(AsteroidMainScene, _super);\n    function AsteroidMainScene() {\n        var _this = _super.call(this, sceneConfig) || this;\n        _this.starCount = 0;\n        _this.waitCounter = WAIT_TIME;\n        _this.updating = false;\n        return _this;\n    }\n    AsteroidMainScene.prototype.init = function (data) {\n        this.gameId = data.gameId;\n        this.collection = data.collection;\n        this.authId = data.authId;\n        this.ownerId = data.ownerId;\n        this.players = data.players;\n        this.playerId = data.playerId;\n        console.log('data', data);\n    };\n    AsteroidMainScene.prototype.preload = function () {\n        this.load.image('sky', './assets/sky.png');\n        this.load.image('ground', './assets/platform.png');\n        this.load.image('star', './assets/star.png');\n        this.load.image('bomb', './assets/bomb.png');\n        this.load.spritesheet('dude', './assets/dude.png', {\n            frameWidth: 32,\n            frameHeight: 48,\n        });\n    };\n    AsteroidMainScene.prototype.create = function () {\n        return __awaiter(this, void 0, void 0, function () {\n            var _a, width, height, platforms, stream;\n            var _this = this;\n            return __generator(this, function (_b) {\n                switch (_b.label) {\n                    case 0:\n                        _a = this.scale, width = _a.width, height = _a.height;\n                        // Draw world\n                        this.add.image(0, 0, 'sky').setOrigin(0, 0);\n                        this.scoreText = this.add.text(16, 16, \"score: \" + this.starCount, {\n                            fontSize: '32px',\n                            // @ts-ignore\n                            fill: '#000',\n                        });\n                        // Controls\n                        this.keys = this.addKeys({\n                            up: 'W',\n                            down: 'S',\n                            left: 'A',\n                            right: 'D',\n                            shift: 'shift',\n                            space: 'space',\n                        });\n                        platforms = this.physics.add.staticGroup();\n                        platforms.create(400, 568, 'ground').setScale(2).refreshBody();\n                        platforms.create(600, 400, 'ground');\n                        platforms.create(50, 250, 'ground');\n                        platforms.create(750, 220, 'ground');\n                        this.createOtherPlayers(platforms);\n                        // Draw players\n                        Object.keys(this.players).forEach(function (id) { return __awaiter(_this, void 0, void 0, function () {\n                            var player, x, y;\n                            return __generator(this, function (_a) {\n                                player = this.players[id];\n                                x = player.x, y = player.y;\n                                if (id === this.playerId) {\n                                    this.player = this.physics.add.sprite(x, y, 'dude');\n                                    this.player.setBounce(0.2);\n                                    this.player.setCollideWorldBounds(true);\n                                    this.physics.add.collider(this.player, platforms);\n                                }\n                                else {\n                                    console.log(x, y, id);\n                                    this.createOtherPlayer(x, y);\n                                }\n                                return [2 /*return*/];\n                            });\n                        }); });\n                        this.createStars(platforms);\n                        this.createBombs(platforms);\n                        return [4 /*yield*/, this.collection.watch({\n                                'fullDocument._id': this.gameId,\n                            })];\n                    case 1:\n                        stream = _b.sent();\n                        stream.onNext(function (event) {\n                            console.log(event);\n                        });\n                        this.createAnimations();\n                        return [2 /*return*/];\n                }\n            });\n        });\n    };\n    AsteroidMainScene.prototype.update = function () {\n        var keyPressed = false;\n        var baseSpeed = 250;\n        var isRunning = this.keys.shift.isDown;\n        var speed = isRunning ? baseSpeed * 2 : baseSpeed;\n        if (this.keys.space.isDown) {\n            this.player.setVelocityY(-300);\n            keyPressed = true;\n        }\n        if (this.keys.right.isDown) {\n            this.player.body.setVelocityX(speed);\n            this.player.anims.play('rightWalking', true);\n            this.direction = 'right';\n            keyPressed = true;\n        }\n        else if (this.keys.left.isDown) {\n            this.player.body.setVelocityX(-speed);\n            this.player.anims.play('leftWalking', true);\n            this.direction = 'left';\n            keyPressed = true;\n        }\n        else {\n            this.player.body.setVelocityX(0);\n            if (!this.waitCounter) {\n                this.player.anims.play('waiting', true);\n            }\n            else if (this.direction === 'left') {\n                this.player.anims.play('left');\n            }\n            else {\n                this.player.anims.play('right');\n            }\n            if (this.waitCounter)\n                this.waitCounter--;\n        }\n        if (keyPressed) {\n            this.waitCounter = WAIT_TIME;\n        }\n        this.updatePlayerDB();\n    };\n    AsteroidMainScene.prototype.addKeys = function (keys) {\n        return this.input.keyboard.addKeys(keys);\n    };\n    AsteroidMainScene.prototype.updatePlayerDB = function () {\n        var _a;\n        var _this = this;\n        var _b, _c;\n        var _d = this.player.getCenter(), x = _d.x, y = _d.y;\n        var update = {\n            x: Math.floor(x),\n            y: Math.floor(y),\n            id: this.playerId,\n        };\n        if (this.updating ||\n            (((_b = this.lastUpdate) === null || _b === void 0 ? void 0 : _b.x) === update.x && ((_c = this.lastUpdate) === null || _c === void 0 ? void 0 : _c.y) === update.y))\n            return;\n        this.updating = true;\n        this.lastUpdate = update;\n        this.collection\n            .updateOne({\n            owner_id: this.authId,\n            _id: this.gameId,\n        }, {\n            $set: (_a = {},\n                _a[\"players.\" + this.playerId] = update,\n                _a),\n        })\n            .then(function (result) {\n            console.log(result);\n            _this.updating = false;\n        });\n    };\n    AsteroidMainScene.prototype.createAnimations = function () {\n        this.anims.create({\n            key: 'leftWalking',\n            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),\n            frameRate: 10,\n            repeat: -1,\n        });\n        this.anims.create({\n            key: 'left',\n            frames: [{ key: 'dude', frame: 2 }],\n            frameRate: 20,\n        });\n        this.anims.create({\n            key: 'rightWalking',\n            frames: this.anims.generateFrameNumbers('dude', { start: 9, end: 10 }),\n            frameRate: 10,\n            repeat: -1,\n        });\n        this.anims.create({\n            key: 'right',\n            frames: [{ key: 'dude', frame: 8 }],\n            frameRate: 20,\n        });\n        this.anims.create({\n            key: 'waiting',\n            frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 7 }),\n            frameRate: 5,\n            repeat: -1,\n        });\n    };\n    AsteroidMainScene.prototype.createStars = function (platforms) {\n        var _this = this;\n        this.stars = this.physics.add.group({\n            key: 'star',\n            repeat: 11,\n            setXY: { x: 12, y: 0, stepX: 70 },\n        });\n        this.stars.children.iterate(function (child) {\n            // @ts-ignore\n            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));\n        });\n        this.physics.add.collider(this.stars, platforms);\n        this.physics.add.overlap(this.player, this.stars, function (player, star) {\n            //@ts-ignore\n            star.disableBody(true, true);\n            _this.starCount++;\n            _this.scoreText.setText(\"Score: \" + _this.starCount);\n            if (_this.stars.countActive(true) === 0) {\n                _this.stars.children.iterate(function (child) {\n                    //@ts-ignore\n                    child.enableBody(true, child.x, 0, true, true);\n                });\n                var x = _this.player.x < 400\n                    ? Phaser.Math.Between(400, 800)\n                    : Phaser.Math.Between(0, 400);\n                var bomb = _this.bombs.create(x, 16, 'bomb');\n                bomb.setBounce(1);\n                bomb.setCollideWorldBounds(true);\n                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);\n            }\n        }, null, this);\n    };\n    AsteroidMainScene.prototype.createBombs = function (platforms) {\n        this.bombs = this.physics.add.group();\n        this.physics.add.collider(this.bombs, platforms);\n        this.physics.add.collider(this.player, this.bombs, function (player, bomb) {\n            bomb.destroy();\n            this.physics.pause();\n            this.player.setTint(0xff0000);\n            this.player.anims.play('waiting');\n            this.gameOver = true;\n        }, null, this);\n    };\n    AsteroidMainScene.prototype.createOtherPlayers = function (platforms) {\n        this.otherPlayers = this.physics.add.group();\n        this.physics.add.collider(this.otherPlayers, platforms);\n    };\n    AsteroidMainScene.prototype.createOtherPlayer = function (x, y) {\n        var otherPlayer = this.otherPlayers.create(x, y, 'dude');\n        otherPlayer.setBounce(0.2);\n        otherPlayer.setCollideWorldBounds(true);\n    };\n    return AsteroidMainScene;\n}(Phaser.Scene));\nexports.default = AsteroidMainScene;\n\n\n//# sourceURL=webpack://client/./src/scenes/AsteroidMain.ts?");

/***/ }),

/***/ "../../node_modules/webpack/hot sync ^\\.\\/log$":
/*!*******************************************************************!*\
  !*** ../../node_modules/webpack/hot/ sync nonrecursive ^\.\/log$ ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./log\": \"../../node_modules/webpack/hot/log.js\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"../../node_modules/webpack/hot sync ^\\\\.\\\\/log$\";\n\n//# sourceURL=webpack://client/../../node_modules/webpack/hot/_sync_nonrecursive_^\\.\\/log$?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					result = fn();
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) var result = runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkclient"] = self["webpackChunkclient"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/main.ts")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("../../node_modules/webpack-dev-server/client/index.js?http://localhost:8080")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;