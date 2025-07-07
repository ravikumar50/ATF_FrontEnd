# ATF Project Documentation

## Overview

The **Automated Test Framework (ATF)** is a full-stack web application designed to streamline test result management and access control for different projects. It integrates:

* A **React (Vite)** frontend secured with **Azure Active Directory (Azure AD)** authentication.
* A **serverless Azure Functions** backend that interacts with **Azure Blob Storage** for file handling and metadata management.

This documentation outlines the major backend functions, their roles, and the workflow of the application using a real-world scenario.

---

## System Architecture and Flow

### General Flow:

1. **User logs in via Azure AD.**
2. **Admin creates a project** using the frontend UI → `newProject` function.
3. **Admin invites a user** to the platform → `addUser` → `addProjectAccess`.
4. **User uploads test result files** (.trx) to a selected project → `uploadBlob` → `uploadCaculation` → `parseTRX`.
5. **Dashboard displays visualizations** of test data → `individualCall`.
6. **Admins manage files** (delete, list, fetch) using various APIs.

---

## Function-Based Documentation with Flow

### 🔐 `addUser.js`

**Purpose**: Invite a user to the platform via Microsoft Graph API and grant them access to a project.

* **Inputs**: `email`, `role`
* **Flow**: Calls `addProjectAccess` internally.
* **Response**: Confirmation or error message.

---

### 🔑 `addProjectAccess.js`

**Purpose**: Grants access to a specific project for a user. Creates new user entry if needed.

* **Inputs**: `email`, `projectName`
* **Effect**: Updates `projectmetadata/mapping.json`

---

### 📁 `newProject.js`

**Purpose**: Creates a new project container in Azure Blob Storage.

* **Inputs**: `name`, `description (optional)`
* **Effect**: Initializes:

  * `dummyfiles/` folder
  * `metadata/database.json`
* **Use case**: Only accessible to admin users.

---

### 📤 `uploadBlob.js`

**Purpose**: Uploads a test result file to `dummyfiles/` in the specified container.

* **Inputs**: `file`, `containerName`
* **Triggers**: `uploadCaculation` (Blob trigger)

---

### ⚙️ `uploadCaculation.js`

**Trigger**: Blob Trigger on file upload
**Purpose**:

* Calls `parseTRX` to process .trx test result files
* Updates metadata in `metadata/database.json`

---

### 📊 `parseTRX.js`

**Purpose**: Extracts test counters (Passed, Failed, Skipped) from uploaded `.trx` files.

* **Inputs** (Query Params): `containerName`, `filename`
* **Outputs**: JSON with test stats

---

### 📋 `individualCall.js`

**Purpose**: Fetches test metadata for a specific file from `metadata/database.json`

* **Inputs**: `fileName`, `containerName`
* **Use**: Populate dashboard charts

---

### 🧾 `listProjects.js`

**Purpose**: Lists projects accessible to a user

* **Input**: `email`
* **Use**: Render user-specific dashboard

---

### 📦 `listBlob.js`

**Purpose**: Lists all uploaded files in a project's `dummyfiles/` folder

* **Input**: `containerName`
* **Output**: Array of filenames

---

### 🗑️ `deleteBlob.js`

**Purpose**: Deletes a file and its metadata from a project

* **Inputs**: `fileName`, `containerName`
* **Use**: Admin panel file management

---

### 🧼 `selfDestruct.js`

**Trigger**: Timer (Daily at 1 AM)
**Purpose**: Deletes expired files based on `expiryDate` metadata

---

### 📜 `getAcessDetails.js`

**Purpose**: Fetches all user-project mappings

* **Use**: Admin view of access rights

---

### ❌ `removeProjectAcess.js`

**Purpose**: Removes a user's access to a project

* **Inputs**: `email`, `projectName`

---

### 👤 `isAdmin.js`

**Purpose**: Checks if a user is an admin

* **Input**: `email`
* **Response**: Admin status

---

### 📥 `universalUploadHandler.js`

**Trigger**: Event Grid
**Purpose**: Handles blob upload events to:

* Parse `.trx` files
* Update project metadata

---

## Real-Life Example Workflow

### Use Case: Upload and Analyze Test Results

1. **Admin logs in** → verified with `isAdmin`
2. **Creates project** → via UI → triggers `newProject`
3. **Adds user access** → triggers `addUser` and `addProjectAccess`
4. **User logs in** → views projects using `listProjects`
5. **User uploads `.trx` file** → `uploadBlob` → `uploadCaculation` → `parseTRX`
6. **Frontend fetches results** using `individualCall` and displays charts
7. **Admin reviews access or deletes old files** using `getAcessDetails`, `deleteBlob`
8. **Expired files auto-deleted** daily by `selfDestruct`

---

## Frontend Summary (ATF Frontend)

* **Framework**: React (Vite)
* **Auth**: Azure AD using MSAL
* **Routing**: Protected routes with `react-router-dom`
* **Charts**: `chart.js`
* **Notifications**: `react-toastify`

### Installation

```bash
npm install
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

### Frontend Features

* Secure Login & Logout
* Role-based Access Control
* Dashboard with test charts
* File & Project Management

---

## Conclusion

This project leverages the scalability of Azure Functions and the interactivity of React to offer a robust and secure automated testing dashboard. Whether uploading test results or managing project-level access, the ATF platform supports both technical depth and user-friendly design.

