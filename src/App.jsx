import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';
import Logout from './Pages/Logout';
import IndividualDashBoard from './Pages/IndividualDashsBoard';
import OverallDashboard from './Pages/OverallDashboard';

import { MsalAuthenticationTemplate } from '@azure/msal-react';
import { InteractionType } from "@azure/msal-browser";
import AllProjects from './Pages/AllProjects';
import ProjectDetails from './Pages/ProjectDetails';
import ManageAccess from './Pages/ManageAccess';
import { ToastContainer } from 'react-toastify';
import Denied from './Pages/Denied';
import AdminRoute from './Components/Auth/AdminRoute';
import NotFound from './Pages/NotFound';
import ViewHtmlPage from './Pages/ViewHTMLPage';


function App() {
  return (
    <>
      

      <Routes>
        <Route
          path="/"
          element={
           <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
              <HomePage />
           </MsalAuthenticationTemplate>
          }
        />

      
        <Route
          path="/individualDashBoard"
          element={
             <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
              <IndividualDashBoard />
            </MsalAuthenticationTemplate>
          }
        />

        <Route
          path="/overallDashboard"
          element={
             <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
              <OverallDashboard />
             </MsalAuthenticationTemplate>
          }
        />

        

        

        <Route
          path="/logout"
          element={
             <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
              <Logout />
             </MsalAuthenticationTemplate>
          }
        />

        

        <Route
          path="/allProjects"
          element={
             <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
              <AllProjects />
             </MsalAuthenticationTemplate>
          }
        />

        <Route
          path="/projectDetails"
          element={
             <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
              <ProjectDetails />
             </MsalAuthenticationTemplate>
          }
        />

        

        <Route
          path="/access"
          element={
             <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
              <AdminRoute>
                <ManageAccess />
              </AdminRoute>
              
             </MsalAuthenticationTemplate>
          }
        />

        <Route
          path="/denied"
          element={
             <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
              <Denied />
             </MsalAuthenticationTemplate>
          }
        />

        <Route
          path="/viewHtml"
          element={
             <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
              <ViewHtmlPage />
             </MsalAuthenticationTemplate>
          }
        />

        <Route path="*" element={<NotFound/>}/>


      </Routes>
      <ToastContainer position="top-right" autoClose={1500} />
    </>
  );
}

export default App;
