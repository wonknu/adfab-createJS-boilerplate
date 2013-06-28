define(
    [],
    function ()
    {
        var PATH_TO_ASSETS = "assets/";
        return {
            PATH_TO_ASSETS : PATH_TO_ASSETS,
            manifest : [
                // HOW TO LOAD IMAGES, ex :
                { src : PATH_TO_ASSETS + "images/btn_play.png", id : "btn_play" }
                //{ src : PATH_TO_ASSETS + "images/sprite_test.png", id : "sprite_test" }
            ],
            EVENTS : {
                START_GAME : "startGame"
            },
            CANVAS : {
                NAME : 'game-canvas',
                WIDTH : window.innerWidth,
                HEIGHT : window.innerHeight
            },
            CONTAINER : 'game-wrapper'
            // Then you can add other satic variable to use in the game ( speed, velocity ... )
        };
    }
); 