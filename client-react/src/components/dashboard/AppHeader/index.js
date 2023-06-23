import { Image,Typography,Space, Badge } from "antd";
import {MailOutlined,BellFilled} from '@ant-design/icons';
import Logo from "../WhatsApp Image 2023-05-31 at 01.10.08.jpg"
function AppHeader (){
    return <div className="AppHeader">
        <Image
        width={100}
        height={40}
        src= {Logo}
        >

        </Image>
        <Typography.Title>MEMEQ Dashboard</Typography.Title>
        <Space>
        <Badge count={0} dot>
            <MailOutlined style={{fontSize:24}}/>
            </Badge>
            <Badge count={0} dot>
            <BellFilled style={{fontSize:24}}/>
            </Badge>
        </Space>
    </div>
    }
    export default AppHeader