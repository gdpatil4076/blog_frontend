import React from "react";
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import {url} from '../components/const';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user information from localStorage on component mount
    const storedUser = localStorage.getItem("user");
    const nuser = JSON.parse(storedUser);

    if (storedUser) {
      console.log("Fetching User From Database");

      const reqFun = async () => {
        try {
          const response = await axios.get(url+`/user/getuser`);

          if (response.status === 200) {
            // console.log("Response is" ,response.data.msg);
            setUser(response.data.msg);
            localStorage.setItem("user", JSON.stringify(response.data.msg));
          } else {
            console.log("Unknown Error");
          }
        } catch (error) {
          console.log(error);
        }
      };
      reqFun();
    }
  }, []);

  const loginUser = (userData) => {
    // Logic to handle user login

    // frontend modification
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    //backend modification
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

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
    <UserContext.Provider value={{ user, loginUser, logoutUser, UpdateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
