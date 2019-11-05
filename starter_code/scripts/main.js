window.addEventListener('load', () => {
  const $canvas = document.querySelector('canvas');
  const game = new Game($canvas);

  const $buttonGameStart = document.querySelector('button');
  const $main = document.querySelector('main');
  const $wave = document.getElementById('start-wave');
  const $towerFirst = document.getElementById('tower-first');

  $buttonGameStart.addEventListener('click', () => {
    $main.classList.replace('game-paused', 'game-playing');
    game.start();
  });

  $wave.addEventListener('click', () => {
    game.waveStarted();
  });

  $towerFirst.addEventListener('click', () => {
    game.mageTower.draw();
  });

  /*   game.registerEventCallback('lose', () => {
    $body.classList.replace('game-playing', 'game-paused');
  }); */
});
