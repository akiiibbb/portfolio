import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useLoading } from "../../context/loadingContext";
import { setProgress } from "../utils/loadingProgress";
import setAnimations from "./utils/animationUtils";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import {
  handleHeadRotation,
  handleMouseMove,
  handleTouchEnd,
  handleTouchMove,
} from "./utils/mouseUtils";
import handleResize from "./utils/resizeUtils";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  useEffect(() => {
    if (!canvasDiv.current) {
      return;
    }

    const canvasContainer = canvasDiv.current;
    const rect = canvasContainer.getBoundingClientRect();
    const scene = sceneRef.current;
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    const camera = new THREE.PerspectiveCamera(
      14.5,
      rect.width / rect.height,
      0.1,
      1000
    );

    renderer.setSize(rect.width, rect.height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    canvasContainer.appendChild(renderer.domElement);

    camera.position.z = 10;
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    const clock = new THREE.Clock();
    const light = setLighting(scene);
    const progress = setProgress((value) => setLoading(value));
    const { loadCharacter } = setCharacter(renderer, scene, camera);
    const landingDiv = document.getElementById("landingDiv");

    let isMounted = true;
    let headBone: THREE.Object3D | null = null;
    let screenLight: THREE.Object3D | null = null;
    let loadedCharacter: THREE.Object3D | null = null;
    let mixer: THREE.AnimationMixer | null = null;
    let hoverCleanup: (() => void) | undefined;
    let animationFrame = 0;
    let introTimer: number | undefined;
    let touchDebounce: number | undefined;
    let resizeFrame: number | undefined;

    let mouse = { x: 0, y: 0 };
    let interpolation = { x: 0.1, y: 0.2 };

    const onMouseMove = (event: MouseEvent) => {
      handleMouseMove(event, (x, y) => {
        mouse = { x, y };
      });
    };

    const onTouchMove = (event: TouchEvent) => {
      handleTouchMove(event, (x, y) => {
        mouse = { x, y };
      });
    };

    const onTouchStart = () => {
      touchDebounce = window.setTimeout(() => {
        landingDiv?.addEventListener("touchmove", onTouchMove, { passive: true });
      }, 200);
    };

    const onTouchEnd = () => {
      landingDiv?.removeEventListener("touchmove", onTouchMove);
      handleTouchEnd((x, y, interpolationX, interpolationY) => {
        mouse = { x, y };
        interpolation = { x: interpolationX, y: interpolationY };
      });
    };

    const resizeHandler = () => {
      if (resizeFrame) {
        window.cancelAnimationFrame(resizeFrame);
      }

      resizeFrame = window.requestAnimationFrame(() => {
        if (loadedCharacter) {
          handleResize(renderer, camera, canvasDiv, loadedCharacter);
        }
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    landingDiv?.addEventListener("touchstart", onTouchStart, { passive: true });
    landingDiv?.addEventListener("touchend", onTouchEnd);
    const resizeObserver = new ResizeObserver(resizeHandler);
    resizeObserver.observe(canvasContainer);

    loadCharacter()
      .then((gltf) => {
        if (!gltf || !isMounted) {
          return;
        }

        const animations = setAnimations(gltf);
        if (hoverDivRef.current) {
          hoverCleanup = animations.hover(gltf, hoverDivRef.current) ?? undefined;
        }

        mixer = animations.mixer;
        loadedCharacter = gltf.scene;
        scene.add(loadedCharacter);
        headBone = loadedCharacter.getObjectByName("spine006") || null;
        screenLight = loadedCharacter.getObjectByName("screenlight") || null;
        resizeHandler();

        progress.loaded().then(() => {
          introTimer = window.setTimeout(() => {
            light.turnOnLights();
            animations.startIntro();
          }, 2500);
        });

        window.addEventListener("resize", resizeHandler);
      })
      .catch((error) => {
        console.error("Failed to initialize character scene:", error);
      });

    const animate = () => {
      animationFrame = window.requestAnimationFrame(animate);

      if (headBone) {
        handleHeadRotation(
          headBone,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp
        );
        light.setPointLight(screenLight);
      }

      const delta = clock.getDelta();
      mixer?.update(delta);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isMounted = false;
      progress.clear();
      hoverCleanup?.();
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", resizeHandler);
      document.removeEventListener("mousemove", onMouseMove);
      landingDiv?.removeEventListener("touchstart", onTouchStart);
      landingDiv?.removeEventListener("touchmove", onTouchMove);
      landingDiv?.removeEventListener("touchend", onTouchEnd);

      if (touchDebounce) {
        window.clearTimeout(touchDebounce);
      }
      if (resizeFrame) {
        window.cancelAnimationFrame(resizeFrame);
      }
      if (introTimer) {
        window.clearTimeout(introTimer);
      }

      scene.clear();
      renderer.dispose();

      if (renderer.domElement.parentElement === canvasContainer) {
        canvasContainer.removeChild(renderer.domElement);
      }
    };
  }, [setLoading]);

  return (
    <div className="character-container">
      <div className="character-model" ref={canvasDiv}>
        <div className="character-rim"></div>
        <div className="character-hover" ref={hoverDivRef}></div>
      </div>
    </div>
  );
};

export default Scene;
