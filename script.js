// ===================== DATA =====================
const posts = [
  {
    id: 1,
    title: "The Lantern That Never Dims",
    date: "3rd of October, in the year of Our Lord 1887",
    excerpt: "On the cobbled streets where lamplight pools like honey...",
    body: `<p>On the cobbled streets where lamplight pools like honey in the crevices of worn stone, there stands a single lantern unlike the others. The townsfolk call it the Undying Light, for no wind has ever extinguished its flame, no rain has ever drowned its amber glow.</p>
    <p>Old Margret, who has lived beside it for sixty years, says she once saw it burn blue — just once, on the night her husband never came home from the sea. She does not speak of it often, but when she does, her voice drops to something barely above a breath, and she clutches her shawl as if the night itself might be listening.</p>
    <p>The new mayor had plans to replace it with a modern gaslit fixture last spring. He changed his mind the morning after, though no one knows quite why. He only said, very quietly over breakfast, that some things in this town are better left untouched.</p>
    <p>And so it burns still, as it always has, casting its amber veil across the old square while the world changes around it. Some nights, if you stand close enough, you can almost hear it humming — a low, warm, patient sound, like something waiting.</p>`
  },
  {
    id: 2,
    title: "Letters Found in the Apothecary Wall",
    date: "17th of March, in the year of Our Lord 1891",
    excerpt: "Seven letters, penned in a hand that trembled with urgency...",
    body: `<p>Seven letters, penned in a hand that trembled with urgency, were discovered last autumn when Master Holbrook's apothecary wall was torn down to repair the rotting timber behind it. They were bundled with a strip of red ribbon, pressing themselves against the plaster as though hiding.</p>
    <p>The letters were addressed to someone called only "E." — no surname, no street, no village. The handwriting shifted between sessions: sometimes deliberate and elegant, sometimes rushed as though written by firelight while someone paced beyond the door.</p>
    <p>One letter in particular drew attention. It read, in part: "They do not understand that what grows in the cellar is not mould. I have watched it for weeks now. It learns. It waits. Do not come here until I have determined its disposition."</p>
    <p>The apothecary's records show no tenant by that description. The cellar in question was sealed in 1879 and has not been opened since. Master Holbrook says there is no reason to open it. He says this very firmly. He says it again when no one has asked.</p>`
  },
  {
    id: 3,
    title: "The Inn at the Edge of the Map",
    date: "2nd of November, in the year of Our Lord 1884",
    excerpt: "Every map of the old town shows the same curious blank at the northern edge...",
    body: `<p>Every map of the old town, no matter how recently drawn, shows the same curious blank at the northern edge — a gap where the roads seem to forget themselves and the cartographer's hand simply... stops. Ask any mapmaker about it and they will look slightly to the left of your eyes and tell you there is nothing there worth noting.</p>
    <p>The inn does not advertise. It has no sign above the door, only a carved wooden raven with a coin in its beak. Travellers who find it rarely explain how they did so. They arrived, they say. They simply arrived.</p>
    <p>The proprietress is a tall woman with silver-streaked hair and an uncanny memory for faces. She remembers every guest she has ever served, she says. Every single one. Even those who have not yet come.</p>
    <p>The ale is extraordinary. The beds are soft. The fire in the hearth burns without consuming the wood. Most guests do not notice this last detail until they have already gone to sleep.</p>`
  },
  {
    id: 4,
    title: "On the Behaviour of Clocks in This Town",
    date: "29th of June, in the year of Our Lord 1893",
    excerpt: "It has been observed, with some statistical regularity, that clocks behave oddly here...",
    body: `<p>It has been observed, with some statistical regularity, that clocks in this town do not agree with one another. This is not unusual for clocks in general, but here the disagreement feels less like mechanical drift and more like opinion.</p>
    <p>The clock in the baker's shop runs seventeen minutes ahead. The baker insists this is deliberate — he wakes to the real time, he says, and lets the clock live in the future so he knows what to prepare for. He cannot explain how the clock began doing this on its own, two months before he moved in.</p>
    <p>The great clock on the church tower is the strangest case. It keeps perfect time from sunrise to noon. From noon to midnight, it runs twelve minutes slow. Between the hours of three and four in the morning, it reportedly runs backward. No one has confirmed this last point because no one is awake at that hour. No one admits to being awake at that hour.</p>
    <p>A clockmaker from the city came to investigate last September. He took measurements, examined the mechanisms, made notes in a leather journal. He left on a Tuesday. His journal was found on the bench in the square on Wednesday morning, all the pages blank.</p>`
  },
  {
    id: 5,
    title: "What the Raven Told the Baker's Daughter",
    date: "14th of February, in the year of Our Lord 1890",
    excerpt: "She was twelve years old when the raven first spoke to her...",
    body: `<p>She was twelve years old when the raven first spoke to her, and she was wise enough even then to tell no one except her grandmother, who only nodded and said: "I wondered when it would choose someone new."</p>
    <p>The raven lives in the old oak at the eastern end of town, the one whose roots have lifted half the cobblestones and whose branches have slowly, over decades, reached toward the church steeple as if meaning to touch it. The tree is older than the town itself. The raven, some say, is older than the tree.</p>
    <p>What it told her, she has never fully repeated. She is in her forties now, with grey beginning at her temples and a habit of going quiet at certain hours of the day. She runs the bakery that her father left her, and she makes a particular bread that she calls simply "the old recipe" and that she bakes only at the new moon.</p>
    <p>People travel considerable distances for that bread. They are rarely able to say why. They eat it and feel, briefly but completely, that they are exactly where they are supposed to be in the world. And then the feeling fades, as all feelings do, and they go home lighter than they arrived.</p>`
  },
  {
    id: 6,
    title: "Notes on the Autumn Festival, Annotated",
    date: "31st of October, in the year of Our Lord 1895",
    excerpt: "The official account of the Autumn Festival, as published in the town register...",
    body: `<p>The official account of the Autumn Festival, as published in the town register, describes a cheerful community gathering with music, dancing, and the ceremonial lighting of the bonfire in the square. This account is accurate. It is also, the locals will tell you with varying degrees of patience, deeply incomplete.</p>
    <p>The bonfire is lit at exactly sunset. It is fed throughout the evening with specific woods in a specific order — oak first, then ash, then thorn. The fire-keeper is appointed each year through a process that the town charter describes only as "traditional selection." No one born outside the town has ever been fire-keeper. No one has ever asked why.</p>
    <p>The dancing that accompanies the fire follows patterns that have never been written down. They are learned young, adjusted never, and passed mouth to mouth, hand to hand, foot to foot over generations. The steps are not complicated. They are simply very, very old, and some people, watching from the edges, feel certain that the patterns mean something even if they cannot say what.</p>
    <p>The festival ends at midnight precisely, when the fire-keeper banks the coals and the square empties in less than ten minutes. By morning, there is no sign a fire was ever lit. The cobblestones are cool and clean. The ash is gone. Where it goes, no one has ever said.</p>`
  }
];

const comments = {
  1: [{ author: "Edmund of the North", text: "I passed by that lantern once on a fog-thick evening. It seemed to watch me go." }],
  2: [{ author: "Wilhelmina Grey", text: "The apothecary wall story haunts me. What grew in that cellar, do you think?" }],
  3: [],
  4: [{ author: "A Passing Clockmaker", text: "I was not the clockmaker mentioned here. But I might have been." }],
  5: [],
  6: [{ author: "Rowan Ashwick", text: "I attended the festival as a child. The fire was beautiful and terrible at once." }]
};

// ===================== STARS =====================
const starsEl = document.getElementById('stars');
for (let i = 0; i < 120; i++) {
  const s = document.createElement('div');
  s.className = 'star';
  const size = Math.random() * 2.5 + 0.5;
  s.style.cssText = `
    left:${Math.random()*100}%;
    top:${Math.random()*70}%;
    width:${size}px;
    height:${size}px;
    --d:${2+Math.random()*4}s;
    animation-delay:${Math.random()*4}s;
  `;
  starsEl.appendChild(s);
}

// ===================== BIRD ANIMATION =====================
gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
  const bird = document.getElementById('bird');

  // Bird flies in, hovers, drops scroll, flies away
  const tl = gsap.timeline({ delay: 0.5 });

  // Fly in from top-right
  tl.set(bird, { x: window.innerWidth * 0.85, y: -100, rotation: -15, opacity: 1 })
    .to(bird, {
      x: window.innerWidth * 0.5 - 60,
      y: window.innerHeight * 0.32,
      rotation: 5,
      duration: 2.2,
      ease: "power2.inOut"
    })
    // Hover / bob
    .to(bird, { y: window.innerHeight * 0.32 - 18, duration: 0.5, ease: "sine.inOut" })
    .to(bird, { y: window.innerHeight * 0.32, duration: 0.5, ease: "sine.inOut" })
    .to(bird, { y: window.innerHeight * 0.32 - 12, duration: 0.4, ease: "sine.inOut" })
    .to(bird, { y: window.innerHeight * 0.32, duration: 0.4, ease: "sine.inOut" })
    // Drop scroll (bird rises slightly, scroll falls)
    .to(bird, { y: window.innerHeight * 0.32 - 30, duration: 0.6, ease: "power2.out" })
    // Fly away to top-left
    .to(bird, {
      x: -200,
      y: -150,
      rotation: -25,
      duration: 2,
      ease: "power2.in"
    })
    .to(bird, { opacity: 0, duration: 0.3 }, "-=0.4");

  // Intro text fades in right after bird leaves
  tl.to('#intro-text', { opacity: 1, duration: 1.5, ease: "power2.out" }, "-=0.5");
  tl.to('#scroll-hint', { opacity: 1, duration: 1 }, "-=0.5");
});

// ===================== SCROLL UNROLL =====================
ScrollTrigger.create({
  trigger: "#scroll-section",
  start: "top 75%",
  once: true,
  onEnter: () => {
    setTimeout(() => {
      document.getElementById('scroll-body').classList.add('open');
    }, 200);
  }
});

// ===================== POPULATE BLOG LIST =====================
const listEl = document.getElementById('blog-list');
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

// ===================== OPEN POST =====================
function openPost(id) {
  const post = posts.find(p => p.id === id);
  if (!post) return;

  document.getElementById('post-number').textContent = `Entry No. ${String(id).padStart(2,'0')}`;
  document.getElementById('post-title').textContent = post.title;
  document.getElementById('post-date').textContent = post.date;
  document.getElementById('post-body').innerHTML = post.body;

  // Load comments
  const ec = document.getElementById('existing-comments');
  ec.innerHTML = '';
  const postComments = comments[id] || [];
  postComments.forEach(c => {
    const div = document.createElement('div');
    div.className = 'comment-item';
    div.innerHTML = `<div class="comment-author">— ${c.author}</div><div class="comment-text">"${c.text}"</div>`;
    ec.appendChild(div);
  });

  // Reset comment form
  document.getElementById('comment-form').classList.remove('open');
  document.getElementById('comment-success').style.display = 'none';
  document.getElementById('comment-name').value = '';
  document.getElementById('comment-text').value = '';

  // Show post page
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
  const form = document.getElementById('comment-form');
  form.classList.toggle('open');
});

// ===================== COMMENT SUBMIT =====================
document.getElementById('comment-submit').addEventListener('click', () => {
  const name = document.getElementById('comment-name').value.trim();
  const text = document.getElementById('comment-text').value.trim();
  if (!name || !text) {
    document.getElementById('comment-name').style.borderColor = name ? '' : 'var(--aged-red)';
    document.getElementById('comment-text').style.borderColor = text ? '' : 'var(--aged-red)';
    return;
  }

  const postId = parseInt(document.getElementById('post-page').dataset.currentPost);
  if (!comments[postId]) comments[postId] = [];
  comments[postId].push({ author: name, text });

  // Add to DOM
  const ec = document.getElementById('existing-comments');
  const div = document.createElement('div');
  div.className = 'comment-item';
  div.innerHTML = `<div class="comment-author">— ${name}</div><div class="comment-text">"${text}"</div>`;
  div.style.animation = 'slideDown 0.4s ease';
  ec.appendChild(div);

  // Show success
  document.getElementById('comment-form').classList.remove('open');
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
let nextPostId = posts.length + 1;

// Type applepb anywhere (any case) — dashboard opens instantly, no prompt
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
    // restore reader view
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
  }
}

function exitPublisher() {
  document.getElementById('publisher-dashboard').classList.remove('active');
  document.getElementById('pub-badge').textContent = '✦ Publisher Study';
  document.getElementById('scroll-section').style.display = '';
  document.getElementById('landing').style.display = '';
  window.scrollTo(0, 0);
}

// ---- TAB SWITCHING ----
function switchPubTab(tab, btn) {
  document.querySelectorAll('.pub-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.pub-nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('pub-panel-' + tab).classList.add('active');
  btn.classList.add('active');
  if (tab === 'comments') renderPubComments();
}

// ---- RENDER POST CARDS ----
function renderPubPosts() {
  const container = document.getElementById('pub-post-cards');
  container.innerHTML = '';
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
  // Re-render reader list too
  renderReaderList();
}

// ---- EDITOR ----
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
    // Convert HTML body to plain text paragraphs
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

function savePost() {
  const title = document.getElementById('ed-title').value.trim();
  const date = document.getElementById('ed-date').value.trim();
  const bodyRaw = document.getElementById('ed-body').value.trim();

  if (!title || !bodyRaw) {
    document.getElementById('ed-title').style.borderBottomColor = title ? '' : 'var(--aged-red)';
    document.getElementById('ed-body').style.borderBottomColor = bodyRaw ? '' : 'var(--aged-red)';
    return;
  }

  // Convert plain paragraphs to HTML
  const bodyHtml = bodyRaw.split(/\n\s*\n/).map(p => `<p>${p.replace(/\n/g, ' ').trim()}</p>`).join('\n    ');

  if (editingPostId === null) {
    // New post
    const newPost = {
      id: nextPostId++,
      title,
      date: date || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      excerpt: bodyRaw.substring(0, 80) + '...',
      body: bodyHtml
    };
    posts.push(newPost);
    if (!comments[newPost.id]) comments[newPost.id] = [];
  } else {
    // Edit existing
    const post = posts.find(p => p.id === editingPostId);
    post.title = title;
    post.date = date;
    post.body = bodyHtml;
    post.excerpt = bodyRaw.substring(0, 80) + '...';
  }

  renderPubPosts();
  const notice = document.getElementById('save-notice');
  notice.classList.add('show');
  setTimeout(() => {
    notice.classList.remove('show');
    closeEditor();
  }, 1800);
}

function deletePost(id) {
  if (!confirm('Remove this entry from the chronicles? This cannot be undone.')) return;
  const idx = posts.findIndex(p => p.id === id);
  if (idx > -1) posts.splice(idx, 1);
  delete comments[id];
  renderPubPosts();
}

// ---- RENDER COMMENTS MANAGEMENT ----
function renderPubComments() {
  const container = document.getElementById('comment-manage-list');
  container.innerHTML = '';
  let hasAny = false;

  posts.forEach(post => {
    const postComments = comments[post.id] || [];
    postComments.forEach((c, idx) => {
      hasAny = true;
      const item = document.createElement('div');
      item.className = 'comment-manage-item';
      item.id = `cm-${post.id}-${idx}`;
      item.innerHTML = `
        <div class="cm-post-label">On: ${post.title}</div>
        <div class="cm-author">— ${c.author}</div>
        <div class="cm-text-display" id="cm-display-${post.id}-${idx}">"${c.text}"</div>
        <textarea class="cm-text-edit" id="cm-edit-${post.id}-${idx}" rows="3">${c.text}</textarea>
        <div class="cm-actions">
          <button class="cm-btn" onclick="toggleEditComment(${post.id}, ${idx})">✎ Edit</button>
          <button class="cm-btn" id="cm-save-${post.id}-${idx}" onclick="saveComment(${post.id}, ${idx})" style="display:none">✓ Save</button>
          <button class="cm-btn danger" onclick="deleteComment(${post.id}, ${idx})">✕ Delete</button>
        </div>
      `;
      container.appendChild(item);
    });
  });

  if (!hasAny) {
    container.innerHTML = '<div class="no-comments-msg">No reader remarks have been left yet.</div>';
  }
}

function toggleEditComment(postId, idx) {
  const display = document.getElementById(`cm-display-${postId}-${idx}`);
  const edit = document.getElementById(`cm-edit-${postId}-${idx}`);
  const saveBtn = document.getElementById(`cm-save-${postId}-${idx}`);
  const isEditing = edit.classList.contains('open');
  if (isEditing) {
    edit.classList.remove('open');
    display.style.display = '';
    saveBtn.style.display = 'none';
  } else {
    edit.classList.add('open');
    display.style.display = 'none';
    saveBtn.style.display = '';
    edit.focus();
  }
}

function saveComment(postId, idx) {
  const edit = document.getElementById(`cm-edit-${postId}-${idx}`);
  const newText = edit.value.trim();
  if (!newText) return;
  comments[postId][idx].text = newText;
  renderPubComments();
}

function deleteComment(postId, idx) {
  if (!confirm('Remove this comment?')) return;
  comments[postId].splice(idx, 1);
  renderPubComments();
}

// ---- RE-RENDER READER LIST ----
function renderReaderList() {
  const listEl = document.getElementById('blog-list');
  listEl.innerHTML = '';
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
