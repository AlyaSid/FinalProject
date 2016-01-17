function PaintView() {
    this.changeBackground = function (color) {
        $('#drawPanel').animate({'backgroundColor': color},400);
    }

    this.updateCursor = function(x,y) {
        $('#point').css({'display':'block', 'left': x, 'top':y});
    }
}
