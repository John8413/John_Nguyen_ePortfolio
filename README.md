# 🏝️ Travlr Getaways Full-Stack Travel Management System

This project is a **full-stack travel booking and management web application** developed as part of my SNHU CS-499 ePortfolio.  
It demonstrates my skills in **software design and engineering**, **web frameworks**, and **database integration** through a production-style deployment using Node.js, Express, MongoDB, and Angular.

---

## 🌐 Project Overview

Travlr Getaways is a simulated travel agency website that allows users to view travel packages, meals, and room options, while administrators can securely manage trips and site data through an Angular-based admin panel.

The project is divided into two main components:
- **Public-facing website** — Displays trip packages and travel details (`/app_server/views`)
- **Admin SPA (Single Page Application)** — Built with Angular for CRUD operations on trip data (`/travlr-admin`)

---

## 🧩 Technologies Used

| Layer | Technology | Purpose |
|-------|-------------|----------|
| Front-End | Angular 17, Bootstrap 5 | SPA interface for trip management |
| Back-End | Node.js + Express | RESTful API + web server |
| Database | MongoDB (Mongoose ODM) | Stores trips and user accounts |
| Auth | JSON Web Token (JWT) + bcrypt.js | Secure login and route protection |
| Config | dotenv | Manage environment variables |
| Template Engine | Handlebars (HBS) | Renders dynamic views for the main website |
| Deployment | Localhost / GitHub Repository | Demonstration and testing environment |

---

## ⚙️ Installation & Setup

To run the project locally:

```bash
# 1. Clone the repository
git clone https://github.com/John8413/Travlr_Getaways.git

# 2. Navigate to project directory
cd Travlr_Getaways

# 3. Install dependencies
npm install

# 4. Create a .env file
# Example contents:
PORT=3000
MONGO_URI=mongodb://localhost:27017/travlr
JWT_SECRET=changeme

# 5. Run the backend server
npm start

# 6. In a separate terminal, launch the Angular admin panel
cd travlr-admin
npm install
npm start
```

---

## 🗃️ Folder Structure

```
Travlr_Getaways/
├── app.js                     # Express server entry
├── app_api/                   # API routes, models, and controllers
│   ├── database.js
│   ├── routes/
│   ├── models/
│   └── controllers/
├── app_server/                # Handlebars front-end for public site
│   ├── views/
│   ├── routes/
│   └── controllers/
├── travlr-admin/              # Angular admin SPA
├── public/                    # Static assets
├── .env                       # Environment variables
└── package.json
```

---

## 💻 Key Features

### 🔐 Authentication System
- Secure user registration and login using **JWT tokens**
- Admin-only access to API routes for trip CRUD operations

### 🧭 Trip Management Dashboard
Admins can **create, edit, delete, and view** trip data via a responsive Angular interface.

**Example — Editing a Trip**  
![Edit Trip](https://raw.githubusercontent.com/John8413/John_Nguyen_ePortfolio/main/docs/screenshots/Screenshot%202025-08-09%20210119.png)

**Trip List with CRUD Controls**  
![Trip List](https://raw.githubusercontent.com/John8413/John_Nguyen_ePortfolio/main/docs/screenshots/Screenshot%202025-08-09%20210226.png)

**Terminal Build Log — Angular Compilation**  
![Terminal Output](https://raw.githubusercontent.com/John8413/John_Nguyen_ePortfolio/main/docs/screenshots/Screenshot%202025-08-09%20210254.png)

**Public Website Home Page**  
![Home Page](https://raw.githubusercontent.com/John8413/John_Nguyen_ePortfolio/main/docs/screenshots/Screenshot%202025-10-19%20145451.png)

---

## 🧠 Learning Reflection

Developing Travlr Getaways allowed me to apply **MVC design principles**, strengthen my understanding of **RESTful API development**, and gain experience integrating a **MongoDB database** with a **secure Express.js backend**.  
The Angular admin interface provided practice in **component-based architecture**, **service injection**, and **form validation**.

This project showcases my ability to:
- Design and implement full-stack web systems
- Apply secure authentication practices
- Connect front-end frameworks to backend APIs
- Organize code following best practices for scalability

---

## 🧾 License
This project was developed for academic purposes under the SNHU Computer Science program.  
All open-source frameworks used comply with their respective licenses.

---

## 👤 Author
**John Nguyen**  
📧 [GitHub: John8413](https://github.com/John8413)  
🎓 Southern New Hampshire University — CS-499 Capstone Project
