const state = {
  lastPlayerId: 0,
  players: {},
};

function playerIsConnected(state, id) {
  return Boolean(state.players[id]);
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

function handleNewPlayer(socket, state) {
  const newPlayerId = state.lastPlayerId + 1;
  state.lastPlayerId = newPlayerId;
  const newPlayer = createPlayer(newPlayerId);

  state.players = {
    ...state.players,
    [socketId]: newPlayer,
  };
  socket.data.player = newPlayer;
  socket.emit('all_players', state.players);
}

function main(socket) {
  socket.on('get_player', () => handleNewPlayer(socket, state));
  socket.on('disconnect', (id) => console.log('user disconnected. id:', id));
}

module.exports = main;
