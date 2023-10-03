import React, { useState } from "react";
import { Routes, Route} from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./redux/store";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import PasswordPage from "./pages/PasswordPage"
import ConfirmPasswordPage from "./pages/ConfirmPasswordPage"
import ProfilePage from "./pages/ProfilePage";
import FavoritePage from "./pages/FavoritePage";
import MyProductPage from "./pages/MyProductPage";
import MainPage from "./pages/MainPage";
import './style/style.css';

function App() {
      const [userData, setUserData] = useState({});
  return (
      <Provider store={store}>
        <Routes>
              <Route path='/' element={<LoginPage />} />
              <Route path='/creat-new-user' element={<SignUp setUserData={setUserData} />}/>
              <Route path='/password' element={<PasswordPage userData={userData} />}/>
              <Route path="/confirm-password" element={<ConfirmPasswordPage />}  />
              <Route path="/success-sign-up" element={<ProfilePage />} />
              <Route path="/favorites" element={<FavoritePage />} />
              <Route path="/my-products" element={<MyProductPage />} />
              <Route path="/main-page" element={<MainPage />} />
        </Routes>
      </Provider>
    );
}
export default App;





