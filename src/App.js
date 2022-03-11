import "./App.css";
import GlobalStyle from "./component/globalStyle/GlobalStyle";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./pages/login/Login";

function App() {
  return (
    <GlobalStyle>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <PrivateRoute> */}
        <Route path="*" element={<Layout />} />
        {/* </PrivateRoute> */}
      </Routes>
    </GlobalStyle>
  );
}

export default App;
