$(document).ready(function () {
    //define Player
    var player = $("#player");
    var isJump = false;
    var isAttack = false;
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

    //Create Arrow
    function createArrow(id) {
        var arrow = $("<img>");
        arrow.addClass("dagger");
        arrow.attr("src", "images/Player/Kunai.png");
        arrow.attr("id", "arrow-" + id);
        $("#game-background").append(arrow);
        arrow.addClass("dagger-animate");
        setTimeout(function () {
            arrow.addClass("d-none");
        }, 3000);
    }
    // createArrow(1);
    // console.log($("#arrow-1").css("left"));
    //Handle Game
    // startIdleAnimation();
    $(document).on("keydown", function (event) {
        var currentPosition = parseInt(player.css("left"));

        // console.log(event.keyCode);
        var movementSpeed = 10;
        switch (event.keyCode) {
            case 68:
                movePlayer(68, player, currentPosition + movementSpeed);
                if (runAnimationInterval == 0 && !isAttack) {
                    startRunAnimation();
                }
                break;
            case 65:
                movePlayer(65, player, currentPosition - movementSpeed);
                if (runAnimationInterval == 0 && !isAttack) {
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
            case 74:
                if (attackAnimationInterval == 0) {
                    startAttackAnimation();
                }
                isAttack = true;
                setTimeout(() => {
                    isAttack = false;
                    stopAttackAnimation();
                    if (idleAnimationInterval == 0) {
                        startIdleAnimation();
                    }
                }, 500);
                console.log(isAttack);
        }
    });

    //create Dagger
    // var dagger = $("#dagger");
    // $("#dagger").removeClass("d-none");
    // $("#dagger").addClass("dagger-animate");
    // setInterval(function () {
    //     $("#dagger").removeClass("dagger-animate");
    //     $("#dagger").addClass("dagger-animate");
    // }, 3000);

    // Game loop
    var i = 0;
    var id = 0;
    function gameLoop() {
        $("#score-board").text("Score: " + i);
        var playerPosition = parseInt($("#player").css("left"));
        var playerWidth = parseInt($("#player").css("width"));
        var playerHeight = parseInt($("#player").css("height"));
        var playertTop = parseInt($("#player").css("top"));
        // console.log(playerHeight);
        if (i % 200 == 0) {
            id = i;
            createArrow(i);
        }
        i++;
        // console.log("loop", i);
        var arrowPossition = parseInt($("#arrow-" + id).css("left"));
        var arrowTop = parseInt($("#arrow-" + id).css("top"));
        // console.log(arrowTop, playertTop + playerHeight);
        if (
            playerPosition - playerWidth >= arrowPossition &&
            playerPosition - 2 * playerWidth <= arrowPossition &&
            playertTop + playerHeight >= arrowTop
        ) {
            // console.log(arrowTop, playertTop + playerHeight);
            console.log("Death");
            // alert("You are dead");
            // break;
            Swal.fire({
                title: "Game Over",
                text: "Better luck next time",
                icon: "warning",
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: "Restart",
                cancelButtonText: "Cancel",
                customClass: {
                    confirmButton: "btn btn-primary mr-3",
                    cancelButton: "btn btn-secondary",
                },
                showClass: {
                    popup: "swal2-noanimation",
                    backdrop: "swal2-noanimation",
                },
                buttonsStyling: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log("ss");
                }
            });
            return;
        }
        // console.log();
        // Request the next animation frame
        requestAnimationFrame(gameLoop);
    }

    // Start the game loop
    gameLoop();

    //Player Animations

    var jumpState = 0;
    var jumpAnimationInterval = 0;
    function jumpAnimation() {
        // console.log("jump");
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
        // console.log("idle");
        player.attr("src", "images/Player/idle__00" + idleState + ".png");
        idleState += 1;
        if (idleState == 10) {
            idleState = 0;
        }
    }
    function startIdleAnimation() {
        if (!isJump && !isAttack) {
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
        // console.log("run");
        player.attr("src", "images/Player/run__00" + runState + ".png");
        runState += 1;
        if (runState == 10) {
            runState = 0;
        }
    }
    function startRunAnimation() {
        stopIdleAnimation();
        if (!isJump && !isAttack) {
            runAnimationInterval = setInterval(runAnimation, 80);
        }
    }
    function stopRunAnimation() {
        clearInterval(runAnimationInterval);
        runAnimationInterval = 0;
    }

    var attackState = 0;
    var attackAnimationInterval = 0;
    function attackAnimation() {
        // console.log("Attack");
        player.attr("src", "images/Player/Attack__00" + attackState + ".png");
        attackState += 1;
        if (attackState == 10) {
            // stopAttackAnimation();
            attackState = 0;
        }
    }
    function startAttackAnimation() {
        stopIdleAnimation();
        stopRunAnimation();
        if (!isJump) {
            attackAnimationInterval = setInterval(attackAnimation, 50);
        }
    }
    function stopAttackAnimation() {
        clearInterval(attackAnimationInterval);
        attackAnimationInterval = 0;
        // startIdleAnimation();
    }
});
