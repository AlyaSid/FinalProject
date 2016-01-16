function PaintModel() {
    var mirrorMode = false;
    var spiralMode = false;

    var background;

    this.setBackground = function(color) {
        background = color;
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
