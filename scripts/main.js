/* =========================
   3D ANIMATION SETUP
========================= */

// Initialize all 3D scenes
const sceneConfigs = [
    { id: 'hero3d', type: 'floating-cubes', colors: ['#5D5CDE', '#4ECDC4', '#FFE66D'] },
    { id: 'about3d1', type: 'rotating-sphere', colors: ['#FF6B6B', '#FFE66D'] },
    { id: 'about3d2', type: 'pulsing-torus', colors: ['#5D5CDE', '#4ECDC4'] },
    { id: 'about3d3', type: 'spinning-cube', colors: ['#4ECDC4', '#FFE66D'] },
    { id: 'services3d1', type: 'morphing-shape', colors: ['#FF6B6B', '#5D5CDE'] },
    { id: 'services3d2', type: 'particle-system', colors: ['#4ECDC4', '#FFE66D'] },
    { id: 'services3d3', type: 'wave-pattern', colors: ['#5D5CDE', '#FF6B6B'] },
    { id: 'collections3d1', type: 'rotating-rings', colors: ['#FFE66D', '#4ECDC4'] },
    { id: 'collections3d2', type: 'bouncing-spheres', colors: ['#FF6B6B', '#5D5CDE'] },
    { id: 'collections3d3', type: 'spiral-helix', colors: ['#4ECDC4', '#FFE66D'] },
    { id: 'testimonials3d1', type: 'floating-diamonds', colors: ['#FFE66D', '#FF6B6B'] },
    { id: 'testimonials3d2', type: 'rotating-prism', colors: ['#5D5CDE', '#4ECDC4'] },
    { id: 'testimonials3d3', type: 'pulsing-star', colors: ['#FF6B6B', '#FFE66D'] },
    { id: 'events3d1', type: 'calendar-cube', colors: ['#4ECDC4', '#5D5CDE'] },
    { id: 'events3d2', type: 'clock-rotation', colors: ['#FFE66D', '#FF6B6B'] },
    { id: 'events3d3', type: 'conference-stage', colors: ['#5D5CDE', '#4ECDC4'] },
    { id: 'faq3d1', type: 'question-mark', colors: ['#FF6B6B', '#FFE66D'] },
    { id: 'faq3d2', type: 'info-bubble', colors: ['#4ECDC4', '#5D5CDE'] },
    { id: 'faq3d3', type: 'help-icon', colors: ['#FFE66D', '#FF6B6B'] },
    { id: 'careers3d1', type: 'ladder-climb', colors: ['#5D5CDE', '#4ECDC4'] },
    { id: 'careers3d2', type: 'gear-system', colors: ['#FF6B6B', '#FFE66D'] },
    { id: 'careers3d3', type: 'growth-chart', colors: ['#4ECDC4', '#5D5CDE'] },
    { id: 'contact3d1', type: 'message-envelope', colors: ['#FFE66D', '#FF6B6B'] },
    { id: 'contact3d2', type: 'phone-ring', colors: ['#5D5CDE', '#4ECDC4'] },
    { id: 'contact3d3', type: 'handshake', colors: ['#FF6B6B', '#FFE66D'] }
];

// Create 3D scene for each configured element
sceneConfigs.forEach(config => {
    const container = document.getElementById(config.id);
    if (container) {
        create3DScene(container, config);
    }
});

/* =========================
   3D SCENE CREATION FUNCTION
========================= */
function create3DScene(container, config) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create different 3D objects based on type
    let mesh;
    const materials = config.colors.map(color => 
        new THREE.MeshPhongMaterial({ 
            color: color,
            shininess: 100,
            transparent: true,
            opacity: 0.8
        })
    );

    switch(config.type) {
        case 'floating-cubes':
            // Create animated data visualization elements
            const dataElements = [];
            
            // Create animated bar chart
            for(let i = 0; i < 8; i++) {
                const height = 0.5 + Math.random() * 2;
                const barGeometry = new THREE.BoxGeometry(0.2, height, 0.2);
                const bar = new THREE.Mesh(barGeometry, materials[i % materials.length]);
                bar.position.set(
                    (i - 4) * 0.4,
                    -1 + height / 2,
                    -2
                );
                bar.userData = { 
                    originalHeight: height,
                    animationSpeed: 0.02 + Math.random() * 0.02,
                    phase: i * 0.5
                };
                dataElements.push(bar);
                scene.add(bar);
            }
            
            // Create floating data points (spheres representing data nodes)
            for(let i = 0; i < 12; i++) {
                const nodeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
                const node = new THREE.Mesh(nodeGeometry, materials[i % materials.length]);
                node.position.set(
                    (Math.random() - 0.5) * 6,
                    (Math.random() - 0.5) * 4,
                    (Math.random() - 0.5) * 4
                );
                node.userData = {
                    velocity: new THREE.Vector3(
                        (Math.random() - 0.5) * 0.02,
                        (Math.random() - 0.5) * 0.02,
                        (Math.random() - 0.5) * 0.02
                    ),
                    pulseSpeed: 0.05 + Math.random() * 0.03
                };
                dataElements.push(node);
                scene.add(node);
            }
            
            // Create connecting lines between data points
            const lineMaterial = new THREE.LineBasicMaterial({ 
                color: 0x4ECDC4, 
                transparent: true, 
                opacity: 0.3 
            });
            
            for(let i = 0; i < 8; i++) {
                const points = [];
                points.push(new THREE.Vector3(
                    (Math.random() - 0.5) * 4,
                    (Math.random() - 0.5) * 3,
                    (Math.random() - 0.5) * 3
                ));
                points.push(new THREE.Vector3(
                    (Math.random() - 0.5) * 4,
                    (Math.random() - 0.5) * 3,
                    (Math.random() - 0.5) * 3
                ));
                
                const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
                const line = new THREE.Line(lineGeometry, lineMaterial);
                line.userData = { rotationSpeed: 0.005 + Math.random() * 0.01 };
                dataElements.push(line);
                scene.add(line);
            }
            
            mesh = dataElements;
            break;

        case 'rotating-sphere':
            const sphereGeometry = new THREE.SphereGeometry(0.8, 32, 32);
            mesh = new THREE.Mesh(sphereGeometry, materials[0]);
            scene.add(mesh);
            break;

        case 'pulsing-torus':
            const torusGeometry = new THREE.TorusGeometry(0.6, 0.3, 16, 100);
            mesh = new THREE.Mesh(torusGeometry, materials[0]);
            scene.add(mesh);
            break;

        case 'spinning-cube':
            const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
            mesh = new THREE.Mesh(cubeGeometry, materials[0]);
            scene.add(mesh);
            break;

        default:
            // Default: rotating cube
            const defaultGeometry = new THREE.BoxGeometry(1, 1, 1);
            mesh = new THREE.Mesh(defaultGeometry, materials[0]);
            scene.add(mesh);
    }

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    camera.position.z = 3;

    // Animation function
    function animate() {
        requestAnimationFrame(animate);

        if (Array.isArray(mesh)) {
            // Handle data visualization elements
            if (config.type === 'floating-cubes') {
                mesh.forEach((obj, index) => {
                    if (obj.userData.originalHeight) {
                        // Animate bar chart heights
                        const time = Date.now() * obj.userData.animationSpeed;
                        const newHeight = obj.userData.originalHeight * (0.5 + Math.sin(time + obj.userData.phase) * 0.5);
                        obj.scale.y = newHeight / obj.userData.originalHeight;
                        obj.position.y = -1 + (newHeight * obj.userData.originalHeight) / 2;
                    } else if (obj.userData.velocity) {
                        // Animate floating data nodes
                        obj.position.add(obj.userData.velocity);
                        obj.scale.setScalar(1 + Math.sin(Date.now() * obj.userData.pulseSpeed) * 0.3);
                        
                        // Bounce off boundaries
                        if (Math.abs(obj.position.x) > 3) obj.userData.velocity.x *= -1;
                        if (Math.abs(obj.position.y) > 2) obj.userData.velocity.y *= -1;
                        if (Math.abs(obj.position.z) > 2) obj.userData.velocity.z *= -1;
                    } else if (obj.userData.rotationSpeed) {
                        // Animate connecting lines
                        obj.rotation.z += obj.userData.rotationSpeed;
                        obj.material.opacity = 0.2 + Math.sin(Date.now() * 0.003) * 0.1;
                    }
                });
            } else {
                // Handle other multi-object animations
                mesh.forEach((obj, index) => {
                    obj.rotation.x += 0.01 + index * 0.002;
                    obj.rotation.y += 0.01 + index * 0.002;
                    obj.position.y += Math.sin(Date.now() * 0.001 + index) * 0.005;
                });
            }
        } else {
            // Handle single object
            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.01;
            
            // Add pulsing effect for torus
            if (config.type === 'pulsing-torus') {
                mesh.scale.setScalar(1 + Math.sin(Date.now() * 0.003) * 0.1);
            }
        }

        renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        if (container.offsetWidth > 0 && container.offsetHeight > 0) {
            camera.aspect = container.offsetWidth / container.offsetHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.offsetWidth, container.offsetHeight);
        }
    });
}

/* =========================
   SMOOTH SCROLLING NAVIGATION
========================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* =========================
   MOBILE MENU TOGGLE
========================= */
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
});

/* =========================
   INTERSECTION OBSERVER FOR ANIMATIONS
========================= */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all grid items for scroll animations
document.querySelectorAll('.grid-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = 'all 0.6s ease';
    observer.observe(item);
});

/* =========================
   PARALLAX SCROLL EFFECT
========================= */
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-3d');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

console.log('Stigma 3D website loaded successfully! 🚀');