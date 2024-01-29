import React, { useState,useContext } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import UserContext from '../context/userProvider';
import {url} from './const';

export default function Signin ()  {

  const navigate = useNavigate();

  const {loginUser} = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  }); 

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Access form data
    // console.log('Form Data:', formData);

    try {

        const response = await axios.post(url+`/user/signin`, formData , {withCredentials : true} );  
        
        if (response.status === 200) {
          console.log(response.data);
          alert(`Welcome :  ${response.data.name}`);
          loginUser(response.data);
          navigate("/");
          // User comes at frontend // create context here
          
        } else {
          console.error('Form submission failed');
          // Handle submission failure
        }
      } catch (error) {
        alert("Invalid User Name");
        console.error('Error submitting form:', error);
        // Handle error
      }

  };

  return (
    <div className="container">
        <form action="/user/signin" method="post" onSubmit={handleSubmit}>
 
            <h5>Form</h5>

            <div className="mb-3">
                <label htmlFor="Email" className="form-label">Email</label> 
                <input type="email" name="email"  className="form-control" id="email" aria-describedby="emailAria" onChange={handleInputChange} value={formData.email}/>
            </div>

            <div className="mb-3">
                <label htmlFor="Password" className="form-label">Password</label>
                <input type="password"  name="password" className="form-control" id="password" aria-describedby="passwordAria" onChange={handleInputChange} value={formData.password}/>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>

          </form>    
    </div>

    
  );
};



