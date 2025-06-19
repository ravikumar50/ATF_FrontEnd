import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';
import DownloadPage from './Pages/DownloadPage';
import Contact from './Pages/Contact';
import Logout from './Pages/Logout';
import Upload from './Pages/Upload';
import IndividualDashBoard from './Pages/IndividualDashsBoard';
import OverallDashboard from './Pages/OverallDashboard';
import About from './Pages/About';

import { MsalAuthenticationTemplate } from '@azure/msal-react';
import { InteractionType } from "@azure/msal-browser";
import AuthSync from './Components/Auth/AuthSync';


function App() {
  return (
    <>
      <AuthSync /> 

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
          path="/download"
          element={
            <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
              <DownloadPage />
            </MsalAuthenticationTemplate>
          }
        />

        <Route
          path="/upload"
          element={
            <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
              <Upload />
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
          path="/contact"
          element={
            <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
              <Contact />
            </MsalAuthenticationTemplate>
          }
        />

        <Route
          path="/about"
          element={
            <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
              <About />
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

      </Routes>
    </>
  );
}

export default App;
