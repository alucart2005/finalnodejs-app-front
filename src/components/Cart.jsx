//import modules needed for this component 
import {Offcanvas, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { thunkCartGet } from '../store/slices/cart.slice'
import { useEffect, useState } from 'react'
import axios from 'axios'

//Main function Cart 
const Cart = ({ show, handleClose })=> {
  //use dispatch to send action to store
  const dispatch = useDispatch()
  //get cart state from store
  const cart = useSelector(state =>state.cart)
  //use state to render component
  const [render, setRender] = useState(false)
  //use effect to get data from api
  useEffect(() => {
    dispatch(thunkCartGet())
  }, [show, render])
  //function to delete all items from cart
  // https://e-commerce-api.academlo.tech/api/v1/cart/${element.id}
  const deleteCart = ()=>{
      cart.map((element)=>{
          axios.delete(`https://finalnodejs-ap.onrender.com/cart/${element.id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            })
          //after delete call setRender to trigger render 
          .then(()=> setRender(!render))
          .catch(error => console.log(error) )
      })
  }
  //function to checkout items
  // https://e-commerce-api.academlo.tech/api/v1/purchases
  const checkout = (purchases)=>{
      axios
          .post('https://finalnodejs-ap.onrender.com/purchases', purchases, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })
      .then( (response)=> {
          console.log(response)
      })
      .catch( error => console.log(error) )
  }
  //return offcanvas component
  return(
      <Offcanvas show={show} onHide={handleClose} placement={"end"}>
          <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
          {
              //map cart array to show the items
              cart.map((element, index)=>{
                  return <li key={index}>{ element.title }</li>
              })
          }
          {
              //if cart is not empty show delete and checkout buttons
              cart.length !== 0 && <Button onClick={ deleteCart }>Delete All</Button>
          }
          {
              cart.length !== 0 && <Button onClick={ ()=> checkout(cart) }>Checkout</Button>
          }
          
          </Offcanvas.Body>
      </Offcanvas>
  )
}
export default Cart