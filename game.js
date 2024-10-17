Game.Draw = function(context, snake) {
    this.drawStage = function() {
        var keyPress = snake.stage.keyEvent.getKey();
        if (typeof(keyPress) != 'undefined') {
            snake.stage.direction = keyPress;
        }

        // Constant background color for the canvas
        context.fillStyle = "#ebebeb"; 
        context.fillRect(0, 0, snake.stage.width, snake.stage.height);

        var nx = snake.stage.length[0].x;
        var ny = snake.stage.length[0].y;

        switch (snake.stage.direction) {
            case 'right':
                nx++;
                break;
            case 'left':
                nx--;
                break;
            case 'up':
                ny--;
                break;
            case 'down':
                ny++;
                break;
        }

        if (this.collision(nx, ny) === true) {
            snake.restart();
            return;
        }

        if (nx == snake.stage.food.x && ny == snake.stage.food.y) {
            var tail = {x: nx, y: ny};
            snake.stage.score++;
            snake.initFood();
        } else {
            var tail = snake.stage.length.pop();
            tail.x = nx;
            tail.y = ny;
        }
        snake.stage.length.unshift(tail);

        // Draw the snake with a constant color
        for (var i = 0; i < snake.stage.length.length; i++) {
            var cell = snake.stage.length[i];
            this.drawCell(cell.x, cell.y, "#4CAF50"); // Green color for snake
        }

        // Draw the food with a constant color
        this.drawCell(snake.stage.food.x, snake.stage.food.y, "#FF0000"); // Red color for food

        // Draw the score
        context.fillStyle = "#333"; // Dark grey color for the score text
        context.fillText('Score: ' + snake.stage.score, 5, (snake.stage.height - 5));
    };

    this.drawCell = function(x, y, color) {
        context.fillStyle = color;
        context.fillRect(x * snake.stage.conf.cw, y * snake.stage.conf.cw, snake.stage.conf.cw, snake.stage.conf.cw);
    };

    this.collision = function(nx, ny) {
        if (nx == -1 || nx == (snake.stage.width / snake.stage.conf.cw) || ny == -1 || ny == (snake.stage.height / snake.stage.conf.cw)) {
            return true;
        }
        return false;
    };
};
