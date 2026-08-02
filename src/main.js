import "./style.css";

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

const titleEl = document.getElementById("apod-title");
const dateEl = document.getElementById("apod-date");
const explanationEl = document.getElementById("apod-explanation");
const mediaContainer = document.getElementById("apod-media-container");
const dateInput = document.getElementById("apod-date-input");
const refreshBtn = document.getElementById("apod-refresh-btn");
const appRoot = document.getElementById("app");

const USER_PROFILE_KEY = "cosmotab-user-profile";
const LINKS_STORAGE_KEY = "cosmotab-links";
const TODO_STORAGE_KEY = "cosmotab-todos";

// Default background image for video APODs (NASA image)
const DEFAULT_BG_IMAGE =
  "https://apod.nasa.gov/apod/image/1905/M94_Hubble_960.jpg";

function setBackground(imageUrl) {
  document.body.style.background = `
    linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(${imageUrl}) center/cover no-repeat
  `;
}

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function setLoading(isLoading) {
  if (!appRoot) return;
  appRoot.dataset.loading = isLoading ? "true" : "false";
}

function loadUserProfile() {
  const raw = localStorage.getItem(USER_PROFILE_KEY);
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveUserProfile(profile) {
  localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
}

function updateGreetingAndFocus() {
  const now = new Date();
  const hour = now.getHours();
  let baseGreeting;

  if (hour < 5) baseGreeting = "Good night";
  else if (hour < 12) baseGreeting = "Good morning";
  else if (hour < 18) baseGreeting = "Good afternoon";
  else baseGreeting = "Good evening";

  const profile = loadUserProfile();
  const name = profile?.name || "traveler";
  const emoji = profile?.emoji || "";

  const greetingEl = document.getElementById("greeting");
  if (greetingEl) {
    greetingEl.textContent = `${baseGreeting}, ${name}`;
    if (emoji) {
      greetingEl.textContent = `${emoji} ${greetingEl.textContent}`;
    }
  }

  const focusEl = document.getElementById("focus");
  if (focusEl) focusEl.textContent = "Search the web, save links, and manage notes.";
}

function setupClockGreeting() {
  const clockEl = document.getElementById("clock");
  const dateDisplayEl = document.getElementById("date");

  function updateClockAndDate() {
    const now = new Date();

    if (clockEl) {
      clockEl.textContent = now.toLocaleTimeString();
    }

    if (dateDisplayEl) {
      dateDisplayEl.textContent = now.toLocaleDateString(undefined, {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  }

  updateClockAndDate();
  updateGreetingAndFocus();

  setInterval(updateClockAndDate, 1000);
  setInterval(updateGreetingAndFocus, 60000);
}

// Apply the selected emoji to the dedicated element
function applyAvatarEmoji(profile) {
  const emojiEl = document.getElementById("avatar-emoji");
  if (!emojiEl || !profile) return;
  emojiEl.textContent = profile.emoji || "";
  emojiEl.style.display = profile.emoji ? "block" : "none";
}

function maybeShowUserSetup() {
  const profile = loadUserProfile();
  const modal = document.getElementById("user-setup-modal");
  const form = document.getElementById("user-setup-form");
  const nameInput = document.getElementById("user-name-input");
  const avatarSelect = document.getElementById("user-avatar-select");

  if (!modal || !form || !nameInput || !avatarSelect) return;

  if (!profile) {
    modal.classList.remove("hidden");
    nameInput.focus();

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = nameInput.value.trim();
      const emoji = avatarSelect.value;
      if (!name || !emoji) return;

      const newProfile = { name, emoji };
      saveUserProfile(newProfile);
      modal.classList.add("hidden");
      updateGreetingAndFocus();
      applyAvatarEmoji(newProfile);
    });
  } else {
    applyAvatarEmoji(profile);
  }
}

async function fetchApod(dateString) {
  try {
    setLoading(true);
    if (titleEl) titleEl.textContent = "Loading NASA APOD...";
    if (explanationEl) explanationEl.textContent = "";
    if (mediaContainer) mediaContainer.innerHTML = "";

    const url = new URL("https://api.nasa.gov/planetary/apod");
    url.searchParams.set("api_key", API_KEY);
    if (dateString) url.searchParams.set("date", dateString);

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`NASA API error: ${res.status}`);

    const data = await res.json();
    renderApod(data);
  } catch (err) {
    console.error(err);
    if (titleEl) titleEl.textContent = "Error loading APOD";
    if (dateEl) dateEl.textContent = "";
    if (explanationEl) explanationEl.textContent = "Please check your network or try again later.";
    if (mediaContainer) mediaContainer.innerHTML = "";
    setBackground(DEFAULT_BG_IMAGE);
  } finally {
    setLoading(false);
  }
}

function renderApod(data) {
  const { title, date, explanation, media_type, url } = data;

  if (titleEl) titleEl.textContent = title;
  if (dateEl) dateEl.textContent = date;
  if (explanationEl) explanationEl.textContent = explanation || "";
  if (mediaContainer) mediaContainer.innerHTML = "";

  // Update background with APOD image (or fallback for video)
  if (media_type === "image") {
    setBackground(url);
  } else {
    setBackground(DEFAULT_BG_IMAGE);
  }

  if (!mediaContainer) return;

  if (media_type === "image") {
    const img = document.createElement("img");
    img.src = url;
    img.alt = title;
    img.className = "apod-image";
    mediaContainer.appendChild(img);
  } else if (media_type === "video") {
    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.className = "apod-video";
    iframe.allowFullscreen = true;
    iframe.loading = "lazy";
    mediaContainer.appendChild(iframe);
  } else {
    mediaContainer.textContent = "Unsupported media type.";
  }
}

function setupControls() {
  const today = new Date();
  const todayStr = formatDate(today);

  if (dateInput) {
    dateInput.max = todayStr;
    dateInput.value = todayStr;
    dateInput.addEventListener("change", () => {
      fetchApod(dateInput.value || todayStr);
    });
  }

  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      const value = dateInput?.value || todayStr;
      fetchApod(value);
    });
  }
}

function setupSearch() {
  const form = document.getElementById("search-form");
  const input = document.getElementById("search-input");
  if (!form || !input) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  });
}

function loadLinks() {
  const raw = localStorage.getItem(LINKS_STORAGE_KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLinks(links) {
  localStorage.setItem(LINKS_STORAGE_KEY, JSON.stringify(links));
}

function renderLinks(links) {
  const container = document.getElementById("links");
  if (!container) return;
  container.innerHTML = "";

  links.forEach((link, index) => {
    const chip = document.createElement("a");
    chip.href = link.url;
    chip.target = "_blank";
    chip.className = "link-chip";

    const nameSpan = document.createElement("span");
    nameSpan.textContent = link.name;

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.textContent = "✎";

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "✕";

    editBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openLinkModal("edit", links, index);
    });

    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      links.splice(index, 1);
      saveLinks(links);
      renderLinks(links);
    });

    chip.appendChild(nameSpan);
    chip.appendChild(editBtn);
    chip.appendChild(deleteBtn);
    container.appendChild(chip);
  });
}

let currentLinkMode = "add";
let currentLinkIndex = null;

function openLinkModal(mode, links, index = null) {
  currentLinkMode = mode;
  currentLinkIndex = index;

  const modal = document.getElementById("link-modal");
  const titleEl = document.getElementById("link-modal-title");
  const nameInput = document.getElementById("link-name");
  const urlInput = document.getElementById("link-url");

  if (!modal || !titleEl || !nameInput || !urlInput) return;

  if (mode === "edit" && index != null) {
    titleEl.textContent = "Edit Quick Link";
    nameInput.value = links[index].name;
    urlInput.value = links[index].url;
  } else {
    titleEl.textContent = "Add Quick Link";
    nameInput.value = "";
    urlInput.value = "";
  }

  modal.classList.remove("hidden");
  nameInput.focus();
}

function closeLinkModal() {
  const modal = document.getElementById("link-modal");
  if (modal) modal.classList.add("hidden");
}

function setupLinks() {
  let links = loadLinks();
  if (links.length === 0) {
    links = [
      { name: "Stardance", url: "https://stardance.hackclub.com" },
      { name: "GitHub", url: "https://github.com" },
      { name: "Hackatime", url: "https://hackatime.hackclub.com" },
    ];
    saveLinks(links);
  }

  renderLinks(links);

  const addBtn = document.getElementById("add-link-button");
  const modal = document.getElementById("link-modal");
  const form = document.getElementById("link-form");
  const cancelBtn = document.getElementById("link-cancel");
  const nameInput = document.getElementById("link-name");
  const urlInput = document.getElementById("link-url");

  if (!addBtn || !modal || !form || !cancelBtn || !nameInput || !urlInput) return;

  addBtn.addEventListener("click", () => {
    openLinkModal("add", links);
  });

  cancelBtn.addEventListener("click", () => {
    closeLinkModal();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeLinkModal();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const url = urlInput.value.trim();
    if (!name || !url) return;

    if (currentLinkMode === "edit" && currentLinkIndex != null) {
      links[currentLinkIndex] = { name, url };
    } else {
      links.push({ name, url });
    }

    saveLinks(links);
    renderLinks(links);
    closeLinkModal();
  });
}

function loadTodos() {
  const raw = localStorage.getItem(TODO_STORAGE_KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTodos(todos) {
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
}

function renderTodos(todos) {
  const grid = document.getElementById("todo-grid");
  if (!grid) return;
  grid.innerHTML = "";

  todos.forEach((todo, index) => {
    const card = document.createElement("div");
    card.className = "sticky-note";
    if (todo.done) card.classList.add("done");

    const textEl = document.createElement("div");
    textEl.className = "sticky-note-text";
    textEl.textContent = todo.text;

    const footer = document.createElement("div");
    footer.className = "sticky-note-footer";

    const timeEl = document.createElement("span");
    timeEl.textContent = todo.createdAt || "";

    const btns = document.createElement("div");
    btns.className = "sticky-note-buttons";

    const doneBtn = document.createElement("button");
    doneBtn.type = "button";
    doneBtn.textContent = todo.done ? "✔" : "✓";
    doneBtn.title = todo.done ? "Mark as not done" : "Mark as done";

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.textContent = "✎";
    editBtn.title = "Edit note";

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "🗑";
    deleteBtn.title = "Delete note";

    doneBtn.addEventListener("click", () => {
      todos[index].done = !todos[index].done;
      saveTodos(todos);
      renderTodos(todos);
    });

    editBtn.addEventListener("click", () => {
      const newText = prompt("Edit note:", todo.text);
      if (newText != null) {
        todos[index].text = newText.trim();
        saveTodos(todos);
        renderTodos(todos);
      }
    });

    deleteBtn.addEventListener("click", () => {
      if (confirm("Delete this note?")) {
        todos.splice(index, 1);
        saveTodos(todos);
        renderTodos(todos);
      }
    });

    btns.appendChild(doneBtn);
    btns.appendChild(editBtn);
    btns.appendChild(deleteBtn);

    footer.appendChild(timeEl);
    footer.appendChild(btns);

    card.appendChild(textEl);
    card.appendChild(footer);
    grid.appendChild(card);
  });
}

function setupTodo() {
  let todos = loadTodos();
  renderTodos(todos);

  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  if (!form || !input) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    const now = new Date();
    const stamp = now.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });

    todos.push({
      text,
      done: false,
      createdAt: stamp,
    });
    saveTodos(todos);
    renderTodos(todos);
    input.value = "";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  maybeShowUserSetup();
  setupClockGreeting();
  setupSearch();
  setupLinks();
  setupTodo();
  setupControls();
  fetchApod();
});
// Tilt effect for glass panels
function applyTilt(element) {
  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5; // max 5deg
    const rotateY = ((x - centerX) / centerX) * 5;
    element.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    element.style.transition = 'transform 0.1s ease-out';
  });
  element.addEventListener('mouseleave', () => {
    element.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0px)';
    element.style.transition = 'transform 0.5s ease';
  });
}

// Attach to your cards
document.querySelectorAll('.media-container, .notes-section .todo').forEach(card => applyTilt(card));