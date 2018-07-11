

global.jQuery = require('jquery');

(function ( $ ) {
 
    $.fn.crazeCarousel = function(options) {
 
        var settings = $.extend({
            autoRotate: true,
            autoRotateMilisseconds: 4000,
            transitionMilisseconds: 1000
        }, options);

        var self = this;
        var children = $(this).children(".craze-carousel-item");
        var currentIndex = 0;
        var nextIndex = 1;

        var addOnClickEventToLeftArrow = function() {
            $(".craze-carousel_arrow-left-container").on("click", onClickedLeft);
        }

        var addOnClickEventToRightArrow = function() {
            $(".craze-carousel_arrow-right-container").on("click", onClickedRight);
        }

        var onClickedLeft = function() {
            settings.autoRotate = false;
            rotateToPreviousImage();
        }

        var onClickedRight = function() {
            settings.autoRotate = false;
            rotateToNextImage();
        }

        var rotateToPreviousImage = function() {
            let prevIndex = currentIndex - 1;
            if (prevIndex < 0) nextIndex = children.length-1;
            rotateToImageWithIndex(prevIndex);
        }

        var rotateToNextImage = function() {
            let nextIndex = currentIndex + 1;
            if (nextIndex > children.length-1) nextIndex = 0;
            rotateToImageWithIndex(nextIndex);
        }

        var rotateToImageWithIndex = function(index) {
            if (children.length > 1) {
                for (var i = 0; i < children.length; i++) {
                    $(children[i]).animate(
                        {
                            left: (-1 * (index) * 100) + '%'
                        }, 
                        { 
                            duration: settings.transitionMilisseconds, 
                            queue: false 
                        }
                    );
                }

                currentIndex = index;
                setActiveCircleToIndex(currentIndex);
            }
        }

        var autoRotate = function() {
            if (settings.autoRotate) 
                rotateToNextImage();
        }

        var setActiveCircleToIndex = function(index) {

            let circles = $(self).children(".craze-carousel_circles-container").children(".craze-carousel_circle");

            for (var i = 0; i < circles.length; i++) {
                if ($(circles[i]).attr('id') === ("circle_"+index)) {
                    $(circles[i]).addClass("craze-carousel_circle-active");
                }
                else {
                    $(circles[i]).removeClass("craze-carousel_circle-active");
                }
            }
        }

        var addOnClickEventsToCircles = function() {

            let circles = $(self).children(".craze-carousel_circles-container").children(".craze-carousel_circle");

            for (let i = 0; i < circles.length; i++) {
                $(circles[i]).on("click", onClickedCircle);
            }
        }

        var onClickedCircle = function() {
            let id = $(this).attr("id");
            let index = id[id.length-1];
            settings.autoRotate = false;
            rotateToImageWithIndex(index);
        }

        var addArrowsToCarousel = function() {
            $(self).append("<div class=\"craze-carousel_arrow-left-container\"><span class=\"glyphicon glyphicon-chevron-left craze-carousel_arrow\"></span></div><div class=\"craze-carousel_arrow-right-container\"><span class=\"glyphicon glyphicon-chevron-right craze-carousel_arrow\"></span></div>\")")

            addOnClickEventToLeftArrow();
            addOnClickEventToRightArrow();
        }()

        var addCirclesToCarousel = function() {
            $(self).append("<div class=\"craze-carousel_circles-container\"></div>")

            for (let i = 0; i < children.length; i++) {
                $(self).children(".craze-carousel_circles-container").append("<div id=\"circle_" + i + "\" class=\"craze-carousel_circle\"></div>")
            }

            setActiveCircleToIndex(0);
            addOnClickEventsToCircles();
        }()

        setInterval(autoRotate, settings.autoRotateMilisseconds + settings.transitionMilisseconds);
        
        return this;
    };
}( jQuery ));