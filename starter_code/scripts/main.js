window.addEventListener('load', () => {
  const $canvas = document.querySelector('canvas');
  const game = new Game($canvas);

  const $buttonGameStart = document.querySelector('button');
  const $main = document.querySelector('main');
  const $wave = document.getElementById('start-wave');
  const $towerFirst = document.getElementById('mage1');
  const $towerSecond = document.getElementById('cannon1');
  const $towerFirst2 = document.getElementById('mage2');
  const $towerSecond2 = document.getElementById('cannon2');
  const $towerUpgradeFirstMage = document.getElementById('mage-upgrade1');
  const $towerUpgradeFirstCannon = document.getElementById('cannon-upgrade1');
  const $towerUpgradeSecondMage = document.getElementById('mage-upgrade2');
  const $towerUpgradeSecondCannon = document.getElementById('cannon-upgrade2');

  $buttonGameStart.addEventListener('click', () => {
    $main.classList.replace('game-paused', 'game-playing');
    $buttonGameStart.classList.replace('start-game', 'canvas-time');
    game.start();
  });

  $wave.addEventListener('click', () => {
    game.waveStart();
    $wave.disabled = true;
  });

  $towerFirst.addEventListener('click', () => {
    game.mageTower.draw();
    $wave.disabled = false;
    $towerFirst.disabled = true;
    $towerSecond.disabled = true;
  });

  $towerSecond.addEventListener('click', () => {
    game.cannonTower.draw();
    $wave.disabled = false;
    $towerFirst.disabled = true;
    $towerSecond.disabled = true;
  });

  $towerFirst2.addEventListener('click', () => {
    game.mageTower.drawPos2();
    $wave.disabled = false;
    $towerFirst2.disabled = true;
    $towerSecond2.disabled = true;
  });

  $towerSecond2.addEventListener('click', () => {
    game.cannonTower.drawPos2();
    $wave.disabled = false;
    $towerFirst2.disabled = true;
    $towerSecond2.disabled = true;
  });

  $towerUpgradeFirstMage.addEventListener('click', () => {
    game.mageTower.drawUpgrade();
    game.player.score -= game.mageTower.upgradeCost;
    $towerUpgradeFirstMage.disabled = true;
    $towerUpgradeFirstCannon.disabled = true;
  });

  $towerUpgradeFirstCannon.addEventListener('click', () => {
    game.cannonTower.drawUpgrade();
    game.player.score -= game.cannonTower.upgradeCost;
    $towerUpgradeFirstMage.disabled = true;
    $towerUpgradeFirstCannon.disabled = true;
  });

  $towerUpgradeSecondMage.addEventListener('click', () => {
    game.mageTower.drawUpgrade2();
    game.player.score -= game.mageTower.upgradeCost;
    $towerUpgradeFirstMage.disabled = true;
    $towerUpgradeFirstCannon.disabled = true;
  });

  $towerUpgradeSecondCannon.addEventListener('click', () => {
    game.cannonTower.drawUpgrade2();
    game.player.score -= game.cannonTower.upgradeCost;
    $towerUpgradeFirstMage.disabled = true;
    $towerUpgradeFirstCannon.disabled = true;
  });

  /*   game.registerEventCallback('lose', () => {
    $body.classList.replace('game-playing', 'game-lost');
  }); */
});
