<template>
  <div class="glass-background">
    <div class="container fade-in-up">
      <header class="hero">
        <div class="profile-frame">
          <img src="https://scontent.fmnl9-3.fna.fbcdn.net/v/t39.30808-6/470133617_2045239089252308_6548275893951555664_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeHqLAdn12uKy_1KGSG7bNDP_rkU71LEkw3-uRTvUsSTDWYv9NCGChgsoxqWprxkOYFZzzflMiT2ehvpfm7CuYlt&_nc_ohc=P9IcmkG1xEMQ7kNvwHYnFg2&_nc_oc=AdnDBnfqqONmnAfNvRheeuJrzH627BPDFloaSAPcuUYh6CRNk97DD2PIxHx4yNgoOf8&_nc_zt=23&_nc_ht=scontent.fmnl9-3.fna&_nc_gid=DMweL-IWt3muBS-tdWR5iA&oh=00_Afv6fdT-b9CFLn2bRUos_P7qnIUDqGR8qaFx7oPg6H24_Q&oe=69A365B5" alt="Gian Mandac" class="profile-img" />
          <label for="upload" class="camera-btn">📸</label>
          <input id="upload" type="file" @change="handleImageUpload" hidden />
        </div>
        <h1 class="glitch-text">Gian Mandac</h1>
        <p class="tagline">BS Computer Forensics • Cybersecurity Enthusiast</p>
        
        <div class="info-grid">
          <div class="info-item">
            <span class="label">Education</span>
            <span class="value">Asia Pacific College</span>
          </div>
          <div class="info-item">
            <span class="label">Focus</span>
            <span class="value">Digital Forensics & Web Security</span>
          </div>
        </div>
      </header>

      <div class="content-grid">
        <div class="left-column">
          <section class="glass-card vault">
            <h3>Digital Vault & Status</h3>
            <div class="terminal-status">
              <span class="pulse"></span> System: Online | Hardening Linux Servers
            </div>
            
            <div class="favorites-grid">
              <div class="fav-item">
                <h4>🛠️ Currently Building</h4>
                <span>Personal Website (Vue/Nest.js)</span>
              </div>
              <div class="fav-item">
                <h4>🎮 Currently Doing</h4>
                <span>Vibe Coding</span>
                  

              </div>
            </div>
          </section>

          <ProjectGallery />
        </div>

        <div class="right-column">
          <SecureGuestbook />
        </div>
      </div>

      <footer class="documentation glass-card mt-20">
        <h3>System Documentation & References</h3>
        <div class="doc-links">
          <div>
            <strong>Resources:</strong>
            <ul>
              <li><a href="https://vuejs.org/guide/introduction.html" target="_blank">Vue.js Official Documentation</a></li>
              <li><a href="https://docs.nestjs.com/" target="_blank">Nest.js Documentation</a></li>
              <li><a href="https://supabase.com/docs" target="_blank">Supabase API Reference</a></li>
              <li>Images via <a href="https://unsplash.com/" target="_blank">Unsplash</a></li>
            </ul>
          </div>
          <div>
            <strong>AI Generation Logs:</strong>
            <ul>
              <li><a href="#" target="_blank">Prompt 1: Vue.js template generation and styling</a></li>
              <li><a href="#" target="_blank">Prompt 2: CSS Grid and responsive layout adjustments</a></li>
              <li><a href="#" target="_blank">Prompt 3: Fetch API error handling optimization</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ProjectGallery from './ProjectGallery.vue';
import SecureGuestbook from './SecureGuestbook.vue';

const profileImage = ref('https://ui-avatars.com/api/?name=Gian+Mandac&background=6366f1&color=fff&size=200');

const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) profileImage.value = URL.createObjectURL(file);
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;700&display=swap');

:root { 
  --primary: #6366f1; 
  --accent: #a855f7; 
  --bg-dark: #0f172a;
}

body { 
  margin: 0; 
  font-family: 'Plus Jakarta Sans', sans-serif; 
  color: white; 
  background: var(--bg-dark); 
}

.glass-background { 
  min-height: 100vh; 
  background: radial-gradient(circle at top right, #312e81, transparent), radial-gradient(circle at bottom left, #581c87, transparent); 
  padding: 40px 20px; 
}

.container { 
  max-width: 1000px; 
  margin: 0 auto; 
}

.fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero { text-align: center; margin-bottom: 50px; }

.profile-frame { position: relative; width: 160px; height: 160px; margin: 0 auto 20px; }
.profile-img { width: 100%; height: 100%; border-radius: 40px; object-fit: cover; border: 2px solid rgba(255,255,255,0.2); transform: rotate(-3deg); transition: 0.3s; }
.profile-frame:hover .profile-img { transform: rotate(0deg) scale(1.05); }
.camera-btn { position: absolute; bottom: -10px; right: -10px; background: var(--primary); padding: 8px; border-radius: 12px; cursor: pointer; font-size: 1.2rem; z-index: 10; }

.glitch-text { font-size: 3rem; margin: 10px 0; letter-spacing: -1px; }
.tagline { color: #cbd5e1; font-size: 1.2rem; }

.info-grid { display: flex; gap: 20px; justify-content: center; margin-top: 20px; }
.info-item { background: rgba(255,255,255,0.05); padding: 10px 20px; border-radius: 15px; }
.info-item .label { display: block; font-size: 0.7rem; color: var(--primary); font-weight: bold; text-transform: uppercase; }

.content-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.left-column, .right-column { display: flex; flex-direction: column; gap: 20px; }

.glass-card { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; padding: 30px; transition: transform 0.3s ease; }
.glass-card:hover { border-color: rgba(255, 255, 255, 0.2); }

h3 { margin-top: 0; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; }

.terminal-status { background: #000; color: #4ade80; padding: 12px; border-radius: 12px; font-family: monospace; font-size: 0.85rem; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; border: 1px solid rgba(74, 222, 128, 0.2); }
.pulse { width: 10px; height: 10px; background: #4ade80; border-radius: 50%; box-shadow: 0 0 10px #4ade80; animation: blink 1.5s infinite; }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

.favorites-grid { display: grid; gap: 15px; }
.fav-item { background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.05); padding: 15px; border-radius: 12px; transition: 0.3s; }
.fav-item:hover { background: rgba(255,255,255,0.1); transform: translateX(5px); border-color: var(--primary); }
.fav-item h4 { margin: 0 0 5px 0; font-size: 0.95rem; color: var(--accent); }
.fav-item span { font-size: 0.8rem; color: #cbd5e1; }

.mt-20 { margin-top: 20px; }
.documentation .doc-links { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 0.9rem; }
.documentation ul { list-style: none; padding-left: 0; }
.documentation li { margin-bottom: 5px; }
.documentation a { color: var(--primary); text-decoration: none; transition: 0.2s; }
.documentation a:hover { color: var(--accent); text-decoration: underline; }

@media (max-width: 768px) { 
  .content-grid, .doc-links { grid-template-columns: 1fr; } 
  .glitch-text { font-size: 2.2rem; } 
}
</style>