function PaintModel() {
    var mirrorMode = false,
        spiralMode = false,
	    spiralModePointCount = 4,
        symmetry = 0,
        pictureView = null,
        cursorPoints = [],
        picturePoints = [],
        background = null,
        penColor = "rgb(255, 255, 255)",
	    prevPoint = null,
        lineArray = [],
        linesGroup = [],
        lastLine = null;

    this.start = function(view) {
        pictureView = view;
    };

    this.drawCursor = function(x,y) {
        cursorPoints = this.getPoints(x,y);
        pictureView.updateCursor(cursorPoints);
    };

    this.drawPoints = function(x,y) {

        //var startPoints = this.getPoints(prevPoint.getX(), prevPoint.getY());
        //var endPoints = this.getPoints(x, y);
        //
        //for (var i = 0; i < startPoints.length; i++) {
        //    var line = new Line();
        //    line.setStartPoint(startPoints[i]);
        //    line.setEndPoint(endPoints[i]);
        //    line.setColor(penColor);
        //    lineArray = lineArray.concat(line);
        //}

        pictureView.updateArrays(this.getPoints(prevPoint.getX(), prevPoint.getY()), this.getPoints(x, y));
		prevPoint.setX(x);
		prevPoint.setY(y);
        prevPoint.setColor(penColor);
    };

    this.memoryClear = function () {
        linesGroup = [];
    }

    this.reDraw = function() {
        pictureView.updateArrays(linesGroup);
    };

    this.undo = function() {
        pictureView.clear();
        var numLast = lastLine.length;
        var num = linesGroup.length;
        linesGroup.splice(num - numLast, numLast);
        this.reDraw();
    }

    this.redo = function () {
        pictureView.clear();
        linesGroup = linesGroup.concat(lastLine);
        pictureView.updateArrays(linesGroup);
    };

    this.setLastLine = function() {
        linesGroup = linesGroup.concat(lineArray);
        lastLine = lineArray;
        lineArray = [];
    };

    this.setBackground = function(color) {
        background = color;
        pictureView.changeBackground(color);
    };

    this.setPenColor = function(color) {
        penColor = color;
    };

    this.getBackground = function() {
        return background;
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

    this.getPoints = function(curX, curY) {
        var pointsMassive = new Array();
        var newPoints = new Array();
        var point = new Point();
        point.setColor(penColor);

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
                    if (curTheta != theta) {
                        var point = new Point();
                        point.setColor(penColor);
                        point.setX(this.getCartesianX(curR, curTheta));
                        point.setY(this.getCartesianY(curR, curTheta));
                        newPoints.push(point);
                    }
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
                point.setColor(penColor);
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
                point.setColor(penColor);
				point.setX(-pointsMassive[i].getX());
				point.setY(pointsMassive[i].getY());
				newPoints.push(point);
			}
        }
		pointsMassive = pointsMassive.concat(newPoints);

        return pointsMassive;
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
