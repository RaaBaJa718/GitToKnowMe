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
        camera.position.z = 15;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        mountRef.current.appendChild(renderer.domElement);

        // Lighting for better visuals
        const light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(10, 10, 10);
        scene.add(light);

        // Group to rotate all spheres together
        const group = new THREE.Group();

        // Create a sphere for each repo and add to group
        const radius = 6;
        repos.forEach((repo, i) => {
            const angle = (i / repos.length) * Math.PI * 2;
            const geometry = new THREE.SphereGeometry(0.7, 32, 32);
            const material = new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff });
            const sphere = new THREE.Mesh(geometry, material);
            // Position spheres in a circle
            sphere.position.set(
                Math.cos(angle) * radius,
                Math.sin(angle) * radius,
                0
            );
            group.add(sphere);
        });

        scene.add(group);

        // Animate: rotate group and orbit spheres
        let frame = 0;
        function animate() {
            requestAnimationFrame(animate);
            frame += 0.01;
            group.rotation.y += 0.005;
            group.children.forEach((sphere, i) => {
                // Each sphere orbits in a wavy pattern
                const angle = (i / repos.length) * Math.PI * 2 + frame;
                sphere.position.x = Math.cos(angle) * radius;
                sphere.position.y = Math.sin(angle) * radius;
                sphere.position.z = Math.sin(frame + i) * 2;
            });
            renderer.render(scene, camera);
        }
        animate();

        return () => {
            if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, [repos]);

    return <div ref={mountRef} className="w-full h-[400px] bg-gray-900" />;
}