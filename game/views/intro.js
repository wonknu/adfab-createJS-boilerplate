/**
 * Intro module
 * 
 * dependencies :
 *  - createjs
 * 
 * How to use :
 * introView.render(stage);
 * 
 */

define(
    ['VAR', 'button'],
    function (VAR, button)
    {
        var buttonPlay = null;
        
        /**
         * Render something on the screen
         */
        var render = function ()
        {
            var btnWidth = 100,
            btnHeight = 25;
            
            buttonPlay = new button(
                (VAR.CANVAS.WIDTH * .5) - (btnWidth * .5),
                (VAR.CANVAS.HEIGHT * .5) - (btnHeight * .5),
                btnWidth,
                btnHeight,
                "#000"
            );
            buttonPlay.addText("Play", "700 small-caps 20px/2 Arial, sans-serif", "#FFF", "center").display();
            
            buttonPlay.container.onPress = function (evt)
            {
                remove();
            };
        };
        
        /**
         * Remove intro UI and send starting game event
         */
        var remove = function ()
        {
            buttonPlay.remove();
            stage.dispatchEvent(VAR.EVENTS.START_GAME);
        };
        
        return {
            render: render
        };
    }
);
