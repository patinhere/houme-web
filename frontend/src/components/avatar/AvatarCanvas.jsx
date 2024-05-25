import "./avatarCanvas.scss";
import { Canvas, useLoader } from "@react-three/fiber";
import { Html, OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { useEffect, useState, useContext } from "react";
import { AvatarAnimationContext } from "../../context/AvatarAnimationContext";

const Avatar = ({ userId, animationIndex, setAnimationIndex }) => {
  const avatar = useGLTF("/upload/avatar" + userId + ".glb");
  const { actions, names } = useAnimations(avatar.animations, avatar.scene);
  let mixer = new THREE.AnimationMixer(names);
  const actionDied = actions[names[0]];
  const actionExcited = actions[names[1]];
  const actionPunch = actions[names[10]];

  useEffect(() => {
    console.log(animationIndex);
    if (animationIndex === 0) {
      actionDied.reset().fadeIn(0.5).play();
      //actionDied.ended = false;
      actionDied.setLoop(THREE.LoopOnce, 1);
      actionDied.clampWhenFinished = true;
      //actionDied.paused = false;
      //actionDied.play(0);
      setTimeout(() => {
        setAnimationIndex(1);
      }, [13000]);
    } else if (animationIndex === 10) {
      actionPunch.reset().fadeIn(0.5).play();
      //actionPunch.ended = false;
      actionPunch.setLoop(THREE.LoopOnce, 1);
      actionPunch.clampWhenFinished = true;
      //actionPunch.paused = false;
      //actionPunch.play(0);
      setTimeout(() => {
        setAnimationIndex(1);
      }, [13000]);
    } else if (animationIndex === 1) {
      actionExcited.reset().fadeIn(0.5).play();
    }
    //actions[names[animationIndex]].reset().fadeIn(0.5).play();

    return () => {
      actions[names[animationIndex]].fadeOut();
    };
  }, [animationIndex]);

  return (
    <group>
      <primitive
        object={avatar.scene}
        scale={3.5}
        position-y={-3}
        rotation-x={0}
      />
    </group>
  );
};

const AvatarCanvas = ({ userId, animationIndex, setAnimationIndex }) => {
  return (
    <div className="avatar">
      <Canvas>
        <ambientLight intensity={2.5} />
        <pointLight position={(1, 1, 1)} />
        <OrbitControls />
        <Avatar
          userId={userId}
          animationIndex={animationIndex}
          setAnimationIndex={setAnimationIndex}
        />
      </Canvas>
    </div>
  );
};

export default AvatarCanvas;
