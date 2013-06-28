/**
 * Pong module
 * 
 * dependencies :
 *  - createjs
 * 
 * How to use :
 * PongInstance.initialize();
 * 
 */

define(
    ['VAR', 'introView', "text", 'sprite', 'createjs'],
    function (VAR, introView, _Text, Sprite)
    {
        var canvas,
            stage,
            Ticker = createjs.Ticker,
            containerGame = null,
            tkr = new Object(),
            STAGE_WIDTH = window.innerWidth,
            STAGE_HEIGHT = window.innerHeight,
            text = null,
            _sprite = null,
            game = {
                canvas : canvas,
                stage : stage,
                Ticker : Ticker
            },
            defaults = {
                fps : 30
            };
        /**
         * Init the game
         */
        game.initialize = function ()
        {
            canvas = document.getElementById(VAR.CANVAS.NAME); /* Link Canvas */
            stage = new createjs.Stage(canvas);
            
            window.stage = stage;
            
            Ticker.setFPS(defaults.fps); /* Ticker */
            Ticker.addListener(stage);
            
            introView.render(stage);
            
            stage.addEventListener(VAR.EVENTS.START_GAME, function ()
            {
                game.launchGame();
            });
        };
        
        /**
         * Launch the game 
         */
        game.launchGame = function ()
        {
            stage.removeEventListener(VAR.EVENTS.START_GAME);
            
            // GAME CONTAINER
            containerGame = new createjs.Container();
            stage.addChild(containerGame);
            
            _sprite = new Sprite(
                (VAR.CANVAS.WIDTH * .5),
                (VAR.CANVAS.HEIGHT * .5),
                50,
                50,
                VAR.PATH_TO_ASSETS + "images/sprite_test.png",
                4
            );
            
            // GAME LOOP
            Ticker.addListener(tkr, false);
            tkr.tick = game.update;
        };
        
        /**
         * GAME LOOP 
         */
        game.update = function ()
        {
            _sprite.move(_sprite.x + 1, 0);
        };
        
        return game;
    }
);
