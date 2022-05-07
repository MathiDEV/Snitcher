import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import Home from './pages/Home';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
