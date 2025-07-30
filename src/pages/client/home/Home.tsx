import { Card, Row, Col, Typography, Button, Steps } from 'antd';
import './mission.css';
import './product.css';
import './article.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faPencilRuler, faSeedling, faShield } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const missions = [
  { icon: faLightbulb, title: 'Solve', description: 'Ứng dụng công nghệ để giải quyết các vấn đề thực tế một cách hiệu quả.' },
  { icon: faPencilRuler, title: 'UX', description: 'Phát triển sản phẩm mượt mà, thân thiện và hữu ích cho người dùng.' },
  { icon: faSeedling, title: 'Grow', description: 'Liên tục học hỏi, cập nhật công nghệ và nâng cao kỹ năng.' },
  { icon: faShield, title: 'Secure', description: 'Đảm bảo chất lượng mã, hiệu suất ổn định và bảo mật dữ liệu.' }
];

const products = [
  {
    icon: <img src={'/image/home/Logo1.png'} />,
    image: <img src={'/image/home/Product1.png'} />,
    name: 'Payments',
    title: 'Accept and optimize payments, globally',
    description: 'Tăng tỷ lệ chấp nhận thanh toán, cung cấp các phương thức thanh toán địa phương để tăng chuyển đổi, và giảm gian lận nhờ AI.',
  },
  {
    icon: <img src={'/image/home/Logo2.png'} />,
    image: <img src={'/image/home/Product2.png'} />,
    name: 'Billing',
    title: 'Capture recurring revenue',
    description: 'Quản lý giá cố định, theo mức sử dụng, mô hình lai, hóa đơn, và tự động hóa các hoạt động tài chính.',
  },
  {
    icon: <img src={'/image/home/Logo3.png'} />,
    image: <img src={'/image/home/Product3.png'} />,
    name: 'Connect',
    title: 'Set up multiparty payments and payouts',
    description: 'Tích hợp thanh toán vào nền tảng hoặc marketplace của bạn cho trải nghiệm thanh toán đầu-cuối.',
  },
];

const articles = [
  {
    image: '/image/home/article1.jpg',
    title: 'Tại sao BAC quan trọng với nền kinh tế nhưng giá trị lại kém VÀNG?',
    description: '',
  },
  {
    image: '/image/home/article2.jpg',
    title: 'Vì sao hackathon trong Web3 mang lại cơ hội rộng mở hơn?',
    description: '',
  },
  {
    image: '/image/home/article3.jpg',
    title: 'Network Planning and Design Best Practices',
    description: '',
  },
];

function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentArticle, setCurrentArticle] = useState(0);
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
    <div style={{ backgroundColor: '#fff' }}>
      {/* Missions */}
      <div className="missions-container">
        <div className="missions-section">
          <Row gutter={0}>
            {missions.map((m, i) => (
              <Col xs={24} sm={12} md={6} key={i}>
                <Card className="mission-home-card">
                  <div className="mission-home-header">
                    <FontAwesomeIcon icon={m.icon} className="mission-home-icon" />
                    <Title level={3} className="mission-home-title">{m.title}</Title>
                  </div>
                  <Paragraph className="mission-home-description">{m.description}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Products */}
      <div className="product-container">
        <div className="product-section">
          <div className="product-transition">
            <Steps
              progressDot
              current={currentStep}
              onChange={setCurrentStep}
              direction="horizontal"
              responsive
              items={products.map(() => ({ title: '' }))}
              className="product-step"
            />
            <Button onClick={() => setCurrentStep((prev) => (prev === 0 ? products.length - 1 : prev - 1))} className='button-transition'>
              <LeftOutlined />
            </Button>
            <Button onClick={() => setCurrentStep((prev) => (prev === products.length - 1 ? 0 : prev + 1))} className='button-transition'>
              <RightOutlined />
            </Button>
          </div>

          <Row gutter={[48, 0]} align="middle">
            <Col xs={24} lg={10}>
              <div className="product-content">
                <div className="product-header">
                  {products[currentStep].icon}
                  <span className="product-label">{products[currentStep].name}</span>
                </div>
                <Title level={1} className="product-title">{products[currentStep].title}</Title>
                <Paragraph className="product-description">{products[currentStep].description}</Paragraph>
                <Button type="primary" size="large" className="product-button">Learn more</Button>
              </div>
            </Col>
            <Col xs={24} lg={14}>
              <div className="product-image">
                {products[currentStep].image}
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* Highlight Article */}
      <div className="article-container">
        <div className="article-highlight-wrapper">
          <Card className="article-card">
            <Row align="middle" gutter={[24, 24]}>
              <Col xs={24} md={13}>
                <div className="article-highlight-content">
                  <Title level={2}>Hành trình tích lũy kiến thức và tài chính của tôi</Title>
                  <Paragraph className='product-description'>
                    Việc phát triển năng lực là một hành trình dài, và đây là nơi để tôi tiếp tục phá triển kỹ năng của mình
                  </Paragraph>
                  <Button className="article-button" style={{ fontSize: 17, width: 150, height: 40 }}>Tìm hiểu</Button>
                </div>
              </Col>
              <Col xs={24} md={11}>
                <div className="article-highlight-image">
                  <img src="/image/home/business.jpg" alt="Business Plan" />
                </div>
              </Col>
            </Row>
          </Card>
        </div>

        {/* Bài viết nổi bật */}
        <div className="mobile-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, marginTop: 30 }}>
          <Title level={3} style={{ margin: 0 }}>Bài viết nổi bật</Title>
          {isMobile && (
            <div className="product-transition">
              <Button onClick={() => setCurrentArticle(prev => (prev === 0 ? articles.length - 1 : prev - 1))} className="button-transition">
                <LeftOutlined />
              </Button>
              <Button onClick={() => setCurrentArticle(prev => (prev === articles.length - 1 ? 0 : prev + 1))} className="button-transition">
                <RightOutlined />
              </Button>
            </div>
        )}
        </div>

        <Row gutter={[24, 24]}>
          {(isMobile ? [articles[currentArticle]] : articles).map((article, idx) => (
            <Col xs={24} sm={12} md={8} key={idx}>
              <Card className="article-card">
                <div className="article-image">
                  <img src={article.image} alt={article.title} />
                </div>
                <div className="article-content">
                  <div className="article-title">{article.title}</div>
                  <Button className="article-button" style={{ background: '#eaf3fa', color: '#222' }}>
                    Đọc bài viết
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Home;
