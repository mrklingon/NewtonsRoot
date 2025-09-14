input.onSwitchMoved(SwitchDirection.Left, function () {
    rt = 2
    dispNum(rt)
})
input.onSwitchMoved(SwitchDirection.Right, function () {
    rt = 3
    dispNum(rt)
})
input.buttonA.onEvent(ButtonEvent.Click, function () {
    findRoot(target, rt, 100)
    dispNum(guess)
})
function dispNum (value: number) {
    light.setAll(0x000000)
    strnum = convertToText(value)
    numlen = strnum.length
    if (numlen > 5) {
        numlen = 5
    }
    for (let index = 0; index <= numlen - 1; index++) {
        light.setAll(0x000000)
        char = strnum.substr(index, 1)
        if (char == "0") {
            light.setAll(0xffff00)
            pause(500)
        } else if (char == ".") {
            light.setAll(0x7f00ff)
            pause(500)
        } else {
            for (let index2 = 0; index2 <= parseFloat(char) - 1; index2++) {
                light.setPixelColor(index2, 0x00ff00)
                pause(100)
            }
            pause(500)
            if (1 < strnum.length) {
                pause(1000)
            } else {
                pause(500)
            }
        }
    }
    pause(500)
    light.setAll(0x000000)
}
input.touchA1.onEvent(ButtonEvent.Click, function () {
    dispNum(guess)
})
input.buttonsAB.onEvent(ButtonEvent.Click, function () {
    target = Math.randomRange(2, 1000)
    dispNum(target)
})
input.buttonB.onEvent(ButtonEvent.Click, function () {
    dispNum(rt)
    pause(1000)
    dispNum(target)
    pause(1000)
    dispNum(guess)
})
function findRoot (target: number, root: number, iterations: number) {
    guess = target / root
    for (let i = 0; i < iterations; i++) {
        radix = target / guess ** (root - 1)
        guess = (guess + radix) / 2
        blink()
    }
}
function blink () {
    light.setPixelColor(Math.randomRange(0, 9), light.rgb(Math.randomRange(0, 50), Math.randomRange(0, 50), Math.randomRange(0, 50)))
}
let radix = 0
let char = ""
let numlen = 0
let strnum = ""
let guess = 0
let target = 0
let rt = 0
if (input.switchRight()) {
    rt = 3
} else {
    rt = 2
}
target = 2
findRoot(target, rt, 100)
dispNum(guess)
