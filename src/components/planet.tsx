import React, { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";

import bgShining from "../assets/img/bgShining.png";

const Earth = () => {
  const myEarth = React.useRef();
  const [earth] = useLoader(TextureLoader, ["Earth_duo.png"]);

  return (
    // @ts-ignore
    <mesh className="relative z-20" ref={myEarth} scale={2.5}>
      {/* @ts-ignore */}
      <sphereGeometry />
      <sphereBufferGeometry args={[1, 64, 64]} />
      <meshStandardMaterial displacementScale={0.5} map={earth} />
    </mesh>
  );
};

const Planet = () => {
  return (
    <div className="ml-[50px] mb-[-80px] w-[600px] h-[600px] relative">
      <div className="relative z-20  w-[470px] h-[470px]">
        <Suspense fallback={null}>
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={92}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={2} />
            </PerspectiveCamera>
            <Earth />
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              // maxPolarAngle={Math.PI / 2}
              // minPolarAngle={Math.PI / 2}
              // maxAzimuthAngle={Math.PI / 2}
              // minAzimuthAngle={Math.PI / 2}
              setAzimuthalAngle={() => Math.PI / 2}
              getPolarAngle={() => Math.PI / 2}
            />
          </Canvas>
        </Suspense>
      </div>
      <img
        className="absolute w-full top-[-50px] left-[-40px] z-10"
        src={bgShining}
        alt=""
      />
    </div>
  );
};

export default Planet;
