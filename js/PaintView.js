function PaintView() {
    this.changeBackground = function (color) {
        $('#drawPanel').animate({'backgroundColor': color},400);
    }
}
