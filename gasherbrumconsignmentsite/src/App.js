import './App.css';
import SiteManagerLogin from './components/sitemanager/sitemanagerlogin';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SiteManager from './components/sitemanager/sitemanager';
import Home from './components/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/sitemanagerlogin" element={<SiteManagerLogin/>} />
        <Route exact path="/sitemanager" element={<SiteManager/>} />
      </Routes>
    </Router>
  );
}

export default App;
