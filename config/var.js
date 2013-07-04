define(
    [],
    function ()
    {
        var PATH_TO_ASSETS = "assets/";
        return {
            PATH_TO_ASSETS : PATH_TO_ASSETS,
            manifest : [ // HOW TO LOAD IMAGES, ex :
                { src : PATH_TO_ASSETS + "images/btn_play.png", id : "btn_play" }
                , { src : PATH_TO_ASSETS + "images/bonus_0.png", id : "bonus_0" }
                , { src : PATH_TO_ASSETS + "images/bonus_1.png", id : "bonus_1" }
                , { src : PATH_TO_ASSETS + "images/bonus_2.png", id : "bonus_2" }
                , { src : PATH_TO_ASSETS + "images/bonus_3.png", id : "bonus_3" }
                , { src : PATH_TO_ASSETS + "images/bonus_4.png", id : "bonus_4" }
            ],
            EVENTS : { // CUSTOM EVENTS
                START_GAME : "startGame",
                BANDIT_READY : "bandit-ready",
                START_PLAYING_GAME : "playGame",
                STOP_PLAYING_GAME : "stopPlayGame",
                HAS_SCROLL : "hasScroll"
            },
            CANVAS : {
                NAME : 'game-canvas',
                WIDTH : window.innerWidth,
                HEIGHT : window.innerHeight
            },
            CONTAINER : 'game-wrapper'
            // Then you can add other static variable to use in the game ( speed, velocity ... )
        };
    }
); 