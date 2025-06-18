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


function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          // <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
            <HomePage />
          // </MsalAuthenticationTemplate>
        }
      />
      <Route path="/logout" element={< Logout/>} />
      <Route path="/download" element={<DownloadPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/upload" element={<Upload/>} />
      <Route path='/individualDashboard' element={<IndividualDashBoard SampleFile={Sample1}/>}/>
    </Routes>
  );
}

export default App;
