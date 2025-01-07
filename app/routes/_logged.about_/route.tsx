import { Typography, Row, Col, Card, Carousel } from 'antd'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function AboutUsPage() {
  // Fetch partners, facilities, and certifications
  const { data: partners } = Api.partner.findMany.useQuery({})
  const { data: facilities } = Api.facility.findMany.useQuery({})
  const { data: certifications } = Api.certification.findMany.useQuery({})

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        {/* Company Overview Section */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Title level={1}>
            <i className="las la-building" style={{ marginRight: 8 }}></i>
            About Our Company
          </Title>
          <Paragraph style={{ fontSize: 18 }}>
            Discover our journey, mission, and commitment to excellence in
            manufacturing
          </Paragraph>
        </div>

        {/* Company History & Mission */}
        <Row gutter={[24, 24]} style={{ marginBottom: 48 }}>
          <Col xs={24} md={12}>
            <Card
              title={
                <span>
                  <i className="las la-history" style={{ marginRight: 8 }}></i>
                  Our History
                </span>
              }
            >
              <Paragraph>
                Founded in 1995, our company has grown from a small local
                manufacturer to a global leader in industrial solutions. Through
                decades of innovation and dedication, we've established
                ourselves as a trusted partner for businesses worldwide.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card
              title={
                <span>
                  <i className="las la-flag" style={{ marginRight: 8 }}></i>
                  Our Mission
                </span>
              }
            >
              <Paragraph>
                Our mission is to deliver exceptional quality products while
                maintaining the highest standards of sustainability and
                innovation. We strive to create value for our customers through
                cutting-edge manufacturing solutions.
              </Paragraph>
            </Card>
          </Col>
        </Row>

        {/* Partners Showcase */}
        <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
          <i className="las la-handshake" style={{ marginRight: 8 }}></i>
          Trusted Partners
        </Title>
        <div style={{ marginBottom: 48 }}>
          <Carousel autoplay>
            {partners?.map(partner => (
              <div
                key={partner.id}
                style={{ padding: 24, textAlign: 'center' }}
              >
                <img
                  src={partner.logo || ''}
                  alt={partner.name || ''}
                  style={{ maxHeight: 100, margin: '0 auto' }}
                />
                <Title level={4}>{partner.name}</Title>
                <Paragraph>{partner.description}</Paragraph>
              </div>
            ))}
          </Carousel>
        </div>

        {/* Manufacturing Facilities */}
        <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
          <i className="las la-industry" style={{ marginRight: 8 }}></i>
          Our Facilities
        </Title>
        <Row gutter={[24, 24]} style={{ marginBottom: 48 }}>
          {facilities?.map(facility => (
            <Col xs={24} md={12} lg={8} key={facility.id}>
              <Card
                cover={
                  <img
                    alt={facility.name || ''}
                    src={facility.imageUrl || ''}
                    style={{ height: 200, objectFit: 'cover' }}
                  />
                }
              >
                <Title level={4}>{facility.name}</Title>
                <Paragraph>{facility.description}</Paragraph>
                <Paragraph>
                  <strong>Location:</strong> {facility.location}
                </Paragraph>
                <Paragraph>
                  <strong>Capabilities:</strong> {facility.capabilities}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Certifications */}
        <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
          <i className="las la-certificate" style={{ marginRight: 8 }}></i>
          Certifications & Standards
        </Title>
        <Row gutter={[24, 24]}>
          {certifications?.map(cert => (
            <Col xs={24} sm={12} md={8} lg={6} key={cert.id}>
              <Card>
                <img
                  src={cert.imageUrl || ''}
                  alt={cert.name || ''}
                  style={{ width: '100%', height: 120, objectFit: 'contain' }}
                />
                <Title level={4} style={{ marginTop: 16 }}>
                  {cert.name}
                </Title>
                <Paragraph>{cert.description}</Paragraph>
                <Paragraph>
                  <strong>Valid Until:</strong> {cert.validUntil}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </PageLayout>
  )
}
