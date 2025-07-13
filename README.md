
# 💼 Bakir Dawood – Developer Portfolio Website

A clean, modern, and responsive developer portfolio website with built-in **light/dark mode toggle**, smooth **scroll-based animations**, and well-structured sections to showcase your skills, projects, and contact information.

---

## 🌐 Live Demo

*Coming soon…* (Upload your project to GitHub Pages, Netlify, or Vercel and add the link here.)

---

## 🧩 Features

- ✨ **Light/Dark Mode Toggle** with local storage persistence
- 🎞️ **Smooth Animations** using AOS (Animate On Scroll)
- 📱 Fully **Responsive Design**
- 💻 Built with **HTML5**, **CSS3**, and **JavaScript**
- 📄 Easy to customize and deploy
- 🔗 Social icons for GitHub, LinkedIn, Instagram, etc.

---

## 🧪 Technologies Used

| Frontend     | Tools / Libraries        |
|--------------|---------------------------|
| HTML5        | Semantic page structure   |
| CSS3         | Styling and responsiveness |
| JavaScript   | Theme toggle, interactivity |
| AOS          | Animate On Scroll library |
| Google Fonts | Custom font integrations  |
| Font Awesome | Social icons              |

---

## 📂 Folder Structure

```
📁 Portfolio/
├── index.html              # Main HTML file
├── /css                    # Stylesheets
│   └── style.css
├── /js                     # Scripts (for theme toggle, etc.)
│   └── main.js
├── /images                 # Your assets and profile image
└── README.md               # You're reading it!
```

---

## 🚀 Getting Started

To run the website locally:

1. Clone this repository or download the ZIP.
2. Open `index.html` in your browser.
3. Customize the content and images as needed.

```bash
git clone https://github.com/yourusername/your-portfolio.git
cd your-portfolio
```

> ✍️ Tip: You can use **VS Code Live Server** for development preview.

---

## 🧠 Customization Guide

### 🔄 Light/Dark Mode

Toggle button is fixed to the top-right corner. Theme preference is saved to `localStorage`.

To edit styling:

```css
/* CSS Example */
body.dark-mode {
  background-color: #121212;
  color: #e0e0e0;
}
```

### 🌀 Scroll Animations

All sections use the `data-aos="fade-up"` attribute. You can change animations like:

```html
<section data-aos="zoom-in"></section>
```

[See full AOS animations list](https://michalsnik.github.io/aos/)

---

## ✈️ Deployment

You can deploy this website easily using:

- **GitHub Pages**
- **Netlify**
- **Vercel**

### GitHub Pages:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-portfolio.git
git push -u origin main
```

Then go to:
`Settings → Pages → Source: main → root` → Save

---

## 📬 Contact

**Bakir Dawood**  
📧 [bakirdawoodbusiness@gmail.com](mailto:bakirdawoodbusiness@gmail.com)  
🔗 [LinkedIn](https://linkedin.com/in/your-profile)  
🔗 [GitHub](https://github.com/your-username)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
