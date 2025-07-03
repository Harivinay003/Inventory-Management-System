## 🧩 Components Folder Overview (`src/components/`)

The `components/` folder contains all the **reusable UI components** that are used across various pages of the application. These components help keep the codebase **modular, clean, and maintainable** by encapsulating specific functionality or UI sections.

---

### 📁 Common Components

### 🔁 Reusability and Composition

- Components are designed to be **stateless** when possible, with props passed from parents.
- They are **composed** together to form full pages (e.g., `Dashboard` = `Navbar` + `ItemCard` list + `SearchBar`).
- Styles are applied via **Tailwind CSS** or `styles/` folder.

---

### 🌙 Dark Mode Support

All components are built to support both light and dark modes using Tailwind’s dark variant classes like:
```html
