import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function PaymentSuccessScreen() {
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1 className="text-success text-center display-1">
            Payment Success
          </h1>
          <p className="text-center text-info text-bold">
            Thank you!
            <br />
            <Link to={'/'}> Home</Link>
          </p>
        </Col>
      </Row>
    </Container>
  )
}

export default PaymentSuccessScreen
