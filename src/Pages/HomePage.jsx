import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';

// Load the model
function TaxiModel() {
  const gltf = useGLTF('/models/animal_crossing_taxi_-_fan_art.glb'); // path from public
  const ref = useRef();

  // Rotate the model continuously
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01; // Rotating along the Y-axis
    }
  });

  return <primitive object={gltf.scene} ref={ref} scale={2.2} />;
}
useGLTF.preload('/models/animal_crossing_taxi_-_fan_art.glb');

const HomePage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white px-6 py-10">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center bg-[rgb(168,213,226)] p-8 rounded-3xl shadow-lg">
        
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight">
            Welcome to <span className="text-blue-800">MyRoute ✨</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-800">
            Explore live traffic, play smart games, and read our latest tech blogs — all from one place.
          </p>
        </motion.div>

        {/* 3D Model Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full h-[400px] bg-[rgb(168,213,226)] rounded-2xl shadow-xl p-4"
        >
          <Canvas className="rounded-2xl">
            <ambientLight intensity={0.8} />
            <directionalLight position={[3, 3, 3]} />
            <OrbitControls enableZoom={true} />
            <TaxiModel />
          </Canvas>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
