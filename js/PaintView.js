function PaintView() {
    this.changeBackground = function (color) {
        $('#drawPanel, #modePanel').animate({'backgroundColor': color},400);
    };

    this.updateCursor = function(points) {
        $('.cursorPoints').remove();
        for (var i = 0; i < points.length; i++) {
            $('#point').clone().css({
				'display'	: 'block', 
				'left'		: points[i].getX() + $(window).width()/2 - 7 + 'px',
				'top'		: - points[i].getY() + $(window).height()/2 - 7 + 'px'
			}).addClass('cursorPoints').appendTo('body');
        }
    };

    this.clear = function() {
        $('canvas').clearCanvas();
    };

    this.updateArrays = function(from, to) {
        for (var i = 0; i < from.length; i++) {
            $('canvas').drawLine({
                strokeStyle: from[i].getColor(),
                strokeWidth: 7,
                rounded: true,
                x1: from[i].getX() + $(window).width()/2 - 7, y1: - from[i].getY() + $(window).height()/2 - 7,
                x2: to[i].getX() + $(window).width()/2 - 7, y2: - to[i].getY() + $(window).height()/2 - 7
            });
        }
    };

    this.updateLines = function(line) {
        for (var i = 0; i < line.length; i++) {
            $('canvas').drawLine({
                strokeStyle: line[i].getColor(),
                strokeWidth: 7,
                rounded: true,
                x1: line[i].getStartPoint().getX() + $(window).width()/2 - 7, y1: - line[i].getStartPoint().getY() + $(window).height()/2 - 7,
                x2: line[i].getEndPoint().getX() + $(window).width()/2 - 7, y2: - line[i].getEndPoint().getY() + $(window).height()/2 - 7
            });
        }
    };
}
