import "./App.css";
import GlobalStyle from "./component/globalStyle/GlobalStyle";
import { Route, Routes } from "react-router-dom";
import Navbar from "./component/navbar/Navbar";
import About from "./component/about/About";
import Home from "./component/home/Home";
import Login from "./component/login/Login";

function App() {
  return (
    <GlobalStyle>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </GlobalStyle>
  );
}

export default App;
