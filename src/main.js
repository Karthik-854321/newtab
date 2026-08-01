import "./style.css";

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

const titleEl = document.getElementById("apod-title");
const dateEl = document.getElementById("apod-date");
const explanationEl = document.getElementById("apod-explanation");
const mediaContainer = document.getElementById("apod-media-container");
const dateInput = document.getElementById("apod-date-input");
const refreshBtn = document.getElementById("apod-refresh-btn");
const appRoot = document.getElementById("app");

function formatDate(date) {
  return date.toISOString().split("T")[0]; // YYYY-MM-DD
}

function setLoading(isLoading) {
  if (!appRoot) return;
  appRoot.dataset.loading = isLoading ? "true" : "false";
}

async function fetchApod(dateString) {
  try {
    setLoading(true);
    titleEl.textContent = "Loading NASA APOD...";
    explanationEl.textContent = "";
    mediaContainer.innerHTML = "";

    const url = new URL("https://api.nasa.gov/planetary/apod");
    url.searchParams.set("api_key", API_KEY);
    if (dateString) {
      url.searchParams.set("date", dateString);
    }

    const res = await fetch(url.toString());
    if (!res.ok) {
      throw new Error(`NASA API error: ${res.status}`);
    }

    const data = await res.json();
    renderApod(data);
  } catch (err) {
    console.error(err);
    titleEl.textContent = "Error loading APOD";
    dateEl.textContent = "";
    explanationEl.textContent = "Please check your network or try again later.";
    mediaContainer.innerHTML = "";
  } finally {
    setLoading(false);
  }
}

function renderApod(data) {
  const { title, date, explanation, media_type, url } = data;

  titleEl.textContent = title;
  dateEl.textContent = date;
  explanationEl.textContent = explanation || "";

  mediaContainer.innerHTML = "";

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

setupControls();
fetchApod(); // fetch today's APOD on load