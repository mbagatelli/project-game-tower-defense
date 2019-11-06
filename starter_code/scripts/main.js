window.addEventListener('load', () => {
  const $canvas = document.querySelector('canvas');
  const game = new Game($canvas);

  const $buttonGameStart = document.querySelector('button');
  const $main = document.querySelector('main');
  const $wave = document.getElementById('start-wave');
  const $towerFirst = document.getElementById('mage1');
  const $towerSecond = document.getElementById('cannon1');

  $buttonGameStart.addEventListener('click', () => {
    $main.classList.replace('game-paused', 'game-playing');
    game.start();
  });

  $wave.addEventListener('click', () => {
    game.waveStart();
  });

  $towerFirst.addEventListener('click', () => {
    game.mageTower.draw();
    $towerFirst.className = 'hide';
    $towerSecond.className = 'hide';
  });

  $towerSecond.addEventListener('click', () => {
    game.cannonTower.draw();
    $towerFirst.className = 'hide';
    $towerSecond.className = 'hide';
  });

  /*   game.registerEventCallback('lose', () => {
    $body.classList.replace('game-playing', 'game-paused');
  }); */
});
