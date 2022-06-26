var level = 0;
var lvl1_end_counter = 0;
var pjs = new PointJS('2d', 1980, 1080, { background: '' });
var platformer = new PlatformerJS(pjs);
platformer.optMode = true;
platformer.onWallCollision = true;
var pos_x = 900;
var pos_y = 800;
var right_lvl2 = true;
var game = pjs.game;
var tiles = pjs.tiles;
var v = pjs.vector.v2d;
var point = pjs.vector.point;
var log = pjs.system.log;
var key = pjs.keyControl;
key.initKeyControl();
var end = false;
var player = 900;
var speed1 = 0;
var speed0 = 1.25;
var speed2 = 0;
var dx = 0;
var edx = 0;
var DX = 1.25;
var DX2 = 2;
var eDX2 = 1.25;
var dy = 0;
var edy = 0;
var fight = false;
var dashed = false;
var victory = false;
var lose = false;
pjs.camera.setPositionC(point(100, 100));
//музыка на уровнях
var audio1 = new Audio('lvl1_mus.mp3');
audio1.volume = 0.05;
var audio2 = new Audio('lvl2_mus.mp3');
audio2.volume = 0.05;
var audio0 = new Audio('lvl0_mus.mp3');
audio0.volume = 0.05;

var strike = false;
function striking() {
    strike = false;
    return strike;
}
function death_alert() {
    if (lose == false) {
        lose = true;
        alert("you are dead!");
    }
    
}

//инициализация уровней
var level0 = pjs.levels.newEmptyLevel();
level0.add(platformer.addWall(game.newRectObject({
    x: 400,
    y: 880,
    w: 1090,
    h: 60,
    fillColor: 'transparent'
})));

var level1 = pjs.levels.newEmptyLevel();
level1.add(platformer.addWall(game.newRectObject({
    x: -100,
    y: 120,
    w: 710,
    h: 40,
    fillColor: 'transparent'
})),

platformer.addWall(game.newRectObject({
    x: 416,
    y: 207,
    w: 420,
    h: 50,
    fillColor: 'transparent'
})),

platformer.addWall(game.newRectObject({
    x: 800,
    y: 265,
    w: 210,
    h: 50,
    fillColor: 'transparent'
})),

platformer.addWall(game.newRectObject({
    x: 1000,
    y: 445,
    w: 235,
    h: 30,
    fillColor: 'transparent'
})),

platformer.addWall(game.newRectObject({
    x: 1240,
    y: 638,
    w: 300,
    h: 30,
    fillColor: 'transparent'
})));

var level2 = pjs.levels.newEmptyLevel();
level2.add(platformer.addWall(game.newRectObject({
    x: -1000,
    y: 880,
    w: 4000,
    h: 60,
    fillColor: 'transparent'
})));

game.newLoopFromConstructor('my game', function () {


    //Анимации персонажа

//для уровня 0
    var player_idle0 = game.newAnimationObject({
        animation: tiles.newImage("152.png").getAnimation(0, 0, 30, 42, 13), x: 900, y: 800, w: 30, h: 42, delay: 20, visible: true
    });


    var player_run0 = game.newAnimationObject({
        animation: tiles.newImage("152.png").getAnimation(0, 44, 56, 37, 10), x: 900, y: 800, w: 40, h: 42, delay: 10, visible: false
    });

    var player_jump0 = game.newAnimationObject({
        animation: tiles.newImage("152.png").getAnimation(0, 88, 64, 38, 6), x: 900, y: 800, w: 40, h: 42, delay: 20, visible: false
    });
//для уровня 1
    var player_end1 = game.newAnimationObject({
        animation: tiles.newImage("152.png").getAnimation(503, 945, 32, 45, 1), x: 1400, y: 596, w: 30, h: 42, delay: 0, visible: false
    });

    var player_idle1 = game.newAnimationObject({
        animation: tiles.newImage("152.png").getAnimation(0, 0, 30, 42, 13), x: 100, y: 0, w: 30, h: 42, delay: 20, visible: true
    });


    var player_run1 = game.newAnimationObject({
        animation: tiles.newImage("152.png").getAnimation(0, 44, 56, 37, 10), x: 100, y: 0, w: 40, h: 42, delay: 10, visible: false
    });

    var player_jump1 = game.newAnimationObject({
        animation: tiles.newImage("152.png").getAnimation(0, 88, 64, 38, 6), x: 100, y: 0, w: 40, h: 42, delay: 20, visible: false
    });
//для уровня 2
    var player_idle2 = game.newAnimationObject({
        animation: tiles.newImage("152.png").getAnimation(0, 144, 40, 45, 12), x: 200, y: 800, w: 40, h: 42, delay: 20, visible: false
    });

    var player_dash2 = game.newAnimationObject({
        animation: tiles.newImage("152.png").getAnimation(0, 192, 88, 40, 2), x: 200, y: 800, w: 40, h: 42, delay: 20, visible: false
    });

    var player_dead2 = game.newAnimationObject({
        animation: tiles.newImage("152.png").getAnimation(0, 232, 68, 40, 2), x: 200, y: 800, w: 60, h: 42, delay: 200, visible: false
    });

    var player_run2 = game.newAnimationObject({
        animation: tiles.newImage("152.png").getAnimation(0, 44, 56, 37, 10), x: 200, y: 800, w: 40, h: 42, delay: 10, visible: false
    });

    var player_jump2 = game.newAnimationObject({
        animation: tiles.newImage("152.png").getAnimation(0, 88, 64, 38, 6), x: 200, y: 800, w: 40, h: 42, delay: 20, visible: false
    });

    var enemy_idle = game.newAnimationObject({
        animation: tiles.newImage("enemy.png").getAnimation(0, 144, 40, 45, 12), x: 1600, y: 800, w: 40, h: 42, delay: 20, visible: false
    });

    var enemy_dead = game.newAnimationObject({
        animation: tiles.newImage("enemy.png").getAnimation(0, 192, 68, 40, 2), x: 1600, y: 800, w: 60, h: 42, delay: 200, visible: false
    });

    var enemy_strike = game.newAnimationObject({
        animation: tiles.newImage("enemy.png").getAnimation(0, 88, 64, 38, 6), x: 1600, y: 800, w: 40, h: 42, delay: 20, visible: false
    });

    var enemy_run = game.newAnimationObject({
        animation: tiles.newImage("enemy.png").getAnimation(0, 44, 56, 37, 10), x: 1600, y: 800, w: 40, h: 42, delay: 10, visible: false
    });

    //Физика анимаций
    platformer.addAction(enemy_dead);
    enemy_dead.gravity = 0.4;
    enemy_dead.friction = 0.1;

    platformer.addAction(player_dead2);
    player_dead2.gravity = 0.4;
    player_dead2.friction = 0.1;

    platformer.addAction(enemy_run);
    enemy_run.gravity = 0.4;
    enemy_run.friction = 0.1;

    platformer.addAction(enemy_strike);
    enemy_strike.gravity = 0.4;
    enemy_strike.friction = 0.1;

    platformer.addAction(enemy_idle);
    enemy_idle.gravity = 0.4;
    enemy_idle.friction = 0.1;

    platformer.addAction(player_idle0);
    player_idle0.gravity = 0.4;
    player_idle0.friction = 0.1;


    platformer.addAction(player_run0);
    player_run0.gravity = 0.4;
    player_run0.friction = 0.1;

    platformer.addAction(player_jump0);
    player_jump0.gravity = 0.4;
    player_jump0.friction = 0.1;

    platformer.addAction(player_idle1);
    player_idle1.gravity = 0.4;
    player_idle1.friction = 0.1;


    platformer.addAction(player_run1);
    player_run1.gravity = 0.4;
    player_run1.friction = 0.1;

    platformer.addAction(player_jump1);
    player_jump1.gravity = 0.4;
    player_jump1.friction = 0.1;

    platformer.addAction(player_idle2);
    player_idle2.gravity = 0.4;
    player_idle2.friction = 0.1;

    platformer.addAction(player_dash2);
    player_dash2.gravity = 0.4;
    player_dash2.friction = 0.1;

    platformer.addAction(player_run2);
    player_run2.gravity = 0.4;
    player_run2.friction = 0.1;

    platformer.addAction(player_jump2);
    player_jump2.gravity = 0.4;
    player_jump2.friction = 0.1;

    platformer.addAction(player_end1);
    //Игровой цикл /Взаимодействие с пользователем


    this.update = function () {
        game.clear();

        if ((level == 0)) {
            player_idle0.move(v(speed0 * dx, speed0 * dy));
            player_run0.move(v(speed0 * dx, speed0 * dy));
            player_jump0.move(v(speed0 * dx, speed0 * dy));
        };
        if (level == 1) {
            player_idle1.move(v(speed1 * dx, speed1 * dy));
            player_run1.move(v(speed1 * dx, speed1 * dy));
            player_jump1.move(v(speed1 * dx, speed1 * dy));
        };
        if (level == 2) {
            player_idle2.move(v(speed2 * dx, speed2 * dy));
            player_run2.move(v(speed2 * dx, speed2 * dy));
            player_jump2.move(v(speed2 * dx, speed2 * dy));
            player_dash2.move(v(speed2 * dx, speed2 * dy));
            player_dead2.move(v(speed2 * dx, speed2 * dy));
            enemy_idle.move(v(speed2 * edx, speed2 * edy));
            enemy_run.move(v(speed2 * edx, speed2 * edy));
            enemy_strike.move(v(speed2 * edx, speed2 * edy));
            enemy_dead.move(v(speed2 * edx, speed2 * edy));
        };
        

//lvl 0

        if ((level == 0) && (key.isPress('W') || key.isPress('UP'))) {
            player_jump0.jump(10);
            player_run0.jump(10);
            player_idle0.jump(10);
        }


        if ((level == 0) && (player_run0.jumped == true)) {
            player_run0.setVisible(false);
            player_idle0.setVisible(false);
            player_jump0.setVisible(true);
        }

        if ((level == 0) && (player_run0.jumped == false)) {
            player_jump0.setVisible(false);
        }


        if ((level == 0) && (key.isDown('D') || key.isDown('RIGHT'))) {
            dx = DX;
            dy = 0;
            player_run0.setFlip(0, 0);
            player_idle0.setFlip(0, 0);
            player_jump0.setFlip(0, 0);
            player_run0.setVisible(true);
            player_idle0.setVisible(false);
            player_jump0.setVisible(false);
            if (player_run0.jumped == true) {
                player_run0.setVisible(false);
                player_idle0.setVisible(false);
                player_jump0.setVisible(true);
            }

        } else if ((level == 0) && (key.isDown('A') || key.isDown('LEFT'))) {
            dx = -DX;
            dy = 0;
            player_run0.setFlip(1, 0);
            player_idle0.setFlip(1, 0);
            player_jump0.setFlip(1, 0);
            player_run0.setVisible(true);
            player_idle0.setVisible(false);
            player_jump0.setVisible(false);
            if (player_run0.jumped == true) {
                player_run0.setVisible(false);
                player_idle0.setVisible(false);
                player_jump0.setVisible(true);
            }
        } else if ((level == 0) && (player_run0.jumped == false)) {
            dx = 0;
            dy = 0;
            player_idle0.setVisible(true);
            player_run0.setVisible(false);
        }
//lvl 1 
        if ((level == 1) && (key.isPress('W') || key.isPress('UP')) && (end == false)) {
            player_jump1.jump(10);
            player_run1.jump(10);
            player_idle1.jump(10);
        }


        if ((level == 1) && (player_run1.jumped == true) && (end == false)) {
            player_run1.setVisible(false);
            player_idle1.setVisible(false);
            player_jump1.setVisible(true);
        }

        if ((level == 1) && (player_run1.jumped == false)) {
            player_jump1.setVisible(false);
        }


        if ((level == 1) && (key.isDown('D') || key.isDown('RIGHT'))) {
            dx = DX;
            dy = 0;
            player_run1.setFlip(0, 0);
            player_idle1.setFlip(0, 0);
            player_jump1.setFlip(0, 0);
            player_run1.setVisible(true);
            player_idle1.setVisible(false);
            player_jump1.setVisible(false);
            if ((player_run1.jumped == true) && (end == false)) {
                player_run1.setVisible(false);
                player_idle1.setVisible(false);
                player_jump1.setVisible(true);
            }

        } else if ((level == 1) && (key.isDown('A') || key.isDown('LEFT'))) {
            dx = -DX;
            dy = 0;
            player_run1.setFlip(1, 0);
            player_idle1.setFlip(1, 0);
            player_jump1.setFlip(1, 0);
            player_run1.setVisible(true);
            player_idle1.setVisible(false);
            player_jump1.setVisible(false);
            if ((player_run1.jumped == true) && (end == false)) {
                player_run1.setVisible(false);
                player_idle1.setVisible(false);
                player_jump1.setVisible(true);
            }
        } else if ((level == 1) && (player_run1.jumped == false)) {
            dx = 0;
            dy = 0;
            player_idle1.setVisible(true);
            player_run1.setVisible(false);
        }


        if ((level == 1) && (player_idle1.x > 1374) && (player_idle1.y == 596)) {
            player_run1.setVisible(false);
            player_idle1.setVisible(false);
            player_jump1.setVisible(false);
            end = true;
            speed1 = 0;
            player_end1.setVisible(true);
            if ((end == true) && (lvl1_end_counter == 0)) {
                alert("level complete!");
                lvl1_end_counter++;
                player_run1.setVisible(false);
                player_run1.setPosition(point(3000, 3000));
                player_idle1.setVisible(false);
                player_idle1.setPosition(point(3000, 3000));
                player_jump1.setVisible(false);
                player_jump1.setPosition(point(3000, 3000));
            } 
        }

        //устранение бага, из-за которого спрайт idle мог упасть вниз, а остальные спрайты оставались на платформе
        if (player_idle1.y < player_run1.y) {
            player_idle1.setPosition(point(player_run1.x, player_run1.y));
        }
        // граница уровня
        if (player_idle1.x < 10) {
            player_idle1.x = 20;
            player_jump1.x = 20;
            player_run1.x = 20;
        }

        if ((level == 1) && (player_run1.y > 600) && (end == false)) {
            alert("you are dead!");
            player_jump1.setPosition(point(100, 0));
            player_idle1.setPosition(point(100, 0));
            player_run1.setPosition(point(100, 0));
        }
//lvl 2
        if ((level == 2) && (key.isPress('W') || key.isPress('UP'))) {
            player_jump2.jump(10);
            player_dash2.jump(10);
            player_run2.jump(10);
            player_idle2.jump(10);
        }


        if ((level == 2) && (player_run2.jumped == true)) {
            player_run2.setVisible(false);
            player_idle2.setVisible(false);
            player_jump2.setVisible(true);
        }

        if ((level == 2) && (player_run2.jumped == false)) {
            player_jump2.setVisible(false);
        }


        if ((level == 2) && (key.isDown('D') || key.isDown('RIGHT'))) {
            right_lvl2 = true;
            dx = DX2;
            dy = 0;
            dashed = false;
            player_run2.setFlip(0, 0);
            player_idle2.setFlip(0, 0);
            player_dash2.setFlip(0, 0);
            player_jump2.setFlip(0, 0);
            player_run2.setVisible(true);
            player_dash2.setVisible(false);
            player_idle2.setVisible(false);
            player_jump2.setVisible(false);
            if (player_run2.jumped == true) {
                player_run2.setVisible(false);
                player_idle2.setVisible(false);
                player_jump2.setVisible(true);
            }
            if (key.isDown('SHIFT')) {
                dashed = true;
                player_dash2.x += 2;
                player_dead2.x += 2;
                player_run2.x += 2;
                player_jump2.x += 2;
                player_idle2.x += 2;
                player_dash2.setVisible(true);
                player_run2.setVisible(false);
                player_idle2.setVisible(false);
                player_jump2.setVisible(false);
            }

        } 
        else if ((level == 2) && (key.isDown('A') || key.isDown('LEFT'))) {
            right_lvl2 = false;
            dx = -DX2;
            dy = 0;
            dashed = false;
            player_run2.setFlip(1, 0);
            player_dash2.setFlip(1, 0);
            player_idle2.setFlip(1, 0);
            player_jump2.setFlip(1, 0);
            player_run2.setVisible(true);
            player_dash2.setVisible(false);
            player_idle2.setVisible(false);
            player_jump2.setVisible(false);
            if (player_run2.jumped == true) {
                player_run2.setVisible(false);
                player_idle2.setVisible(false);
                player_jump2.setVisible(true);
            }
            if (key.isDown('SHIFT')) {
                dashed = true;
                player_idle2.x -= 2;
                player_dash2.x -= 2;
                player_dead2.x -= 2;
                player_run2.x -= 2;
                player_jump2.x -= 2;
                player_dash2.setVisible(true);
                player_run2.setVisible(false);
                player_idle2.setVisible(false);
                player_jump2.setVisible(false);
            }
        } else if ((level == 2) && (player_run2.jumped == false)) {
            dx = 0;
            dy = 0;
            dashed = false;
            player_idle2.setVisible(true);
            player_dash2.setVisible(false);
            player_run2.setVisible(false);
        }
        // границы уровня
        if (player_idle2.x < 10) {
            player_idle2.x = 20;
            player_dash2.x = 20;
            player_jump2.x = 20;
            player_run2.x = 20;
        }
        if (player_idle2.x > 1880) {
            player_idle2.x = 1870;
            player_dash2.x = 1870;
            player_jump2.x = 1870;
            player_run2.x = 1870;
        }
        //движение врага
        if ((level == 2) && (fight == false) && (player_idle2.x > 600)) {
            fight = true;
        }
        if ((level == 2) && (fight == true) && (player_idle2.x > enemy_idle.x) && (strike == false) && (victory == false)) {
            edx = eDX2;
            edy = 0;
            enemy_run.setFlip(0, 0);
            enemy_idle.setFlip(0, 0);
            enemy_strike.setFlip(0, 0);
            enemy_run.setVisible(true);
            enemy_strike.setVisible(false);
            enemy_idle.setVisible(false);
        } 
        if ((level == 2) && (fight == true) && (player_idle2.x < enemy_idle.x) && (strike == false) && (victory == false)) {
            edx = -eDX2;
            edy = 0;
            enemy_run.setFlip(1, 0);
            enemy_idle.setFlip(1, 0);
            enemy_strike.setFlip(1, 0);
            enemy_run.setVisible(true);
            enemy_strike.setVisible(false);
            enemy_idle.setVisible(false);
        }
        if ((level == 2) && (fight == true) && (dashed == false) && ((player_idle2.x - 30 <= enemy_idle.x) && (player_idle2.x + 30 >= enemy_idle.x)) && (victory == false)) {
            strike = true;
            enemy_run.setVisible(false);
            enemy_idle.setVisible(false);
            enemy_strike.setVisible(true);
            edx = 0;
            edy = 0;
            setTimeout(() => striking(), 1000);
            if ((strike == true) && ((player_idle2.x - 30 <= enemy_idle.x) && (player_idle2.x + 30 >= enemy_idle.x)) && (lose == false)) {
                dx = 0;
                dy= 0;
                player_dash2.setVisible(false);
                player_idle2.setVisible(false);
                player_run2.setVisible(false);
                player_jump2.setVisible(false);
                player_dead2.setVisible(true);
                //setTimeout нужен для того, чтобы полность проигралась анимация удара
                setTimeout(() => death_alert(), 1000);
            }
        } else if ((level == 2) && (fight == false)) {
            enemy_idle.setFlip (1, 0);
            enemy_idle.setVisible(true);
        }
        //условие убийства врага
        if ((dashed == true) && ((player_idle2.x - 10 <= enemy_idle.x) && (player_idle2.x + 10 >= enemy_idle.x)) && (victory == false)) {
            victory = true;
            edx = 0;
            edy = 0;
            enemy_idle.setVisible(false);
            enemy_run.setVisible(false);
            enemy_strike.setVisible(false);
            enemy_dead.setVisible(true);
        }
        if (lose == true) {
            dx = 0;
            dy = 0;
            fight = false;
            enemy_run.setVisible(false);
            enemy_strike.setVisible(false);
            enemy_idle.setVisible(true);
            player_dash2.setVisible(false);
            player_idle2.setVisible(false);
            player_run2.setVisible(false);
            player_jump2.setVisible(false);
            player_dead2.setVisible(true);
        }

//выбор уровней

        switch (level) {
            case 0:
                platformer.setBackImage("lvl0.jpg")
                level0.draw();
                player_run1.setVisible(false);
                player_idle1.setVisible(false);
                player_jump1.setVisible(false);
                player_run2.setVisible(false);
                player_idle2.setVisible(false);
                player_jump2.setVisible(false);
                speed0 = 1.25
                audio0.play();
                platformer.addWall(game.newRectObject({
                    x: 400,
                    y: 880,
                    w: 1090,
                    h: 60,
                    fillColor: 'transparent'
                }));
                if (player_idle0.x <= 690) {
                    level0.clear();
                    level = 1;
                };
                if (player_idle0.x >= 1100) {
                    level0.clear();
                    level = 2;
                };
            break;
            case 1:
                speed0 = 0;
                level1.draw();
                player_run0.setVisible(false);
                player_idle0.setVisible(false);
                player_jump0.setVisible(false);
                player_run2.setVisible(false);
                player_idle2.setVisible(false);
                player_jump2.setVisible(false);
                platformer.setBackImage("lvl1.jpg");
                speed1 = 1.25;
                audio0.volume = 0;
                audio1.play();
            break;
            case 2:
                speed0 = 0;
                speed1 = 0;
                speed2 = 1.25;
                level2.draw();
                player_run0.setVisible(false);
                player_idle0.setVisible(false);
                player_jump0.setVisible(false);
                player_run1.setVisible(false);
                player_idle1.setVisible(false);
                player_jump1.setVisible(false);
                platformer.setBackImage("lvl2.jpg");
                audio0.volume = 0;
                audio2.play();
            break;
            default:
                alert('error, сюда нельзя было попасть');
        };
        platformer.update();
    }
});
game.startLoop('my game');