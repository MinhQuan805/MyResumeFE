import { Card, Row, Col, Typography, Button } from 'antd';
import './mission.css';
import './product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faPencilRuler, faSeedling, faShield } from '@fortawesome/free-solid-svg-icons';

const { Title, Paragraph } = Typography;

const missions = [
  { icon: faLightbulb, title: 'Solve', description: 'Ứng dụng công nghệ để giải quyết các vấn đề thực tế một cách hiệu quả.' },
  { icon: faPencilRuler, title: 'UX', description: 'Phát triển sản phẩm mượt mà, thân thiện và hữu ích cho người dùng.' },
  { icon: faSeedling, title: 'Grow', description: 'Liên tục học hỏi, cập nhật công nghệ và nâng cao kỹ năng.' },
  { icon: faShield, title: 'Secure', description: 'Đảm bảo chất lượng mã, hiệu suất ổn định và bảo mật dữ liệu.' }
];

const products = [
  { 
    icon: <img src={'/image/home/Logo1.png'}/>,
    image: <img src={'/image/home/Product1.png'}/>,
    name: 'Payments',
    title: 'Accept and optimize payments, globally',
    description: 'Tăng tỷ lệ chấp nhận thanh toán, cung cấp các phương thức thanh toán địa phương để tăng chuyển đổi, và giảm gian lận nhờ AI.',
  },
  { 
    icon: <img src={'/image/home/Logo2.png'}/>,
    image: <img src={'/image/home/Product2.png'}/>,
    name: 'Billing',
    title: 'Capture recurring revenue',
    description: 'Quản lý giá cố định, theo mức sử dụng, mô hình lai, hóa đơn, và tự động hóa các hoạt động tài chính.',
  },
  { 
    icon: <img src={'/image/home/Logo3.png'}/>,
    image: <img src={'/image/home/Product3.png'}/>,
    name: 'Connect',
    title: 'Set up multiparty payments and payouts',
    description: 'Tích hợp thanh toán vào nền tảng hoặc marketplace của bạn cho trải nghiệm thanh toán đầu-cuối.',
  },
]

function Home() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <>
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

      <div className="product-container">
        <Steps
          current={currentStep}
          onChange={setCurrentStep}
          items={products.map(p => ({
            title: p.name,
          }))}
          style={{ maxWidth: 800, margin: '0 auto 40px' }}
        />

        <div className="product-section">
          <Row gutter={[48, 0]} align="middle">
            <Col xs={24} lg={10}>
              <div className="product-content">
                <div className="product-header">
                  {products[currentStep].icon}
                  <span className="product-label">{products[currentStep].name}</span>
                </div>
                <Title level={1} className="product-title">
                  {products[currentStep].title}
                </Title>
                <Paragraph className="product-description">
                  {products[currentStep].description}
                </Paragraph>
                <Button type="primary" size="large" className="product-button">
                  Learn more
                </Button>
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
    </>
  );
}


export default Home;