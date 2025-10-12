"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreePage() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    // 화면 전체 크기로 설정
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000011); 
    mountRef.current?.appendChild(renderer.domElement);

    // 여러 개체들 추가
    const objects: THREE.Mesh[] = [];

    // 큐브
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshLambertMaterial({ color: 0xff6600 })
    );
    cube.position.x = -3;
    scene.add(cube);
    objects.push(cube);

    // 구
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.7, 32, 32),
      new THREE.MeshLambertMaterial({ color: 0x00ff66 })
    );
    sphere.position.x = 0;
    scene.add(sphere);
    objects.push(sphere);

    // 원뿔
    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(0.6, 1.5, 32),
      new THREE.MeshLambertMaterial({ color: 0x6600ff })
    );
    cone.position.x = 3;
    scene.add(cone);
    objects.push(cone);

    // 조명 추가
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // 카메라 위치
    camera.position.z = 8;

    // 화면 크기 변경 대응
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 마우스 움직임으로 카메라 회전
    let mouseX = 0, mouseY = 0;
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 애니메이션
    function animate() {
      // 각 객체들 회전
      objects.forEach((obj, index) => {
        obj.rotation.x += 0.01 * (index + 1);
        obj.rotation.y += 0.01 * (index + 1);
        obj.rotation.z += 0.005 * (index + 1);
      });

      // 마우스 따라 카메라 살짝 움직임
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();

    // 클린업
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        width: '100vw', 
        height: '100vh', 
        overflow: 'hidden',
        margin: 0,
        padding: 0
      }} 
    />
  );
}