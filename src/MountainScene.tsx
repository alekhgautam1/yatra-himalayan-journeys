import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function terrainHeight(x: number, z: number) {
  const peak = (cx: number, cz: number, width: number, height: number) =>
    height * Math.exp(-((x - cx) ** 2 + (z - cz) ** 2 * 1.25) / width);
  const mountains =
    peak(-1.55, 0.05, 1.2, 1.65) +
    peak(0.05, -0.3, 0.9, 2.2) +
    peak(1.55, 0.15, 1.25, 1.75);
  const ridges = 0.78 + 0.22 * Math.abs(Math.sin(x * 3.6 + z * 2.5));
  return mountains * ridges + mountains * 0.045 * Math.sin(x * 11 + z * 7);
}

export default function MountainScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      mount.classList.add('scene-fallback');
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(5.1, 4.4, 8.8);
    camera.lookAt(0, 0.55, 0);

    const group = new THREE.Group();
    scene.add(group);

    const terrain = new THREE.PlaneGeometry(6.8, 4.6, 100, 68);
    const positions = terrain.getAttribute('position') as THREE.BufferAttribute;
    const colors: number[] = [];
    const low = new THREE.Color('#315e52');
    const high = new THREE.Color('#c2d9c2');
    const mixed = new THREE.Color();

    for (let i = 0; i < positions.count; i += 1) {
      const x = positions.getX(i);
      const z = positions.getY(i);
      const height = terrainHeight(x, z);
      positions.setZ(i, height);
      mixed.copy(low).lerp(high, Math.min(height / 2.2, 1));
      colors.push(mixed.r, mixed.g, mixed.b);
    }
    terrain.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    terrain.rotateX(-Math.PI / 2);
    terrain.computeVertexNormals();

    const terrainMaterial = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.92,
      metalness: 0.02,
      side: THREE.DoubleSide,
    });
    group.add(new THREE.Mesh(terrain, terrainMaterial));

    const baseGeometry = new THREE.BoxGeometry(6.8, 0.16, 4.6);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: '#254c43', roughness: 1 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -0.08;
    group.add(base);

    // Fine lines follow the actual surface so the terrain reads as a dimensional map.
    const gridPoints: number[] = [];
    for (let row = 0; row <= 34; row += 1) {
      const z = -2.3 + (row / 34) * 4.6;
      for (let col = 0; col < 100; col += 1) {
        const x1 = -3.4 + (col / 100) * 6.8;
        const x2 = -3.4 + ((col + 1) / 100) * 6.8;
        gridPoints.push(x1, terrainHeight(x1, -z) + 0.012, z, x2, terrainHeight(x2, -z) + 0.012, z);
      }
    }
    for (let col = 0; col <= 50; col += 1) {
      const x = -3.4 + (col / 50) * 6.8;
      for (let row = 0; row < 68; row += 1) {
        const z1 = -2.3 + (row / 68) * 4.6;
        const z2 = -2.3 + ((row + 1) / 68) * 4.6;
        gridPoints.push(x, terrainHeight(x, -z1) + 0.012, z1, x, terrainHeight(x, -z2) + 0.012, z2);
      }
    }
    const gridGeometry = new THREE.BufferGeometry();
    gridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(gridPoints, 3));
    const gridMaterial = new THREE.LineBasicMaterial({ color: '#c4e3ce', transparent: true, opacity: 0.23 });
    group.add(new THREE.LineSegments(gridGeometry, gridMaterial));

    const edgeGeometry = new THREE.EdgesGeometry(baseGeometry);
    const edgeMaterial = new THREE.LineBasicMaterial({ color: '#a8cdb8', transparent: true, opacity: 0.45 });
    const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    edges.position.y = -0.08;
    group.add(edges);

    scene.add(new THREE.AmbientLight('#d7ede0', 1.6));
    const light = new THREE.DirectionalLight('#f3f7e7', 2.4);
    light.position.set(-3, 7, 5);
    scene.add(light);

    let targetX = 0;
    let targetY = 0;
    let visible = true;
    let frame = 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const width = mount.clientWidth || 1;
      const height = mount.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.render(scene, camera);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.35;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.12;
      if (reducedMotion) {
        group.rotation.y = targetX;
        group.rotation.x = targetY;
        renderer.render(scene, camera);
      }
    };
    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };
    mount.addEventListener('pointermove', onPointerMove);
    mount.addEventListener('pointerleave', onPointerLeave);

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(mount);

    const animate = (time: number) => {
      if (visible) {
        group.rotation.y += (Math.sin(time * 0.00035) * 0.13 + targetX - group.rotation.y) * 0.025;
        group.rotation.x += (targetY - group.rotation.x) * 0.025;
        renderer.render(scene, camera);
      }
      frame = window.requestAnimationFrame(animate);
    };
    if (!reducedMotion) frame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      mount.removeEventListener('pointermove', onPointerMove);
      mount.removeEventListener('pointerleave', onPointerLeave);
      terrain.dispose();
      terrainMaterial.dispose();
      baseGeometry.dispose();
      baseMaterial.dispose();
      gridGeometry.dispose();
      gridMaterial.dispose();
      edgeGeometry.dispose();
      edgeMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="mountain-scene" ref={mountRef} aria-hidden="true" />;
}