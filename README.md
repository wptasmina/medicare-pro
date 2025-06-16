
# Medicare Pro – Frontend

**Medicare Pro** is a SaaS-based medical platform where **Admins** manage **Doctors**,
and **Doctors** manage their **Assistants**. This is the frontend built 
using **Next.js**, **TypeScript**, and **Tailwind CSS**.


## 🌐 Live Preview

| Link | Description |
|------|-------------|
| [Live Site](https://medicare-pro-rust.vercel.app) | Deployed frontend app |


## 📁 Folder Structure

| Folder/File         | Description                                |
|---------------------|--------------------------------------------|
| `app/`              | App Router pages for admin, doctor, auth   |
| `components/`       | Reusable UI and shared components          |
| `lib/`              | Utility functions                          |
| `store/`            | Redux Toolkit store and slices             |
| `styles/`           | Global styles (Tailwind)                   |
| `public/`           | Public assets                              |
| `types/`            | TypeScript types                           |
| `next.config.js`    | Next.js configuration                      |


## ✅ Features

### 🛡️ Admin Features

| Feature                     | Description                                  |
|-----------------------------|----------------------------------------------|
| Admin Login                 | Login using email & password                 |
| Add Doctor                  | Form with name, email, specialization, etc.  |
| View Doctors List           | Table of all doctors with subscription info  |
| Filter & Sort               | By subscription expiry                       |
| Subscription Overview       | Total doctors, plan status display           |
| Manage Plans                | Add, edit, delete plans                      |

### 🧑‍⚕️ Doctor Features

| Feature          | Description                             |
|------------------|-----------------------------------------|
| Doctor Login     | Secure login                            |
| Add Assistant    | Form with name, email, phone            |
| View Assistants  | List view                               |
| Edit/Delete      | Assistant update or delete              |



## 🧪 API Access

| Resource     | Description                      |
|--------------|----------------------------------|
| Base URL     | `https://medicare-pro-backend.vercel.app` |
| Postman Link | [View Collection](https://www.postman.com/trilia-devshare-team/frontend-task/collection/5g3lx5c/doctor-managements?action=share) |


## 🛠️ Tech Stack

| Tech         | Usage                            |
|--------------|----------------------------------|
| Next.js      | React framework (App Router)     |
| TypeScript   | Type safety                      |
| Tailwind CSS | Styling                          |
| Redux Toolkit| State management + API slice     |
| Zod          | Schema validation                |
| Axios        | HTTP client                      |
| Vercel       | Deployment                       |


## ⚙️ Getting Started

| Step             | Command                                  |
|------------------|------------------------------------------|
| Clone Repository | `git clone https://github.com/your-username/medicare-pro-frontend.git` |
| Install Deps     | `npm install` or `yarn`                  |
| Run Dev Server   | `npm run dev` or `yarn dev`              |

### 📄 .env.local

```env
NEXT_PUBLIC_API_BASE_URL=https://medicare-pro-backend.vercel.app
````


## 🏁 Deployment

| Platform | Command                   |
| -------- | ------------------------- |
| Vercel   | `vercel` CLI or dashboard |


## 📅 Submission Info

| Field      | Detail                                                       |
| ---------- | ------------------------------------------------------------ |
| Start Date | 16 June 2025                                                 |
| Deadline   | 18 June 2025, 11:59 PM (BDT)                                 |
| Contact    | 📧 [shahisrail134@gmail.com](mailto:shahisrail134@gmail.com) |

---
