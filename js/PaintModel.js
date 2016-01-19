function PaintModel() {
    var mirrorMode = false;
    var spiralMode = false;
	var spiralModePointCount = 4;
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

    this.setSymmetry = function(num) {
        symmetry = num;
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
        var newPoints = new Array();
        var point = new Point();

        point.setX(curX);
        point.setY(curY);
        pointsMassive.push(point);

        if (spiralMode) {
            for (var i = 0; i < pointsMassive.length; i++) {
                var x = pointsMassive[i].getX();
                var y = pointsMassive[i].getY();

                var r = this.getPolarR(x, y);
                var theta = this.getPolarTheta(x, y);

                var k = r * 2 / Math.PI;

                var i = 1;
                var sum = this.arithmeticSum(spiralModePointCount);
                while (i <= spiralModePointCount) {
                    var angle = this.arithmeticSum(i) * (Math.PI / 2) / sum;
                    var curR = k * angle;
                    var curTheta = theta - (Math.PI / 2 - angle);
                    var point = new Point();
                    point.setX(this.getCartesianX(curR, curTheta));
                    point.setY(this.getCartesianY(curR, curTheta));
                    newPoints.push(point);
                    i++;
                }
            }
        }
        pointsMassive = pointsMassive.concat(newPoints);

        newPoints = new Array();
        for (var i = 0; i < pointsMassive.length; i++) {
            var x = pointsMassive[i].getX();
            var y = pointsMassive[i].getY();

            var r = this.getPolarR(x, y);
            var theta = this.getPolarTheta(x, y);

            for (var j = 0; j < symmetry-1; j++) {
                var point = new Point();
                theta = theta - (2 * Math.PI / symmetry);
                point.setX(this.getCartesianX(r, theta));
                point.setY(this.getCartesianY(r, theta));
                newPoints.push(point);
            }
        }
        pointsMassive = pointsMassive.concat(newPoints);
		
		newPoints = new Array();
        if (mirrorMode) {
			for (var i = 0; i < pointsMassive.length; i++) {
				var point = new Point();
				point.setX(-pointsMassive[i].getX());
				point.setY(pointsMassive[i].getY());
				newPoints.push(point);
			}
        }
		pointsMassive = pointsMassive.concat(newPoints);

        return pointsMassive;
    }

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

	this.getCartesianX = function(r, theta) {
		return r * Math.cos(theta);
	}
	this.getCartesianY = function(r, theta) {
		return r * Math.sin(theta);
	}

	this.getPolarR = function(x, y) {
		return Math.sqrt(x*x + y*y);
	}
	this.getPolarTheta = function(x, y) {
		return Math.atan2(y, x);
	}

	this.arithmeticSum = function(n) {
		return (1 + n) * n / 2;
	}
}
