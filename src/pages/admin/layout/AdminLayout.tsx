import { Layout, Menu, Button } from 'antd';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import './layout.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faPlus, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

function AdminLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState('/admin/article');
    const location = useLocation();
    useEffect(() => {
        setSelectedKey(location.pathname);
    }, [location]);
    const navigate = useNavigate();
    const items = [
        {
            label: 'Bài viết',
            icon: <FontAwesomeIcon icon={faNewspaper} />,
            key: 'article',
            children: [
                {
                    label: 'Danh sách',
                    icon: <FontAwesomeIcon icon={faNewspaper} />,
                    key: '/admin/article',
                    onClick: () => navigate('/admin/article'),
                },
                {
                    label: 'Tạo mới',
                    icon: <FontAwesomeIcon icon={faPlus} />,
                    key: '/admin/article/create',
                    onClick: () => navigate('/admin/article/create'),
                },
                {
                    label: 'Thùng rác',
                    icon: <FontAwesomeIcon icon={faTrash} />,
                    key: '/admin/article/trash',
                    onClick: () => navigate('/admin/article/trash'),
                },
            ],
        },
        {
            label: 'Tài khoản',
            icon: <FontAwesomeIcon icon={faUser} />,
            key: '/admin/user',
            onClick: () => navigate('/admin/user'),
        },
    ];
    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    breakpoint="lg"
                    // Đặt collapsedWidth thành 80 để khi thu nhỏ Sider vẫn hiện icon (mặc định của Ant Design là 80)
                    collapsedWidth={80}
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                    onBreakpoint={(broken) => {
                        setCollapsed(broken);
                    }}
                    className='admin-sider'>
                    <div className="logo-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {!collapsed && (
                            <img src={'/image/logo.svg'} alt="logo" style={{ width: 90, height: 65, marginLeft: 10 }} />
                        )}
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 80,
                                height: 65,
                                border: 'none',
                                outline: 'none',
                                background: 'transparent',
                            }}
                        />
                    </div>
                    <Menu mode="inline" selectedKeys={[selectedKey]} items={items} inlineCollapsed={collapsed} />
                </Sider>
                <Layout>
                    <Header className="admin-header">                        
                    </Header>
                    <Content style={{ position: 'relative', background: '#fff', padding: '24px', margin: 0, minHeight: 280 }}>
                        <Outlet />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design © Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        </>
    )
}
export default AdminLayout;