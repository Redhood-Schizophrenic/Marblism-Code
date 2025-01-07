import { Typography, Row, Col, Card, Divider } from 'antd'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  const navigate = useNavigate()

  // Fetch featured products
  const { data: products } = Api.product.findMany.useQuery({
    take: 4,
    include: {
      category: true,
    },
  })

  // Fetch services
  const { data: services } = Api.service.findMany.useQuery({
    take: 3,
  })

  // Fetch facilities (manufacturing capabilities)
  const { data: facilities } = Api.facility.findMany.useQuery({
    take: 3,
  })

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Title level={1}>
            <i className="las la-industry"></i> Manufacturing Excellence
          </Title>
          <Paragraph style={{ fontSize: 18 }}>
            Your trusted partner in industrial manufacturing and innovative
            solutions
          </Paragraph>
        </div>

        {/* Featured Products */}
        <Title level={2}>
          <i className="las la-box"></i> Featured Products
        </Title>
        <Row gutter={[24, 24]} style={{ marginBottom: 48 }}>
          {products?.map(product => (
            <Col xs={24} sm={12} md={6} key={product.id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={product.name}
                    src={product.imageUrl || 'https://via.placeholder.com/300'}
                    style={{ height: 200, objectFit: 'cover' }}
                  />
                }
                onClick={() => navigate('/products')}
              >
                <Card.Meta
                  title={product.name}
                  description={product.category?.name}
                />
              </Card>
            </Col>
          ))}
        </Row>

        {/* Manufacturing Capabilities */}
        <Title level={2}>
          <i className="las la-tools"></i> Manufacturing Capabilities
        </Title>
        <Row gutter={[24, 24]} style={{ marginBottom: 48 }}>
          {facilities?.map(facility => (
            <Col xs={24} md={8} key={facility.id}>
              <Card>
                <i
                  className="las la-cog"
                  style={{ fontSize: 32, marginBottom: 16 }}
                ></i>
                <Title level={4}>{facility.name}</Title>
                <Paragraph>{facility.description}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Services Section */}
        <Title level={2}>
          <i className="las la-concierge-bell"></i> Our Services
        </Title>
        <Row gutter={[24, 24]} style={{ marginBottom: 48 }}>
          {services?.map(service => (
            <Col xs={24} md={8} key={service.id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={service.name}
                    src={service.imageUrl || 'https://via.placeholder.com/300'}
                    style={{ height: 200, objectFit: 'cover' }}
                  />
                }
                onClick={() => navigate('/services')}
              >
                <Card.Meta
                  title={service.name}
                  description={service.description}
                />
              </Card>
            </Col>
          ))}
        </Row>

        {/* Quick Links */}
        <Divider />
        <Row gutter={[24, 24]} style={{ marginBottom: 48 }}>
          <Col xs={24} md={8}>
            <Title level={4}>
              <i className="las la-phone"></i> Contact Us
            </Title>
            <Paragraph>
              Need assistance? Our team is here to help.{' '}
              <a onClick={() => navigate('/contact')}>Get in touch</a>
            </Paragraph>
          </Col>
          <Col xs={24} md={8}>
            <Title level={4}>
              <i className="las la-info-circle"></i> About Us
            </Title>
            <Paragraph>
              Learn more about our company and values.{' '}
              <a onClick={() => navigate('/about')}>Read more</a>
            </Paragraph>
          </Col>
          <Col xs={24} md={8}>
            <Title level={4}>
              <i className="las la-catalog"></i> Product Catalog
            </Title>
            <Paragraph>
              Browse our complete product range.{' '}
              <a onClick={() => navigate('/products')}>View catalog</a>
            </Paragraph>
          </Col>
        </Row>
      </div>
    </PageLayout>
  )
}
