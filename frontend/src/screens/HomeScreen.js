import React, { useState, useEffect } from "react";
// import products from "./../products";
import { Row, Col } from "react-bootstrap";
import Product from "./../components/Product";
import axios from "axios";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProduct = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };

    loadProduct();
  }, []);

  return (
    <>
      <h2 className="my-3 text-uppercase">Latest Products</h2>
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
