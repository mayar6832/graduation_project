import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Loginpage from "scences/loginpage";
import Adminloginpage from "scences/adminloginpage";
import ProfilePage from "scences/profilePage";
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
import CouponPage from "pages/CouponPage";

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
          <Route path="/coupon" element={isAuth ?<CouponPage />: <Navigate to="/auth" />} />
          <Route path="/search" element={<Search />} />
          <Route path="category/:categoryName" element={<Categories />} />
          <Route path="/product/:id" element={isAuth ?<ProductPage />: <Navigate to="/auth" />} />
          <Route path="/BestSelling" element={<BestSelling />} />
          <Route path="/NewReleases" element={<NewReleases />} />
          <Route path="/myReviews" element={isAuth ?<UserReviews />: <Navigate to="/auth" />} />
          <Route path="/wish" element={isAuth ?<UserWishList />: <Navigate to="/auth" />} />
          <Route path="/auth" element={!isAuth ? < Loginpage /> : <Navigate to="/" />} />
          <Route path="/admin" element={<Adminloginpage />} />
          <Route path="/profile" element={isAuth ? <ProfilePage /> : <Navigate to="/auth" />} />
        </Routes>
        <Footer />
        {/* </ThemeProvider> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
