import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Loginpage from "scences/loginpage";
import Adminloginpage from "scences/adminloginpage";
import ProfilePage from "scences/profilePage";
// import Homepage from "scences/homepage";

import { useSelector } from "react-redux";
// import { CssBaseline, ThemeProvider } from "@mui/material";
// import { createTheme } from "@mui/material/styles";
// import { themeSettings } from "./theme";
import Home from './pages/Home';
import Search from './pages/Search';
import Categories from './pages/Categories';
import BestSelling from './pages/BestSelling';
import NewReleases from './pages/NewReleases';
import "./App.css";
import ProductPage from "pages/ProductPage";
import UserReviews from "pages/UserReviews";
import UserWishList from "pages/UserWishList";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Coupon from "pages/Coupon";

function App() {
  // const mode = useSelector((state) => state.mode);
  // const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className="app">
      
      <BrowserRouter>
      <NavBar />
        {/* <ThemeProvider theme={theme}> */}
        {/* <CssBaseline /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coupon" element={<Coupon />} />
          <Route path="/search" element={<Search />} />
          <Route path="category/:categoryName" element={<Categories />} />
          <Route path="/product/:id" element={ <ProductPage/>} />
          <Route path="/BestSelling" element={<BestSelling />} />
          <Route path="/NewReleases" element={<NewReleases />} />
          <Route path="/myReviews" element={<UserReviews />} />
          <Route path="/wish" element={<UserWishList />} />
          <Route path="/auth" element={!isAuth ? < Loginpage /> : <Navigate to="/" />} />
          <Route path="/admin" element={<Adminloginpage />} />
          <Route path="/profile" element={isAuth ? <ProfilePage /> : <Navigate to="/auth" />}/>

         

          
        </Routes>
        <Footer />
        {/* </ThemeProvider> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
