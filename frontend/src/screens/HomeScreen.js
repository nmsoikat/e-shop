import React from "react";
import products from "./../products";
import { Row, Col } from "react-bootstrap";
import Product from "./../components/Product";
const HomeScreen = () => {
  return (
    <>
      <Row>
        {products.map((pd) => {
          return (
            <Col key={pd._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={pd} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default HomeScreen;
