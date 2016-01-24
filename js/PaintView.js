function PaintView() {

    this.changeBackground = function (color) {
        $('#drawPanelMain, #modePanel').animate({'backgroundColor': color},400);
    };

    this.resize = function() {
        var width = $(window).width();
        var height = $(window).height();

        var ctx = $('#cursorPanel')[0].getContext('2d');
        ctx.canvas.height = height;
        ctx.canvas.width = width;

        ctx = $('#drawPanel')[0].getContext('2d');
        ctx.canvas.height = height;
        ctx.canvas.width = width;

        ctx = $('#drawPanelMain')[0].getContext('2d');
        ctx.canvas.height = height;
        ctx.canvas.width = width;
    };

    this.getDimensions = function() {
        ctx = $('#drawPanelMain')[0].getContext('2d');
        var dimension = [];
        dimension.push(ctx.canvas.height);
        dimension.push(ctx.canvas.width);

        return dimension;
    };

    this.openImage = function(image) {
        var img = new Image();
        var $drawPanelMain = $('#drawPanelMain');
        var ctx = $drawPanelMain[0].getContext('2d');
        var prevHeight = ctx.canvas.height;
        var prevWidth = ctx.canvas.width;

        img.onload = function() {
            document.getElementById("drawPanelMain")
                .getContext("2d")
                .drawImage(this, (prevWidth - image.width) / 2, (prevHeight - image.height) / 2);
        };

        img.src = image.image;
    }

    this.resizeAndRedraw = function() {
        var $drawPanelMain = $('#drawPanelMain');
        var ctx = $drawPanelMain[0].getContext('2d');
        var prevHeight = ctx.canvas.height;
        var prevWidth = ctx.canvas.width;

        var width = $(window).width();
        var height = $(window).height();

        var xDelta = prevWidth > width ? (prevWidth - width) / 2 : 0;
        var yDelta = prevHeight > height ? (prevHeight - height) / 2 : 0;

        var imageData = ctx.getImageData(xDelta, yDelta, Math.min(width, prevWidth), Math.min(height, prevHeight));

        this.resize();

        ctx = $drawPanelMain[0].getContext('2d');
        ctx.putImageData(imageData,
            prevWidth > width ? 0 : (width - prevWidth) / 2,
            prevHeight > height ? 0 : (height - prevHeight) / 2
        );
    };



    this.clear = function() {
        $('#drawPanelMain').clearCanvas();
        $('#drawPanel').clearCanvas();
    };

    this.clearCursor = function() {
        $("#cursorPanel").clearCanvas();
    };

    this.clearBuffer = function() {
        $('#drawPanel').clearCanvas();
    };

    this.flushBuffer = function() {
        var c = document.getElementById("drawPanel");
        var cMain = document.getElementById("drawPanelMain");
        var ctxMain = cMain.getContext('2d');
        ctxMain.drawImage(c, 0, 0);
    };

    this.hideBuffer = function() {
        $('#drawPanel').css('display', 'none');
    };

    this.showBuffer = function() {
        $('#drawPanel').css('display', 'block');
    };

    this.updateCursor = function(points) {
        var $cursorPanel = $("#cursorPanel");
        $cursorPanel.clearCanvas();
        for (var i = 0; i < points.length; i++) {
            $cursorPanel.drawArc({
                fillStyle: points[i].getColor(),
                x: points[i].getX() + $(window).width()/2, y: - points[i].getY() + $(window).height()/2,
                radius: 4
            });
        }
    };

    this.updateArrays = function(from, to) {
        var $drawPanel = $('#drawPanel');
        for (var i = 0; i < from.length; i++) {
            $drawPanel.drawLine({
                strokeStyle: from[i].getColor(),
                strokeWidth: 7,
                rounded: true,
                x1: from[i].getX() + $(window).width()/2, y1: - from[i].getY() + $(window).height()/2,
                x2: to[i].getX() + $(window).width()/2, y2: - to[i].getY() + $(window).height()/2
            });
        }
    };

    this.drawPanelToImage = function(backgroundColor)
    {
        var canvas = document.getElementById("drawPanelMain");
        var context = canvas.getContext("2d");
        var w = canvas.width;
        var h = canvas.height;

        var data;

        if(backgroundColor)
        {
            data = context.getImageData(0, 0, w, h);
            var compositeOperation = context.globalCompositeOperation;
            context.globalCompositeOperation = "destination-over";
            context.fillStyle = backgroundColor;
            context.fillRect(0,0,w,h);
        }

        var imageData = canvas.toDataURL("image/png");

        if(backgroundColor)
        {
            context.clearRect (0,0,w,h);
            context.putImageData(data, 0,0);
            context.globalCompositeOperation = compositeOperation;
        }

        return imageData;
    };
}
