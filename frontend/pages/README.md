## 📄 Pages Folder Overview (`src/pages/`)

The `pages/` directory contains the main screen-level components of the application. Each file here represents a route or view that the user can navigate to. These pages are composed of smaller, reusable components from the `components/` folder.

---

### 📁 List of Pages

| File Name         | Description                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| `Login.jsx`       | Login screen with form validation, password toggle, and error handling.     |
| `Register.jsx`    | Registration screen with user input validation and styled layout.           |
| `Dashboard.jsx`   | Main dashboard where users can view, search, add, update, or delete items.  |
| `NotFound.jsx`    | 404 page for undefined routes (optional but recommended).                   |
| `AdminPanel.jsx`  | (Optional) Admin-only page for managing users or global settings.           |

---

### 🌐 Routing

These pages are routed using **React Router DOM**. The routing is typically configured in `App.jsx` or a dedicated `Routes.jsx` file.
