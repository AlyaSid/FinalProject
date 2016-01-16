function PaintModel() {
    var mirrorMode = false;
    var spiralMode = false;
    var pictureview = null;

    var background = null;

    this.start = function(view) {
        pictureview = view;
    }

    this.setBackground = function(color) {
        background = color;
        pictureview.changeBackground(color);
    }

    this.getBackground = function() {
        return background;
    }

    this.changeMirrorMode = function() {
        mirrorMode = !mirrorMode;
        console.log(mirrorMode);
    }

    this.changeSpiralMode = function() {
        spiralMode = !spiralMode;
        console.log(spiralMode);
    }
}
