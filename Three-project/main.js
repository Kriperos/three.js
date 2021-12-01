import './style.css'
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight,0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene,camera);


const geometry = new THREE.TorusGeometry( 10,3,16,100);
const material = new THREE.MeshStandardMaterial( {
  color: 0xFF6347,
} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const pointlights = new THREE.PointLight(0xFFFFFFF)
pointlights.position.set(25,25,25)

scene.add(pointlights )



function animate(){
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01
  cube.rotation.z += 0.005
  cube.rotation.y += 0.01

  moon.rotation.x += 0.01
  moon.rotation.z += 0.005
  moon.rotation.y += 0.01

  renderer.render(scene,camera)
}

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({
    color : 0xFFFFFF,
  })
  const star = new THREE.Mesh( geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));

  star.position.set(x,y,z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)


const spaceTexture = new THREE.TextureLoader().load('space.jpg')
scene.background = spaceTexture

const moonTexture = new THREE.TextureLoader().load('moon.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: moonTexture
  })
)
scene.add(moon)

moon.position.z = 30;
moon.position.setX(-10);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

animate()