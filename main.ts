function MkMts () {
    for (let index = 0; index <= randint(1, 2); index++) {
        led.plotBrightness(4, 4 - index, randint(20, 100))
    }
    if (randint(0, 10) > 7) {
        led.plotBrightness(4, randint(0, 3), 200)
    }
}
input.onButtonPressed(Button.A, function () {
    ywing += -1
    ywing = (ywing + 5) % 5
    basic.pause(100)
    slideStars()
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
    for (let bolt2 = 0; bolt2 <= 4; bolt2++) {
        led.unplot(bolt2, ywing)
        basic.pause(25)
    }
}
input.onButtonPressed(Button.AB, function () {
    laser()
})
input.onButtonPressed(Button.B, function () {
    ywing += 1
    ywing = (ywing + 5) % 5
})
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
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (Sound) {
        Sound = false
        music.setVolume(0)
    } else {
        Sound = true
        music.setVolume(138)
        music.play(music.tonePlayable(988, music.beat(BeatFraction.Eighth)), music.PlaybackMode.UntilDone)
    }
})
function slideStars () {
    for (let index2 = 0; index2 <= 3; index2++) {
        for (let y2 = 0; y2 <= 4; y2++) {
            led.plotBrightness(index2, y2, led.pointBrightness(index2 + 1, y2))
        }
    }
    if (led.pointBrightness(0, ywing) == 200) {
        music.play(music.tonePlayable(262, music.beat(BeatFraction.Eighth)), music.PlaybackMode.UntilDone)
        music.play(music.tonePlayable(131, music.beat(BeatFraction.Eighth)), music.PlaybackMode.UntilDone)
        game.removeLife(1)
    }
    led.plot(0, ywing)
}
let Sound = false
let ywing = 0
let droid = false
droid = false
game.setLife(5)
ywing = 2
images.createBigImage(`
    . # # # # # . . . .
    . . # . . . . . . .
    # # # # . . . . . .
    . . # . . . . . . .
    . # # # # # . . . .
    `).scrollImage(1, 200)
Sound = true
let Tick = 0
basic.forever(function () {
    if (droid && !(game.isGameOver())) {
        laser()
        ywing = randint(0, 4)
    }
    basic.pause(100 * randint(0, 10))
})
basic.forever(function () {
    Tick += 1
    if (Tick < 50) {
        mkStars()
    }
    slideStars()
    basic.pause(100)
    if (Tick > 50) {
        MkMts()
        if (Tick > 100) {
            Tick = 0
        }
    }
    basic.pause(100)
})
