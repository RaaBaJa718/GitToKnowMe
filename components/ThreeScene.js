import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeScene({ repos }) {
    const mountRef = useRef(null);

    useEffect(() => {
        console.log("Repos received:", repos);
        console.log("Three.js Scene is mounting...");

        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(width, height);
        mountRef.current.appendChild(renderer.domElement);

        // Add a helper grid to the scene to verify rendering
        const gridHelper = new THREE.GridHelper(10, 10);
        scene.add(gridHelper);

        // Add an Axes Helper (red = x, green = y, blue = z)
        const axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);

        // Create spheres for each repo
        repos.forEach((repo, index) => {
            console.log(`Creating sphere for: ${repo.name}`);
            const geometry = new THREE.SphereGeometry(1.5, 32, 32); // bigger sphere
            const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
            const sphere = new THREE.Mesh(geometry, material);
            sphere.position.set(
                (Math.random() - 0.5) * 5,
                (Math.random() - 0.5) * 5,
                -5 - Math.random() * 5 // z between -5 and -10
            );
            scene.add(sphere);
        });

        // Add a test sphere at the origin
        const testGeometry = new THREE.SphereGeometry(1.5, 32, 32);
        const testMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const testSphere = new THREE.Mesh(testGeometry, testMaterial);
        testSphere.position.set(0, 0, 0);
        scene.add(testSphere);

        camera.position.z = 10;

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
            if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, [repos]);

    return <div ref={mountRef} className="w-full h-[400px] bg-gray-900 border-2 border-red-500" />;
}