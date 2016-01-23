function PaintModel() {
    var mirrorMode = false,
        spiralMode = false,
	    spiralModePointCount = 4,
        symmetry = 0,
        pictureView = null,
        backgroundColor = "#000000",
        penColor = "rgb(255, 255, 255)",
        cursorColor = "#0ac1cd",
	    prevPoint = null;

    this.start = function(view) {
        pictureView = view;
    };

    this.drawCursor = function(x,y) {
        pictureView.updateCursor(this.getPoints(x,y, cursorColor));
    };

    this.drawPoints = function(x,y) {
        pictureView.updateArrays(this.getPoints(prevPoint.getX(), prevPoint.getY(), penColor), this.getPoints(x, y, penColor));
		prevPoint.setX(x);
		prevPoint.setY(y);
        prevPoint.setColor(penColor);
    };

    this.getBackgroundColor = function() {
        return backgroundColor;
    }
    this.setBackgroundColor = function(color) {
        backgroundColor = color;
        pictureView.changeBackground(color);
    };
    this.setPenColor = function(color) {
        penColor = color;
    };

    this.setSymmetry = function(num) {
        symmetry = num;
    };
    this.changeMirrorMode = function() {
        mirrorMode = !mirrorMode;
    };
    this.changeSpiralMode = function() {
        spiralMode = !spiralMode;
    };
	this.setPrevPoint = function(point) {
		prevPoint = point;
        prevPoint.setColor(penColor);
	};
	this.resetPrevPoint = function() {
		prevPoint = null;
	};

    this.getPoints = function(curX, curY, color) {
        var points = [];
        var newPoints = [];
        var point = new Point();
        point.setColor(color);

        point.setX(curX);
        point.setY(curY);
        points.push(point);

        if (spiralMode) {
            for (var i = 0; i < points.length; i++) {
                var x = points[i].getX();
                var y = points[i].getY();

                var r = this.getPolarR(x, y);
                var theta = this.getPolarTheta(x, y);

                var k = r * 2 / Math.PI;

                var j = 1;
                var sum = this.arithmeticSum(spiralModePointCount);
                while (j <= spiralModePointCount) {
                    var angle = this.arithmeticSum(j) * (Math.PI / 2) / sum;
                    var curR = k * angle;
                    var curTheta = theta - (Math.PI / 2 - angle);
                    if (curTheta != theta) {
                        var point = new Point();
                        point.setColor(color);
                        point.setX(this.getCartesianX(curR, curTheta));
                        point.setY(this.getCartesianY(curR, curTheta));
                        newPoints.push(point);
                    }
                    j++;
                }
            }
        }
        points = points.concat(newPoints);

        newPoints = [];
        for (var i = 0; i < points.length; i++) {
            var x = points[i].getX();
            var y = points[i].getY();

            var r = this.getPolarR(x, y);
            var theta = this.getPolarTheta(x, y);

            for (var j = 0; j < symmetry-1; j++) {
                var point = new Point();
                point.setColor(color);
                theta = theta - (2 * Math.PI / symmetry);
                point.setX(this.getCartesianX(r, theta));
                point.setY(this.getCartesianY(r, theta));
                newPoints.push(point);
            }
        }
        points = points.concat(newPoints);
		
		newPoints = [];
        if (mirrorMode) {
			for (var i = 0; i < points.length; i++) {
				var point = new Point();
                point.setColor(color);
				point.setX(-points[i].getX());
				point.setY(points[i].getY());
				newPoints.push(point);
			}
        }
		points = points.concat(newPoints);

        return points;
    };

	this.getCartesianX = function(r, theta) {
		return r * Math.cos(theta);
	};
	this.getCartesianY = function(r, theta) {
		return r * Math.sin(theta);
	};
	this.getPolarR = function(x, y) {
		return Math.sqrt(x*x + y*y);
	};
	this.getPolarTheta = function(x, y) {
		return Math.atan2(y, x);
	};
	this.arithmeticSum = function(n) {
		return (1 + n) * n / 2;
	};
}
