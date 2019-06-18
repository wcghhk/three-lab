const THREE = require('three.js')
const Orbit = require('./src/js/orbit.js')
var ctrl = {}
var flag = false
var anim = 3
var button, startX = 0, startY = 0, deltaX = 0, deltaY = 0
var RX = 0, RY = 0, TX = 0, TY = 0
var px = 0, py = 0, pz = 0
var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000)
var distance = 100

camera.position.x = distance * Math.sin(RX) * Math.cos(RY)
camera.position.y = distance * Math.sin(RY)
camera.position.z = distance * Math.cos(RX) * Math.cos(RY)
camera.lookAt(scene.position)
scene.add(camera)

// scene.fog = new THREE.Fog(0xffffff, .015, 1000)
var renderer = new THREE.WebGLRenderer()
renderer.setClearColor(0x000000)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMapEnabled = true

var world = new THREE.Object3D()
scene.add(world)

var planeG = new THREE.PlaneGeometry(60, 30, 1, 1)
var planeM = new THREE.MeshLambertMaterial({color: 0x666666, side: THREE.DoubleSide})
var plane = new THREE.Mesh(planeG, planeM)
plane.rotation.x = -.5 * Math.PI
plane.receiveShadow = true
world.add(plane)

var spot = new THREE.SpotLight(0xffffff)
// var spot = new THREE.AmbientLight(0xffffff)
spot.position.set(-40, 60, -10)
spot.castShadow = true
world.add(spot)

document.querySelector('#GL').appendChild(renderer.domElement)
function animate() {
    scene.traverse(function (e) {
        if (e instanceof THREE.Mesh && e !== plane) {
            e.rotation.x += Math.random() * ctrl.rotationSpeed
            e.rotation.y += Math.random() * ctrl.rotationSpeed
            e.rotation.z += Math.random() * ctrl.rotationSpeed
        }
    })
    // if (anim > 0) {
    //     RX += .015
    //     RY += .015
    //     distance -= 1
    //     anim -= .1
    // }
    camera.position.x = distance * Math.sin(RX + deltaX) * Math.cos(RY + deltaY)
        - (TX * Math.cos(RX) - TY * Math.sin(RY) * Math.sin(RX) + px)
    camera.position.y = distance * Math.sin(RY + deltaY)
        - (TY * Math.cos(RY) + py)
    camera.position.z = distance * Math.cos(RX + deltaX) * Math.cos(RY + deltaY)
        + (TX * Math.sin(RX) + TY * Math.sin(RY) * Math.cos(RX) - pz)
    camera.lookAt(new THREE.Vector3(
        - (TX * Math.cos(RX) - TY * Math.sin(RY) * Math.sin(RX) + px),
        - (TY * Math.cos(RY) + py),
        - (- TX * Math.sin(RX) - TY * Math.sin(RY) * Math.cos(RX) + pz)
    ))
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

animate()
window.addEventListener('mousedown', function (e) {
    flag = true
    button = e.button
    startX = e.clientX
    startY = e.clientY
})
window.addEventListener('mousemove', function (e) {
    if ( !flag ) return
    if ( button === 2 ) { // å¹³ç§»
        TX = (e.clientX - startX) / 30
        TY = - (e.clientY - startY) / 30
    } else if ( button === 0) { // æ—‹è½¬
        deltaX = - (e.clientX - startX) / 300
        deltaY = (e.clientY - startY) / 300
    }
})
window.addEventListener('mouseup', function () {
    flag = false
    RX += deltaX
    RY += deltaY
    deltaX = 0
    deltaY = 0

    px += TX * Math.cos(RX) - TY * Math.sin(RY) * Math.sin(RX)
    py += TY * Math.cos(RY)
    pz += - TX * Math.sin(RX) - TY * Math.sin(RY) * Math.cos(RX)
    TX = 0
    TY = 0
})
window.addEventListener('wheel', function (e) {
    var size = 2 * Math.abs(e.deltaY) / e.deltaY
    distance += size
})
window.oncontextmenu = function (e) {
    e.preventDefault()
}