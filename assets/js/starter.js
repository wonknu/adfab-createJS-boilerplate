require.config({
    baseUrl: '',
    paths: {
        // CONFIG
        VAR: 'config/var',
        
        // Adfab components using createJS
        preloader: 'adfab/utils/preloader',
        button: 'adfab/components/button',
        buttonImage: 'adfab/components/buttonImage',
        text: 'adfab/components/text',
        sprite: 'adfab/components/sprite',
        
        // VIEWS
        introView: 'game/views/intro',
        game: 'game/views/game',
        
        // VENDOR
        jQuery: 'vendors/jquery-2.0.2.min.js', // jQuery isn't used in the boilerplate
        createjs: 'vendors/createjs.min'
    },
    shim: { // Sets the configuration for your third party scripts that are not AMD compatible
        "createjs": {
            exports: "createjs"  //attaches "createjs" to the window object
        }
    }
});

require(
    ['VAR', 'preloader', 'game'],
    function (VAR, preload, Game)
    {
        var container = document.getElementById(VAR.CONTAINER),
            canv = document.createElement("canvas");
        VAR.CANVAS.WIDTH = container.offsetWidth;
        VAR.CANVAS.HEIGHT = container.offsetHeight;
        // Add canvas elements to fit full container
        canv.setAttribute('width', VAR.CANVAS.WIDTH);
        canv.setAttribute('height', VAR.CANVAS.HEIGHT);
        canv.setAttribute("id", VAR.CANVAS.NAME);
        container.appendChild(canv);
        
        preload.load(
            function (e)
            { // Progress event
                //console.log(e);
            },
            function (e)
            { // complete event
                Game.initialize();
            },
            true
        );
    }
);
