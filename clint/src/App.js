
import React ,{ useEffect } from "react";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import {getProduct} from './actions/product'

import Appbar from "./components/Appbar";
import Product from "./components/Product";


function App() {
  const dispatch = useDispatch();
 const id = '6462b8ec90ec4282b8e4e3bf';

  useEffect(()=>{
  dispatch(getProduct(id));

  },[dispatch]);
  const productBack = useSelector((state) => {
   
    return state.product;
  });
  
  
  // console.log("===>"+productBack);
  // const[product,setProduct] = useState(
  //   {
  //     id:'6462b8ec90ec4282b8e4e3bf',
  //     name:'DASEEN Gaming Computer PC Desktop – Intel Core i3-10100 3.6GHz, NVIDIA GeForce GTX1660 6GB, 32GB DDR4-2666 RAM, 500GB SSD, Windows 10,WiFi Ready',
  //     image:'https://m.media-amazon.com/images/I/619f09kK7tL._AC_UF894,1000_QL80_.jpg',
  //     storage:'128GB',
  //     color:'Black',
  //     noonLogo:'data:image/png;base64,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',
  //     noonPrice:21000,
  //     amazonLogo:'https://cdn.vox-cdn.com/thumbor/TMB0K7PcIiuiI4dyRQgpY4U8OCA=/0x0:2040x1360/1400x1400/filters:focal(1020x680:1021x681)/cdn.vox-cdn.com/uploads/chorus_asset/file/23935560/acastro_STK103__03.jpg',
  //     amazonPrice:21060,
  //     lastupdate: 57 +'mins',
  //     rate:3,
  //     favourite:true,
  //     alert:true,
  //     techSpecs:[
  //       ['CPU','Apple CPU (4-core graphics)'],
  //       ['RAM','4 GB'],
  //       ['brand','Apple'],
  //       ['Color','White'],
  //       ['Battery','Yes, with A-GPS, GLONASS, GALILEO, QZSS'],
  //       ['Chipset','Apple A13 Bionic (7nm+)'],
  //       ['SIM card','single SIM'],
  //       ['Bluetooth','5.0, A2DP,LE'],
        
  //     ]
  //   })

  // useEffect( ()=>{
  //   setProduct(productBack)
  // },[productBack] );
  
  
  
  return <div >
     <Router>
     <Appbar />
        <Routes>
          {/* <Route path="/" element={<Homepage/>}/> */}
           <Route path="/" element={ productBack &&  <Product product={productBack}  />}/>
          {/* <Route path="/signin" element={<Signin/>}/> */}
        </Routes>
      </Router>
    
    
    
  </div>;
}

export default App;


