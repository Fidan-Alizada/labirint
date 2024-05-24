document.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('player');
    const end = document.getElementById('end');
    const walls = document.querySelectorAll('.wall');
    const mazeContainer = document.getElementById('maze-container');
    const stepSize = 10;
    
    let playerPosition = { top: 0, left: 0 };

    function movePlayer(direction) {
        const newPosition = { ...playerPosition };

        if (direction === 'up') newPosition.top -= stepSize;
        if (direction === 'down') newPosition.top += stepSize;
        if (direction === 'left') newPosition.left -= stepSize;
        if (direction === 'right') newPosition.left += stepSize;

        if (canMoveTo(newPosition)) {
            playerPosition = newPosition;
            player.style.top = playerPosition.top + 'px';
            player.style.left = playerPosition.left + 'px';

            if (hasReachedEnd()) {
                alert('You win!');
                resetGame();
            }
        }
    }

    function canMoveTo(position) {
        if (position.top < 0 || position.left < 0 ||
            position.top + player.clientHeight > mazeContainer.clientHeight ||
            position.left + player.clientWidth > mazeContainer.clientWidth) {
            return false;
        }

        for (let wall of walls) {
            const wallRect = wall.getBoundingClientRect();
            const playerRect = {
                top: position.top + mazeContainer.offsetTop,
                left: position.left + mazeContainer.offsetLeft,
                right: position.left + mazeContainer.offsetLeft + player.clientWidth,
                bottom: position.top + mazeContainer.offsetTop + player.clientHeight
            };

            if (!(playerRect.right < wallRect.left ||
                  playerRect.left > wallRect.right ||
                  playerRect.bottom < wallRect.top ||
                  playerRect.top > wallRect.bottom)) {
                return false;
            }
        }

        return true;
    }

    function hasReachedEnd() {
        const playerRect = player.getBoundingClientRect();
        const endRect = end.getBoundingClientRect();

        return !(playerRect.right < endRect.left ||
                 playerRect.left > endRect.right ||
                 playerRect.bottom < endRect.top ||
                 playerRect.top > endRect.bottom);
    }

    function resetGame() {
        playerPosition = { top: 0, left: 0 };
        player.style.top = playerPosition.top + 'px';
        player.style.left = playerPosition.left + 'px';
    }

    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowUp':
                movePlayer('up');
                break;
            case 'ArrowDown':
                movePlayer('down');
                break;
            case 'ArrowLeft':
                movePlayer('left');
                break;
            case 'ArrowRight':
                movePlayer('right');
                break;
        }
    });

    resetGame();
});
