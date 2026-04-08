# Angular Checkmate

**Angular Checkmate** is the front-end client for the chess tournament management application, developed during the professional training at **Technifutur**.

This interface provides a modern and responsive user experience for organizers and players to manage tournaments, view rankings, and track match results.

The front-end is close to being finished but is still a work in progress. You will need to run the Express backend repo at the same time for the app to work.

---

## Tech Stack

The project is built using the latest version of **Angular** and focuses on performance:

* **Framework:** [Angular 21](https://angular.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (PostCSS integration)
* **Authentication:** [jwt-decode](https://github.com/auth0/jwt-decode) for handling secure user sessions.
* **Utilities:** [Day.js](https://day.js.org/) for lightweight date management and [RxJS](https://rxjs.dev/) for reactive state handling.

---

##  Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Dranhoc/Checkmate_Angular
cd Checkmate_Angular
```

### 2. Install dependencies

```bash
npm install
```
### 3. Usage

Runs the app
```bash
npm run start
```

### 4. Project Structure

The project follows a modular and scalable Angular architecture:

* **`core/`**: Contains core logic, singleton services, and global configurations (guards, interceptors, models).
* **`features/`**: Houses the main business features of the application.
* **`shared/`**: Contains reusable components (buttons, cards, icons) and layout elements used across multiple features.
* **`assets/`**: Static files like images and translation files (i18n).

---
