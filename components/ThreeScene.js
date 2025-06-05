import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeScene({ repos = [] }) {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Create spheres for each repo
        repos.forEach((repo, index) => {
            const geometry = new THREE.SphereGeometry(0.5, 32, 32);
            const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
            const sphere = new THREE.Mesh(geometry, material);
            sphere.position.set(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            );
            scene.add(sphere);
        });

        camera.position.z = 5;

        function animate() {
            requestAnimationFrame(animate);
            scene.children.forEach(mesh => {
                if (mesh instanceof THREE.Mesh) {
                    mesh.rotation.y += 0.01;
                }
            });
            renderer.render(scene, camera);
        }
        animate();

        // Clean up on unmount
        return () => {
            mountRef.current.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, [repos]);

    return <div ref={mountRef} />;
}