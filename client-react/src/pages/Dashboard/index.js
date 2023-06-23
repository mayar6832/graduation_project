import { Typography,Space,Card, Statistic,Table } from "antd"
import {
    
    ShoppingCartOutlined,
    ShoppingOutlined,
    UserOutlined,
  } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getCustomers, getOrders } from "../../API";
import Customers from "../Customers";
import axios from 'axios';




function Dashboard (){
    const [products,setProducts]= useState(0)

    const [comments,setComments]= useState(0)
    
    const [custItems, setCustItems] = useState([]);

  useEffect(() => {
    const getItemsList = async () => {
      try {
        const res = await axios.get('http://localhost:3001/user/api/items')
        setCustItems(res.data);
        console.log('render')
      } catch (err) {
        console.log(err);
      }
    }
    getItemsList()
  }, []);


  const [listItems, setListItems] = useState([]);
  const [commentLengths, setCommentLengths] = useState([]);
  const [sumCommentLengths, setSumCommentLengths] = useState(0);
  
  useEffect(() => {
    const getItemsList = async () => {
      try {
        const res = await axios.get('http://localhost:3001/product/api/comments');
        setListItems(res.data);
        console.log('render');
      } catch (err) {
        console.log(err);
      }
    };
    getItemsList();
  }, []);
  
  useEffect(() => {
    // Mapping 3la el Comment
    const lengths = listItems.map((item) => item.reviews.length);
    setCommentLengths(lengths);
  
    // sum of numbers in commentLengths
    const sum = lengths.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    setSumCommentLengths(sum);
  }, [listItems]);
  
  
  console.log(commentLengths);
  console.log(sumCommentLengths);





return ( 
<Space size={20} direction="vertical">
    <Typography.Title level={4}>
        Dashboard
    </Typography.Title>
    <Space direction="horizontal">
        <DashboardCard icon={<ShoppingCartOutlined style={{color:"green",backgroundColor:'rgba(0,255,0,0.25)',borderRadius:20,fontSize:24,padding:8,}}/>} title={"Prodcuts"}value={listItems.length}/>
        <DashboardCard icon={<UserOutlined style={{color:"purple",backgroundColor:'rgba(0,255,255,0.25)',borderRadius:20,fontSize:24,padding:8,}}/>} title={"Customers"}value={custItems.length}/>
        <DashboardCard icon={<ShoppingOutlined style={{color:"red",backgroundColor:'rgba(255,0,0,0.25)',borderRadius:20,fontSize:24,padding:8,}}/>} title={"Comments"}value={sumCommentLengths}/>
        
    </Space>
    <br/>
    <Space>
        <RecentOrders/>
    </Space>
</Space>
)
function DashboardCard({title,value,icon}){
return(
       <Card>
        <Space direction="horizontal">
        {icon}
            
            <Statistic title={title} value={value}/>
            </Space>
        </Card>
        
)
}
}
function RecentOrders(){
    const [dataSource, setDataSource] = useState([])
    const [loading,setloading]=useState([false])
        useEffect(()=>{
        setloading(true)
        getOrders().then(res=>{
            setDataSource(res.products.splice(0,3))
             setloading(false)
        })

    },[]
    )
    return( 
    <>
    <Typography.Text>RecentProducts</Typography.Text>
    <Table
    columns={[
        {
         title:'Title',
         dataIndex:'title',
    },
    
    {
         title:'Price',
         dataIndex:'discountedPrice',
    },
    ]}
    loading={loading}
    dataSource={dataSource}
    pagination={false}
    ></Table>
    </>)
}
export default Dashboard