# Skill Hatch

Skill Hatch is a modern web-based e-learning platform supporting both free and paid courses with role-based access for Students, Instructors, and Admins. Built with **Next.js**, **Tailwind CSS**, and **React**, the platform supports real-time communication, chart-based analytics, and flexible content delivery.

---

## 📚 Table of Contents

- [Features](#features)
- [Roles and Responsibilities](#roles-and-responsibilities)
- [Tech Stack](#tech-stack)
- [Installation](#installation)

---

## ✨ Features

- ✅ Role-based Access: Student, Instructor, Admin
- 📖 Free and Paid Course Support
- 🧠 Course Types: Text and Video Content
- 💬 Real-time Chat between Instructors and Students
- 📊 Analytics and Tracking for All Roles
- 📤 Instructor Course Submission System
- 🔒 Admin Moderation and Approval Panel

---

## 🧑‍💼 Roles and Responsibilities

### 🧑‍🎓 Student

- Access **free** and **paid** courses.
- View **text-based** and **video-based** course content.
- Interact with instructors via **real-time chat**.
- View personal learning **progress and statistics**.

### 🧑‍🏫 Instructor

- Create and submit **free** or **paid** courses.
- Upload **text** and/or **video** course material.
- Communicate with enrolled students via **chat**.
- View analytics for student engagement and course performance.

### 🛡️ Admin

- Approve or reject submitted courses.
- Monitor and manage all course and user activity.
- Access platform-wide **charts and tracking data**.
- Moderate communication and maintain platform integrity.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) `v15.3.1`
- **React**: `v19.0.0`
- **Styling**:
  - [Tailwind CSS](https://tailwindcss.com/) `v4.1.4`
  - `clsx`, `tailwind-merge`, `tw-animate-css`
- **Charts**: [Recharts](https://recharts.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Components**: [Radix UI](https://www.radix-ui.com/), `lucide-react`, `react-icons`
- **Calendar Integration**: `react-calendar`
- **Linting & Type Safety**:
  - ESLint
  - TypeScript
  - `@types/react`, `@types/node`

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/your-username/skill-hatch.git
cd skill-hatch

# Install dependencies
npm install
