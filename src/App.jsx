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
    <>
    <AuthSync />
    
    <Routes>
      <Route
        path="/"
        element={
           
            <HomePage />
           
        }
      />

      <Route
        path="/download"
        element={
           
            <DownloadPage />
           
        }
      />

      <Route
        path="/upload"
        element={
           
            <Upload />
           
        }
      />

      <Route
        path="/individualDashBoard"
        element={
           
            <IndividualDashBoard />
           
        }
      />

      <Route
        path="/overallDashboard"
        element={
           
            <OverallDashboard/>
           
        }
      />

      <Route
        path="/contact"
        element={
           
            <Contact />
           
        }
      />

      <Route
        path="/about"
        element={
           
            <About/>
           
        }
      />
    </Routes>
    </>
  );
}

export default App;
