let imgFan = multidimensionalArray(3, 3, 5, 7);
let imgBg = multidimensionalArray(3, 7);

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

let isLoading = true
let totalRequests = 0
let totalDone = 0
let progress = 0


function preLoadImages() {

    isLoading = true
    totalRequests = 0
    totalDone = 0

    FstopSlider.style('visibility', 'hidden')
    ShutterSlider.style('visibility', 'hidden')
    IsoSlider.style('visibility', 'hidden')
    IsoAuto.style('visibility', 'hidden')

    // ISO Overlay
    for (let i = 0; i < 5; i++) {
        totalRequests++
        IsoOverlayGraphics.push(loadImage(`Images/ISO/${iToName(i)}.jpg`, doneLoading))
    }

    // Background
    for (let f = 0; f < 3; f++) {
        for (let k = 0; k < 7; k++) {
            totalRequests++
            let imagePath = `Images/Background/${fToName(f)}-${k + 1}.jpg`
            imgBg[f][k] = (loadImage(imagePath, doneLoading))
        }
    }

    // Fan Animation Images
    for (let f = 0; f < 3; f++) {
        for (let s = 0; s < 3; s++) {
            for (let i = 0; i < 5; i++) {
                for (let k = 0; k < 7; k++) {
                    totalRequests++
                    let imagePath = `Images/Fan/7/${fToName(f)}-${sToName(s)}-${iToName(i)}-${k + 1}.jpg`
                    imgFan[f][s][i][k] = (loadImage(imagePath, doneLoading))
                }
            }
        }
    }
}

function doneLoading(loadedAsset) {
    totalDone++
    progress = totalDone / totalRequests
    if (totalDone === totalRequests) {
        isLoading = false
        FstopSlider.style('visibility', 'visible')
        ShutterSlider.style('visibility', 'visible')
        IsoAuto.style('visibility', 'visible')
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

function fToPretty(f) {
    switch (f) {
        case (F1_4):
            return "1.4f"
        case (F2_8):
            return "2.8f"
        case (F5_6):
            return "5.6f"
    }
}
function sToPretty(s) {
    switch (s) {
        case (S30):
            return "1/30"
        case (S120):
            return "1/120"
        case (S480):
            return "1/480"
    }
}
function iToPretty(i) {
    switch (i) {
        case (ISO50):
            return "50"
        case (ISO200):
            return "200"
        case (ISO800):
            return "800"
        case (ISO3200):
            return "3200"
        case (ISO12800):
            return "12800"
    }
}