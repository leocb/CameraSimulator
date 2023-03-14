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
    WbSlider.style('visibility', 'hidden')

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
        WbSlider.style('visibility', 'visible')
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

// Thanks https://academo.org/demos/colour-temperature-relationship/
// Thanks http://www.vendian.org/mncharity/dir3/blackbody/
// Assuming the photo has a difference of 1600K to this overlay - Effectively making the 5000k the white point
const wbRgbTable = [            // Photo     Real
    { r: 255, g: 195, b: 146 }, // 2000K     3600 
    { r: 255, g: 201, b: 157 }, // 2200K
    { r: 255, g: 206, b: 166 }, // 2400K
    { r: 255, g: 211, b: 175 }, // 2600K
    { r: 255, g: 215, b: 183 }, // 2800K
    { r: 255, g: 220, b: 191 }, // 3000K
    { r: 255, g: 224, b: 199 }, // 3200K
    { r: 255, g: 228, b: 206 }, // 3400K     5000K
    { r: 255, g: 232, b: 213 }, // 3600K 
    { r: 255, g: 236, b: 219 }, // 3800K
    { r: 255, g: 239, b: 225 }, // 4000K
    { r: 255, g: 243, b: 231 }, // 4200K
    { r: 255, g: 246, b: 237 }, // 4400K
    { r: 255, g: 249, b: 242 }, // 4600K
    { r: 255, g: 253, b: 248 }, // 4800K
    { r: 255, g: 255, b: 255 }, // 5000K     6600K (White neutral)
    { r: 250, g: 246, b: 255 }, // 5200K
    { r: 243, g: 242, b: 255 }, // 5400K
    { r: 237, g: 239, b: 255 }, // 5600K
    { r: 232, g: 236, b: 255 }, // 5800K
    { r: 228, g: 234, b: 255 }, // 6000K
    { r: 224, g: 232, b: 255 }, // 6200K
    { r: 221, g: 230, b: 255 }, // 6400K
    { r: 218, g: 228, b: 255 }, // 6600K     8200K
    { r: 216, g: 227, b: 255 }, // 6800K
    { r: 214, g: 225, b: 255 }, // 7000K
    { r: 212, g: 224, b: 255 }, // 7200K
    { r: 210, g: 223, b: 255 }, // 7400K
    { r: 208, g: 222, b: 255 }, // 7600K
    { r: 206, g: 221, b: 255 }, // 7800K
    { r: 205, g: 220, b: 255 }, // 8000K     9600K
].reverse() // We invert the array order because this should show how the camera compensates the WB, not how the scene is lit