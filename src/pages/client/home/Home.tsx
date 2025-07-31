import { Card, Row, Col, Typography, Button, Steps, Input, Form } from 'antd';
import './mission-home.css';
import './product-home.css';
import './article-home.css';
import './contact.css';
import '../style/main.css';
import { useState } from 'react';
import { EnvironmentOutlined, LeftOutlined, MailOutlined, PhoneOutlined, RightOutlined } from '@ant-design/icons';
import { FaLightbulb, FaPencilRuler, FaSeedling, FaShieldAlt, FaLinkedinIn, FaFacebookF } from 'react-icons/fa';
import { TbBrandGithubFilled } from 'react-icons/tb';

const { Title, Paragraph } = Typography;

const missions = [
  { icon: <FaLightbulb className="mission-home-icon" />, title: 'Solve', description: 'Ứng dụng công nghệ để giải quyết các vấn đề thực tế một cách hiệu quả.' },
  { icon: <FaPencilRuler className="mission-home-icon" />, title: 'UX', description: 'Phát triển sản phẩm mượt mà, thân thiện và hữu ích cho người dùng.' },
  { icon: <FaSeedling className="mission-home-icon" />, title: 'Grow', description: 'Liên tục học hỏi, cập nhật công nghệ và nâng cao kỹ năng.' },
  { icon: <FaShieldAlt className="mission-home-icon" />, title: 'Secure', description: 'Đảm bảo chất lượng mã, hiệu suất ổn định và bảo mật dữ liệu.' }
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
    tag: "Finance",
    image: '/image/home/article1.jpg',
    title: 'Tại sao BẠC quan trọng với nền kinh tế nhưng giá trị lại kém VÀNG?',
    introduction: 'Việc phát triển năng lực là một hành trình dài, và đây là nơi để tôi tiếp tục phá triển kỹ năng của mình Việc phát triển năng lực là một hành trình dài, và đây là nơi để tôi tiếp tục phá triển kỹ năng của mình Dù đóng vai trò thiết yếu trong sản xuất và công nghiệp, bạc vẫn không đạt được giá trị như vàng trên thị trường tài chính. Vì sao lại như vậy?',
  },
  {
    tag: "Technology",
    image: '/image/home/article2.jpg',
    title: 'Vì sao hackathon trong Web3 mang lại cơ hội rộng mở hơn?',
    introduction: 'Hackathon trong lĩnh vực Web3 không chỉ là cuộc thi, mà còn là bệ phóng giúp lập trình viên kết nối, khởi nghiệp và tiếp cận nhà đầu tư tiềm năng.',
  },
  {
    tag: "Finance",
    image: '/image/home/article3.jpg',
    title: 'Network Planning and Design Best Practices',
    introduction: 'Việc lập kế hoạch và thiết kế mạng lưới hiệu quả là yếu tố then chốt giúp doanh nghiệp tối ưu hiệu suất và bảo mật hạ tầng công nghệ.',
  },
];

function Home() {
  const [currentStep, setCurrentStep] = useState(0);

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
                    {m.icon}
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
      <div className="product-home-container">
        <div className="product-home-section">
          <div className="product-home-transition">
            <Steps
              progressDot
              current={currentStep}
              onChange={setCurrentStep}
              direction="horizontal"
              responsive
              items={products.map(() => ({ title: '' }))}
              className="product-home-step"
            />
            <Button onClick={() => setCurrentStep((prev) => (prev === 0 ? products.length - 1 : prev - 1))} className="button-transition">
              <LeftOutlined />
            </Button>
            <Button onClick={() => setCurrentStep((prev) => (prev === products.length - 1 ? 0 : prev + 1))} className="button-transition">
              <RightOutlined />
            </Button>
          </div>

          <Row gutter={[48, 0]} align="middle">
            <Col xs={24} lg={10}>
              <div className="product-home-content">
                <div className="product-home-header">
                  {products[currentStep].icon}
                  <span className="product-home-label">{products[currentStep].name}</span>
                </div>
                <Title level={1} className="product-home-title">{products[currentStep].title}</Title>
                <Paragraph className="product-home-description">{products[currentStep].description}</Paragraph>
                <Button type="primary" size="large" className="product-home-button">Learn more</Button>
              </div>
            </Col>
            <Col xs={24} lg={14}>
              <div className="product-home-image">
                {products[currentStep].image}
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* Highlight Article */}
      <div className="article-container">
        <div className="article-home-wrapper">
          <Card className="article-home-card">
            <Row align="middle" gutter={[24, 24]}>
              <Col xs={24} md={13}>
                <div className="article-home-content">
                  <Title level={2}>Hành trình tích lũy kiến thức và tài chính của tôi</Title>
                  <Paragraph className='product-description'>
                    Việc phát triển năng lực là một hành trình dài, và đây là nơi để tôi tiếp tục phá triển kỹ năng của mình
                  </Paragraph>
                  <Button className="article-button" style={{ fontSize: 17, width: 150, height: 40 }}>Tìm hiểu</Button>
                </div>
              </Col>
              <Col xs={24} md={11}>
                <div className="article-home-image">
                  <img src="/image/home/business.jpg" alt="Business Plan" />
                </div>
              </Col>
            </Row>
          </Card>
        </div>

        {/* Bài viết nổi bật */}
        <div className='article-highlight'>
          {articles.map((article) => (
            <Row gutter={[24, 24]} className='article-row'>
              <Col xs={24} md={6}>
                <div className="article-image">
                  <img src={article.image} alt={article.title} />
                </div>
              </Col>
              <Col xs={24} md={18}>
                <div className="article-content">
                  <Paragraph style={{color: '#919191', marginBottom: 3}}>{article.tag}</Paragraph>
                  <div className="article-title">{article.title}</div>
                  <Paragraph className="article-introduction truncate-multiline">{article.introduction}</Paragraph>
                  <Button className="article-button">
                    Đọc bài viết
                  </Button>
                </div>
              </Col>
            </Row>
          ))}
        </div>
      </div>
      <div className="contact-container">
        <Row className="contact-wrapper">
          {/* Left - Contact Info */}
          <Col xs={24} md={10} className="contact-info">
            <h2>Thông tin liên hệ</h2>
            <div className="contact-detail">
              <PhoneOutlined />
              <span>0946372131</span>
            </div>
            <div className="contact-detail">
              <MailOutlined />
              <span>minhquan8052006@gmail.com</span>
            </div>
            <div className="contact-detail">
              <EnvironmentOutlined />
              <span>Quận Bình Thành, Thành Phố Hồ Chí Minh</span>
            </div>
            <div className="contact-icons">
              <div className="contact-icons">
                <Button href="https://www.linkedin.com/in/qu%C3%A2n-v%C3%B5-821704325/" icon={<FaLinkedinIn style={{ color: '#fff' }} />} />
                <Button href="https://github.com/MinhQuan805" icon={<TbBrandGithubFilled style={{ color: '#fff', height: 20, width: 20 }} />} />
                <Button href="https://www.facebook.com/quan.minh.780514/" icon={<FaFacebookF style={{ color: '#fff' }} />} />
              </div>

            </div>
          </Col>

          {/* Right - Form */}
          <Col xs={24} md={14} className="contact-form">
            <Form layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Họ và tên" name="name">
                    <Input bordered={false} className="underline-input" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Email" name="email">
                    <Input bordered={false} className="underline-input" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Tiêu đề" name="subject">
                <Input bordered={false} className="underline-input" />
              </Form.Item>
              <Form.Item label="Lời nhắn" name="message">
                <Input.TextArea rows={5} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="send-button">
                  Gửi
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Home;
