// The following code imports the React, axios, and useState and useEffect hooks needed to create the Purchases component, which will render a list of purchases.

import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

// The useState hook is used to store the list of purchases and the useEffect hook fetches the data from an external API when the component is first rendered and sets the state with the received data. 
// https://e-commerce-api.academlo.tech/api/v1/purchases
const Purchases = () => {

  const [purchases, setPurchases] = useState([])

  useEffect(() => {
    axios
      .get('https://finalnodejs-ap.onrender.com/purchases', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((resp) => setPurchases(resp.data))
      .catch((resp) => console.log(resp))
  }, [])

// The component then renders a heading and a list of the purchases, with each purchase containing the ticket number and a list of the products in the purchase. 
 
  return (
    <div >
      <h1>Purchases</h1>
        {
          purchases.map((element, index)=> 
          <li key={index}>
            Ticket Number : { element.id }
            <li >
            Products
            </li>
            <ol> 
            { 
            element.cart.products.map((item, i)=> 
            <li key={i}>{ item.brand }</li>) 
            } 
            </ol>
          </li>)
        }
    </div>
  );
};

export default Purchases;