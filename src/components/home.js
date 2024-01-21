import React from 'react'
import {useContext } from 'react';
import BlogContext from '../context/blogProvider';
import UserContext from '../context/userProvider';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CommentContext  from '../context/CommentProvider';
import {url} from './const';

const Home = (props) => {

  const { setAllComments, comments } = useContext(CommentContext);
  const Navigate = useNavigate();
  const {SetBlog} = props;
  const { updateLikes,blogs } = useContext(BlogContext); // blog context
  const {user}  = useContext(UserContext);

  const handleFullView = async (BlogId) => {

      try{

        const response = await axios.get(url+`/blog/view/${BlogId}`);
        if (response.status === 200){

          console.log("At frontend ",response.data.msg);
          SetBlog(response.data.msg);
          // Set commments under context 
          setAllComments(response.data.msg.comment);
          // console.log("Comments are ",comments);
          localStorage.setItem('blogId' , BlogId);
          Navigate('/blog/fullview');

        }
        else{
          alert('Error in home.js');
        }
      }
      catch(error){
        console.log(error);
      }
      
  }
  

  const handleLikeClick = (blogId)=>{
      updateLikes(blogId);
  }

  return (

    


    <div className="container mt-4 ">

    <div className="row ">
      {blogs && blogs.map((blog) => (


        <div key={blog._id} className="col-md-4 col-sm-6 mb-4 d-flex justify-content-center">



          <div className="card" style={{ width: '18rem' , height : '25rem' }}>
            
            <div style={{ overflow : 'hidden' , height : '50%' , width : '100%' , backgroundColor : 'black'}}>
             <img src={blog.profileImageUrl} className="card-img-top" alt="..."  style={{objectFit : 'contain' , height : '100%' }}/>
            </div>
            
            <div className="card-body " style={{height : '50%'}}>
              <h5 className="card-title">{blog.title}</h5>

              <p className="card-text">{
                (blog.blog.length > 50 ) &&
              `${blog.blog.slice(0,50)}...`}
              {
                (blog.blog.length <= 50 ) &&
                `${blog.blog}`
              }
              </p>

              <button onClick={() => handleFullView(blog._id)} className="btn btn-primary mt-4 me-2">View More</button>
              
              {user? ( user.likedBlog.includes(blog._id) ? (
                <button onClick={() => handleLikeClick(blog._id)} className="btn btn-danger mt-4"> Like {blog.likedBy.length}</button>
              ) : (
                <button onClick={() => handleLikeClick(blog._id)} className="btn btn-primary mt-4"> Like {blog.likedBy.length}</button>
              )): <p>  </p>}

              {blog.likedBy.length > 0 && (
                <div className='mt-4 mb-4'>Last liked by {blog.likedBy[blog.likedBy.length - 1]}</div>
              )}

            </div>
          </div>




        </div>
      ))}
    </div>

  </div>


  )
}



export default Home;  


