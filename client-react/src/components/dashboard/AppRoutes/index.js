import { Route,Routes } from "react-router-dom";
import Dashboard from "../../Pages/Dashboard";
import Customers from "../../Pages/Customers";
import Comments from "../../Pages/Comments";

function AppRoutes(){
return(
   
        <Routes>
            <Route path="/" element={<Dashboard/>}>
            </Route>
            <Route path="/customers" element={<Customers/>}>
            </Route>
            <Route path="/comments" element={<Comments/>}>
            </Route>
        </Routes>
    
)
    

}
export default AppRoutes