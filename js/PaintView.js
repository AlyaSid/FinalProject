function PaintView() {
    this.changeBackground = function (color) {
        $('#drawPanel').animate({'backgroundColor': color},400);
    }

    this.updateCursor = function(points) {
        $('.cursorPoints').remove();
        for (var i = 0; i < points.length; i++) {
            $('#point').clone().css({'display': 'block', 'left': ((points[i].getX() + $(window).width()/2) + 'px'), 'top': ((points[i].getY()+ $(window).height()/2) + 'px')}).addClass('cursorPoints').appendTo('body');
        }
    }

    this.update = function(points) {
        for (var i = 0; i < points.length; i++) {
            console.log(points[i].getColor());
            $('#point').clone().css({'backgroundColor': (points[i].getColor()),'display': 'block', 'left': ((points[i].getX() + $(window).width()/2) + 'px'), 'top': ((points[i].getY()+ $(window).height()/2) + 'px')}).addClass('picturePoints').appendTo('body');
        }
    }
}
