gsap.registerPlugin(ScrollTrigger);

// ===================== SUPABASE SETUP =====================
const SUPABASE_URL = 'https://uceuotmwpsbppaozeaun.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjZXVvdG13cHNicHBhb3plYXVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1NTQ2MDgsImV4cCI6MjA4ODEzMDYwOH0.TiAlvAGJEVyFFpAFbw8ADZgePdeyhIYClquR8mYmXM4';

const db = {
  async getPosts() {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/posts?select=*&order=id.asc`, {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` }
    });
    return res.ok ? res.json() : [];
  },
  async getComments(postId) {
    const url = postId
      ? `${SUPABASE_URL}/rest/v1/comments?post_id=eq.${postId}&order=id.asc`
      : `${SUPABASE_URL}/rest/v1/comments?select=*&order=id.asc`;
    const res = await fetch(url, {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` }
    });
    return res.ok ? res.json() : [];
  },
  async addPost(post) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/posts`, {
      method: 'POST',
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}`, 'Content-Type': 'application/json', Prefer: 'return=representation' },
      body: JSON.stringify(post)
    });
    const data = await res.json();
    return data[0];
  },
  async updatePost(id, post) {
    await fetch(`${SUPABASE_URL}/rest/v1/posts?id=eq.${id}`, {
      method: 'PATCH',
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(post)
    });
  },
  async deletePost(id) {
    await fetch(`${SUPABASE_URL}/rest/v1/posts?id=eq.${id}`, {
      method: 'DELETE',
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` }
    });
    await fetch(`${SUPABASE_URL}/rest/v1/comments?post_id=eq.${id}`, {
      method: 'DELETE',
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` }
    });
  },
  async addComment(comment) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/comments`, {
      method: 'POST',
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}`, 'Content-Type': 'application/json', Prefer: 'return=representation' },
      body: JSON.stringify(comment)
    });
    const data = await res.json();
    return data[0];
  },
  async updateComment(id, text) {
    await fetch(`${SUPABASE_URL}/rest/v1/comments?id=eq.${id}`, {
      method: 'PATCH',
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
  },
  async deleteComment(id) {
    await fetch(`${SUPABASE_URL}/rest/v1/comments?id=eq.${id}`, {
      method: 'DELETE',
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` }
    });
  }
};

// ===================== STATE =====================
let posts = [];

// ===================== STARS =====================
const starsEl = document.getElementById('stars');
for (let i = 0; i < 120; i++) {
  const s = document.createElement('div');
  s.className = 'star';
  const size = Math.random() * 2.5 + 0.5;
  s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*70}%;width:${size}px;height:${size}px;--d:${2+Math.random()*4}s;animation-delay:${Math.random()*4}s;`;
  starsEl.appendChild(s);
}

// ===================== INIT =====================
window.addEventListener('load', async () => {
  posts = await db.getPosts();
  renderReaderList();

  const bird = document.getElementById('bird');
  const tl = gsap.timeline({ delay: 0.5 });
  tl.set(bird, { x: window.innerWidth * 0.85, y: -100, rotation: -15, opacity: 1 })
    .to(bird, { x: window.innerWidth * 0.5 - 60, y: window.innerHeight * 0.32, rotation: 5, duration: 2.2, ease: "power2.inOut" })
    .to(bird, { y: window.innerHeight * 0.32 - 18, duration: 0.5, ease: "sine.inOut" })
    .to(bird, { y: window.innerHeight * 0.32, duration: 0.5, ease: "sine.inOut" })
    .to(bird, { y: window.innerHeight * 0.32 - 12, duration: 0.4, ease: "sine.inOut" })
    .to(bird, { y: window.innerHeight * 0.32, duration: 0.4, ease: "sine.inOut" })
    .to(bird, { y: window.innerHeight * 0.32 - 30, duration: 0.6, ease: "power2.out" })
    .to(bird, { x: -200, y: -150, rotation: -25, duration: 2, ease: "power2.in" })
    .to(bird, { opacity: 0, duration: 0.3 }, "-=0.4");
  tl.to('#intro-text', { opacity: 1, duration: 1.5, ease: "power2.out" }, "-=0.5");
  tl.to('#scroll-hint', { opacity: 1, duration: 1 }, "-=0.5");
});

// ===================== SCROLL UNROLL =====================
ScrollTrigger.create({
  trigger: "#scroll-section",
  start: "top 75%",
  once: true,
  onEnter: () => { setTimeout(() => { document.getElementById('scroll-body').classList.add('open'); }, 200); }
});

// ===================== READER BLOG LIST =====================
function renderReaderList() {
  const listEl = document.getElementById('blog-list');
  listEl.innerHTML = '';
  if (posts.length === 0) {
    listEl.innerHTML = '<li style="color:var(--sepia);font-style:italic;padding:20px 0;list-style:none">No tales have been written yet...</li>';
    return;
  }
  posts.forEach(post => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="entry-num">${String(post.id).padStart(2,'0')}</span>
      <div class="entry-info">
        <div class="entry-title">${post.title}</div>
        <div class="entry-meta">${post.date}</div>
      </div>
      <span class="entry-arrow">→</span>
    `;
    li.addEventListener('click', () => openPost(post.id));
    listEl.appendChild(li);
  });
}

// ===================== OPEN POST =====================
async function openPost(id) {
  const post = posts.find(p => p.id === id);
  if (!post) return;

  document.getElementById('post-number').textContent = `Entry No. ${String(id).padStart(2,'0')}`;
  document.getElementById('post-title').textContent = post.title;
  document.getElementById('post-date').textContent = post.date;
  document.getElementById('post-body').innerHTML = post.body;

  const postComments = await db.getComments(id);
  const ec = document.getElementById('existing-comments');
  ec.innerHTML = '';
  postComments.forEach(c => {
    const div = document.createElement('div');
    div.className = 'comment-item';
    div.innerHTML = `<div class="comment-author">— ${c.author}</div><div class="comment-text">"${c.text}"</div>`;
    ec.appendChild(div);
  });

  document.getElementById('comment-form').classList.remove('open');
  document.getElementById('comment-success').style.display = 'none';
  document.getElementById('comment-name').value = '';
  document.getElementById('comment-text').value = '';
  document.getElementById('scroll-section').style.display = 'none';
  document.getElementById('landing').style.display = 'none';
  const postPage = document.getElementById('post-page');
  postPage.classList.add('active');
  postPage.dataset.currentPost = id;
  window.scrollTo(0, 0);
}

// ===================== BACK BUTTON =====================
document.getElementById('back-btn').addEventListener('click', () => {
  document.getElementById('post-page').classList.remove('active');
  document.getElementById('scroll-section').style.display = '';
  document.getElementById('landing').style.display = '';
  window.scrollTo(0, document.getElementById('scroll-section').offsetTop - 60);
});

// ===================== COMMENT TOGGLE =====================
document.getElementById('comment-toggle-btn').addEventListener('click', () => {
  document.getElementById('comment-form').classList.toggle('open');
});

// ===================== COMMENT SUBMIT =====================
document.getElementById('comment-submit').addEventListener('click', async () => {
  const name = document.getElementById('comment-name').value.trim();
  const text = document.getElementById('comment-text').value.trim();
  if (!name || !text) {
    document.getElementById('comment-name').style.borderColor = name ? '' : 'var(--aged-red)';
    document.getElementById('comment-text').style.borderColor = text ? '' : 'var(--aged-red)';
    return;
  }
  const postId = parseInt(document.getElementById('post-page').dataset.currentPost);
  const btn = document.getElementById('comment-submit');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  await db.addComment({ post_id: postId, author: name, text });

  const postComments = await db.getComments(postId);
  const ec = document.getElementById('existing-comments');
  ec.innerHTML = '';
  postComments.forEach(c => {
    const div = document.createElement('div');
    div.className = 'comment-item';
    div.innerHTML = `<div class="comment-author">— ${c.author}</div><div class="comment-text">"${c.text}"</div>`;
    ec.appendChild(div);
  });

  btn.textContent = 'Post Comment ✦';
  btn.disabled = false;
  document.getElementById('comment-form').classList.remove('open');
  document.getElementById('comment-name').value = '';
  document.getElementById('comment-text').value = '';
  const success = document.getElementById('comment-success');
  success.style.display = 'block';
  setTimeout(() => { success.style.display = 'none'; }, 4000);

  spawnFrameButterflies(); // 🦋 butterfly celebration!
});

// ============================================================
// ===================== PUBLISHER SYSTEM =====================
// ============================================================

const SECRET_CODE = 'applepb';
let publisherUnlocked = false;
let editingPostId = null;

let keyBuffer = '';
document.addEventListener('keydown', (e) => {
  if (publisherUnlocked) return;
  if (e.key.length === 1) {
    keyBuffer += e.key.toLowerCase();
    if (keyBuffer.length > 30) keyBuffer = keyBuffer.slice(-30);
    if (keyBuffer.includes(SECRET_CODE)) {
      keyBuffer = '';
      publisherUnlocked = true;
      document.getElementById('pub-badge').classList.add('visible');
      toggleDashboard();
    }
  }
});

function toggleDashboard() {
  const dash = document.getElementById('publisher-dashboard');
  const badge = document.getElementById('pub-badge');
  if (dash.classList.contains('active')) {
    dash.classList.remove('active');
    badge.textContent = '✦ Publisher Study';
    document.getElementById('scroll-section').style.display = '';
    document.getElementById('landing').style.display = '';
    document.getElementById('post-page').classList.remove('active');
  } else {
    dash.classList.add('active');
    badge.textContent = '✦ Close Study';
    document.getElementById('scroll-section').style.display = 'none';
    document.getElementById('landing').style.display = 'none';
    document.getElementById('post-page').classList.remove('active');
    renderPubPosts();
    renderPubComments();
    window.scrollTo(0, 0);
    gsap.fromTo('#publisher-dashboard', { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' });
  }
}

function exitPublisher() {
  document.getElementById('publisher-dashboard').classList.remove('active');
  document.getElementById('pub-badge').textContent = '✦ Publisher Study';
  document.getElementById('scroll-section').style.display = '';
  document.getElementById('landing').style.display = '';
  window.scrollTo(0, 0);
}

function switchPubTab(tab, btn) {
  document.querySelectorAll('.pub-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.pub-nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('pub-panel-' + tab).classList.add('active');
  btn.classList.add('active');
  if (tab === 'comments') renderPubComments();
}

function renderPubPosts() {
  const container = document.getElementById('pub-post-cards');
  container.innerHTML = '';
  if (posts.length === 0) {
    container.innerHTML = '<p style="color:rgba(244,228,193,0.3);font-style:italic;padding:20px 0">No entries yet. Write your first tale below.</p>';
  }
  posts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.innerHTML = `
      <div class="post-card-num">${String(post.id).padStart(2,'0')}</div>
      <div class="post-card-info">
        <div class="post-card-title">${post.title}</div>
        <div class="post-card-meta">${post.date}</div>
      </div>
      <div class="post-card-actions">
        <button class="card-btn" onclick="openEditor(${post.id})">✎ Edit</button>
        <button class="card-btn danger" onclick="deletePost(${post.id})">✕ Remove</button>
      </div>
    `;
    container.appendChild(card);
  });
  renderReaderList();
}

function openEditor(id) {
  editingPostId = id;
  const panel = document.getElementById('editor-panel');
  panel.classList.add('active');
  document.getElementById('save-notice').classList.remove('show');
  if (id === null) {
    document.getElementById('editor-heading').textContent = 'New Entry';
    document.getElementById('editor-badge').textContent = 'COMPOSING';
    document.getElementById('ed-title').value = '';
    document.getElementById('ed-date').value = '';
    document.getElementById('ed-body').value = '';
  } else {
    const post = posts.find(p => p.id === id);
    document.getElementById('editor-heading').textContent = 'Editing Entry';
    document.getElementById('editor-badge').textContent = 'REVISING';
    document.getElementById('ed-title').value = post.title;
    document.getElementById('ed-date').value = post.date;
    const tmp = document.createElement('div');
    tmp.innerHTML = post.body;
    const paras = Array.from(tmp.querySelectorAll('p')).map(p => p.textContent.trim());
    document.getElementById('ed-body').value = paras.join('\n\n');
  }
  panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function closeEditor() {
  document.getElementById('editor-panel').classList.remove('active');
  editingPostId = null;
}

async function savePost() {
  const title = document.getElementById('ed-title').value.trim();
  const date = document.getElementById('ed-date').value.trim();
  const bodyRaw = document.getElementById('ed-body').value.trim();
  if (!title || !bodyRaw) {
    document.getElementById('ed-title').style.borderBottomColor = title ? '' : 'var(--aged-red)';
    document.getElementById('ed-body').style.borderBottomColor = bodyRaw ? '' : 'var(--aged-red)';
    return;
  }

  const bodyHtml = bodyRaw.split(/\n\s*\n/).map(p => `<p>${p.replace(/\n/g, ' ').trim()}</p>`).join('\n');
  const saveBtn = document.querySelector('.save-btn');
  saveBtn.textContent = 'Saving...';
  saveBtn.disabled = true;

  if (editingPostId === null) {
    const newPost = await db.addPost({
      title,
      date: date || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      excerpt: bodyRaw.substring(0, 80) + '...',
      body: bodyHtml
    });
    if (newPost) posts.push(newPost);
  } else {
    await db.updatePost(editingPostId, { title, date, body: bodyHtml, excerpt: bodyRaw.substring(0, 80) + '...' });
    const post = posts.find(p => p.id === editingPostId);
    if (post) { post.title = title; post.date = date; post.body = bodyHtml; }
  }

  saveBtn.textContent = '✦ Seal & Publish';
  saveBtn.disabled = false;
  renderPubPosts();
  const notice = document.getElementById('save-notice');
  notice.classList.add('show');
  setTimeout(() => { notice.classList.remove('show'); closeEditor(); }, 1800);
}

async function deletePost(id) {
  if (!confirm('Remove this entry from the chronicles? This cannot be undone.')) return;
  await db.deletePost(id);
  posts = posts.filter(p => p.id !== id);
  renderPubPosts();
}

async function renderPubComments() {
  const container = document.getElementById('comment-manage-list');
  container.innerHTML = '<div style="color:rgba(244,228,193,0.3);font-style:italic;padding:20px 0">Loading remarks...</div>';
  const allComments = await db.getComments();
  container.innerHTML = '';

  if (allComments.length === 0) {
    container.innerHTML = '<div class="no-comments-msg">No reader remarks have been left yet.</div>';
    return;
  }

  allComments.forEach(c => {
    const post = posts.find(p => p.id === c.post_id);
    const postTitle = post ? post.title : `Post #${c.post_id}`;
    const item = document.createElement('div');
    item.className = 'comment-manage-item';
    item.innerHTML = `
      <div class="cm-post-label">On: ${postTitle}</div>
      <div class="cm-author">— ${c.author}</div>
      <div class="cm-text-display" id="cm-display-${c.id}">"${c.text}"</div>
      <textarea class="cm-text-edit" id="cm-edit-${c.id}" rows="3">${c.text}</textarea>
      <div class="cm-actions">
        <button class="cm-btn" onclick="toggleEditComment(${c.id})">✎ Edit</button>
        <button class="cm-btn" id="cm-save-${c.id}" onclick="saveComment(${c.id})" style="display:none">✓ Save</button>
        <button class="cm-btn danger" onclick="deleteComment(${c.id})">✕ Delete</button>
      </div>
    `;
    container.appendChild(item);
  });
}

function toggleEditComment(id) {
  const display = document.getElementById(`cm-display-${id}`);
  const edit = document.getElementById(`cm-edit-${id}`);
  const saveBtn = document.getElementById(`cm-save-${id}`);
  if (edit.classList.contains('open')) {
    edit.classList.remove('open'); display.style.display = ''; saveBtn.style.display = 'none';
  } else {
    edit.classList.add('open'); display.style.display = 'none'; saveBtn.style.display = ''; edit.focus();
  }
}

async function saveComment(id) {
  const newText = document.getElementById(`cm-edit-${id}`).value.trim();
  if (!newText) return;
  await db.updateComment(id, newText);
  renderPubComments();
}

async function deleteComment(id) {
  if (!confirm('Remove this comment?')) return;
  await db.deleteComment(id);
  renderPubComments();
}

// ===================== FRAME BUTTERFLIES (comment celebration) =====================
function spawnFrameButterflies() {
  const count = 14;
  const colors = ['#ff4db8', '#ff88d0', '#bf00ff', '#dd66ff', '#ffb3e6'];
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const b = document.createElement('div');
      b.innerHTML = makeButterflySVG(colors[i % colors.length], 18 + Math.random() * 14);
      b.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 9000;
        animation: frameFly ${1.8 + Math.random() * 1.4}s ease-in-out forwards;
      `;
      const edge = Math.floor(Math.random() * 4);
      if (edge === 0)      { b.style.left = Math.random() * 100 + 'vw'; b.style.top = '-30px'; }
      else if (edge === 1) { b.style.left = Math.random() * 100 + 'vw'; b.style.bottom = '-30px'; }
      else if (edge === 2) { b.style.left = '-30px'; b.style.top = Math.random() * 100 + 'vh'; }
      else                 { b.style.right = '-30px'; b.style.top = Math.random() * 100 + 'vh'; }
      b.style.setProperty('--tx', (Math.random() - 0.5) * 200 + 'px');
      b.style.setProperty('--ty', (Math.random() - 0.5) * 200 + 'px');
      b.style.setProperty('--rot', (Math.random() * 360) + 'deg');
      document.body.appendChild(b);
      setTimeout(() => b.remove(), 3500);
    }, i * 120);
  }
  if (!document.getElementById('frameFlyStyle')) {
    const s = document.createElement('style');
    s.id = 'frameFlyStyle';
    s.textContent = `
      @keyframes frameFly {
        0%   { opacity: 0; transform: translate(0,0) rotate(0deg) scale(0.5); }
        20%  { opacity: 1; transform: translate(calc(var(--tx)*0.3), calc(var(--ty)*0.3)) rotate(60deg) scale(1); }
        80%  { opacity: 0.8; transform: translate(calc(var(--tx)*0.8), calc(var(--ty)*0.8)) rotate(200deg) scale(1.1); }
        100% { opacity: 0; transform: translate(var(--tx), var(--ty)) rotate(var(--rot)) scale(0.6); }
      }
      @keyframes wingFlutter {
        0%,100% { transform: scaleX(1); }
        50%     { transform: scaleX(0.3); }
      }
    `;
    document.head.appendChild(s);
  }
}

function makeButterflySVG(color, size) {
  const light = color === '#ff4db8' ? '#ffaadd' : color === '#bf00ff' ? '#dd88ff' : '#ffccee';
  return `<svg width="${size}" height="${size}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"
    style="filter:drop-shadow(0 0 4px ${color}) drop-shadow(0 0 10px ${color}88)">
    <g style="animation:wingFlutter 0.25s ease-in-out infinite alternate;transform-origin:20px 20px">
      <path d="M20,18 Q8,6 2,12 Q0,22 12,24 Z" fill="${color}" opacity="0.9"/>
      <path d="M20,22 Q8,28 4,36 Q14,40 20,30 Z" fill="${color}" opacity="0.7"/>
    </g>
    <g style="animation:wingFlutter 0.25s ease-in-out infinite alternate-reverse;transform-origin:20px 20px">
      <path d="M20,18 Q32,6 38,12 Q40,22 28,24 Z" fill="${color}" opacity="0.9"/>
      <path d="M20,22 Q32,28 36,36 Q26,40 20,30 Z" fill="${color}" opacity="0.7"/>
    </g>
    <ellipse cx="20" cy="21" rx="2.5" ry="7" fill="${light}" opacity="0.95"/>
    <circle cx="20" cy="14" r="2" fill="${light}"/>
  </svg>`;
}

// ===================== CURSOR BUTTERFLY =====================
(function initCursorButterfly() {
  const cb = document.createElement('div');
  cb.id = 'cursor-butterfly';
  cb.style.cssText = `position:fixed;pointer-events:none;z-index:9998;opacity:0;transition:opacity 0.5s ease;transform:translate(-50%,-50%);display:none;`;
  cb.innerHTML = `<svg width="28" height="28" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"
    style="filter:drop-shadow(0 0 5px #ff4db8) drop-shadow(0 0 12px #bf00ff88)">
    <g style="transform-origin:20px 20px;animation:cbWing 0.22s ease-in-out infinite alternate">
      <path d="M20,18 Q8,6 2,12 Q0,22 12,24 Z" fill="#ff4db8" opacity="0.92"/>
      <path d="M20,22 Q8,28 4,36 Q14,40 20,30 Z" fill="#ff4db8" opacity="0.75"/>
    </g>
    <g style="transform-origin:20px 20px;animation:cbWing 0.22s ease-in-out infinite alternate-reverse">
      <path d="M20,18 Q32,6 38,12 Q40,22 28,24 Z" fill="#dd66ff" opacity="0.92"/>
      <path d="M20,22 Q32,28 36,36 Q26,40 20,30 Z" fill="#dd66ff" opacity="0.75"/>
    </g>
    <ellipse cx="20" cy="21" rx="2" ry="6" fill="#ffbbee" opacity="0.95"/>
    <circle cx="20" cy="14" r="1.8" fill="#ffbbee"/>
    <line x1="18" y1="13" x2="13" y2="8" stroke="#ffbbee" stroke-width="0.8"/>
    <line x1="22" y1="13" x2="27" y2="8" stroke="#ffbbee" stroke-width="0.8"/>
    <circle cx="13" cy="8" r="1.2" fill="#ff4db8"/>
    <circle cx="27" cy="8" r="1.2" fill="#ff4db8"/>
  </svg>`;
  document.body.appendChild(cb);

  const s = document.createElement('style');
  s.textContent = `@keyframes cbWing { from { transform: scaleX(1); } to { transform: scaleX(0.25); } }`;
  document.head.appendChild(s);

  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let currentX = mouseX, currentY = mouseY;
  let visible = false;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    if (!visible) { cb.style.opacity = '1'; visible = true; }
  });
  document.addEventListener('mouseleave', () => { cb.style.opacity = '0'; visible = false; });

  function animate() {
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;
    const tilt = Math.max(-25, Math.min(25, (mouseX - currentX) * 0.4));
    cb.style.left = currentX + 'px';
    cb.style.top = currentY + 'px';
    cb.style.transform = `translate(-50%, -50%) rotate(${tilt}deg)`;
    requestAnimationFrame(animate);
  }
  animate();

  // Appears after the landing butterfly flies away (~7s)
  setTimeout(() => { cb.style.display = 'block'; }, 7000);
})();
