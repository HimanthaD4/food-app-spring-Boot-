import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { DesktopOutlined, PieChartOutlined, FileOutlined} from '@ant-design/icons';
import Advertisements from '../Advertisement/Advertisements';
import CreateAdvertisement from '../Advertisement/CreateAdvertisement';
import { Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const { Sider, Content } = Layout;

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false); // initialize collapsed state to false
  const [selectedKey, setSelectedKey] = useState('dashboard'); // initialize selectedKey state to 'dashboard'
  const navigate = useNavigate()
  // handle menu item selection
  const handleMenuSelect = ({ key }) => {
    setSelectedKey(key);
  };
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
        
        <Menu theme="dark" defaultSelectedKeys={['dashboard']} mode="inline" onSelect={handleMenuSelect}>
          <Menu.Item key="dashboard" icon={<DesktopOutlined />}>
            Post Reports
          </Menu.Item>
          <Menu.Item key="advertisements" icon={<PieChartOutlined />}>
            Advertisements
          </Menu.Item>
          <Menu.Item key="create-adverisement" icon={<FileOutlined />}>
            Add Advertisement
          </Menu.Item>
          <Menu.Item
            onClick={(e)=>{
                localStorage.clear()
                navigate("/register")
            }}
          key="create-adverisement" icon={<Logout />}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {selectedKey === 'dashboard' && <h1>Dashboard</h1>}
            {selectedKey === 'advertisements' && <Advertisements/>}
            {selectedKey === 'create-adverisement' && <CreateAdvertisement/>}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
