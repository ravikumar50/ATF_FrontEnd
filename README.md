# ATF Frontend

ATF Frontend is a React application for managing automated test results, projects, and user access, built with Vite and integrated with Azure Active Directory for authentication. The application provides dashboards, project and file management, and role-based access control for both regular users and administrators.

## Features

- **Azure AD Authentication:** Secure login and session management using MSAL.
- **Role-Based Access Control:** Admin-only routes and features for managing user access.
- **Project Management:** Create, view, and search projects.
- **File Management:** Upload, download, and delete test result files within projects.
- **Dashboards:** Visualize test results with interactive charts.
- **Notifications:** User feedback via toast notifications.
- **Responsive Routing:** All routes are protected and managed using React Router.

## Main Functions and Structure

- **Authentication & Authorization:**  
  The app uses `MsalAuthenticationTemplate` to wrap all protected routes, ensuring only authenticated users can access the main features. The `AdminRoute` component restricts certain routes to admin users only.

- **Routing:**  
  The application uses `react-router-dom` to define routes for home, dashboards, project management, access management, and error pages. Each route is associated with a specific component and is protected by authentication.

- **State Synchronization:**  
  The `AuthSync` component ensures the user's authentication state is synchronized with the backend and updates the UI accordingly.

- **Dashboard Visualization:**  
  Users can view overall and individual dashboards for test results, rendered as charts for easy analysis.

- **Project and File Operations:**  
  Users can create projects, upload files, and manage them within each project. Admins can manage user access to projects.

- **Error Handling:**  
  Custom pages are provided for access denied and not found routes.

## Example Test Case

To verify the main workflow, you can use the following test scenario:

**Test: Upload a test result file and view its dashboard**

1. Log in with a valid Azure AD account.
2. Navigate to the "All Projects" page and create/select a project.
3. Upload a `.trx` test result file.
4. Confirm the file appears in the project file list.
5. Click the dashboard button for the uploaded file.
6. Verify that the dashboard displays the correct test result charts.

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Installation

```sh
npm install
```

### Running the Application

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Dependencies

- React
- Vite
- react-router-dom
- @azure/msal-react, @azure/msal-browser
- react-toastify
- chart.js

## License

This project is licensed under the