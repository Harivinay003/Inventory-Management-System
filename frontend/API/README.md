## 🔌 API Folder Overview (`src/api/` or `src/services/`)

The `api/` (or `services/`) folder contains all logic related to **communicating with the backend API** using **Axios**. This includes HTTP requests for authentication, item management, and user roles. Centralizing API calls helps keep components clean and separates UI from data-fetching logic.

---

### 📁 Common Files

| File Name          | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| `api.js`           | Axios instance with base URL and optional interceptors (e.g. auth headers). |
| `authApi.js`       | Handles login, registration, and logout requests.                           |
| `itemApi.js`       | Contains all CRUD operations for inventory items.                           |
| `userApi.js`       | (Optional) Admin-level user management or role-checking.                    |

---
