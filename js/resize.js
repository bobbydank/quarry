var theHeight;
var theWidth;

(function ($) {

    var $container = $('main');

    $(document).ready(function() {
        //sizes
        theHeight = 844;
        theWidth = 1500;
    
        //primary resizing function
        mainResizing();
        $(window).resize(mainResizing);
    });

    function mainResizing() {
        //static vars
        var windowH = $(window).height();
        var windowW = $(window).width();
        var widthRatio = (theHeight * windowW) / theWidth;
    
        //manage portrait
        if ( widthRatio > windowH ) {
            windowW = (theWidth * windowH) / theHeight;
            widthRatio = windowH;
        }

        
        $container.css({
            'width'  : windowW,
            'height' : widthRatio
        });

    }

})(jQuery);