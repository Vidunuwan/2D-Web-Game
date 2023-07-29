$(document).ready(function () {
    //define Player
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

    function jump(player) {
        if (!player.hasClass("jump-animation")) {
            player.addClass("jump-animation");
            startJumpAnimation();
            setTimeout(function () {
                player.removeClass("jump-animation");
                startIdleAnimation();
            }, 1000);
        }
    }

    //Handle Game
    // startIdleAnimation();
    $(document).on("keydown", function (event) {
        var currentPosition = parseInt(player.css("left"));

        // console.log(event.keyCode);
        switch (event.keyCode) {
            case 68:
                movePlayer(68, player, currentPosition + 10);
                break;
            case 65:
                movePlayer(65, player, currentPosition - 10);
                break;
            case 32:
                jump(player);
                break;
        }
    });

    //Player Animations

    var jumpState = 0;
    var jumpAnimationInterval = 0;
    function jumpAnimation() {
        console.log("jump");
        player.attr("src", "images/Player/jump__00" + jumpState + ".png");
        jumpState += 1;
        if (jumpState == 10) {
            jumpState = 0;
        }
    }
    function startJumpAnimation() {
        clearInterval(idleAnimationInterval);
        jumpAnimationInterval = setInterval(jumpAnimation, 100);
    }

    var idleState = 0;
    var idleAnimationInterval = 0;
    function idleAnimation() {
        console.log("idle");
        player.attr("src", "images/Player/idle__00" + idleState + ".png");
        idleState += 1;
        if (idleState == 10) {
            idleState = 0;
        }
    }
    function startIdleAnimation() {
        clearInterval(idleAnimationInterval);
        clearInterval(jumpAnimationInterval);
        idleAnimationInterval = setInterval(idleAnimation, 50);
    }
});
