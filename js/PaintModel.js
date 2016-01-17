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
        var pointPair = new Array();
        pointPair.push(curX);
        pointPair.push(curY);
        pointsMassive.push(pointPair);

        if (mirrorMode) {
            var pointPair = [];
            pointPair.push(($(window).width()/2 - (parseInt(curX) - $(window).width()/2))+'px');
            pointPair.push(curY);
            pointsMassive.push(pointPair);
        }

        return pointsMassive;
    }
}
