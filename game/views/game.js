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
    ['VAR', 'introView', "text", 'createjs'],
    function (VAR, introView, _Text)
    {
        var canvas,
            stage,
            Ticker = createjs.Ticker,
            containerGame = null,
            tkr = new Object(),
            STAGE_WIDTH = window.innerWidth,
            STAGE_HEIGHT = window.innerHeight,
            text = null,
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
            
            var textSise = 100;
            text = new _Text(
                "You think this is a Game!",
                (VAR.CANVAS.WIDTH * .5) - (textSise * .5),
                (VAR.CANVAS.HEIGHT * .5) - (textSise * .5),
                textSise,
                textSise,
                "700 small-caps 20px/2 Arial, sans-serif",
                "#000",
                "center"
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
            
        };
        
        return game;
    }
);
