import { Component, HostListener, Input } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { StoreService } from 'src/store/store.service';

@Component({
  selector: 'app-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.css'],
})
export class ThreeComponent {
  constructor(public storeService: StoreService) {}

  private get container(): HTMLElement {
    return document.getElementById('container') as HTMLElement;
  }

  @Input() public cameraX: number = 4;
  @Input() public cameraY: number = 2;
  @Input() public cameraZ: number = 8;

  @Input() public fieldOfView: number = 40;

  @Input('nearClipping') public nearClippingPlane: number = 1;

  @Input('farClipping') public farClippingPlane: number = 100;

  private mixer!: THREE.AnimationMixer;
  private clock = new THREE.Clock();

  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;

  private model: any;

  private loaderGLTF = new GLTFLoader();

  private renderer!: THREE.WebGLRenderer;

  private scene!: THREE.Scene;

  private pmremGenerator!: THREE.PMREMGenerator;

  private dracoLoader = new DRACOLoader();

  private createControls = () => {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 0.5, 0);
    this.controls.autoRotate = true;
    this.controls.enableZoom = false;
    this.controls.enablePan = false;
    this.controls.enableDamping = false;
    this.controls.update();
  };

  private createScene() {
    this.scene = new THREE.Scene();
    this.scene.background = null;

    this.dracoLoader.setDecoderPath('assets/libs/draco/');
    this.loaderGLTF.setDRACOLoader(this.dracoLoader);

    this.loaderGLTF.load('assets/models/LittlestTokyo.glb', (gltf: GLTF) => {
      this.model = gltf.scene.children[0];
      console.log(this.model);
      this.model.position.set(1, 0.5, 0);
      this.model.scale.set(0.01, 0.01, 0.01);
      this.scene.add(this.model);

      this.mixer = new THREE.AnimationMixer(this.model);
      this.mixer.clipAction(gltf.animations[0]).play();
    });

    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    );
    this.camera.position.set(this.cameraX, this.cameraY, this.cameraZ);
  }

  private getAspectRatio() {
    return this.container.clientWidth / this.container.clientHeight;
  }

  private startRenderingLoop() {
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
    this.container.appendChild(this.renderer.domElement);

    this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = this.pmremGenerator.fromScene(
      new RoomEnvironment(this.renderer),
      0.04
    ).texture;

    let component: ThreeComponent = this;
    (function render() {
      requestAnimationFrame(render);
      let delta = component.clock.getDelta();
      if (component.mixer) {
        component.mixer.update(delta);
      }
      // if (component.model) {
      //   component.model.rotation.set(
      //     component.storeService.model.rotation.x,
      //     component.storeService.model.rotation.y,
      //     component.storeService.model.rotation.z
      //   );
      // }

      component.renderer.render(component.scene, component.camera);
    })();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.camera.aspect = this.getAspectRatio();
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
  }

  ngAfterViewInit() {
    this.createScene();
    this.startRenderingLoop();
    this.createControls();
  }
}
