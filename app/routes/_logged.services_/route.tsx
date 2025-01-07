import {
  Typography,
  Card,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Input,
  message,
} from 'antd'
import { useState } from 'react'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ServicesPage() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  // Fetch services data
  const { data: services, isLoading } = Api.service.findMany.useQuery({
    include: {
      inquirys: true,
    },
  })

  // Create inquiry mutation
  const { mutateAsync: createInquiry } = Api.inquiry.create.useMutation()

  const handleInquirySubmit = async (values: any) => {
    try {
      await createInquiry({
        data: {
          type: 'SERVICE',
          message: values.message,
          status: 'PENDING',
          serviceId: values.serviceId,
        },
      })
      message.success('Inquiry submitted successfully!')
      setIsModalVisible(false)
      form.resetFields()
    } catch (error) {
      message.error('Failed to submit inquiry')
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Title level={1}>
            <i className="las la-cogs" style={{ marginRight: 8 }}></i>
            Manufacturing Services
          </Title>
          <Paragraph>
            Discover our comprehensive range of manufacturing services designed
            to meet your specific needs
          </Paragraph>
        </div>

        {isLoading ? (
          <div style={{ textAlign: 'center' }}>Loading services...</div>
        ) : (
          <Row gutter={[24, 24]}>
            {services?.map(service => (
              <Col xs={24} sm={12} lg={8} key={service.id}>
                <Card
                  hoverable
                  cover={
                    service.imageUrl && (
                      <img
                        alt={service.name}
                        src={service.imageUrl}
                        style={{ height: 200, objectFit: 'cover' }}
                      />
                    )
                  }
                  actions={[
                    <Button
                      type="primary"
                      key="inquire"
                      onClick={() => {
                        form.setFieldsValue({ serviceId: service.id })
                        setIsModalVisible(true)
                      }}
                    >
                      <i
                        className="las la-envelope"
                        style={{ marginRight: 8 }}
                      ></i>
                      Request Service
                    </Button>,
                  ]}
                >
                  <Card.Meta
                    title={
                      <span>
                        <i
                          className="las la-industry"
                          style={{ marginRight: 8 }}
                        ></i>
                        {service.name}
                      </span>
                    }
                    description={
                      <>
                        <Paragraph ellipsis={{ rows: 2 }}>
                          {service.description}
                        </Paragraph>
                        <Text strong>Process Details:</Text>
                        <Paragraph ellipsis={{ rows: 3 }}>
                          {service.processDetails}
                        </Paragraph>
                      </>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}

        <Modal
          title="Request Custom Manufacturing Solution"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleInquirySubmit} layout="vertical">
            <Form.Item name="serviceId" hidden>
              <Input />
            </Form.Item>
            <Form.Item
              name="message"
              label="Message"
              rules={[
                {
                  required: true,
                  message: 'Please describe your requirements',
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Please describe your specific requirements and expectations..."
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                <i
                  className="las la-paper-plane"
                  style={{ marginRight: 8 }}
                ></i>
                Submit Request
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
