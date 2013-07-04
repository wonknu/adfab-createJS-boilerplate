/**
 * Game view module
 * 
 * dependencies :
 *  - createjs
 * 
 * How to use :
 * GameInstance.initialize();
 * 
 */

define(
    ['VAR', 'introView', "text", 'sprite', 'scrollerItem', 'createjs'],
    function (VAR, introView, _Text, Sprite, ScrollerItem)
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
            stopBanditLauncher = false,
            gameIsRunnig = false,
            scrolls = [],
            currentScroll = null,
            banditWidth = 302, banditHeight = 245,
            game = {
                canvas : canvas,
                stage : stage,
                Ticker : Ticker
            },
            defaults = {
                fps : 10
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
            var _this = this;
            stage.removeEventListener(VAR.EVENTS.START_GAME);
            
            // GAME CONTAINER
            containerGame = new createjs.Container();
            stage.addChild(containerGame);
            
            _sprite = new Sprite(
                (VAR.CANVAS.WIDTH * .5) - (banditWidth * .5),
                (VAR.CANVAS.HEIGHT * .5) - (banditHeight * .5),
                banditWidth,
                banditHeight,
                VAR.PATH_TO_ASSETS + "images/bandit.png",
                4
            );
            
            // Time to add game UI
            this.addBackground();
            this.addScrollerItem();
            
            // Wait for the bandit to finish rendering
            stage.addEventListener(VAR.EVENTS.BANDIT_READY, function ()
            {
                stage.removeEventListener(VAR.EVENTS.BANDIT_READY);
                stopBanditLauncher = true;
            });
            
            // GAME LOOP
            Ticker.addListener(tkr, false);
            tkr.tick = game.update;
            
            this.initListener();
        };
        
        /**
         * Add listener for game action
         */
        game.initListener = function ()
        {
            stage.addEventListener(VAR.EVENTS.START_PLAYING_GAME, function ()
            {
                gameIsRunnig = true;
            });
            stage.addEventListener(VAR.EVENTS.STOP_PLAYING_GAME, function ()
            {
                gameIsRunnig = false;
            });
        };
        
        /**
         * Remove listener for game action
         */
        game.removeListener = function ()
        {
            stage.removeEventListener(VAR.EVENTS.START_PLAYING_GAME);
            stage.removeEventListener(VAR.EVENTS.STOP_PLAYING_GAME);
        };
        
        /**
         * Add yellow background (must be behind the bandit manchot png) 
         */
        game.addBackground = function ()
        {
            var yellowBackground = new createjs.Graphics(),
                s;
            yellowBackground
            .beginFill("#343434")
            .drawRect((VAR.CANVAS.WIDTH * .5) - (banditWidth * .45), (VAR.CANVAS.HEIGHT * .5) - (banditHeight * .4), banditWidth * .8, banditHeight * .8);
            s = new createjs.Shape(yellowBackground);
            stage.addChild(s);
        };
        
        game.addScrollerItem = function ()
        {
            var fixPositionX = [ 21, 101, 181 ],
                fixPositionY = 55,
                i;
            for (i = 0; i < fixPositionX.length; i++) {
                scrolls.push(new ScrollerItem(
                    (VAR.CANVAS.WIDTH * .5) - (banditWidth * .5) + fixPositionX[i],
                    (VAR.CANVAS.HEIGHT * .5) - (banditHeight * .5) + fixPositionY,
                    Math.round((30 - (i * 10)) + Math.random() * 50),
                    [ IMGS.bonus_0, IMGS.bonus_1, IMGS.bonus_2, IMGS.bonus_3, IMGS.bonus_4 ]
                ));
            };
            currentScroll = scrolls[0];
            currentScroll.container.addEventListener(VAR.EVENTS.HAS_SCROLL, game.listenEndScroll);
        };
        
        /**
         * Listen for scroll to end and call the next one to start to slow down 
         */
        game.listenEndScroll = function ()
        {
            currentScroll.container.removeEventListener(VAR.EVENTS.HAS_SCROLL, game.listenEndScroll);
            if(currentScroll === scrolls[(scrolls.length - 1)]){
                stage.dispatchEvent(VAR.EVENTS.STOP_PLAYING_GAME);
                return;
            }
            for (i = 0; i < scrolls.length; i++) {
                if(scrolls[i] === currentScroll && i < (scrolls.length - 1)) {
                    currentScroll = scrolls[(i + 1)];
                    currentScroll.container.addEventListener(VAR.EVENTS.HAS_SCROLL, game.listenEndScroll);
                    break;
                }
            }
        };
        
        /**
         * GAME LOOP 
         */
        game.update = function ()
        {
            if(stopBanditLauncher && _sprite.bmpAnimation.currentAnimationFrame == 0){
                stage.dispatchEvent(VAR.EVENTS.START_PLAYING_GAME);
                _sprite.bmpAnimation.stop();
            }
            
            if(gameIsRunnig && currentScroll != null){
                for (i = 0; i < scrolls.length; i++) {
                    if(scrolls[i] === currentScroll) scrolls[i].animate(true);
                    else scrolls[i].animate();
                }
            }
        };
        
        return game;
    }
);
