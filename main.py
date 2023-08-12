def on_button_pressed_a():
    laser()
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_gesture_tilt_left():
    global ywing
    ywing += -1
    ywing = (ywing + 5) % 5
input.on_gesture(Gesture.TILT_LEFT, on_gesture_tilt_left)

def laser():
    music.play(music.tone_playable(523, music.beat(BeatFraction.EIGHTH)),
        music.PlaybackMode.UNTIL_DONE)
    music.play(music.tone_playable(988, music.beat(BeatFraction.EIGHTH)),
        music.PlaybackMode.UNTIL_DONE)
    for bolt in range(5):
        if 200 == led.point_brightness(bolt, ywing):
            music.play(music.tone_playable(131, music.beat(BeatFraction.QUARTER)),
                music.PlaybackMode.UNTIL_DONE)
            game.add_score(randint(5, 25))
        led.plot(bolt, ywing)
        basic.pause(25)
    for bolt2 in range(5):
        led.unplot(bolt2, ywing)
        basic.pause(25)
def mkStars():
    for index in range(5):
        if randint(0, 10) > 7:
            led.plot_brightness(4, index, randint(20, 100))
            if randint(0, 10) > 7:
                led.plot_brightness(4, index, 200)
        else:
            led.unplot(4, index)

def on_gesture_shake():
    global droid
    music.play(music.tone_playable(784, music.beat(BeatFraction.EIGHTH)),
        music.PlaybackMode.UNTIL_DONE)
    music.play(music.tone_playable(392, music.beat(BeatFraction.EIGHTH)),
        music.PlaybackMode.UNTIL_DONE)
    if droid:
        droid = False
    else:
        droid = True
input.on_gesture(Gesture.SHAKE, on_gesture_shake)

def on_gesture_tilt_right():
    global ywing
    ywing += 1
    ywing = (ywing + 5) % 5
input.on_gesture(Gesture.TILT_RIGHT, on_gesture_tilt_right)

def slideStars():
    for index2 in range(4):
        for y2 in range(5):
            led.plot_brightness(index2, y2, led.point_brightness(index2 + 1, y2))
    if led.point_brightness(0, ywing) == 200:
        music.play(music.tone_playable(262, music.beat(BeatFraction.EIGHTH)),
            music.PlaybackMode.UNTIL_DONE)
        music.play(music.tone_playable(131, music.beat(BeatFraction.EIGHTH)),
            music.PlaybackMode.UNTIL_DONE)
        game.remove_life(1)
    led.plot(0, ywing)
ywing = 0
droid = False
droid = False
game.set_life(5)
ywing = 2
images.create_big_image("""
    . # # # # . . . . .
    . . # . . . . . . .
    # # # # . . . . . .
    . . # . . . . . . .
    . # # # # . . . . .
    """).scroll_image(1, 200)

def on_forever():
    mkStars()
    basic.pause(100)
    slideStars()
basic.forever(on_forever)

def on_forever2():
    global ywing
    if droid and not (game.is_game_over()):
        laser()
        ywing = randint(0, 4)
    basic.pause(100 * randint(0, 10))
basic.forever(on_forever2)
