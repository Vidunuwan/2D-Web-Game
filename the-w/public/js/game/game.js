$(document).ready(function () {
    //define Player
    var player = $("#player");
    var isJump = false;
    var isAttack = false;
    function movePlayer(key, player, left) {
        if (left > 1445 || left < 0) {
            return;
        }
        // console.log(left);
        player.css({
            left: left + "px",
            position: "absolute",
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
    function createArrow(id, position, arrows) {
        var arrow = $("<img>");
        var xyRange = 0;
        var xyPosition = 0;

        arrow.attr("src", "images/Player/Kunai.png");
        // arrow.addClass("dagger");
        arrow.attr("id", "arrow-" + id);
        if (position == "x") {
            rotate = 180;
            xyRange = 130;
            xyPosition = 450;
            arrow.css({
                left: "1500px",
                height: "15px",
                position: "absolute",
                top: Math.floor(Math.random() * xyRange) + xyPosition + "px",
                transform: "rotate(" + rotate + "deg)",
            });
            $("#game-background").append(arrow);
            arrow.addClass("dagger-x-animate");
        } else {
            rotate = 90;
            xyRange = 1445;
            xyPosition = 0;
            arrow.css({
                left: Math.floor(Math.random() * xyRange) + xyPosition + "px",
                transform: "rotate(" + rotate + "deg)",
            });
            $("#game-background").append(arrow);
            arrow.addClass("dagger-y-animate");
        }
        arrows.push("arrow-" + id);
        setTimeout(function () {
            arrows.pop("arrow-" + id);
            // arrow.remove();
        }, 2000);
        // console.log(arrow.hasClass("dagger-x-animate"));
        // $("#game-background").removeAttr("<img>");

        return "arrow-" + id;
    }

    function destroyeArrow(arrow, xy) {
        if (xy == "x") {
            if (parseInt(arrow.css("left")) <= 300) {
                arrow.addClass("d-none");
            }
        } else {
            if (parseInt(arrow.css("top")) >= 650) {
                arrow.addClass("d-none");
            }
        }
    }

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

    // Game loop
    var i = 0;
    var id = 0;
    var arrowID = "";
    var score = 0;
    let arrows = [];
    let death = false;
    function gameLoop() {
        if (death) {
            return;
        }
        // console.log(arrows);
        $("#score-board").text("Score: " + score);
        var playerXValue = parseInt($("#player").css("left"));
        var playerWidth = parseInt($("#player").css("width"));
        var playerHeight = parseInt($("#player").css("height"));
        var playerYValue = parseInt($("#player").css("top"));
        // console.log(playertTop);
        if (i % 300 == 0) {
            id += 1;
            // arrows.push(createArrow(id, "x", arrows));
            // score += 1;
            arrowID = createArrow(id, "x", arrows);
            score = arrows.length;
        }
        i++;
        console.log(arrowID);
        // arrows.forEach((arrow) => {
        var arrowXValue = parseInt($("#" + arrowID).css("left"));
        var arrowYValue = parseInt($("#" + arrowID).css("top"));
        // console.log("arrows " + arrowXValue);
        // if (arrowXValue < 100) {
        //     console.log("destroyee");
        //     // arrow.addClass("d-none");
        //     arrow.remove();
        //     arrows.pop(arrow);
        // }

        if (
            playerXValue - playerWidth >= arrowXValue &&
            playerXValue - 2 * playerWidth <= arrowXValue &&
            playerYValue <= arrowYValue &&
            playerYValue + playerHeight >= arrowYValue
        ) {
            if (isAttack) {
                score += 100;
                $("#arrow-" + id).addClass("d-none");
            } else {
                console.log("Death");
                Swal.fire({
                    title: "Game Over",
                    text: "Your Score " + score,
                    icon: "warning",
                    showCancelButton: true,
                    focusConfirm: true,
                    confirmButtonText: "View Leader Board",
                    cancelButtonText: "Restart",
                    customClass: {
                        confirmButton: "btn btn-primary",
                        cancelButton: "btn btn-secondary ms-3",
                    },
                    showClass: {
                        popup: "swal2-noanimation",
                        backdrop: "swal2-noanimation",
                    },
                    buttonsStyling: false,
                }).then((result) => {
                    console.log(result);
                    if (result.isConfirmed) {
                        console.log("Leader board");
                        $.ajax({
                            url: "leader-board/update",
                            type: "GET",
                            data: {
                                score: score,
                            },
                            success: function (responce) {
                                window.location.href = "/leader-board";
                            },
                        });
                    }
                    if (result.isDismissed) {
                        $.ajax({
                            url: "leader-board/update",
                            type: "GET",
                            data: {
                                score: score,
                            },
                            success: function (responce) {
                                window.location.reload();
                            },
                        });
                    }
                });
                death = true;
            }
        }
        // });
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
