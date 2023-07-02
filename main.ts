input.onGesture(Gesture.TiltLeft, function () {
    ywing += -1
    ywing = (ywing + 5) % 5
})
function mkStars () {
    for (let index = 0; index <= 4; index++) {
        if (randint(0, 10) > 7) {
            led.plotBrightness(4, index, randint(20, 100))
        } else {
            led.unplot(4, index)
        }
    }
}
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
    led.plot(0, ywing)
}
let ywing = 0
ywing = 2
basic.forever(function () {
    mkStars()
    basic.pause(100)
    slideStars()
})
