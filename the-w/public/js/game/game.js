$(document).ready(function () {
    var player = $("#player");

    function movePlayer(key, player, left) {
        player.css({
            left: left + "px",
            position: "relative",
        });
        if (key == 68) {
            player.removeClass("flipped-left");
            player.addClass("flipped-right");
        } else {
            player.removeClass("flipped-right");
            player.addClass("flipped-left");
        }
    }
    
    function jump() {
        if (!player.hasClass("jump-animation")) {
            player.addClass("jump-animation");
            setTimeout(function () {
                player.removeClass("jump-animation");
            }, 700);
        }
    }

    $(document).on("keydown", function (event) {
        var currentPosition = parseInt(player.css("left"));

        console.log(event.keyCode);
        switch (event.keyCode) {
            case 68:
                movePlayer(68, player, currentPosition + 10);
                break;
            case 65:
                movePlayer(65, player, currentPosition - 10);
                break;
            case 32:
                jump();
                break;
        }
    });
    $("#player").on("animationend", function () {
        $(this).removeClass("move-left");
    });
});
