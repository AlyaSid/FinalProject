function PaintModel() {
    var mirrorMode = false;
    var spiralMode = false;
    var symmetry = 0;
    var pictureView = null;

    var cursorPoints = new Array();

    var background = null;

    this.start = function(view) {
        pictureView = view;
    }

    this.drawCursor = function(x,y) {
        cursorPoints = this.getPoints(x,y);
        pictureView.updateCursor(cursorPoints);

    }

    this.setBackground = function(color) {
        background = color;
        pictureView.changeBackground(color);
    }

    this.getBackground = function() {
        return background;
    }

    this.changeMirrorMode = function() {
        mirrorMode = !mirrorMode;
    }

    this.changeSpiralMode = function() {
        spiralMode = !spiralMode;
    }

    this.getPoints = function(curX, curY) {
        var pointsMassive = new Array();
        var point = new Point();
        point.setX(curX);
        point.setY(curY);
        pointsMassive.push(point);

        if (mirrorMode) {
            var point = new Point();
            point.setX(($(window).width()/2 - (parseInt(curX) - $(window).width()/2))+'px');
            point.setY(curY);
            pointsMassive.push(point);
        }

        return pointsMassive;
    }
}
