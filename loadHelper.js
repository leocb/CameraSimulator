const F1_4 = 0
const F2_8 = 1
const F5_6 = 2

const S30 = 0
const S120 = 1
const S480 = 2

const ISO50 = 0
const ISO200 = 1
const ISO800 = 2
const ISO3200 = 3
const ISO12800 = 4


function preLoadImages() {
    // ISO Overlay
    IsoOverlayGraphics.push(loadImage('ISO-Overlay/ISO50.jpg'))
    IsoOverlayGraphics.push(loadImage('ISO-Overlay/ISO200.jpg'))
    IsoOverlayGraphics.push(loadImage('ISO-Overlay/ISO800.jpg'))
    IsoOverlayGraphics.push(loadImage('ISO-Overlay/ISO3200.jpg'))
    IsoOverlayGraphics.push(loadImage('ISO-Overlay/ISO12800.jpg'))

    // Images
    console.log(img)
    for (let f = 0; f < 1; f++) {
        for (let s = 0; s < 1; s++) {
            for (let i = 0; i < 1; i++) {
                for (let k = 1; k <= 7; k++) {
                    let imagePath = `Images/${fToName(f)}-${sToName(s)}-${iToName(i)}-${k}.jpg'`
                    console.log(imagePath)
                    img[f][s][i][k] = (loadImage(imagePath))
                }
            }
        }
    }
}

function multidimensionalArray() {
    var args = Array.prototype.slice.call(arguments);

    function helper(arr) {
        if (arr.length <= 0) {
            return;
        }
        else if (arr.length == 1) {
            return new Array(arr[0]);
        }

        var currArray = new Array(arr[0]);
        var newArgs = arr.slice(1, arr.length);
        for (var i = 0; i < currArray.length; i++) {
            currArray[i] = helper(newArgs);
        }
        return currArray;
    }

    return helper(args);
}

function fToName(f) {
    switch (f) {
        case (F1_4):
            return "F14"
        case (F2_8):
            return "F28"
        case (F5_6):
            return "F56"
    }
}
function sToName(s) {
    switch (s) {
        case (S30):
            return "S30"
        case (S120):
            return "S120"
        case (S480):
            return "S480"
    }
}
function iToName(i) {
    switch (i) {
        case (ISO50):
            return "ISO50"
        case (ISO200):
            return "ISO200"
        case (ISO800):
            return "ISO800"
        case (ISO3200):
            return "ISO3200"
        case (ISO12800):
            return "ISO12800"
    }
}