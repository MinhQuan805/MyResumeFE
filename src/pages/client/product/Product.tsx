import { Card, Row, Col, Typography, Button } from 'antd';
import './product.css';
import { useState, useEffect } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Title } = Typography;

const products = [
  {
    icon: '/image/home/Logo1.png',
    image: '/image/home/Product1.png',
    name: 'Payments',
    title: 'Accept and optimize payments, globally',
    description: 'Tăng tỷ lệ chấp nhận thanh toán, cung cấp các phương thức thanh toán địa phương để tăng chuyển đổi, và giảm gian lận nhờ AI.',
  },
  {
    icon: '/image/home/Logo2.png',
    image: '/image/home/Product2.png',
    name: 'Billing',
    title: 'Capture recurring revenue',
    description: 'Quản lý giá cố định, theo mức sử dụng, mô hình lai, hóa đơn, và tự động hóa các hoạt động tài chính.',
  },
  {
    icon: '/image/home/Logo3.png',
    image: '/image/home/Product3.png',
    name: 'Connect',
    title: 'Set up multiparty payments and payouts',
    description: 'Tích hợp thanh toán vào nền tảng hoặc marketplace của bạn cho trải nghiệm thanh toán đầu-cuối.',
  },
];

function Product() {
  const [currentProduct, setCurrentProduct] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="product-container">
        {/* Bài viết nổi bật */}
        <div className="mobile-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, marginTop: 30 }}>
          <Title level={3} style={{ margin: 0 }}>Bài viết nổi bật</Title>
          {isMobile && (
            <div className="product-transition">
              <Button onClick={() => setCurrentProduct(prev => (prev === 0 ? products.length - 1 : prev - 1))} className="button-transition">
                <LeftOutlined />
              </Button>
              <Button onClick={() => setCurrentProduct(prev => (prev === products.length - 1 ? 0 : prev + 1))} className="button-transition">
                <RightOutlined />
              </Button>
            </div>
        )}
        </div>

        <Row gutter={[24, 24]}>
          {(isMobile ? [products[currentProduct]] : products).map((product, idx) => (
            <Col xs={24} sm={12} md={8} key={idx}>
              <Card className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="product-content">
                  <div className="product-title">{product.title}</div>
                  <Button className="product-button" style={{ background: '#eaf3fa', color: '#222' }}>
                    Tìm hiểu
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
  );
}

export default Product;