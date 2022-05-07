import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import Dashboard from "./pages/Dashboard";
import Home from './pages/Home';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/dashboard" element={<Dashboard/>} />
          <Route exact path="/dashboard/:id" element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
