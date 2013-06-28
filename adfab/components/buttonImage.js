/**
 * Button image module
 * 
 * dependencies :
 *  - createjs
 * 
 * How to use :
 * new buttonImage(options ... )
 * 
 */

define(
    ['createjs'],
    function ()
    {
        /**
         * Create a button with an image
         */
        var create = function ()
        {
            this.container.x = this.x;
            this.container.y = this.y;
            this.container.width = this.width;
            this.container.height = this.height;
            
            return this;
        };
        
        /**
         * Display Button
         */
        var display = function ()
        {
            stage.addChild(this.container);
            if(this.bitmap !== null) this.container.addChild(this.bitmap);
            stage.update();
            return this;
        };
        
        /**
         * Remove Button
         */
        var remove = function ()
        {
            if(this.bitmap !== null) this.container.removeChild(this.bitmap);
            if(this.container.parent !== null && this.container.parent !== undefined) this.container.parent.removeChild(this.container);
            return this;
        };
        
        /**
         * Constructor create a button
         * @param {Int} x
         * @param {Int} y
         * @param {String} bitmap, ex : png image loaded with PreloadJS
         * @param {Object} container, new createjs.Container()
         */
        return function (x, y, bitmap, container)
        {
            this.create = create;
            this.display = display;
            this.remove = remove;
            
            this.bitmap = bitmap || null;
            this.x = (x - (this.bitmap.image.width * .5)) || 0;
            this.y = (y - (this.bitmap.image.height * .5)) || 0;
            this.width = this.bitmap.image.width;
            this.height = this.bitmap.image.height;
            this.container = container || new createjs.Container();
            
            this.create(); // Call constructor
            return this;
        };
    }
);
