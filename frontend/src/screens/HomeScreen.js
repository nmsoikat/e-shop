import React, { useEffect } from "react";
// import products from "./../products";
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col } from "react-bootstrap";
import Product from "./../components/Product";
import {listOfProducts} from './../actions/productAction';
import Loader from "../components/Loader";
import Message from "../components/Message";


const HomeScreen = () => {

  const dispatch = useDispatch()

  const {loading, products, error} = useSelector((state) => state.productList)

  useEffect(() => {
   dispatch(listOfProducts())
  }, [dispatch]);

  return (
    <>
    <h2 className="my-3 text-uppercase">Latest Products</h2>
    {loading ? <Loader /> : error ? <Message variant="danger" children={error} /> : 
      <Row>
        {products.map((pd) => {
          return (
            <Col key={pd._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={pd} />
            </Col>
          );
        })}
      </Row>}
   
      
    </>
  );
};

export default HomeScreen;
