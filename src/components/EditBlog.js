import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {url} from './const';

const EditBlogForm = () => {
  const Navigate = useNavigate();

  const blog =  useParams();
  const blogId = blog.id;
  const [formData, setFormData] = useState({ 
    title: '',
    blog: '',
    profileImage : null,
    blogid : '',
  });

  useEffect(() => {
    // Fetch the existing blog data from the server when the component mounts
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(url+`/blog/edit/${blogId}`);
        const existingBlog = response.data.msg; // Assuming your API response has the existing blog data
        // Update the state with the existing blog data
        setFormData({
          title: existingBlog.title,
          blog: existingBlog.blog,
          profileImage: existingBlog.profileImageUrl,
          blogid : existingBlog._id,
          // Assuming this is a URL or base64 image
        });

      } catch (error) {
        console.error('Error fetching blog data', error);
      }
    };

    fetchBlogData();
  }, [blogId]);



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
    formDataToSend.append('blogid', formData.blogid);

    try {

      const response = await axios.post(url+`/blog/edit`, formDataToSend);
      if (response.status === 200) {
        window.location.reload();
        alert("Blog Updated successfully");
      } else {
        console.error('Error editing blog');
      }

    } catch (error) {
      console.error('Error editing blog', error);
    }

  };

  return (

    

    <form onSubmit={handleSubmit} encType="multipart/form-data" className='mt-4'>
      <div className="container">
        <div className="mb-3 fs-5">
          <p htmlFor="title" className="form-label">
            Title
          </p>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            aria-describedby="titleAria"
            style={{fontFamily : "cursive"}}
          />
        </div>

        <div style={{ overflow : 'hidden' , height : '50%' , width : '100%' , marginBottom : '2em' }} >
          <img src={formData.profileImage} className="card-img-top" alt="..."  style={{objectFit : 'contain' , height : '40vw' }}/>
        </div>

        <div className="form-floating">
          <textarea
            className="form-control mb-3"
            type="text"
            placeholder="HI"
            id="blog"
            name="blog"
            style={{ height: '200px', fontFamily : "cursive" }}
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
            className="form-control mb-3"
            id="profileImage"
            name="profileImage"
            onChange={handleChange}
            aria-describedby="profileImageAria"
            style={{fontFamily : "cursive"}}
            required
          />
        </div>

        <button type="submit" className="btn btn mb-10" style={{backgroundColor : "aqua"}}>
          Edit Blog
        </button>

      </div>
    </form>
  );
};

export default EditBlogForm;
