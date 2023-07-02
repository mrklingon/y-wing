input.onButtonPressed(Button.A, function () {
    laser()
})
input.onGesture(Gesture.TiltLeft, function () {
    ywing += -1
    ywing = (ywing + 5) % 5
})
function laser () {
    music.play(music.tonePlayable(523, music.beat(BeatFraction.Eighth)), music.PlaybackMode.UntilDone)
    music.play(music.tonePlayable(988, music.beat(BeatFraction.Eighth)), music.PlaybackMode.UntilDone)
    for (let bolt = 0; bolt <= 4; bolt++) {
        if (200 == led.pointBrightness(bolt, ywing)) {
            music.play(music.tonePlayable(131, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
            game.addScore(randint(5, 25))
        }
        led.plot(bolt, ywing)
        basic.pause(25)
    }
    for (let bolt = 0; bolt <= 4; bolt++) {
        led.unplot(bolt, ywing)
        basic.pause(25)
    }
}
function mkStars () {
    for (let index = 0; index <= 4; index++) {
        if (randint(0, 10) > 7) {
            led.plotBrightness(4, index, randint(20, 100))
            if (randint(0, 10) > 7) {
                led.plotBrightness(4, index, 200)
            }
        } else {
            led.unplot(4, index)
        }
    }
}
input.onGesture(Gesture.Shake, function () {
    music.play(music.tonePlayable(784, music.beat(BeatFraction.Eighth)), music.PlaybackMode.UntilDone)
    music.play(music.tonePlayable(392, music.beat(BeatFraction.Eighth)), music.PlaybackMode.UntilDone)
    if (droid) {
        droid = false
    } else {
        droid = true
    }
})
input.onGesture(Gesture.TiltRight, function () {
    ywing += 1
    ywing = (ywing + 5) % 5
})
function slideStars () {
    for (let index = 0; index <= 3; index++) {
        for (let y2 = 0; y2 <= 4; y2++) {
            led.plotBrightness(index, y2, led.pointBrightness(index + 1, y2))
        }
    }
    if (led.pointBrightness(0, ywing) == 200) {
        music.play(music.tonePlayable(262, music.beat(BeatFraction.Eighth)), music.PlaybackMode.UntilDone)
        music.play(music.tonePlayable(131, music.beat(BeatFraction.Eighth)), music.PlaybackMode.UntilDone)
        game.removeLife(1)
    }
    led.plot(0, ywing)
}
let ywing = 0
let droid = false
droid = false
game.setLife(5)
ywing = 2
images.createBigImage(`
    . # # # # . . . . .
    . . # . . . . . . .
    # # # # . . . . . .
    . . # . . . . . . .
    . # # # # . . . . .
    `).scrollImage(1, 200)
basic.forever(function () {
    mkStars()
    basic.pause(100)
    slideStars()
})
basic.forever(function () {
    if (droid && !(game.isGameOver())) {
        laser()
        ywing = randint(0, 4)
    }
    basic.pause(100 * randint(0, 10))
})
