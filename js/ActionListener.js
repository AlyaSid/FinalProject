var pictureView = new PaintView();
var picture = new PaintModel();
picture.start(pictureView);

var AjaxHandlerScript = "http://fe.it-academy.by/AjaxStringStorage2.php";
var pictures;
var updatePassword;

$(window).resize(function () {
    handleBuffer();
    pictureView.resizeAndRedraw();
});

var undo = false;
var handleBuffer = function() {
    if (!undo) {
        pictureView.flushBuffer();
    }
    var $undo = $('#undo');
    $undo.find('span').text('Undo');
    $undo.find('i').removeClass("flip-icon");

    undo = false;
    pictureView.clearBuffer();
    pictureView.showBuffer();
};

$(window).load(function () {
    pictureView.resize();

    $("<div></div>").attr('id', 'point').appendTo('body');

    var isDown,
        $cursorPanel = $('#cursorPanel'),
        $controls = $('#fullScreen, #save, #undo, #new, #open'),
        $control = $('#control');

    $cursorPanel.mousedown(
        function(event) {
            handleBuffer();

            isDown = true;
            var point = new Point();
            point.setX(event.clientX - $(window).width()/2);
            point.setY(- event.clientY + $(window).height()/2) ;
            picture.setPrevPoint(point);
        }
    );

    $cursorPanel.mousemove(function (event) {
        var posCursorX = (event.clientX - $(window).width()/2);
        var posCursorY = (- event.clientY + $(window).height()/2);
        if (isDown) {
            picture.drawPoints(posCursorX, posCursorY);
        }
        picture.drawCursor(posCursorX, posCursorY);
    });

    $cursorPanel.mouseup(
        function() {
            isDown = false;
            picture.resetPrevPoint();
        }
    );

    $controls.mousemove( function (event){
        event.stopPropagation();
        pictureView.clearCursor();
    });

    $controls.hover(
        function() {
            $(this)
                .stop()
                .queue('fx',
                    function() {
                        $(this)
                            .find('i').animate({color: '#EEEEEE'},300)
                            .end()
                            .find('span').fadeIn(300)
                            .dequeue('fx');
                    });
        },
        function() {
            $(this)
                .stop()
                .queue('fx',
                    function() {
                        $(this)
                            .find('i').animate({color: '#2F4F4F'},300)
                            .end()
                            .find('span').fadeOut(300)
                            .dequeue('fx');
                    });
        });

    $control.mousemove( function (event){
        event.stopPropagation();
        pictureView.clearCursor();
    });

    $control.hover(
        function() {
            $(this)
                .stop()
                .queue('fx',
                    function() {
                        $(this)
                            .find('i').animate({color: '#EEEEEE'},300)
                            .end()
                            .find('span').css('left','7px').fadeIn(300)
                            .dequeue('fx');
                    });
        },
        function() {
            $(this)
                .stop()
                .queue('fx',
                    function() {
                        $(this)
                            .find('i').animate({color: '#00BFFF'},300)
                            .end()
                            .find('span').fadeOut(300)
                            .dequeue('fx');
                    });
        });

    $('#modePanel').mousemove( function (event){
        event.stopPropagation();
        pictureView.clearCursor();
    });

    $('#backgroundColors div, #penColors div').hover(
        function() {
            var newWidth = ($(this).width() * 1.1) + 'px';
            var newHeight = ($(this).height() * 1.1) + 'px';
            $(this).css({opacity: 1, width: newWidth, height: newHeight});
        },
        function() {
            var newWidth = ($(this).width() / 1.1) + 'px';
            var newHeight = ($(this).height() / 1.1) + 'px';
            $(this).css({opacity: 0.7, width: newWidth, height: newHeight});
        });

    $('#backgroundColors').find('div').click(
        function() {
            var color = $(this).css('backgroundColor');
            picture.setBackgroundColor(color);
        }
    );

    $('#penColors').find('div').click(
        function() {
            var color = $(this).css('backgroundColor');
            picture.setPenColor(color);
        }
    );

    $('#mirrorMode, #spiralMode').hover(
        function() {
            $(this)
                .stop()
                .queue('fx',
                    function() {
                        $(this).animate({color: '#EEEEEE'},200).dequeue('fx');;
                    });
        },
        function() {
            $(this)
                .stop()
                .queue('fx',
                    function() {
                        $(this).animate({color: '#696969'},200).dequeue('fx');;
                    });
        });

    $('#mirrorMode').click(
        function() {
            $(this).find('.state-on, .state-off').toggle();
            picture.changeMirrorMode();
        });

    $('#spiralMode').click(
        function() {
            $(this).find('.state-on, .state-off').toggle();
            picture.changeSpiralMode();
        });

    $control.click(
        function() {
            $(this)
                .stop(true)
                .queue('fx',
                    function(){
                        $('#modePanel')
                            .fadeToggle(300)
                            .dequeue('fx');
                    });
        }
    );

    $('#modePanel').mouseleave(
        function() {
            $('#modePanel').fadeOut(300);
        }
    );

    $('#fullScreen').click(function() {
        if ($('#fullScreen').hasClass('fullScreenOff')) {
            $('body').fullscreen();
            $('#fullScreen').removeClass('fullScreenOff');
            return false;
        } else {
            $.fullscreen.exit();
            $('#fullScreen').addClass('fullScreenOff');
            return false;
        }
    });

    $('#symmetry').slider({
        min: 1, max: 6,
        slide: function (event, ui) {
            if (1 == ui.value) {
                $('#symmetryValue').text('No fold rotational symmetry');
                picture.setSymmetry(0);
            } else {
                $('#symmetryValue').text(ui.value + '-fold rotational symmetry');
                picture.setSymmetry(ui.value);
            }
        }
    });
    $('#symmetryValue').text('No fold rotational symmetry');

    $('#undo').click(
        function() {
            if ($(this).find('span').text() === 'Undo') {
                undo = true;
                pictureView.hideBuffer();
                $(this).find('span').text('Redo');
                $(this).find('i').addClass("flip-icon");
            } else {
                undo = false;
                pictureView.showBuffer();
                $(this).find('span').text('Undo');
                $(this).find('i').removeClass("flip-icon");
            }
        }
    );

    var userText = $('<div/>', {
        id: 'userText'
    });
    $('body').append(userText);

    var clear = function(){
        handleBuffer();
        pictureView.clear();
        userText.text('You can use SPACE to start a new.');
        userText.css({'left': $(window).innerWidth()/2 - userText.width()/2, 'top': $(window).innerHeight()/2});
        userText
            .animate({
                'opacity': 1
            }, 1000)
            .animate({
                'opacity': 0,
            }, 1000)
    };

    $('#new').click(
        function() {
            clear();
        }
    );

    $(window).keypress(
        function(e) {
            if (e.keyCode == 32) {
                clear();
            }
        });

    var image,
        imageName,
        imageBackground,
        ctx,
        imageHeight,
        imageWidth;

    $('#dialog-save').dialog({
        autoOpen:false,
        resizable: false,
        width:350,
        modal: true,
        buttons:
            [
                { text:'Locally',
                    click:function(event) {
                        handleBuffer();
                        $('#name').removeClass( "ui-state-error" );
                        var aDownload = document.getElementById("download");
                        aDownload.href = pictureView.drawPanelToImage(picture.getBackgroundColor());
                        var pictureName = $('#name').val();
                        if (pictureName == '') {
                            $('#name').addClass( "ui-state-error" );
                            $('.validate').text('Please enter the name');
                            event.preventDefault();
                        } else {
                            aDownload.download = pictureName + '.png';
                            aDownload.click();
                            $( this ).dialog( "close" );
                        }
                    }
                },
                {text:'Remote',
                    click:function() {
                        $('#name').removeClass( "ui-state-error" );
                        imageName = $('#name').val();
                        if (imageName == '') {
                            $('#name').addClass( "ui-state-error" );
                            $('.validate').text('Please enter the name');
                            event.preventDefault();
                        } else {
                            image = pictureView.drawPanelToImage();
                            imageBackground = picture.getBackgroundColor();

                            ctx = $('#drawPanelMain')[0].getContext('2d');
                            imageHeight = ctx.canvas.height;
                            imageWidth = ctx.canvas.width;

                            sendPicture();

                            $( this ).dialog( "close" );
                        }
                    }
                },
                {text:'Cancel',
                    click:function() {
                        $( this ).dialog( "close" );
                    }
                }
            ]
    });

    function sendPicture()
    {
        updatePassword = Math.random();
        $.ajax(
            {
                url : AjaxHandlerScript,
                type : 'POST',
                data : { f : 'LOCKGET', n : 'ALYA_PICTURE_GALLERY',
                    p : updatePassword },
                cache : false,
                success : addPicture,
                error : errorHandler
            }
        );
    }

    function addPicture(result)
    {
        if ( result.error!=undefined )
            alert(result.error);
        else
        {
            pictures = [];
            if ( result.result != "" )
            {
                pictures = JSON.parse(result.result);
            }

            pictures.push( {name:imageName, image: image, background: imageBackground, width: imageWidth, height: imageHeight});

            $.ajax(
                {
                    url : AjaxHandlerScript,
                    type : 'POST',
                    data : { f : 'UPDATE', n : 'ALYA_PICTURE_GALLERY',
                        v : JSON.stringify(pictures), p : updatePassword },
                    cache : false,
                    success : updateReady,
                    error : errorHandler
                }
            );
        }
    }

    function updateReady(result)
    {
        if ( result.error!=undefined )
            console.log(result.error);
    }

    function errorHandler(jqXHR, statusStr, errorStr)
    {
        console.log(statusStr + ' ' + errorStr);
    }

    function refreshList()
    {
        $.ajax(
            {
                url : AjaxHandlerScript,
                type : 'POST',
                data : { f : 'READ', n : 'ALYA_PICTURE_GALLERY' },
                cache : false,
                success : readReady,
                error : errorHandler
            }
        );
    }

    function escapeHTML(text)
    {
        if ( !text )
            return text;
        text=text.toString()
            .split("&").join("&amp;")
            .split("<").join("&lt;")
            .split(">").join("&gt;")
            .split('"').join("&quot;")
            .split("'").join("&#039;");
        return text;
    }


    function readReady(result)
    {
        if ( result.error!=undefined )
            alert(result.error);
        else
        {
            pictures = [];
            if ( result.result!="" )
            {
                pictures = JSON.parse(result.result);
            }

            var list = '';
            for ( var i = 0; i < pictures.length; i++ )
            {
                var picture = pictures[i];
                list += escapeHTML(picture.name) + "<br />";
            }
            $('#pictureList').html(list);
        }
    }

    $("#save").click(function(e) {
        e.preventDefault();
        $('#dialog-save').dialog('open');
    });

    $("#open").click(function(e) {
        e.preventDefault();
        refreshList();
        $('#dialog-open').dialog('open');
    });

    $('#dialog-open').dialog({
        autoOpen:false,
        resizable: false,
        width:350,
        modal: true,
        buttons:
            [
                { text:'Ok',
                    click:function(event) {
                        handleBuffer();
                        imageName = $('#fileName').val();
                        var picture;
                        for (var i = 0; i < pictures.length; i++) {
                            if(pictures[i].name == imageName) {
                                picture = pictures[i];
                            }
                        }
                        var img = new Image();
                        var $drawPanelMain = $('#drawPanelMain');
                        var ctx = $drawPanelMain[0].getContext('2d');
                        var prevHeight = ctx.canvas.height;
                        var prevWidth = ctx.canvas.width;

                        img.onload = function() {
                            document.getElementById("drawPanelMain")
                                .getContext("2d")
                                .drawImage(this , - (prevWidth - picture.width) / 2, - (prevHeight - picture.height) / 2);
                        };

                        img.src = picture.image;
                        $(this).dialog( "close" );
                    }
                },
                {text:'Cancel',
                    click:function() {
                        $( this ).dialog( "close" );
                    }
                }
            ]
    });

});