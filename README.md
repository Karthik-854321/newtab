```markdown
# 🚀 Space Pulse – NASA APOD New Tab

**A beautiful, glassmorphic new tab page that brings the cosmos to your browser.**  
Every day a fresh NASA astronomy picture becomes your background. Search the web, save quick links, jot down sticky notes, and enjoy a personalized space dashboard.

---

## ✨ Features

- 🌠 **Dynamic NASA APOD Background** – The Astronomy Picture of the Day fills the page; videos fall back to a stunning default galaxy.
- 🕰️ **Live Greeting & Clock** – Time‑based greetings (Good morning/afternoon/evening) with your name and a real‑time clock.
- 🔍 **Universal Search Bar** – Search Google (or any engine) directly from the page.
- 📌 **Quick Links** – Add, edit, delete shortcut links to your favourite sites.
- 📝 **Sticky Notes** – Always visible on the right side – never scroll away. Mark as done, edit, or delete.
- 👤 **User Setup** – Choose your name and an emoji avatar (astronaut, alien, robot, space cat).
- 🧊 **Glassmorphism UI** – Frosted glass panels with backdrop blur, floating animations, and a responsive layout.
- 💾 **Local Storage** – Your links, notes, and profile are saved in your browser and persist across sessions.

---

## 📸 Preview

<<<<<<< HEAD
![Space Pulse Screenshot](https://raw.githubusercontent.com/Karthik-854321/newtab/main/screenshot.png)
=======
<img src="screenshot.png" alt="Space Pulse Screenshot" width="100%">

>>>>>>> 26c74fcfdeecada2cc2ef4d04ef32c7902ab3532
---

## 🛠️ Tech Stack

- **HTML5** – Semantic structure  
- **CSS3** – Glassmorphism, animations, responsive grid  
- **Vanilla JavaScript (ES6 Modules)** – NASA API fetch, DOM manipulation, LocalStorage  
- **NASA APOD API** – Free, requires an API key  
- **Vite** – Fast development bundler

---

## 🚀 Getting Started

### 1. Get a NASA API Key
Go to [https://api.nasa.gov](https://api.nasa.gov) and generate a free key.

### 2. Clone or Download the Project
```bash
git clone https://github.com/Karthik-854321/newtab.git
cd newtab
```

### 3. Set Up Environment Variable
Create a `.env` file in the root of the project:
```
VITE_NASA_API_KEY=YOUR_NASA_API_KEY_HERE
```

### 4. Install Dependencies and Run
```bash
npm install
npm run dev
```
Then open the URL shown in the terminal (usually `http://localhost:5173`).

> **Alternative**: You can use any static file server. Just make sure `import.meta.env` is handled (Vite does this automatically).

---

## 🔧 Customization

### Change the Search Engine
In `main.js`, inside the `setupSearch` function, change the search URL:

**Google (default):**
```js
window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
```

**DuckDuckGo:**
```js
window.location.href = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
```

**Yahoo:**
```js
window.location.href = `https://search.yahoo.com/search?p=${encodeURIComponent(query)}`;
```

**Bing:**
```js
window.location.href = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
```

### Change the Default Background for Video APODs
In `main.js`, locate `DEFAULT_BG_IMAGE` and replace the URL with any image you like.

### Adjust the Glass Effect
All glass properties are in `style.css`. Search for `backdrop-filter`, `rgba(255,255,255,...)` and adjust the opacity/blur values.

---

## 📖 Devlog

📅 **From Raw API to Floating Glass Dashboard**

1. 🚀 **Started** with a simple NASA APOD viewer – fetching daily space images & videos.
2. 🔍 **Added** a Chrome‑style search bar, quick links, and sticky notes for full productivity.
3. 🎨 **Dynamized** the background to mirror the APOD image, with a fallback for video days.
4. 🧩 **Restructured** the layout – greeting, clock, and avatar at the top, notes beside APOD, no awkward scrolls.
5. ✨ **Polished** with glassmorphism: frosted panels, saturate blurs, and subtle borders for depth.
6. 🕊️ **Brought it to life** with floating animations and a friendly 3D tilt on hover.
7. 👨‍🚀 **Personalized** with a setup modal that remembers your name and emoji avatar – every visit feels like your own space station.

*The result: a sleek, immersive New Tab page that turns NASA’s cosmos into a functional, floating workspace.*

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or pull request.  
Ideas: new themes, additional search engines, weather widget, or a Pomodoro timer.

## 🤖 AI Usage

Parts of this project were built with the help of AI assistance (OpenAI,deepseek).  
The AI was used for:
- Drafting and refining HTML/CSS/JS code
- Generating the initial README and documentation
- Debugging and layout suggestions
- Ai is used as a tool to repair my page 
All code was written,reviewed, tested, and modified by me before final submission.-

## 📄 License

MIT – use it, modify it, share it.  
NASA images are public domain, but please credit NASA where appropriate.

---

## 🙏 Acknowledgements

- NASA for the amazing APOD API  
- The glassmorphism trend for UI inspiration  
- Vite for the blazing‑fast development experience

---

<<<<<<< HEAD
**Made with ❤️ and a little stardust.**
=======
**Made with ❤️ and a little stardust.**
```
>>>>>>> 26c74fcfdeecada2cc2ef4d04ef32c7902ab3532
