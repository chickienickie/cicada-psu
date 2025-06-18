window.addEventListener('DOMContentLoaded', () => {
    // everything from your game logic goes in here:
    
    const game = document.getElementById('game');
    const player = document.getElementById('player');
    const friend = document.getElementById('friend');
    const gameOver = document.getElementById('game-over');
    const winMessage = document.getElementById('win');
    const restartButton = document.getElementById('restart-button');
  
    let gameHeight;
    let playerX = 170;
    let playerY;
    let gameWidth = 400;
    let speed = 10;
    let isGameOver = false;

    setStartingPosition();

    window.addEventListener('resize', () => {
        setStartingPosition();
    });

    function setStartingPosition() {
        gameHeight = getComputedStyle(game).getPropertyValue('--_gameHeight');
        playerY = gameHeight - 100;
        player.style.left = playerX + 'px';
        player.style.top = playerY + 'px';
    }
  
    document.addEventListener('keydown', movePlayer);
  
    function movePlayer(e) {
      if (isGameOver) return;
      if (e.key === 'ArrowLeft' && playerX > 0) playerX -= speed;
      else if (e.key === 'ArrowRight' && playerX < gameWidth - 60) playerX += speed;
      else if (e.key === 'ArrowUp' && playerY > 0) playerY -= speed;
      else if (e.key === 'ArrowDown' && playerY < gameHeight - 60) playerY += speed;
  
      player.style.left = playerX + 'px';
      player.style.top = playerY + 'px';
  
      if (playerY <= 40) win();
    }
  
    function createRaindrop() {
      if (isGameOver) return;
  
      const drop = document.createElement('img');
      drop.src = 'raindrop.png';
      drop.className = 'raindrop';
  
      let dropX = Math.floor(Math.random() * (gameWidth - 30));
      let dropY = -40;
      drop.style.left = dropX + 'px';
      drop.style.top = dropY + 'px';
      game.appendChild(drop);
  
      function fall() {
        if (isGameOver) {
          drop.remove();
          return;
        }
  
        dropY += 5;
        drop.style.top = dropY + 'px';
  
        if (
          dropY + 45 >= playerY &&
          dropY <= playerY + 60 &&
          dropX + 30 >= playerX &&
          dropX <= playerX + 60
        ) {
          endGame();
          drop.remove();
          return;
        }
  
        if (dropY < gameHeight) {
          requestAnimationFrame(fall);
        } else {
          drop.remove();
        }
      }
  
      requestAnimationFrame(fall);
    }
  
    setInterval(() => {
      if (!isGameOver) createRaindrop();
    }, 500);
  
    function endGame() {
      isGameOver = true;
      gameOver.style.display = 'block';
      restartButton.style.display = 'block';
    }
  
    function win() {
      isGameOver = true;
      winMessage.style.display = 'block';
      restartButton.style.display = 'block';
    }
  
    restartButton.addEventListener('click', () => {
      setStartingPosition()  
  
      gameOver.style.display = 'none';
      winMessage.style.display = 'none';
      restartButton.style.display = 'none';
      isGameOver = false;
  
      document.querySelectorAll('.raindrop').forEach(drop => drop.remove());
    });
  
    function simulateKey(key) {
      const event = new KeyboardEvent('keydown', { key });
      document.dispatchEvent(event);
    }
  
    document.getElementById('up').addEventListener('click', () => simulateKey('ArrowUp'));
    document.getElementById('down').addEventListener('click', () => simulateKey('ArrowDown'));
    document.getElementById('left').addEventListener('click', () => simulateKey('ArrowLeft'));
    document.getElementById('right').addEventListener('click', () => simulateKey('ArrowRight'));
  });
  