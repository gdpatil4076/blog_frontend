import React, { createContext, useContext, useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from './userProvider';
import {url} from '../components/const';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {

    const {user,setUser,UpdateUser} =  useContext(UserContext);
    const [blogs, setBlogs] = useState(null);

    useEffect(() => {
        // Load user information from localStorage on component mount
        console.log("Fetching Blogs From Database");
        const reqFun=async()=>{
            try {
              const response = await axios.get(url+`/b`);
              // console.log("Response is => " , response.data); 
              setBlogs(response.data);
            } catch (error) {  
              console.log(error);
            }
          }
          reqFun();

      }, []);

    const setBlogsState = (newBlogs) => {
        setBlogs(newBlogs);
    };
  
    const updateLikes = async (blogId) => {

        console.log("Like Updated at frontend");
        //frontend updation
        setBlogs((prevBlogs) => prevBlogs.map((blog) =>

            blog._id === blogId ? {
            ...blog,
            likedBy: blog.likedBy.includes(user.name)
                ? blog.likedBy.filter((name) => name !== user.name)  // Remove if present
                : [...blog.likedBy, user.name]  // Add if not present
            } : blog

        ));
        UpdateUser(blogId);
        
        // console.log(user);

        //backend updation
        try {

            const response = await axios.get(url+`/blog/addlike/${blogId}`);
            if (response.status === 200) {
                // alert(`${response.data.msg}`);
                console.log("Like and User Updated at Backend");

            } else {
              console.error('Failed to update');
            }

        } catch (error) {
            alert("User Not Found");
            console.error('User Not Found', error);
        }
   
        
    };
  
    const editBlog = (blogId, newContent) => { 

    };
  
    const addComment = (blogId, comment) => {

    };
  
    return (
      <BlogContext.Provider value={{ blogs, updateLikes, editBlog, addComment, setBlogsState }}>
        {children}
      </BlogContext.Provider>
    );
  };

  export const useBlog = () => {
    const context = useContext(BlogContext);
    if (!context) {
      throw new Error('useBlog must be used within a BlogProvider');
    }
    return context;
  };

  export default BlogContext;