# ProLab – VNIT Project Repository Platform

A full-stack web application built exclusively for VNIT students to share and explore academic and personal projects.

---

## Table of Contents

1. [Overview](#overview)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Architecture & Folder Structure](#architecture--folder-structure)  
5. [Data Models](#data-models)  
6. [API Endpoints](#api-endpoints)  
7. [Environment Variables](#environment-variables)  
8. [Available Scripts](#available-scripts)  
9. [UI & Theming](#ui--theming)  
10. [Future Improvements](#future-improvements)

---

## Overview

ProLab is designed to be a one-stop platform for VNIT students to showcase and discover projects—academic assignments, personal experiments, hackathon entries, and more—all in one interactive, animated interface.

---

## Features

- **Secure Authentication**  
  Register, log in, and maintain sessions via JWT.  
- **Project CRUD**  
  - **Create:** Authenticated users can submit new project entries.  
  - **Read:** Browse, search by tags or tech stack, and view details of any project.  
  - **Update & Delete:** Authors can edit or remove their own submissions.  
- **Tagging & Tech Stack**  
  Assign multiple tags and list all technologies used for precise filtering.  
- **Rich Project Entries**  
  Include GitHub link, optional report link, screenshots, and descriptive fields.  
- **Protected Routes**  
  Ensure only logged-in users can post, edit, or delete projects.

---

## Tech Stack

- **Frontend**  
  - React.js  
  - Framer Motion (animations)  
  - Axios (HTTP requests)  
  - Tailwind CSS (utility-first styling)  

- **Backend**  
  - Node.js & Express.js  
  - MongoDB (via Mongoose ODM)  
  - JSON Web Tokens (authentication)  

---

## Architecture & Folder Structure


---

## Data Models

### Project Schema
| Field        | Type         | Description                                  |
| ------------ | ------------ | -------------------------------------------- |
| `title`      | String       | Project title                                |
| `description`| String       | Detailed description                         |
| `githubLink` | String       | URL to GitHub repository                     |
| `reportLink` | String       | (Optional) URL to project report             |
| `techStack`  | [String]     | List of technologies used                    |
| `tags`       | [String]     | Custom tags for categorization               |
| `screenshots`| [String]     | URLs of uploaded screenshots                 |
| `likes`      | Number       | Count of “likes” received                    |
| `postedBy`   | ObjectId     | Reference to User who created the project    |
| `createdAt`  | Date         | Timestamp                                    |

---

## API Endpoints

### Auth
- `POST /api/auth/register`  
  Create a new user account.

- `POST /api/auth/login`  
  Obtain JWT by providing email & password.

### Projects
- `GET /api/projects`  
  Retrieve all projects (supports query filters: `?tags=...`, `?techStack=...`).

- `GET /api/projects/:id`  
  Retrieve details of a single project.

- `POST /api/projects` *(protected)*  
  Submit a new project entry.

- `PUT /api/projects/:id` *(protected)*  
  Update an existing project (owner only).

- `DELETE /api/projects/:id` *(protected)*  
  Delete a project (owner only).

---

## Environment Variables

Create a `.env` file at your project root with:

