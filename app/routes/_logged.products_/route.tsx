import {
  Typography,
  Card,
  Row,
  Col,
  Select,
  Input,
  Button,
  Modal,
  Form,
  Space,
  Spin,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
const { Option } = Select
const { TextArea } = Input
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [inquiryModalVisible, setInquiryModalVisible] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const { user } = useUserContext()

  // Fetch categories and products
  const { data: categories, isLoading: loadingCategories } =
    Api.category.findMany.useQuery({})
  const { data: products, isLoading: loadingProducts } =
    Api.product.findMany.useQuery({
      where: {
        categoryId: selectedCategory || undefined,
        name: { contains: searchQuery, mode: 'insensitive' },
      },
      include: {
        category: true,
      },
    })

  // Create inquiry mutation
  const { mutateAsync: createInquiry } = Api.inquiry.create.useMutation()

  const handleInquiry = async (values: any) => {
    try {
      await createInquiry({
        data: {
          type: 'PRODUCT',
          message: values.message,
          status: 'PENDING',
          productId: selectedProduct?.id,
          userId: user?.id,
        },
      })
      setInquiryModalVisible(false)
      Modal.success({ title: 'Inquiry sent successfully!' })
    } catch (error) {
      Modal.error({ title: 'Failed to send inquiry' })
    }
  }

  const filteredProducts = products?.filter(product =>
    product.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (loadingCategories || loadingProducts) {
    return (
      <PageLayout layout="full-width">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <Title level={2}>
          <i className="las la-microchip" /> Electronic Products
        </Title>
        <Text>
          Browse our wide selection of electronic products and request quotes.
        </Text>

        <Space style={{ marginTop: 20, marginBottom: 20 }} size="middle">
          <Select
            style={{ width: 200 }}
            placeholder="Select Category"
            onChange={value => setSelectedCategory(value)}
            allowClear
          >
            {categories?.map(category => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>

          <Input
            placeholder="Search products..."
            prefix={<i className="las la-search" />}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ width: 300 }}
          />
        </Space>

        <Row gutter={[16, 16]}>
          {filteredProducts?.map(product => (
            <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={product.name}
                    src={product.imageUrl || 'https://placeholder.com/300x200'}
                    style={{ height: 200, objectFit: 'cover' }}
                  />
                }
                actions={[
                  <Button
                    type="primary"
                    icon={<i className="las la-envelope" />}
                    onClick={() => {
                      setSelectedProduct(product)
                      setInquiryModalVisible(true)
                    }}
                  >
                    Request Quote
                  </Button>,
                ]}
              >
                <Card.Meta
                  title={product.name}
                  description={
                    <>
                      <Text type="secondary">{product.category?.name}</Text>
                      <br />
                      <Text>{product.description}</Text>
                      {product.specifications && (
                        <div style={{ marginTop: 10 }}>
                          <Text strong>Specifications:</Text>
                          <br />
                          <Text>{product.specifications}</Text>
                        </div>
                      )}
                      {product.price && (
                        <div style={{ marginTop: 10 }}>
                          <Text strong>Price: </Text>
                          <Text>{product.price}</Text>
                        </div>
                      )}
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>

        <Modal
          title="Request Product Quote"
          open={inquiryModalVisible}
          onCancel={() => setInquiryModalVisible(false)}
          footer={null}
        >
          <Form onFinish={handleInquiry} layout="vertical">
            <Form.Item
              name="message"
              label="Message"
              rules={[{ required: true, message: 'Please enter your message' }]}
            >
              <TextArea rows={4} placeholder="Enter your inquiry details..." />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<i className="las la-paper-plane" />}
              >
                Send Inquiry
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
