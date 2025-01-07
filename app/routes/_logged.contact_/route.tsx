import { Typography, Form, Input, Button, Row, Col, Card, message } from 'antd'
import { useState } from 'react'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ContactUsPage() {
  const [form] = Form.useForm()
  const { user } = useUserContext()
  const [loading, setLoading] = useState(false)

  // Fetch contact information
  const { data: contacts } = Api.contact.findMany.useQuery({})
  const contact = contacts?.[0]

  // Create inquiry mutation
  const { mutateAsync: createInquiry } = Api.inquiry.create.useMutation()

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true)
      await createInquiry({
        data: {
          type: values.subject,
          message: values.message,
          status: 'PENDING',
          userId: user?.id,
        },
      })
      message.success('Your inquiry has been submitted successfully!')
      form.resetFields()
    } catch (error) {
      message.error('Failed to submit inquiry. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={1}>Contact Us</Title>
        <Paragraph>
          Get in touch with us! Whether you have questions about our products,
          services, or just want to say hello, we're here to help.
        </Paragraph>

        <Row gutter={[24, 24]}>
          {/* Contact Information */}
          <Col xs={24} md={8}>
            <Card>
              <Title level={3}>Contact Information</Title>
              <div style={{ marginBottom: 16 }}>
                <p>
                  <i className="las la-map-marker" style={{ marginRight: 8 }} />
                  <Text strong>Address:</Text>
                  <br />
                  <Text>{contact?.address}</Text>
                </p>
                <p>
                  <i className="las la-phone" style={{ marginRight: 8 }} />
                  <Text strong>Phone:</Text>
                  <br />
                  <Text>{contact?.phone}</Text>
                </p>
                <p>
                  <i className="las la-envelope" style={{ marginRight: 8 }} />
                  <Text strong>Email:</Text>
                  <br />
                  <Text>{contact?.email}</Text>
                </p>
              </div>
            </Card>

            {/* Map */}
            {contact?.mapCoordinates && (
              <Card style={{ marginTop: 16 }}>
                <Title level={3}>Our Location</Title>
                <iframe
                  src={`https://www.google.com/maps/embed?pb=${contact.mapCoordinates}`}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Card>
            )}
          </Col>

          {/* Contact Form */}
          <Col xs={24} md={16}>
            <Card>
              <Title level={3}>Send us a Message</Title>
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{ email: user?.email }}
              >
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                    { required: true, message: 'Please enter your name' },
                  ]}
                >
                  <Input
                    prefix={<i className="las la-user" />}
                    placeholder="Your name"
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' },
                  ]}
                >
                  <Input
                    prefix={<i className="las la-envelope" />}
                    placeholder="Your email"
                  />
                </Form.Item>

                <Form.Item
                  name="subject"
                  label="Subject"
                  rules={[
                    { required: true, message: 'Please enter a subject' },
                  ]}
                >
                  <Input
                    prefix={<i className="las la-heading" />}
                    placeholder="Subject"
                  />
                </Form.Item>

                <Form.Item
                  name="message"
                  label="Message"
                  rules={[
                    { required: true, message: 'Please enter your message' },
                  ]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Your message"
                    style={{ resize: 'none' }}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    block
                  >
                    <i
                      className="las la-paper-plane"
                      style={{ marginRight: 8 }}
                    />
                    Send Message
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </PageLayout>
  )
}
