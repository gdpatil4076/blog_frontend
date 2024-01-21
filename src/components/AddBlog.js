import React, { useState } from 'react';
import axios from 'axios';
import {url} from './const'
const BlogForm = () => {

  const [formData, setFormData] = useState({ 
    title: '',
    blog: '',
    profileImage : null,
  });

  const handleChange = (e) => {

    const { name, value, type, files } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the updated blog data to the server for editing
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('blog', formData.blog);
    formDataToSend.append('profileImage', formData.profileImage);

    try {

      const response = await axios.post(url+`/blog/addnew`, formDataToSend);

      if (response.status === 200) {
        setFormData({ 
          title: '',
          blog: '',
          profileImage : null,
        });
        alert("Blog Added successfully");
      } else {
        console.error('Error editing blog');
      }

    } catch (error) {
      console.error('Error editing blog', error);
    }

  };


  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} encType="multipart/form-data" >
        <div className="container">
          <div className="mb-3">
            <p htmlFor="title" className="form-label fs-5">
              Title
            </p>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="titleAria"
              value={formData.title}
              onChange={handleChange}
              style={{fontFamily : "cursive"}}
            />
          </div>
          <p className='fs-5'> Content </p>
          <div className="form-floating">
            <textarea
              className="form-control mb-3 "
              type="text"
              placeholder="HI"
              id="blog"
              name="blog"
              style={{ height: '300px', fontFamily : "cursive" }}
              value={formData.blog}
              onChange={handleChange}

            ></textarea>
          </div>
          <div className="mb-3">
            <p htmlFor="profileImage" className="form-label fs-5">
              Profile Image
            </p>
            <input
              type="file"
              className="form-control mb-2"
              id="profileImage"
              name="profileImage"
              aria-describedby="profileImageAria"
              onChange={handleChange}
              style={{fontFamily : "cursive"}}
              required
            />
          </div>
          <button type="submit" className="btn btn-secondary">
            Add Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
