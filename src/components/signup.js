// import React from 'react'

// export default function signup(){
//     const handleSubmit = (e)=>{
//         e.preventDefault();
//         console.log("",e.target.value);
//     }
//   return (
//     <div>
//        <div className="container">
//       <form action="/user/signup" method="post" onSubmit={handleSubmit}>
//         <h5>Form</h5>
//         <div className="mb-3">
//           <label htmlFor="name" className="form-label">
//             Full Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             className="form-control"
//             id="name"
//             aria-describedby="nameAria"
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">
//             Email
//           </label>
//           <input
//             type="email"
//             name="email"
//             className="form-control"
//             id="email"
//             aria-describedby="emailAria"
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">
//             Password
//           </label>
//           <input
//             type="password"
//             name="password"
//             className="form-control"
//             id="password"
//             aria-describedby="passwordAria"
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Submit
//         </button>
//       </form>
//     </div>
//     </div>
//   )
// }




import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {url} from './const';

export default function Signup() {
  const nevigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '', 
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // You can perform additional actions, such as sending the data to a server, here.
    try {

      const response = await axios.post(url+`/user/signup`, formData);

      if (response.status === 200) {
        console.log(response.data.message);
        alert("User Added Successfully");
        nevigate("/user/signin")
        // Handle successful submission
      } 
      else {
        console.error('Form submission failed');
        nevigate("/user/signup"); 
        // Handle submission failure
      }  
    } catch (error) {
      console.error('Email Id already Existed', error);
      nevigate("/user/signup"); 
      alert("Email Id already Existed");
    }

  };

  return (
    <div>
      <div className="container">
        <form action="/user/signup" method="post" onSubmit={handleSubmit}>
          <h5>Form</h5>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              id="name"
              aria-describedby="nameAria"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              id="email"
              aria-describedby="emailAria"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              id="password"
              aria-describedby="passwordAria"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}


