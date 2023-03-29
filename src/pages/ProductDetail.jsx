// Importing required packages and modules
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';
import { setIsLoading } from '../store/slices/isLoading.slice';
import { thunkCartPost } from '../store/slices/cart.slice';
import {thunkCartGet } from '../store/slices/cart.slice'
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Component for displaying product details
const ProductDetail = () => {
  // Get the id of the product from URL parameters
  const { id } = useParams()
  // State for storing product details
  const [detail, setDetail] = useState({}
)

  // Dispatch action to set loading state and get product details from API
  // https://e-commerce-api.academlo.tech/api/v1/products
  useEffect(() => {
    dispatch(setIsLoading(true))
    axios
      .get(`https://finalnodejs-ap.onrender.com/products/${id}`)
      .then(resp => {
        setDetail(resp.data)
      })
      .catch(error => console.log(error))
      .finally(() => dispatch(setIsLoading(false)))
  }, [id])

  // Get related products from the store
  const productRelated = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsThunk())
  }, [dispatch]);

  // State for managing carousel active index
  const [activeIndex, setActiveIndex] = useState(0);
  const handleSelect = (index) => {
    setActiveIndex(index);
  };

  // Get similar items based on the product category
  const similarItems = productRelated?.filter((element) => element?.category?.name === detail?.category);
  // State for managing input quantity
  const [input, setInput] = useState(1);
  // Dispatch action to add product to cart
  const dispatchPostCart = useDispatch();
  // Navigate hook
  const navigate = useNavigate();
  // Dispatch action to get cart items
  const dispatchGetCart = useDispatch(); 
  // Get cart items from the store
  const cart = useSelector(state =>state.cart) 

  // Handle form submission to add product to cart
  const handleSubmit = () => {
    if (localStorage.getItem('token')) {
      const data = {
        id: detail.id,
        quantity: input
      }
      dispatchPostCart(thunkCartPost(data));
      dispatchGetCart(thunkCartGet()); 
    } else {
      navigate('/login')
    }
  }
  
  return (
    <Container className='col-11 conteiner content-details '  >
      <div className="flex justify-content-start  align-items-center mb-5">
        <Card.Link as={Link} to='/' style={{ textDecoration: 'none' }}>  Home  </Card.Link>
        <div style={{
          background: "var(--secondary--color)",
          borderRadius: "50%",
          height: "6px",
          margin: " 0 14px",
          width: "6px"
        }}
        ></div>
        <div style={{ fontWeight: 600 }}>{detail.title}</div>
      </div>
      <Row className='d-flex justify-content-between align-items-center' >
        <Col xs={12} lg={4}  >
          <Carousel activeIndex={activeIndex} onSelect={handleSelect} >
            {
              detail?.productImgs?.map((element, index) => (
                <Carousel.Item key={index} >
                  <img className="center-img" src={`${element}`} alt={`img ${index}`}/>
                </Carousel.Item>
              ))
            }
          </Carousel>
          <div className="miniature-container">
            {
              detail?.productImgs?.map((element, index) => (
                <img
                  key={index}
                  src={`${element}`}
                  alt={`img ${index}`}
                  className={`miniature ${activeIndex === index ? 'active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                />
              ))
            }
          </div>
        </Col>

        <Col xs={12} lg={7} >
          <Card style={{ border: 'transparent' }}  >
            <Card.Body >
              <Card.Title style={{ marginBottom: '1.5rem' }}>{detail.title}</Card.Title>
              <Card.Text>
                {detail.description}
              </Card.Text>
              <Container className='mt-4 col-12'>
                <Row>
                  <Col className='col-6'  >
                    <h6 style={{ color: '#ababab', fontWeight: 400 }}>Precio</h6>
                    <h4 style={{ fontSize: '1.2rem' }}>${(Number(detail.price)).toLocaleString("en-US", {minimumFractionDigits: 0, maximumFractionDigits: 2})}</h4>
                  </Col>
                  <Col className="Col-6">
                    <h6 style={{ color: '#ababab', fontWeight: 400 }}>Quantity</h6>
                    <div className="quantity-box">
                      <div className="flex">
                        <button className='buttonCart' > <i className='bx bx-minus' onClick={() => setInput(input <= 1 ? 1 : input - 1)} ></i></button>
                        <div className="value">{input}</div>
                        <button className='buttonCart' variant="primary" onClick={() => setInput(input + 1)}><i className='bx bx-plus'></i></button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
              <Button onClick={() => handleSubmit()} variant="primary" className='w-100 buttonAddCart' >Add to cart <i className='bx bx-cart'></i></Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Container className='d-flex flex-wrap col-12 justify-content-around' >
        {
          similarItems.map((element, index) =>
            <Card
              as={Link} to={`/products/${element.id}`}
              key={index}
              style={{ textDecoration: 'none' }} className='mx-3 mb-3 d-flex justify-content-start'>
              <Card.Body >
                <Card.Img className='image-item image-item0' variant="top" src={`${element.productImgs[0]}`} />
                <Card.Img className='image-item image-item1' variant="top" src={`${element.productImgs[1]}`} />
              </Card.Body>
              <Card.Body style={{ color: 'var(--text--color)' }} className='d-flex flex-column'>
                <Card.Title className='mb-3'> {element.title} </Card.Title>
                <Card.Title className='mb-3'>Price $ {(Number(element.price)).toLocaleString("en-US", {minimumFractionDigits: 0, maximumFractionDigits: 2})}</Card.Title>
                <Button
                  variant="primary"
                  style={{ borderRadius: '50%', width: '3rem', height: '3rem' }}
                  className=' align-self-end d-flex justify-content-center  align-items-center'
                >
                  <i className='bx bx-cart'></i>
                </Button>
              </Card.Body>
            </Card>)
        }
      </Container>
    </Container >
  )
}

export default ProductDetail


