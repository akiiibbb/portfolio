import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setAllTimeline, setCharTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = async () => {
    try {
      const encryptedBlob = await decryptFile(
        "/models/character.enc",
        "Character3D#@"
      );
      const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

      return await new Promise<GLTF | null>((resolve, reject) => {
        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf: GLTF) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);

            character.traverse((child: THREE.Object3D) => {
              if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.frustumCulled = true;
              }
            });

            setCharTimeline(character, camera);
            setAllTimeline();

            character.getObjectByName("footR")!.position.y = 3.36;
            character.getObjectByName("footL")!.position.y = 3.36;

            URL.revokeObjectURL(blobUrl);
            dracoLoader.dispose();
            resolve(gltf);
          },
          undefined,
          (error: unknown) => {
            URL.revokeObjectURL(blobUrl);
            dracoLoader.dispose();
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      });
    } catch (error) {
      dracoLoader.dispose();
      console.error(error);
      throw error;
    }
  };

  return { loadCharacter };
};

export default setCharacter;
