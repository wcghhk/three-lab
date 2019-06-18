module.exports = function (camera, secen) {
    console.log(camera.matrixWorldInverse)
    console.log(camera.projectionMatrix)
    console.log(camera)
    if (!camera.isCamera) return
    
    var button, startX = 0, startY = 0, deltaX = 0, deltaY = 0
    var RX = 0, RY = 0, TX = 0, TY = 0
    var px = 0, py = 0, pz = 0
    var distance = 100
    camera.position.x = distance * Math.sin(RX) * Math.cos(RY)
    camera.position.y = distance * Math.sin(RY)
    camera.position.z = distance * Math.cos(RX) * Math.cos(RY)
    camera.lookAt(scene.position)

    this.update = function () {

    }
}