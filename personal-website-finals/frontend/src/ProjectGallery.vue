<template>
  <section class="glass-card gallery">
    <h3>Project Gallery</h3>
    <div class="image-grid">
      <div class="gallery-item">
        <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80" alt="Arduino IoT Project" />
        <div class="overlay">IoT Water Level Detector</div>
      </div>
      <div class="gallery-item">
        <img src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&q=80" alt="Web Dashboard" />
        <div class="overlay">TechZone Dashboard</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.glass-card { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; padding: 30px; transition: transform 0.3s ease; }
.glass-card:hover { border-color: rgba(255, 255, 255, 0.2); }
h3 { margin-top: 0; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; }
.image-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.gallery-item { position: relative; overflow: hidden; border-radius: 12px; aspect-ratio: 1; cursor: pointer; }
.gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
.overlay { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.8); padding: 10px; font-size: 0.8rem; transform: translateY(100%); transition: transform 0.3s ease; }
.gallery-item:hover img { transform: scale(1.1); }
.gallery-item:hover .overlay { transform: translateY(0); }
</style>