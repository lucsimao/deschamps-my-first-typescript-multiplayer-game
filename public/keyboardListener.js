const createKeyboardListener = (document) => {
  const state = {
    observers: [],
    playerId: null,
  };

  const registerPlayerId = (playerId) => {
    state.playerId = playerId;
  };

  const subscribe = (observerFunction) => {
    state.observers.push(observerFunction);
  };

  const notifyAll = (command) => {
    for (const observerFunction of state.observers) {
      observerFunction(command);
    }
  };

  const handleKeydown = (event) => {
    const move = new String(event.key).replace('Arrow', '');
    const command = {
      playerId: state.playerId,
      move: move,
    };
    console.log('Apertou a tecla:' + move);
    notifyAll(command);
  };

  document.addEventListener('keydown', handleKeydown);

  return {
    subscribe,
    registerPlayerId,
  };
};

export default createKeyboardListener;
