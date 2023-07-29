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
    var isJump = false;
    function jump(player) {
        if (!player.hasClass("jump-animation")) {
            player.addClass("jump-animation");
            stopIdleAnimation();
            stopRunAnimation();
            isJump = true;
            if (jumpAnimationInterval == 0) {
                startJumpAnimation();
            }
            setTimeout(function () {
                player.removeClass("jump-animation");
                stopJumpAnimation();
                isJump = false;
                if (idleAnimationInterval == 0) {
                    startIdleAnimation();
                }
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
                if (runAnimationInterval == 0) {
                    startRunAnimation();
                }
                break;
            case 65:
                movePlayer(65, player, currentPosition - 10);
                if (runAnimationInterval == 0) {
                    startRunAnimation();
                }
                break;
            case 32:
                jump(player);
                break;
        }
    });
    $(document).on("keyup", function (event) {
        switch (event.keyCode) {
            case 68:
                stopRunAnimation();
                if (idleAnimationInterval == 0) {
                    startIdleAnimation();
                }
                break;
            case 65:
                stopRunAnimation();
                if (idleAnimationInterval == 0) {
                    startIdleAnimation();
                }
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
        jumpAnimationInterval = setInterval(jumpAnimation, 100);
    }
    function stopJumpAnimation() {
        clearInterval(jumpAnimationInterval);
        jumpAnimationInterval = 0;
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
        if (!isJump) {
            idleAnimationInterval = setInterval(idleAnimation, 50);
        }
    }
    function stopIdleAnimation() {
        clearInterval(idleAnimationInterval);
        idleAnimationInterval = 0;
    }

    var runState = 0;
    var runAnimationInterval = 0;
    function runAnimation() {
        console.log("run");
        player.attr("src", "images/Player/run__00" + runState + ".png");
        runState += 1;
        if (runState == 10) {
            runState = 0;
        }
    }
    function startRunAnimation() {
        stopIdleAnimation();
        if (!isJump) {
            runAnimationInterval = setInterval(runAnimation, 100);
        }
    }
    function stopRunAnimation() {
        clearInterval(runAnimationInterval);
        runAnimationInterval = 0;
    }
});
