import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {url} from './const';
const NotificationList = () => {
  const [note, setnote] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  useEffect(() => {
    const getnotify = async () => {
      try {
        const response = await axios.get(url+`/user/getnotify`);
        if (response.status === 200) {
          setnote(response.data.msg.notification);
        //   console.log(response.data.msg);
        } else {
          console.log("Unknown error");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getnotify();

    // Cleanup function
    return () => {
        const Clearnotify = async () => {
            try{
                const response = await axios.get(url+`/user/clearnotify`);

                if (response.status === 200){
                    console.log("Notification cleared successfully");
                }
                else{
                    console.log("Unknown Error");
                }
            }
            catch(error){
                console.log(error);
            }

        }
        Clearnotify();
    };
  }, []);



  return (

    note && (
      <div className="container mt-5">
      <div className="row row-cols-1">
        {note.map((not, index) => (
          <div key={index} className="col p-2">
            <p
              className="form-control text-start mb-3"
              type="text"
              id={`comment-${index}`}
              name="comment"
              style={{ fontFamily : "Playfair Display, serif" }}
              
            >  {not.msg} </p>
            
            <div className='text-center d-flex justify-content-end' style={{ fontFamily : "cursive" }}>
              <b>Posted By --  </b> { `${not.createdBy}` }
            </div>
          </div>
        ))}
      </div>
    </div>
    )

  );
};

export default NotificationList;
