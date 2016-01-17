function PaintView() {
    this.changeBackground = function (color) {
        $('#drawPanel').animate({'backgroundColor': color},400);
    }

    this.updateCursor = function(points) {
        $('.cursorPoints').remove();
        for (var i = 0; i < points.length; i++) {
            $('#point').clone().css({'display': 'block', 'left': (points[i][0]), 'top': (points[i][1])}).addClass('cursorPoints').appendTo('body');
        }
    }
}
