import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import AlertDismissibleExample from '../components/AlertError'
import { useEffect } from 'react'

//Function to handle the login process
const Login = () => {

  //Get user information from local storage
  const user = localStorage.getItem('user')
  const token = localStorage.getItem('token')

//Check if user is already logged in
  useEffect(() => {
    if(user && token){
      //Redirect to main page
      navigate('/')
    } 
  }, [])

  //Set initial values for email and password
  const [email, setEmail] = useState("")
  const [password, setPassword]= useState("")
  //Set initial value for alert
  const [alert, setAlert] = useState(false)
  //Get navigate function from react router
  const navigate = useNavigate()

  //Function to handle the form submission
  const handleSubmit =(e) => {
    //Prevent default form submission
    e.preventDefault()
  //Create data object with email and password
  const data = {
    email: email,
    password: password
  }

  //Make a post request to api
  // https://e-commerce-api.academlo.tech/api/v1/users/login
  axios.post(`https://finalnodejs-ap.onrender.com/users/login`, data)
  .then(resp => {
    console.log(resp)
    //Store token and user in local storage
    localStorage.setItem('token', resp.data)
    localStorage.setItem('user', resp.data)
    //Redirect to main page
    navigate("/")
  })
  .catch(error =>{
    console.log(error)
    //Show alert if request fails
    setAlert(true)
  })

}

  return (
    <div className='row d-flex justify-content-center'>
      <div className='col-sm-9 col-md-5 col-12'>
        <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email"
               onChange={(e)=> setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password"
                onChange={(e)=> setPassword(e.target.value)} />
            </Form.Group>
           <Button variant="primary" type="submit" className='col-12'>
            Log In
          </Button>
        </Form>
        <AlertDismissibleExample
        isVisible={alert}
        //Function to handle alert dismissal
        dismiss={() => setAlert(false)}
        />
      </div>
    </div>
  )
}
export default Login