function Point(){
	var x;
	var y;
	var color = '#FFFFFF';

	this.getX = function() {
		return x;
	}

	this.getY = function() {
		return y;
	}

	this.getColor = function() {
		return color;
	}

	this.setX = function(xNew) {
		x = xNew;
	}

	this.setY = function(yNew) {
		y = yNew;
	}

	this.setColor = function(colorNew) {
		color = colorNew;
	}

}

