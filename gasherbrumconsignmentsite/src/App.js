import './App.css';
import SiteManagerLogin from './components/sitemanager/sitemanagerlogin';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SiteManager from './components/sitemanager/sitemanager';
import Home from './components/home';
import StoreOwnerLogin from './components/storeowner/storeownerlogin';
import StoreOwner from './components/storeowner/storeowner';
import CompareComputers from './components/compare';
import About from './components/header/about';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path ="/compare" element={<CompareComputers />} />
        
        <Route exact path="/sitemanagerlogin" element={<SiteManagerLogin />} />
        <Route exact path="/sitemanager" element={<SiteManager />} />
        <Route exact path="/storeownerlogin" element={<StoreOwnerLogin />} />
        <Route exact path="/about" element={<About />} />
      </Routes>

      <Routes>
        <Route path="/storeowner/:name/" element={<StoreOwner />} />

      </Routes>
    </Router>
  );
}

export default App;
