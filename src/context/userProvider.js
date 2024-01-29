import React from "react";
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { url } from "../components/const";

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(()=>{
      try{
        const luser = JSON.parse(localStorage.getItem("user"));
        if (!luser) {
          setUser(null);
        }
        setUser(luser);
      }
      catch(error){
        console.log(error);
      }
  },[])

  const loginUser = (userData) => {
    // Logic to handle user login
    // frontend modification
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    //backend modification
  };

  const logoutUser = async () => {
    setUser(null);
    localStorage.removeItem("user");
    await axios.get(url+`/user/logout`);
  };

  const getUser = ()=>{
    try{
      return JSON.parse(localStorage.getItem("user"));
    }catch(e)
    {
      return null;
    }
 }

  const UpdateUser = (blogId) => {
    try {
      // Assume you have access to the blogs and the user state
      const updatedUser = user;
      // Check if the blogId is already in the likedBlogs array
      const index = updatedUser.likedBlog.indexOf(blogId);

      if (index !== -1) {
        // Use filter to create a new array without the removed item
        updatedUser.likedBlog = updatedUser.likedBlog.filter(
          (item, i) => i !== index
        );
      } else {
        updatedUser.likedBlog.push(blogId);
      }

      // Update the user state
      loginUser(updatedUser);
      console.log("User updated at frontend");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser, UpdateUser,getUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
