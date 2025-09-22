# Up-Course

Up-Course is a React-based e-learning platform for publishing and consuming design and development courses. It uses Firebase for data/auth, optional Supabase Storage for hosting media, and Tailwind CSS for styling. The app is deployed to Vercel with continuous deployment from GitHub.

---

## Live Demo

[https://up-course-1.vercel.app/](https://up-course-1.vercel.app/)

---

## Features

* Modern, responsive UI built with Tailwind CSS.
* Courses listing with search, category filtering, and pagination.
* Wishlist/Favorites persisted per user (Redux Toolkit + Firebase).
* Authentication via Firebase (AuthContext wrapper).
* Optional video hosting via Supabase Storage.
* CI/CD: automatic deployments to Vercel on push to `main`.

---

## Architecture

* **Frontend:** React (Vite), React Router, Redux Toolkit (wishlist slice), Context API for auth.
* **Styling:** Tailwind CSS.
* **Data & Auth:** Firebase (Firestore + Auth).
* **Media (optional):** Supabase Storage for video files.
* **Deployment:** Vercel (static hosting).

---

## Tech Stack

* **React**, **Vite**, **React Router**
* **Redux Toolkit**
* **Tailwind CSS**
* **Firebase** (Firestore, Auth)
* **Supabase Storage** (optional)
* **Vercel** (CDN + CI/CD)

---





---

## Prerequisites

* Node.js ≥ 18
* npm ≥ 9
* Firebase project (Firestore + Auth)
* (Optional) Supabase project (Storage enabled)
* Vercel account linked to your GitHub repository

---



## Getting Started

### 1) Clone

```bash
git clone https://github.com/Abdulrhman-Rabea/Up-Course.git
cd Up-Course
```

### 2) Install

```bash
npm install
```

### 3) Develop

```bash
npm run dev
```

### 4) Build

```bash
npm run build
```

### 5) Preview (local static preview)

```bash
npm run preview
```

---

## Core Workflows

### Courses: list, search, filter, paginate

* Data fetched from Firestore (`getAllData('courses')`).
* URLSearchParams used for `cat` (category) and `q` (query).
* Client-side pagination (configurable items per page) via `Pagination` component.

### Wishlist/Favorites

* Redux slice: `wishlistSlice`.
* Firestore integration:

  * `addCourseToFav(userId, courseId)`
  * `removeCourseFromFav(userId, courseId)`
  * `getUserFavCourses(userId)`
* Synced per authenticated user.

### Authentication

* `AuthContext` exposes `user` state from Firebase Auth.
* Gate features (e.g., adding to favorites) behind auth checks.

### Video Hosting (optional)

* Upload course videos to a Supabase Storage bucket.
* Store resulting public URL in course document as `videoUrl`.
* Render video via standard HTML5 `<video>` or a player component.

---

## Deployment (Vercel)

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Add environment variables in Vercel settings.
4. Set **Framework Preset**: *Vite* (if not auto-detected).
5. Every push to `main` triggers a new deployment.

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/<name>`
3. Commit and push: `git commit -m "feat: <summary>"` then `git push origin feature/<name>`
4. Open a Pull Request.

---

## Dev Team

* [Ahmed](https://github.com/ahmedshaban-blip)
* [Doha](https://github.com/Doha-AboElkasem)
* Hoda

--- 
**Unlock your creative potential with Up-Course!** 
---
## License

MIT License. See `LICENSE` for details.
