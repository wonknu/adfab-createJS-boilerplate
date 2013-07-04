/**
 * Sprite module
 * 
 * dependencies :
 *  - createjs
 * 
 * How to use :
 * new button(options)
 * 
 */

define(
    ['VAR', 'createjs'],
    function (VAR)
    {
        var currentImage = 0, customContainer = null;
        
        /**
         * Create a button with an image
         */
        var create = function ()
        {
            var _this = this;
            this.image = new Image();
            this.image.onload = function()
            {
                _this.spriteSheet = new createjs.SpriteSheet({
                    images: [_this.image], // image to use
                    // width, height & registration point of each sprite
                    frames: {width : _this.width, height : _this.height}, 
                    animations: {    
                        walk: [0, _this.numberImage, "walk"]
                    }
                });
                _this.bmpAnimation = new createjs.BitmapAnimation(_this.spriteSheet);
                _this.bmpAnimation.gotoAndPlay("walk");
                
                _this.bmpAnimation.name = _this.name;
                
                _this.bmpAnimation.currentFrame = 0;
                
                _this.bmpAnimation.frequency = 10;
                stage.addChild(_this.bmpAnimation);
                
                _this.move(_this.x, _this.y);
                
                stage.dispatchEvent(VAR.EVENTS.BANDIT_READY);
            };
            this.image.onerror = function()
            {
                throw "Error Image : " + this.pathToTimage + " could not load!";
            };
            
            this.image.src = this.pathToTimage;
            
            return this;
        };
        
        /**
         * move the sprite
         * @param {Int} x
         */
        var move = function (x, y)
        {
            this.bmpAnimation.x = this.x = x;
            this.bmpAnimation.y = this.y = y;
        };
        
        /**
         * Constructor create a button
         * @param {Int} x
         * @param {Int} y
         * @param {Int} width
         * @param {Int} height
         * @param {String} pathToTimage
         * @param {Int} numberImage, to loop over the sprite and make the animation right
         */
        return function (x, y, width, height, pathToTimage, numberImage, name)
        {
            this.create = create;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.pathToTimage = pathToTimage;
            this.numberImage = numberImage || 0;
            this.name = name || pathToTimage;
            this.move = move;
            
            this.bmpAnimation = null;
            this.spriteSheet = null;
            this.container = new createjs.Container();
            this.create(); // Call constructor
            return this;
        };
    }
);
