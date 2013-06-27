define(
    [],
    function ()
    {
        var PATH_TO_ASSETS = "assets/";
        return {
            manifest : [
                // HOW TO LOAD IMAGES, ex :
                //{ src : PATH_TO_ASSETS + "img/ball.png", id : "ball" }
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