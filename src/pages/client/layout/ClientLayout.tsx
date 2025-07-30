import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
const { Header, Content, Footer } = Layout;

function ClientLayout() {
    return (
        <>
            <Layout>
                <Header className='client-header'>header</Header>
                <Content>
                    <Outlet />
                </Content>
                <Footer className='client-footer'>Ant Design © Created by Ant UED</Footer>
            </Layout>
        </>
    )
}
export default ClientLayout;