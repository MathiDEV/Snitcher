import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import "./polyfill.js";
import Dashboard from "./pages/Dashboard";
import Home from './pages/Home';
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/dashboard" element={<Dashboard/>} />
          <Route exact path="/dashboard/:id/:type" element={<Dashboard/>} />
          <Route exact path="/dashboard/:id/" element={<Dashboard/>} />
          <Route exact path="/privacy_policy" element={<PrivacyPolicy />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
