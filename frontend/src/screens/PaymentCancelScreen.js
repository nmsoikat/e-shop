import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function PaymentCancelScreen() {
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1 className="text-warning text-center display-2">Payment Cancel</h1>
          <p className="text-center text-info">
            <Link to={'/'}>
              <b>Home</b>
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  )
}

export default PaymentCancelScreen
