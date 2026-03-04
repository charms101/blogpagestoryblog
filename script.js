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

  btn.textContent = 'Seal & Send ✦';
  btn.disabled = false;
  document.getElementById('comment-form').classList.remove('open');
  document.getElementById('comment-name').value = '';
  document.getElementById('comment-text').value = '';
  const success = document.getElementById('comment-success');
  success.style.display = 'block';
  setTimeout(() => { success.style.display = 'none'; }, 4000);
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
