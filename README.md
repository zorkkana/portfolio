# 🛰️ OSKARI KAILE | Portfolio
### [Live Demo: oskarikaile.github.io](https://oskarikaile.github.io/)

A high-performance, immersive "Command Center" portfolio inspired by the International Space Station (ISS) and futuristic aerospace interfaces. This project pushes the boundaries of standard web development by integrating real-time telemetry, 3D physics, and adaptive spatial audio.

---

## 🚀 Key Systems & Engineering

### 🛰️ Live ISS Telemetry Engine
The header features a real-time data card that tracks the **International Space Station**. 
* **Tech:** REST API integration with asynchronous state updates.
* **Feature:** Displays live Latitude, Longitude, and Altitude with a "Tracking" status indicator.

### 🌎 3D Orbital Visualization
The hero section features a custom **Three.js** wireframe globe that mirrors the ISS's current position.
* **Tech:** WebGL, Three.js, Segmented Geometry.
* **Atmosphere:** Constellation background with dynamic wireframe rendering to maintain a "blueprint" aesthetic.

### 🔊 Adaptive Spatial Audio (Environment Toggle)
Unlike standard portfolios, this site features a cinematic audio experience.
* **Ambient:** Custom space-themed background track with smooth fade-in/out logic.
* **SFX:** UI "Earcons" (sound blips) for hovers and clicks to provide tactile feedback.
* **Engineering:** Volume normalization and global event delegation to prevent audio clutter.

### 🖱️ Magnetic HUD Interaction
Interactive elements utilize a "magnetic pull" effect, making the UI feel like a liquid-metal interface.
* **Logic:** Custom Vector-based distance calculations (`Math.hypot`).
* **Optimization:** Automatically disables on mobile devices to preserve CPU and battery life.

---

## 🛠️ Tech Stack
* **Core:** HTML5, CSS3 (Modern Flex/Grid), JavaScript (ES6+).
* **3D Engine:** Three.js.
* **Physics/Motion:** VanillaTilt.js, Custom LERP (Linear Interpolation) for cursor lagging.
* **Smooth Scroll:** Lenis for consistent, buttery scrolling across all browsers.
* **Deployment:** GitHub Pages.

---

## 🎨 UI/UX Design Principles
* **Color Palette:** Neon Cyan (`#00ffcc`) for HUD elements, Deep Space Navy (`#0a0a23`) for depth, and Rocket Orange for primary Calls-to-Action.
* **Glassmorphism:** Heavy use of `backdrop-filter: blur()` to simulate semi-transparent control panels.
* **Typography:** `Orbitron` and `Inter` to balance the futuristic "Command Center" vibe with high readability.

---

## 📁 Repository Structure
```bash
├── images/          # Optimized assets & SVG Icons
├── sounds/          # Custom UI SFX & Ambient Track
├── index.html       # Main Mission Control & Integrated Logic
└── README.md        # Technical Documentation
