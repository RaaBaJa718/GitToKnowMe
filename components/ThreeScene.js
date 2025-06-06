import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeScene({ repos = [] }) {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 10;
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        mountRef.current.appendChild(renderer.domElement);

        // Lighting
        const light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(10, 10, 10);
        scene.add(light);

        // Add a single sphere at the origin
        const geometry = new THREE.SphereGeometry(2, 32, 32);
        const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(0, 0, 0);
        scene.add(sphere);

        function animate() {
            requestAnimationFrame(animate);
            sphere.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        animate();

        return () => {
            if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return (
        <div ref={mountRef} className="w-full h-[400px] bg-gray-900 border-4 border-red-500">
            <span style={{ color: 'white', position: 'absolute', zIndex: 10 }}>Three.js Mount Test</span>
        </div>
    );
}