let img = multidimensionalArray(3, 3, 5, 7);

const imgW = 2048
const imgH = 858

let IsoOverlayGraphics = []
let IsoOverlayXpos = 0
let IsoDisplayLevel = 3

let zoomGraphics
let zoomWindowSize = 150
let zoomScale = 2

let scaling

function preload() {
    preLoadImages()
}

function setup() {
    scaling = (windowWidth / imgW)
    createCanvas(windowWidth, scaling * 858 + 100);
    zoomGraphics = createGraphics(zoomWindowSize / zoomScale, zoomWindowSize / zoomScale);
    frameRate(30)
    textSize(16)
    textStyle(BOLD)
}

function draw() {
    //Move ISO Noise
    IsoOverlayXpos = (IsoOverlayXpos + 40 + Math.random() * 952) % 952

    // MAIN image
    push()
    scale(scaling)
    drawMovie(this, { x: 0, y: 0 })
    pop()

    // ZOOM image if mouse is pressed
    if (mouseIsPressed) {
        drawMovie(zoomGraphics, {
            x: (-mouseX + (zoomWindowSize / zoomScale) / zoomScale / 2) / scaling,
            y: (-mouseY + (zoomWindowSize / zoomScale) / zoomScale / 2) / scaling
        })
        push()
        translate(mouseX + 20, mouseY + 20)
        scale(zoomScale)
        image(zoomGraphics, 0, 0)
        pop()
    }
}


function drawMovie(graphics, offset) {
    graphics.blendMode(BLEND)
    graphics.background(0)
    graphics.image(img[0][0][0][frameCount % 7], offset.x, offset.y + 100);
    graphics.blendMode(SCREEN)
    graphics.image(IsoOverlayGraphics[IsoDisplayLevel], - IsoOverlayXpos + offset.x, offset.y + 100);
    graphics.blendMode(BLEND)
}