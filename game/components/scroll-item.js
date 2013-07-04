/**
 * Item scroller module for jackpot game
 * 
 * dependencies :
 *  - createjs
 * 
 * How to use :
 * ...
 * 
 */

define(
    ["VAR", "createjs"],
    function (VAR)
    {
        
        /**
         * Create a Scroller
         */
        var create = function ()
        {
            var i, b;
            for (i = 0; i < this.arrImage.length; i++) {
                b = new createjs.Bitmap(this.arrImage[i].image);
                b.y = b.image.height * i;
                this.arrBitmap.push(b);
                this.container.addChild(b);
            };
            stage.addChild(this.container);
            this.container.x = this.x;
            this.container.y = this.y;
            this.addMask();
            return this;
        };
        
        /**
         * Add a mask to display only the scroller square 
         */
        var addMask = function ()
        {
            var m,
                g = new createjs.Graphics();
            g.beginFill("#000000").drawRect(this.x, this.y, this.width, this.height);
            m = new createjs.Shape(g);
            this.container.mask = m;
        };
        
        /**
         * animate the items (must be call for the single createJS loop method)
         * @param {Boolean} decreasethis.speed, to tell the scroll to slowly stop
         * @return {Boolean} true if can keep animating
         */
        var animate = function (decreasethisSpeed)
        {
            var decreasethisSpeed = decreasethisSpeed || false;
            if(this.speed < 1) {
                this.container.dispatchEvent(VAR.EVENTS.HAS_SCROLL);
                return false;
            }
            var i, j, max = 0, length = this.arrBitmap.length;
            for (i = 0; i < length; i++) { // update position of each item
                if((this.arrBitmap[i].y + this.arrBitmap[i].image.height) - this.speed < 0) // if one item plus his height is under 0
                    this.arrBitmap[i].y += this.arrBitmap[i].image.height * length;
                this.arrBitmap[i].y -= this.speed;
            };
            if(decreasethisSpeed) this.speed *= .95;
            
            return true;
        };
        
        /**
         * Constructor create a Scrolling item object
         * @param {Int} x
         * @param {Int} y
         * @param {Int} speed
         * @param {Array} arrImage, array of image that will scroll
         * @param {Int} width
         * @param {Int} height
         * @param {Object} container, new createjs.Container()
         */
        return function (x, y, speed, arrImage, width, height, container)
        {
            this.create = create;
            this.addMask = addMask;
            this.animate = animate;
            this.arrBitmap = [];
            this.x = x || 0;
            this.y = y || 0;
            this.arrImage = arrImage;
            this.width = width || 70;
            this.height = height || 120;
            this.container = container || new createjs.Container();
            this.speed = speed || 50;
            this.create(); // Call constructor
            return this;
        };
    }
);
