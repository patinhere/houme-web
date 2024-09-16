import "./avatarCanvas.scss";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useMemo } from "react";
import { makeRequest } from "../../axios";

const AvatarModel = ({
  userId,
  userAvatar,
  animationIndex,
  setAnimationIndex,
}) => {
  const avatarModel = useGLTF("/upload/avatarModel" + ".glb");
  const avatarUser = useGLTF(userAvatar);

  const clock = useMemo(() => new THREE.Clock(), []);

  const mixer = useMemo(
    () => new THREE.AnimationMixer(avatarUser.scene),
    [avatarUser.scene]
  );

  const actions = [];
  avatarModel.animations.forEach((clip) => {
    actions.push(mixer.clipAction(clip));
  });

  const actionDied = actions[0];
  const actionExcited = actions[1];
  const actionPunch = actions[10];

  useEffect(() => {
    let requestID;

    const animate = () => {
      const delta = clock.getDelta();
      mixer.update(delta);
      requestID = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(requestID);
      mixer.stopAllAction();
      mixer.uncacheRoot(avatarUser.scene);
      avatarUser.scene.traverse((object) => {
        if (object.isMesh) {
          object.geometry.dispose();
          if (object.material.isMaterial) {
            object.material.dispose();
          } else {
            for (const material of object.material) material.dispose();
          }
        }
      });
    };
  }, [mixer, avatarUser.scene, clock]);

  useEffect(() => {
    if (animationIndex === 0) {
      //Died
      actionDied.reset().fadeIn(0.5).play();
      actionDied.setLoop(THREE.LoopOnce, 1);
      actionDied.clampWhenFinished = true;
      setTimeout(() => {
        setAnimationIndex(1);
      }, [13000]);
    } else if (animationIndex === 10) {
      //punch

      actionPunch.reset().fadeIn(0.5).play();
      actionPunch.setLoop(THREE.LoopOnce, 1);
      actionPunch.clampWhenFinished = true;
      setTimeout(() => {
        setAnimationIndex(1);
      }, [13000]);
    } else if (animationIndex === 1) {
      //excited
      actionExcited.reset().fadeIn(0.5).play();
    }

    //actions[names[animationIndex]].reset().fadeIn(0.5).play();

    return () => {
      actions[animationIndex].fadeOut();
    };
  }, [
    animationIndex,
    actions,
    actionDied,
    actionExcited,
    actionPunch,
    setAnimationIndex,
    userId,
  ]);

  useEffect(() => {
    const logHistory = async (log) => {
      try {
        await makeRequest.post("/history", {
          userId: userId,
          log: log,
        });
      } catch (err) {
        console.log(err);
      }
    };

    if (animationIndex === 10) {
      const log = "kick";
      logHistory(log);
    } else if (animationIndex === 0) {
      const log = "punch";
      logHistory(log);
    }
  }, [animationIndex, userId]);

  return (
    <group>
      <primitive
        object={avatarUser.scene}
        scale={3.5}
        position-y={-3}
        rotation-x={0}
      />
    </group>
  );
};

const AvatarCanvas = ({
  userId,
  userAvatar,
  animationIndex,
  setAnimationIndex,
}) => {
  return (
    <div className="avatar">
      <Canvas>
        <ambientLight intensity={2.5} />
        <pointLight position={(1, 1, 1)} />
        <OrbitControls />
        <AvatarModel
          userId={userId}
          userAvatar={userAvatar}
          animationIndex={animationIndex}
          setAnimationIndex={setAnimationIndex}
        />
      </Canvas>
    </div>
  );
};

export default AvatarCanvas;
