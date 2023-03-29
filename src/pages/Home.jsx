// Import necessary dependencies and functions from the store
import React, { useEffect, useState } from 'react';
import { getProductsThunk, filterCategoriesThunk, getFilterProducts, getFilterPrice } from '../store/slices/products.slice';
import { useSelector, useDispatch } from 'react-redux';
import {Row, Col, Button, Card} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import { setIsLoading } from '../store/slices/isLoading.slice';

const Home = () => {
  // Dispatch actions to the store
  const dispatch = useDispatch()
  // Get the product state from the store
  const products = useSelector(state => state.product)
  //State to store the categories
  const [categorie, setCategorie] =useState([])
  // Register form data
  const { handleSubmit, register } = useForm();
  
  // Use effect to get categories and products on component mount
  // https://e-commerce-api.academlo.tech/api/v1/products/categories
  useEffect(() => {
    // Get categories from the API
    axios
    .get(`https://finalnodejs-ap.onrender.com/categories`)  //https://e-commerce-api.academlo.tech/api/v1/products/categories
    .then(resp => setCategorie(resp.data))
    .catch(error => console.log(error))
    .finally(() => {
      // After getting categories, set loading to false
      setTimeout(() => {
        dispatch(setIsLoading(false))
      }, 1500)
    })
    // Dispatch the action to get products from the API
    dispatch(getProductsThunk())
    
  },[])

  // Function to search products
  const searchProduct = (e) => {
    // Dispatch the action to get filtered products
    dispatch(getFilterProducts(e))
  }

  // Function to submit the form
  const submit = (data) => {
    // Dispatch the action to get filtered products based on price
    dispatch(getFilterPrice(data))  
  }

  return (
    <div className='d-flex'>
        <Row>
          <Col className='d-block p-0' >
          <Form onSubmit={ (e) => searchProduct(e.target[0].value)}>
          <Form.Control
            onChange={(e) => searchProduct(e.target.value)}
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />       
          </Form>
          <hr />
            <div >
              <Accordion defaultActiveKey="0" >
                <Accordion.Item eventKey="0" className='border-0'>
                <Accordion.Header className='w-auto shadow mb-1 bg-white text-dark border-bottom-dark rounded'  variant="success" id="dropdown-basic" style={{ width: '200px'}}>Price</Accordion.Header>
                <Accordion.Body className='w-auto' show = 'onToggle' style={{ width: '200px'}}>
                <Form onSubmit={ handleSubmit(submit) } >
                    <Form.Group className="mb-3" controlId="formBasicPriceOne">
                      <Form.Label>From</Form.Label>
                      <Form.Control type="number" step="100" {...register("priceOne")} placeholder="1000" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPriceTwo">
                      <Form.Label>To</Form.Label>
                      <Form.Control type="number" step="100" {...register("priceTwo")}placeholder="2000" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Filter Price
                    </Button>
                </Form>
                </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div> 
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0" className='border-0'>
                <Accordion.Header className='w-auto shadow mb-1 bg-white text-dark border-bottom-dark rounded'  variant="success" id="dropdown-basic" style={{ width: '200px'}}>Category</Accordion.Header>
                <Accordion.Body className='w-auto' show = 'onToggle' style={{ width: '200px'}}>
                {categorie.map((category, index) => (
                <Col key={index}>
                <Button
                  style={{fontWeight: "normal"}}
                  variant="ligth"
                  onClick={() => dispatch(filterCategoriesThunk(category.id))}>
                  {category.name}
                </Button>
                </Col>
              ))}
              <Button 
                  style={{fontWeight: "normal" }}
                  variant="ligth" 
                  onClick={() => dispatch(getProductsThunk())}>All Products
              </Button>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion> 
          </Col>
        </Row>
        <Row xs={1} md={2} lg={3} style={{width: '80%', paddingLeft: "50px" }}>
            {
              products.map((product, index) => (
                <Col className='product d-flex' key={index} as={ Link } to = {`/products/${product.id}`}>
                  <Card className='Card' style={{height: '400px', width:'300px'}}>
                    <div className='home-img'>
                      <Card.Img className='over'          
                      variant="top"
                      src={product.productImgs[0]} />
                      <Card.Img  
                      variant="top"
                      src={product.productImgs[1]} />
                    </div>   
                    <Card.Body>
                      <div>
                        <Card.Text >{product.category.name}</Card.Text>
                        <Card.Title >{product.title}</Card.Title>
                        <Card.Text >Price $ {(Number(product.price)).toLocaleString("en-US", {minimumFractionDigits: 0, maximumFractionDigits: 2})}</Card.Text>
                      </div> 
                    </Card.Body>
                  </Card>
                </Col>
              ))
            }  
        </Row>
    </div>
  )
}

export default Home;