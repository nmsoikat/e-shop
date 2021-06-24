import React, { useState, useEffect } from "react";
// import products from "../products";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import axios from "axios";

function ProductScreen(props) {
  // const product = products.find((pd) => pd._id === props.match.params.id);

  const [product, setProduct] = useState({});

  useEffect(() => {
    const loadSingleProduct = async () => {
      const { data } = await axios.get(
        "/api/products/" + props.match.params.id
      );
      setProduct(data);
    };

    loadSingleProduct();
  }, [props.match]);

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Back
      </Link>

      {Object.keys(product).length > 0 ? (
        <Row>
          <Col md={5}>
            <Image
              src={product.image}
              alt={product.name}
              fluid
              className="border rounded"
            />
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={product.numReviews + "reviews"}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>Price</Col>
                  <Col>${product.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  variant="dark"
                  className="w-100"
                  disabled={product.countInStock === 0}
                >
                  Add to cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      ) : (
        "loading..."
      )}
    </>
  );
}

export default ProductScreen;
