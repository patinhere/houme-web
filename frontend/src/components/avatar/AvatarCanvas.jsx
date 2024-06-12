import "./avatarCanvas.scss";
import { Canvas, useLoader } from "@react-three/fiber";
import { Html, OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { useEffect, useState, useContext } from "react";
import { AvatarAnimationContext } from "../../context/AvatarAnimationContext";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";
import { makeRequest } from "../../axios";

const AvatarModel = ({
  userId,
  userAvatar,
  animationIndex,
  setAnimationIndex,
}) => {
  //  const avatarUser = useGLTF("/upload/avatar" + userId + ".glb");
  const avatarModel = useGLTF("/upload/avatarModel" + ".glb");
  const avatarUser = useGLTF(userAvatar);

  const anim = avatarModel.scene;
  const animClone = SkeletonUtils.clone(anim);
  //avatarUser.scene = animClone;

  const clock = new THREE.Clock();
  // const { actions, names } = useAnimations(
  //   avatarModel.animations,
  //   avatarModel.scene
  // );

  const mixer = new THREE.AnimationMixer(avatarUser.scene);
  const actions = [];
  avatarModel.animations.forEach((clip) => {
    actions.push(mixer.clipAction(clip));
  });

  //console.log(actions);
  console.log(animationIndex);
  //actions[0].play();

  const actionDied = actions[0];
  const actionExcited = actions[1];
  const actionPunch = actions[10];

  //console.log(actionExcited);
  //console.log(userId);
  //const actionDied = actions[names[0]];
  //const actionExcited = actions[names[1]];
  //const actionPunch = actions[names[10]];

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
  }, [mixer, avatarUser.scene]);

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
