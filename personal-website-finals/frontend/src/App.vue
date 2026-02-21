<template>
  <div class="glass-background">
    <div class="container">
      <header class="hero">
        <div class="profile-frame">
          <img :src="profileImage" alt="Gian Mandac" class="profile-img" />
          <label for="upload" class="camera-btn">📸</label>
          <input id="upload" type="file" @change="handleImageUpload" hidden />
        </div>
        <h1 class="glitch-text">Gian Mandac</h1>
        <p class="tagline">BS Computer Forensics • Cybersecurity Enthusiast</p>
        
        <div class="info-grid">
          <div class="info-item">
            <span class="label">Education</span>
            <span class="value">2nd Year College</span>
          </div>
          <div class="info-item">
            <span class="label">Focus</span>
            <span class="value">Digital Forensics & Web Security</span>
          </div>
        </div>
      </header>

      <div class="content-grid">
        <section class="glass-card about">
          <h3>About Me</h3>
          <p>
            Passionate about the intersection of web development and offensive security. 
            Currently mastering <strong>Vue.js</strong>, <strong>Nest.js</strong>, and <strong>Kali Linux</strong> 
            to build secure, scalable applications.
          </p>
        </section>

        <section class="glass-card guestbook">
          <h3>Guestbook</h3>
          <form @submit.prevent="submitMessage" class="guestbook-form">
            <input v-model="newName" placeholder="Your Name" required />
            <textarea v-model="newMessage" placeholder="Leave a message..." rows="2" required></textarea>
            <button type="submit" :disabled="loading">
              {{ loading ? 'Sending...' : 'Post Message' }}
            </button>
          </form>

          <div class="feed">
            <div v-if="messages.length === 0" class="no-messages">No messages yet.</div>
            <div v-for="msg in messages" :key="msg.id" class="feed-item">
              <div class="feed-header">
                <strong>{{ msg.name }}</strong>
                <small>{{ new Date(msg.created_at).toLocaleDateString() }}</small>
              </div>
              <p>{{ msg.message }}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const profileImage = ref('https://ui-avatars.com/api/?name=Gian+Mandac&background=6366f1&color=fff&size=200');
const messages = ref([]);
const newName = ref('');
const newMessage = ref('');
const loading = ref(false);

/** * CRITICAL FIX: Define the API_URL here.
 * For Codespaces testing, use the full port 3000 URL. 
 */
const API_URL = 'https://stunning-halibut-4j577645qpgxcqj97-3000.app.github.dev/api/guestbook';

const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) profileImage.value = URL.createObjectURL(file);
};

const fetchMessages = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('API not responding');
    messages.value = await res.json();
  } catch (err) {
    console.error("Database connection failed:", err);
  }
};

const submitMessage = async () => {
  if (!newName.value || !newMessage.value) return;
  
  loading.value = true;
  try {
    const res = await fetch(API_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name: newName.value, message: newMessage.value }),
});

    if (res.ok) {
      newName.value = '';
      newMessage.value = '';
      await fetchMessages(); // Instantly refresh list
    }
  } catch (err) {
    console.error("Post failed:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchMessages);
</script>

<style>
/* CSS remains exactly as you designed it */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;700&display=swap');
:root { --primary: #6366f1; --accent: #a855f7; }
body { margin: 0; font-family: 'Plus Jakarta Sans', sans-serif; color: white; background: #0f172a; }
.glass-background { min-height: 100vh; background: radial-gradient(circle at top right, #312e81, transparent), radial-gradient(circle at bottom left, #581c87, transparent); padding: 40px 20px; }
.container { max-width: 900px; margin: 0 auto; }
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
.glass-card { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; padding: 30px; }
.guestbook-form { display: flex; flex-direction: column; gap: 12px; margin-bottom: 25px; }
input, textarea { background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); padding: 12px; border-radius: 12px; color: white; outline: none; }
button { background: linear-gradient(to right, var(--primary), var(--accent)); color: white; border: none; padding: 12px; border-radius: 12px; font-weight: bold; cursor: pointer; transition: 0.2s; }
button:hover:not(:disabled) { opacity: 0.9; transform: translateY(-2px); }
button:disabled { opacity: 0.5; cursor: not-allowed; }
.feed { max-height: 400px; overflow-y: auto; padding-right: 5px; }
.feed::-webkit-scrollbar { width: 4px; }
.feed::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
.feed-item { background: rgba(255,255,255,0.03); padding: 15px; border-radius: 15px; margin-bottom: 10px; }
.feed-header { display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 0.8rem; }
.feed-header small { color: #94a3b8; }
.no-messages { text-align: center; color: #94a3b8; font-style: italic; }
@media (max-width: 768px) { .content-grid { grid-template-columns: 1fr; } .glitch-text { font-size: 2.2rem; } }
</style>