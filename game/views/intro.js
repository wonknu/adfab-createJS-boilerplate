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
    ['VAR', 'buttonImage'],
    function (VAR, buttonImage)
    {
        var buttonPlay = null;
        
        /**
         * Render something on the screen
         */
        var render = function ()
        {
            buttonPlay = new buttonImage(
                (VAR.CANVAS.WIDTH * .5),
                (VAR.CANVAS.HEIGHT * .5),
                IMGS.btn_play
            );
            buttonPlay.display();
            
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
