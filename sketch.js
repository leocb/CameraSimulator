// Main
let scaling
let img = multidimensionalArray(3, 3, 5, 7);
const imgW = 2048
const imgH = 858

//UI
let FstopSlider
let ShutterSlider
let IsoSlider
let IsoAuto
let uiElementY
let uiLabelY
const uiMargin = 100
const elementsWidth = 100
const elementsSpacing = 40
const FstopXpos = elementsSpacing / 2
const ShutterXpos = FstopXpos + elementsWidth + elementsSpacing
const IsoXpos = ShutterXpos + elementsWidth + elementsSpacing
const ZoomTextXpos = IsoXpos + elementsWidth + elementsSpacing*2

// Values
let currF = F1_4
let currS = S120
let currI = ISO200

// Overlay
const IsoOverlayOverflow = (3000 - imgW) // ISO overlay image width - main image width
let IsoOverlayGraphics = []
let IsoOverlayXpos = 0

// Zoom
let zoomGraphics
const zoomWindowSize = 200
const zoomScale = 2.5

function preload() {
    preLoadImages()
}

function setup() {
    createCanvas(1, 1);
    zoomGraphics = createGraphics(zoomWindowSize / zoomScale, zoomWindowSize / zoomScale);
    frameRate(30)

    // UI
    fill(255)
    textSize(16)
    textStyle(BOLD)
    textAlign(LEFT, CENTER)

    FstopSlider = createSlider(0, 2, currF)
    FstopSlider.size(elementsWidth)
    ShutterSlider = createSlider(0, 2, currS)
    ShutterSlider.size(elementsWidth)

    IsoAuto = createCheckbox("AUTO", true)
    IsoAuto.changed(() => {
        IsoSlider.style('visibility', IsoAuto.checked() ? "hidden" : "visible")
    })

    IsoSlider = createSlider(0, 4, currI)
    IsoSlider.size(elementsWidth)
    IsoSlider.style('visibility', 'hidden')
    positionStuff()
}

function windowResized() {
    positionStuff()
}

function positionStuff() {
    scaling = (windowWidth / imgW)
    resizeCanvas(windowWidth, scaling * imgH + uiMargin);
    uiElementY = imgH * scaling + uiMargin / 2;
    uiLabelY = uiElementY - 10;
    FstopSlider.position(FstopXpos, uiElementY)
    ShutterSlider.position(ShutterXpos, uiElementY)
    IsoSlider.position(IsoXpos, uiElementY)
    IsoAuto.position(IsoXpos + elementsWidth-18, uiElementY - 21)
}

function draw() {
    // Update values:
    currF = FstopSlider.value()
    currS = ShutterSlider.value()
    currI = IsoSlider.value()

    // Update ISO if Auto is enabled
    if (IsoAuto.checked()) {
        currI = currF + currS
    }

    // Move ISO Noise
    IsoOverlayXpos = (IsoOverlayXpos + 40 + Math.random() * (IsoOverlayOverflow / 2)) % IsoOverlayOverflow

    // MAIN image
    push()
    scale(scaling)
    drawMovie(this, { x: 0, y: 0 })
    pop()

    // ZOOM image if mouse is pressed
    if (mouseIsPressed && mouseY < imgH * scaling) {
        // Draw image relative to mouse pos
        drawMovie(zoomGraphics, {
            x: (-mouseX + (zoomWindowSize / zoomScale) / zoomScale / 2) / scaling,
            y: (-mouseY + (zoomWindowSize / zoomScale) / zoomScale / 2) / scaling
        })
        // Draw zoom window
        push()
        translate(mouseX - zoomWindowSize / 2, mouseY - zoomWindowSize / 2)
        scale(zoomScale)
        image(zoomGraphics, 0, 0)
        pop()
    }

    // UI
    text(`F-stop: ${fToPretty(currF)}`, FstopXpos, uiLabelY)
    text(`Shutter: ${sToPretty(currS)}`, ShutterXpos, uiLabelY)
    text(`ISO: ${iToPretty(currI)}`, IsoXpos, uiLabelY)
    text("Press and Hold to zoom", ZoomTextXpos, uiElementY)
}


function drawMovie(graphics, offset) {
    graphics.blendMode(BLEND)
    graphics.background(0)
    graphics.image(img[currF][currS][currI][frameCount % 7], offset.x, offset.y);
    graphics.blendMode(SCREEN)
    graphics.image(IsoOverlayGraphics[currI], - IsoOverlayXpos + offset.x, offset.y);
    graphics.blendMode(BLEND)
}