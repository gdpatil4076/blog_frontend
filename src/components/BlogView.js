import React, { useContext, useEffect, useState } from 'react';
import CommentForm from './Comment';
import CommentList from './ViewComment';
import {handleFullview} from './home';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CommentContext  from '../context/CommentProvider';
import {url} from './const';


const BlogInfoComponent = (props) => {

    const { setAllComments } = useContext(CommentContext);

    const Navigate = useNavigate();
    const {blogComment , SetBlog} = props;

    useEffect(()=>{
      
        const id = localStorage.getItem('blogId');

        const  immediate = async () => {
          try{

            const response = await axios.get(url+`/blog/view/${id}`);
    
            if (response.status === 200){
    
              console.log("At frontend ",response.data.msg);
    
              SetBlog(response.data.msg);
    
              // Set commments under context  // infinite loop 
              setAllComments(response.data.msg.comment);
    
              // console.log("Comments are ",comments);
    
              localStorage.setItem('blogId' , id);
    
            }
            else{
              alert('Error in home.js');
            }
          }
          catch(error){
            console.log(error);
          }
        }

        immediate();
    } ,[] ) ;





    if (!blogComment) {
        return null;
    }
    else{
        var bloginfo = blogComment.bloginfo;
        console.log(bloginfo);
    }


  return (
    <div className="container mt-4">

      <div className="mb-4">
        <h2 className='mb-2'>{bloginfo.title}</h2>
      </div>

      <hr />

      <div style={{ overflow : 'hidden' , height : '50%' , width : '100%' }}>
          <img src={bloginfo.profileImageUrl} className="card-img-top" alt="..."  style={{objectFit : 'contain' , height : '40vw' }}/>
      </div>

      <hr />
      <p
        className="form-control"
        placeholder="HI"
        id="blog"
        name="blog"
        style={{ height: 'auto' }}
      >{bloginfo.blog}</p>

      <hr />

      <div className="container mt-4 d-flex justify-content-end flex-column align-items-end">

        <img src="https://cdn.vectorstock.com/i/preview-1x/17/61/male-avatar-profile-picture-vector-10211761.jpg" width="100px" style={{margin : 5}}/>

        <div>
          <b>Created By -</b> {bloginfo.createdBy.name}
        </div>

      </div>

        <CommentForm id={bloginfo._id}/>
    
        <CommentList></CommentList>


    </div>




  );
};

export default BlogInfoComponent;
