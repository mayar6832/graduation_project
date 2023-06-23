import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Loginpage from "scences/loginpage";
import Adminloginpage from "scences/adminloginpage";
import ProfilePage from "scences/profilePage";
import { useSelector } from "react-redux";
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
import AppLayout from "./AppLayout";
import DashLayout from "./DashLayout";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Comments from "pages/Comments";

function App() {
  // const mode = useSelector((state) => state.mode);
  // const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className="app">

      <BrowserRouter>
      
        {/* <ThemeProvider theme={theme}> */}
        {/* <CssBaseline /> */}
        <Routes>
          <Route path="/" element={
          <AppLayout>
            <Home />
          </AppLayout>} />
          <Route path="/coupon" element={isAuth ?<AppLayout><CouponPage /></AppLayout> : <Navigate to="/auth" />} />
          <Route path="/search" element={<AppLayout><Search /></AppLayout>} />
          <Route path="category/:categoryName" element={<AppLayout> <Categories /> </AppLayout>} />
          <Route path="/product/:id" element={isAuth ?<AppLayout><ProductPage /></AppLayout>: <Navigate to="/auth" />} />
          <Route path="/BestSelling" element={<AppLayout><BestSelling /></AppLayout>} />
          <Route path="/NewReleases" element={<AppLayout><NewReleases /></AppLayout>} />
          <Route path="/myReviews" element={isAuth ?<AppLayout><UserReviews /></AppLayout>: <Navigate to="/auth" />} />
          <Route path="/wish" element={isAuth ?<AppLayout><UserWishList /></AppLayout>: <Navigate to="/auth" />} />
          <Route path="/auth" element={!isAuth ? < Loginpage /> : <Navigate to="/" />} />
          <Route path="/admin" element={<Adminloginpage />} />
          <Route path="/profile" element={isAuth ?<AppLayout><ProfilePage /></AppLayout>  : <Navigate to="/auth" />} />
          <Route path="/dashHome" element={<DashLayout><Dashboard/></DashLayout>} />
          <Route path="/customers" element={<DashLayout><Customers/></DashLayout>}/>
          <Route path="/comments" element={<DashLayout><Comments/></DashLayout>}/>
           
        </Routes>
       
        {/* </ThemeProvider> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
