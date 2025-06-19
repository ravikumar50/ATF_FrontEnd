import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Logout';
import HomePage from './Pages/HomePage';

import { MsalAuthenticationTemplate } from '@azure/msal-react';
import { InteractionType } from "@azure/msal-browser";
import DownloadPage from './Pages/DownloadPage';
import Contact from './Pages/Contact';
import Logout from './Pages/Logout';
import Upload from './Pages/Upload';
import IndividualDashBoard from './Pages/IndividualDashsBoard';
import Sample1 from './assets/Files/Sample1.xml?raw';
import OverallDashboard from './Pages/OverallDashboard';
import About from './Pages/About';


function App() {
  return (
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
        path="/overAllDashboard"
        element={
           <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
            <OverallDashboard/>
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
            <About/>
           </MsalAuthenticationTemplate>
        }
      />

      
      
    </Routes>
  );
}

export default App;
