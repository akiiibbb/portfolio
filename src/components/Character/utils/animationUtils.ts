import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { eyebrowBoneNames, typingBoneNames } from "../../../data/boneData";

const setAnimations = (gltf: GLTF) => {
  const mixer = new THREE.AnimationMixer(gltf.scene);

  if (gltf.animations) {
    const introClip = gltf.animations.find(
      (clip: THREE.AnimationClip) => clip.name === "introAnimation"
    );
    const introAction = mixer.clipAction(introClip!);
    introAction.setLoop(THREE.LoopOnce, 1);
    introAction.clampWhenFinished = true;
    introAction.play();

    ["key1", "key2", "key5", "key6"].forEach((name) => {
      const clip = THREE.AnimationClip.findByName(gltf.animations, name);
      if (!clip) {
        console.error(`Animation "${name}" not found`);
        return;
      }

      const action = mixer.clipAction(clip);
      action.play();
      action.timeScale = 1.2;
    });

    const typingAction = createBoneAction(gltf, mixer, "typing", typingBoneNames);
    if (typingAction) {
      typingAction.enabled = true;
      typingAction.play();
      typingAction.timeScale = 1.2;
    }
  }

  function startIntro() {
    const introClip = gltf.animations.find(
      (clip: THREE.AnimationClip) => clip.name === "introAnimation"
    );
    const introAction = mixer.clipAction(introClip!);
    introAction.clampWhenFinished = true;
    introAction.reset().play();

    window.setTimeout(() => {
      const blink = gltf.animations.find(
        (clip: THREE.AnimationClip) => clip.name === "Blink"
      );
      if (blink) {
        mixer.clipAction(blink).play().fadeIn(0.5);
      }
    }, 2500);
  }

  function hover(model: GLTF, hoverDiv: HTMLDivElement) {
    const eyebrowAction = createBoneAction(
      model,
      mixer,
      "browup",
      eyebrowBoneNames
    );
    let isHovering = false;

    if (eyebrowAction) {
      eyebrowAction.setLoop(THREE.LoopOnce, 1);
      eyebrowAction.clampWhenFinished = true;
      eyebrowAction.enabled = true;
    }

    const onHoverFace = () => {
      if (eyebrowAction && !isHovering) {
        isHovering = true;
        eyebrowAction.reset();
        eyebrowAction.enabled = true;
        eyebrowAction.setEffectiveWeight(4);
        eyebrowAction.fadeIn(0.5).play();
      }
    };

    const onLeaveFace = () => {
      if (eyebrowAction && isHovering) {
        isHovering = false;
        eyebrowAction.fadeOut(0.6);
      }
    };

    hoverDiv.addEventListener("mouseenter", onHoverFace);
    hoverDiv.addEventListener("mouseleave", onLeaveFace);

    return () => {
      hoverDiv.removeEventListener("mouseenter", onHoverFace);
      hoverDiv.removeEventListener("mouseleave", onLeaveFace);
    };
  }

  return { mixer, startIntro, hover };
};

const createBoneAction = (
  gltf: GLTF,
  mixer: THREE.AnimationMixer,
  clip: string,
  boneNames: string[]
): THREE.AnimationAction | null => {
  const animationClip = THREE.AnimationClip.findByName(gltf.animations, clip);
  if (!animationClip) {
    console.error(`Animation "${clip}" not found in GLTF file.`);
    return null;
  }

  const filteredClip = filterAnimationTracks(animationClip, boneNames);
  return mixer.clipAction(filteredClip);
};

const filterAnimationTracks = (
  clip: THREE.AnimationClip,
  boneNames: string[]
): THREE.AnimationClip => {
  const filteredTracks = clip.tracks.filter((track: THREE.KeyframeTrack) =>
    boneNames.some((boneName) => track.name.includes(boneName))
  );

  return new THREE.AnimationClip(
    `${clip.name}_filtered`,
    clip.duration,
    filteredTracks
  );
};

export default setAnimations;
