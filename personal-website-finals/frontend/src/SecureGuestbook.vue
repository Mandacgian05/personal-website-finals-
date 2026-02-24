<template>
  <section class="glass-card guestbook">
    <h3>Secure Guestbook</h3>
    
    <div v-if="notification.message" :class="['notification', notification.type]">
      {{ notification.message }}
    </div>

    <form @submit.prevent="submitMessage" class="guestbook-form">
      <input v-model="newName" placeholder="Alias / Name" required minlength="2" />
      <textarea v-model="newMessage" placeholder="Leave a secure log..." rows="3" required minlength="5"></textarea>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Encrypting & Sending...' : 'Submit Log Entry' }}
      </button>
    </form>

    <div class="feed">
      <div v-if="sortedMessages.length === 0" class="no-messages">No logs detected.</div>
      <div v-for="msg in sortedMessages" :key="msg.id" class="feed-item">
        <div class="feed-header">
          <strong>{{ msg.name }}</strong>
          <small>{{ new Date(msg.created_at).toLocaleString() }}</small>
        </div>
        <p>{{ msg.message }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const messages = ref([]);
const newName = ref('');
const newMessage = ref('');
const loading = ref(false);
const notification = ref({ message: '', type: '' });

const API_URL = 'https://personal-website-finals-ducc.vercel.app/api/guestbook';

const sortedMessages = computed(() => {
  return [...messages.value].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
});

const showNotification = (msg, type) => {
  notification.value = { message: msg, type };
  setTimeout(() => {
    notification.value = { message: '', type: '' };
  }, 4000);
};

const fetchMessages = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('API not responding');
    messages.value = await res.json();
  } catch (err) {
    showNotification("Error: Failed to fetch database logs.", "error");
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
      showNotification("Success: Log entry securely added.", "success");
      await fetchMessages();
    } else {
      throw new Error('Submission failed');
    }
  } catch (err) {
    showNotification("Error: Payload submission rejected.", "error");
  } finally {
    loading.value = false;
  }
};

onMounted(fetchMessages);
</script>

<style scoped>
.glass-card { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; padding: 30px; transition: transform 0.3s ease; }
.glass-card:hover { border-color: rgba(255, 255, 255, 0.2); }
h3 { margin-top: 0; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; }
.notification { padding: 12px; border-radius: 12px; margin-bottom: 15px; font-size: 0.9rem; font-weight: bold; text-align: center; }
.notification.success { background: rgba(16, 185, 129, 0.2); color: #10b981; border: 1px solid #10b981; }
.notification.error { background: rgba(239, 68, 68, 0.2); color: #ef4444; border: 1px solid #ef4444; }
.guestbook-form { display: flex; flex-direction: column; gap: 12px; margin-bottom: 25px; }
input, textarea { background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); padding: 12px; border-radius: 12px; color: white; outline: none; font-family: inherit; }
input:focus, textarea:focus { border-color: #6366f1; }
button { background: linear-gradient(to right, #6366f1, #a855f7); color: white; border: none; padding: 12px; border-radius: 12px; font-weight: bold; cursor: pointer; transition: 0.2s; }
button:hover:not(:disabled) { opacity: 0.9; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4); }
button:disabled { opacity: 0.5; cursor: not-allowed; }
.feed { max-height: 350px; overflow-y: auto; padding-right: 5px; }
.feed::-webkit-scrollbar { width: 4px; }
.feed::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
.feed-item { background: rgba(255,255,255,0.03); padding: 15px; border-radius: 15px; margin-bottom: 10px; border-left: 3px solid transparent; transition: 0.2s; }
.feed-item:hover { background: rgba(255,255,255,0.06); border-left-color: #a855f7; }
.feed-header { display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 0.8rem; }
.feed-header small { color: #94a3b8; }
.no-messages { text-align: center; color: #94a3b8; font-style: italic; }
</style>