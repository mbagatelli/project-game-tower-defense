window.addEventListener('load', () => {
    const $canvas = document.querySelector('canvas');
    const game = new Game($canvas);
  
    const $buttonGameStart = document.querySelector('button');
    const $body = document.querySelector('body');
  
    $buttonGameStart.addEventListener('click', () => {
      $body.classList.replace('game-paused', 'game-playing');
      game.start();
    });

/*     game.registerEventCallback('lose', () => {
        $body.classList.replace('game-playing', 'game-paused');
      });   */  
  });