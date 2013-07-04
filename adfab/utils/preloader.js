/**
 * Loader module
 * 
 * dependencies :
 *  - createjs
 * 
 * How to use :
 * preloaderObject.load( {Function on progress}, {Function on complete} );
 * 
 */

define(
    ['VAR', 'createjs'],
    function (VAR)
    {
        var cb_progress, cb_complete, _debug = false;
        window.IMGS = [];
        
        /**
         * Initialize loader and load assets
         * @param {Object} progress, call back from progress event
         * @param {Object} complete, call back from complete event
         */
        var initialize = function (progress, complete, debug)
        {
            if(VAR.manifest.length < 1 && (typeof complete === 'undefined' || complete === null))
                throw "No images to load and neither a callback, the preloader won't ever fired that it has done loading assets'";
            else if(VAR.manifest.length < 1 && typeof complete !== 'undefined' && complete !== null)
                complete();
            window.IMGS = {};
            _debug = debug || false;
            cb_progress = progress || null;
            cb_complete = complete || null;
            preloader = new createjs.LoadQueue();
            preloader.onProgress = handleProgress;
            preloader.onComplete = handleComplete;
            preloader.onFileLoad = handleFileLoad;
            preloader.loadManifest(VAR.manifest);
        };
        
        /**
         * Receive progress event from loading assets
         * @param {Object} e
         */
        var handleProgress = function (e)
        {
            if(_debug && typeof console !== "undefined" && console !== null) {
                if(typeof console.clear !== "undefined" && console.clear !== null )
                    console.clear();
                console.log('Loading : ' + e.loaded);
            }
            if(cb_progress !== null) cb_progress(e);
        };
        
        /**
         * Receive complete event from loading assets
         * @param {Object} e
         */
        var handleComplete = function (e)
        {
            if(_debug && typeof console !== "undefined" && console !== null) {
                if(typeof console.clear !== "undefined" && console.clear !== null )
                    console.clear();
                console.log('completed loading assets');
            }
            if(cb_complete !== null) cb_complete(e);
        };
        
        /**
         * Receive file load event from loading assets
         * @param {Object} e
         */
        var handleFileLoad = function (e)
        {
            switch(e.type)
            {
                case "fileload": // image loaded
                    var img = new Image();
                    img.src = e.result.src;
                    window.IMGS[e.item.id] = new createjs.Bitmap(img);
                break;
            }
        };
        
        return { 
            load: initialize
        };
    }
);
