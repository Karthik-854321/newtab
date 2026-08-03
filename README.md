# 🚀 Space Pulse

*A simple browser new tab page that turns opening a new tab into a useful experience rather than a blank one.*

Space Pulse replaces the standard new tab with a space-themed dashboard based on NASA's Astronomy Picture of the Day (APOD) API. Every day you get a new astronomy picture while also being able to access all the tools you need most—search, links, notes, and your personalized greeting.

This project was created out of desire for a nice-looking yet functional start page. In other words, I decided to replace my blank new tab with something that would inspire interest in space while staying useful.

---

## ✨ Features

### 🌌 Daily NASA APOD Background

Space Pulse fetches NASA's Astronomy Picture of the Day each day via the APOD API.

* Automatically displays the latest astronomy image.
* Both images and videos are supported.
* If NASA decides to post a video rather than an image, the app uses a fallback space background.

### 👋 Personalized Welcome

During your first visit, you will be prompted to type your name and select your own emoji avatar.

Your profile is stored in your local browser and consists of:

* Your name.
* Emoji avatar.
* Personalized greeting according to the time of the day.

### 🕒 Live Clock & Date

Time and date are shown on the dashboard and updated automatically without a need for reloading the page.

### 🔍 Search

Use the search bar in order to search the web through Google without leaving your new tab page.

### 🔗 Quick Links

Store shortcuts to your favorite websites.

Here is what you can do with them:

* Add new links.
* Edit the existing ones.
* Delete links anytime you want.

Everything is stored locally in your browser.

### 📝 Sticky Notes

Store small reminders right on your new tab page.

With your notes you can:

* Create notes.
* Edit notes.
* Mark the notes as completed.
* Delete notes.

The notes are available even after closing the browser.

### 💾 Local Storage

An account and a database aren't required.

The following data is stored locally in your browser:

* Profile data.
* Emoji avatar.
* Quick links.
* Sticky notes.

Nothing is uploaded to the servers.

---

## 🛠️ Built With

* HTML5.
* CSS3.
* JavaScript (ES6).
* Vite.
* NASA Astronomy Picture of the Day (APOD) API.
* Browser Local Storage.

---

## 📂 Project Structure

```
src/
│── main.js
│── style.css
│
index.html
vite.config.js
package.json
.env
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/space-pulse.git

cd space-pulse
```

### 2. Install dependencies

```bash
npm install
```

### 3. Get a NASA API Key

Obtain a free API key from:

https://api.nasa.gov

### 4. Create a `.env` file

```env
VITE_NASA_API_KEY=your_api_key_here
```

### 5. Start the development server

```bash
npm run dev
```

### 6. Build for production

```bash
npm run build
```

---

## 📦 How It Works

1. The app makes a request to get the latest APOD data from NASA.
2. The image (or fallback background) is being displayed.
3. Profile data, notes, and shortcuts are being loaded from Local Storage.
4. The clock updates in real-time.
5. Anything that has been changed is automatically being stored in your browser.

---

## 💡 What I Learned

Building this app allowed me to learn how to:

* Work with REST API.
* Fetch and display external data.
* Handle API responses and errors.
* Use Local Storage to store user data.
* Create a responsive interface.
* Organize JavaScript project with Vite.
* Improve user experience with simple animations.

---

## 🔮 Future Improvements

Some features I would like to add in the future are:

* ⏳ Pomodoro timer.
* 🌤️ Weather widget.
* 🌙 Dark and Light themes.
* 🎨 Multiple sticky note colors.
* ⭐ Drag-and-drop quick links.
* 📅 Calendar widget.
* 📊 Daily productivity tracker.
* 🔎 Multiple search engines.

---

## 🤖 AI Usage

During the development process, AI was used as an assistant for:

* Brainstorming feature ideas.
* Improving UI/UX design decisions.
* Debugging JavaScript issues.
* Refactoring and organizing code.
* Writing and improving documentation.

All project architecture, implementation, testing, customization, and final decisions have been completed and reviewed by me.

---

## 🙏 Credits

* NASA for providing the Astronomy Picture of the Day (APOD) API.
* Hack Club Stardance for inspiring and encouraging the project.
* Everyone who has tested the project and shared their feedback.

---

## 📄 License

This project is licensed under the MIT License.

Feel free to use, modify, and learn from it.