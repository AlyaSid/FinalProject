function PaintModel() {
    var mirrorMode = false;
    var spiralMode = false;
    var symmetry = 0;
    var pictureView = null;

    var cursorPoints = new Array();
    var picturePoints = new Array();
    var background = null;
	
	var prevPoint = null;

    this.start = function(view) {
        pictureView = view;
    }

    this.drawCursor = function(x,y) {
        cursorPoints = this.getPoints(x,y);
        pictureView.updateCursor(cursorPoints);
    }

    this.drawPoints = function(x,y) {
		//picturePoints = this.getPoints(x,y);
		//pictureView.update(picturePoints);
		// рисуем не только саму точку, а точки между предыдущей нарисованной точкой и текущей, чтобы заполнить пробел
		this.plotLine(prevPoint.getX(), prevPoint.getY(), x, y, 1);
		prevPoint.setX(x);
		prevPoint.setY(y);
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
	
	this.setPrevPoint = function(point) {
		prevPoint = point;
	}
	
	this.resetPrevPoint = function() {
		prevPoint = null;
	}

    this.getPoints = function(curX, curY) {
        var pointsMassive = new Array();
        var point = new Point();
        point.setX(curX);
        point.setY(curY);
        pointsMassive.push(point);

        if (mirrorMode) {
            var point = new Point();
            point.setX(($(window).width()/2 - (parseInt(curX) - $(window).width()/2)));
            point.setY(curY);
            pointsMassive.push(point);
        }

        return pointsMassive;
    }
	
	// Алгоритм Брезенхейма
	this.plotLine = function(x0, y0, x1, y1, step)
	{
		
		var dx = Math.abs(x1-x0);
		var dy = Math.abs(y1-y0);
		var sx = (x0 < x1) ? 1 : -1;
		var sy = (y0 < y1) ? 1 : -1;
		var err = dx-dy;

		while(true){
			picturePoints = this.getPoints(x0,y0);
			console.log('x ' + x0);
			console.log('y ' + y0);
			pictureView.update(picturePoints);

			if ((x0==x1) && (y0==y1)) break;
			var e2 = 2*err;
			if (e2 >-dy){ err -= dy; x0  += sx; }
			if (e2 < dx){ err += dx; y0  += sy; }
		}
	}
}
