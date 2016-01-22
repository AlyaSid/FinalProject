function Line(){
    var startPoint;
    var endPoint;
    var color = '#FFFFFF';

    this.getStartPoint = function() {
        return startPoint;
    };

    this.getEndPoint = function() {
        return endPoint;
    };

    this.getColor = function() {
        return color;
    };

    this.setStartPoint = function(startPointNew) {
        startPoint = startPointNew;
    };

    this.setEndPoint = function(endPointNew) {
        endPoint = endPointNew;
    };

    this.setColor = function(colorNew) {
        color = colorNew;
    };

}
