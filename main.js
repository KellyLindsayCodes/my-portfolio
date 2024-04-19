import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// sphere
// scene
const scene = new THREE.Scene();

// geometry
const geometry = new THREE.SphereGeometry(3.5, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "magenta",
  roughness: 1,
  
  
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
mesh.position.set(0, 0);

// size
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// light
const ambientLight = new THREE.AmbientLight(0x404040); 
scene.add(ambientLight);

const light = new THREE.PointLight(0xcccccc, 4, 20);
light.position.set(0, 6, 5);
light.intensity = 80;
scene.add(light);

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x404040, 1);
scene.add(hemisphereLight);

// camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);

// renderer
const canvas = document.querySelector(".webgl");
canvas.width = sizes.width;
canvas.height = sizes.height;
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });


// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 7;

// resize
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

// mouse animation color
let mouseDown = false;
let rgb = [];
window.addEventListener("mousedown", () => (mouseDown = true));
window.addEventListener("mouseup", () => (mouseDown = false));

window.addEventListener("mousemove", (e) => {
  if (mouseDown) {
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.height) * 255),
      150,
    ];
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
    gsap.to(mesh.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
    });
  }
});

window.addEventListener("touchmove", (e) => {
  if (true) {
    rgb = [
      Math.round((e.touches[0].pageX / sizes.width) * 255),
      Math.round((e.touches[0].pageY / sizes.height) * 255),
      150,
    ];
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
    gsap.to(mesh.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
    });
  }
});

const buttons = document.querySelectorAll("[data-carousel-button]")

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]")

    const activeSlide = slides.querySelector("[data-active]")
    let newIndex = [...slides.children].indexOf(activeSlide) + offset
    if (newIndex < 0) newIndex = slides.children.length - 1
    if (newIndex >= slides.children.length) newIndex = 0

    slides.children[newIndex].dataset.active = true
    delete activeSlide.dataset.active
  })

})

const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
});

toTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

document.addEventListener("DOMContentLoaded", function() {
  gsap.from(".logo", { duration: 3, y: -100, opacity: 0, ease: "power4.out" });
  gsap.from(".main-menu", { duration: 3, y: -100, opacity: 0, ease: "power4.out" });
  gsap.from(".menu li", { duration: 3, y: -50, opacity: 0, stagger: 0.2, ease: "power4.out" });
  gsap.from(".intro-container", { duration: 3, y: -100, opacity: 0, ease: "power4.out" });
  gsap.from(".intro-statement", { duration: 3, x: -100, opacity: 0, ease: "power4.out", delay: 0.2 });
  gsap.from(".intro-statement-2", { duration: 3, x: 100, opacity: 0, ease: "power4.out", delay: 0.4 });
  gsap.from(".scroll-button", { duration: 3, y: 50, opacity: 0, ease: "power4.out", delay: 0.6 });
});

const tl = gsap.timeline({ defaults: { duration:3 }})
tl.fromTo(mesh.scale, { z:0, x:0, y:0 }, { z:1, x:1, y:1})
tl.fromTo("webgl", {y:'-100%'}, {y:'0%'})

gsap.from(".header-section, .about-statement p:first-of-type", {
  x: -100,
  opacity: 0,
  duration: 5,
  scrollTrigger: {
    trigger: ".about",
    start: "top 90%",
    end: "top 50%",
    scrub: true
  }
});

gsap.from(".about-statement p:nth-of-type(2)", {
  x: 100,
  opacity: 0,
  duration: 5,
  scrollTrigger: {
    trigger: ".about",
    start: "top 90%",
    end: "top 50%",
    scrub: true
  }
});

document.addEventListener("DOMContentLoaded", function() {
  gsap.from(".my-work", {
    x: -100,
    opacity: 0,
    duration: 5,
    ease: "power2.out",
    stagger: 0.2, 
    scrollTrigger: {
        trigger: ".projects",
        start: "top 80%",
        end: "top 50%",
        scrub: true
    }
});

gsap.from(".column:first-child", {
    x: -100,
    opacity: 0,
    duration: 5,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".projects",
        start: "top 80%",
        end: "top 50%",
        scrub: true
    }
});

gsap.from(".column:last-child", {
    x: 100,
    opacity: 0,
    duration: 5,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".projects",
        start: "top 80%",
        end: "top 50%",
        scrub: true
    }
});
});

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

menuToggle.addEventListener('click', function() {
  mobileMenu.classList.toggle('show-menu');
});

const closeBtn = document.querySelector('.close-btn');

closeBtn.addEventListener('click', function() {
  mobileMenu.classList.remove('show-menu');
});

document.addEventListener('DOMContentLoaded', function() {
  const scrollButtons = document.querySelectorAll('.scroll-button');
  
  scrollButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});































