let lastPlayerId = 0;
let state = {
  games: {},
};

function getPlayer(socket, state, id) {
  return state.games[socket.data.gameId].players[id];
}

// Player
function createPlayer(id, player = {}) {
  const blank = {
    x: 0,
    y: 0,
    score: 0,
    id,
  };
  return { ...blank, ...player };
}

function handleCreatePlayer(socket, state) {
  const newPlayerId = lastPlayerId + 1;
  lastPlayerId = newPlayerId;
  const newPlayer = createPlayer(newPlayerId);

  state.games[socket.data.gameId].players = {
    ...state.games[socket.data.gameId].players,
    [newPlayerId]: newPlayer,
  };
  socket.data.player = newPlayer;
  return newPlayer;
}

function handleGetPlayer(socket, state, id) {
  const player = getPlayer(socket, state, id);
  if (player) {
    console.log(player);
    socket.emit('player', player);
  } else {
    const player = handleCreatePlayer(socket, state);
    console.log(player);
    socket.emit('player', player);
  }
}

function getGame(state, id) {
  return state.games[id];
}

function createGame(id) {
  return {
    id,
    players: {},
  };
}

function handleCreateGame(socket, state, id) {
  const newGame = createGame(id);

  state.games = {
    ...state.games,
    [id]: newGame,
  };
  socket.data.game = newGame;
  return newGame;
}

function handleGetGame(socket, state, id) {
  const game = getGame(state, id);
  if (game) {
    socket.emit('game', game);
  } else {
    const game = handleCreateGame(socket, state, id);
    socket.emit('game', game);
  }
  socket.data.gameId = id;
}

function main(socket) {
  socket.data = {};
  socket.on('get_game', (id) => handleGetGame(socket, state, id));
  socket.on('get_player', (id) => handleGetPlayer(socket, state, id));
  socket.on('disconnect', (id) => console.log('user disconnected. id:', id));

  socket.emit('game_state', state);
}

module.exports = main;
