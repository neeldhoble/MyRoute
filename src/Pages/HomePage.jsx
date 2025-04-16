import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber'; // Import for rendering the 3D scene
import { OrbitControls, useGLTF } from '@react-three/drei'; // Import for model loading and controls
import { motion } from 'framer-motion'; // Import for animations

// Load the 3D model
function TaxiModel() {
  const gltf = useGLTF('/models/animal_crossing_taxi_-_fan_art.glb'); // Load the GLB model from public directory
  const ref = useRef(); // Reference for controlling the model

  // Rotate the model continuously on the Y-axis
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01; // Small increment for smooth rotation
    }
  });

  return <primitive object={gltf.scene} ref={ref} scale={0.8} />; // Apply rotation and scale (zoom out the model)
}
useGLTF.preload('/models/animal_crossing_taxi_-_fan_art.glb'); // Preload the model for performance optimization

const HomePage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white px-6 py-10">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center bg-[rgb(168,213,226)] p-8 rounded-3xl shadow-lg">
        
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }} // Initial opacity and position
          animate={{ opacity: 1, x: 0 }} // Final opacity and position
          transition={{ duration: 1 }} // Duration for the animation
          className="space-y-6"
        >
          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight">
            Welcome to <span className="text-blue-800">MyRoute</span>
          </h1>
          {/* Description */}
          <p className="text-lg md:text-xl text-gray-800">
            Explore live traffic, play smart games, and read our latest tech blogs — all from one place.
          </p>
        </motion.div>

        {/* 3D Model Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }} // Initial opacity and position for 3D section
          animate={{ opacity: 1, x: 0 }} // Final opacity and position
          transition={{ duration: 1 }} // Duration for the animation
          className="w-full h-[600px] bg-[rgb(168,213,226)] rounded-2xl p-4" // Increased height of canvas
        >
          {/* 3D Canvas */}
          <Canvas className="rounded-2xl">
            {/* Ambient light for overall scene lighting */}
            <ambientLight intensity={0.8} />
            {/* Directional light for highlighting the model */}
            <directionalLight position={[3, 3, 3]} />
            {/* Orbit controls for allowing user to interact with the 3D scene */}
            <OrbitControls enableZoom={true} />
            {/* Taxi model component */}
            <TaxiModel />
          </Canvas>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
