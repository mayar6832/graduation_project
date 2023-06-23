import {Menu} from "antd";
import { useNavigate } from "react-router-dom";

function SideMenu (){
    const navigate = useNavigate()
    return <div className="SideMenu">
        <Menu
        onClick={(item)=>{
            //item.key
            navigate(item.key)
        }}
         items={[
            {
            label:"Dashboard",
           
            key:"/dashHome"
        },
        {
            label:"Customers",
            key:"/customers",
            

        },
        {
            label:"Comments",
            key:"/comments"
        },
        ]}>

        </Menu>
    </div>
    }
    export default SideMenu