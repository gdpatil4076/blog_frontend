import React, { useState,useContext } from 'react';
import axios from 'axios';
import CommentContext  from '../context/CommentProvider';
import {url} from './const.js';

const CommentForm = (props) => {

  const {addComment} = useContext(CommentContext);

  const { id } = props ;

  const flag = localStorage.getItem('user');

  const [comment, setComment] = useState('');

  const handleChange = (e) => {
    setComment(e.target.value);

  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    
    try {

      // backend modification
      const apiUrl = `/blog/comment/${id}`;
      const response = await axios.post(url+apiUrl, { comment });

      if (response.status === 200) {
        addComment(response.data.comet);
        console.log(" comet is ",response.data.comet);
        setComment('');
      } else {
        console.error('Error posting comment');
      }
    } catch (error) {
      console.error('Error posting comment', error);
    }

  
    
  };




  return (
    // Use && to conditionally render the form
    flag && (
      <form onSubmit={handleSubmit}>
        <div className="container">
          <p htmlFor="comment" className='fs-4'>Add Comment</p>

          <div className="form-floating">

            <input
              className="form-control mt-2 mb-3 "
              type="text"
              id="comment"
              name="comment"
              placeholder="Write your comment here"
              rows="3"
              value={comment}
              onChange={handleChange}
              
              required
            ></input>
          </div>

          <button type="submit" className="btn btn-primary mt-2 mb-3">
            Submit
          </button>
          
        </div>
      </form>
    )
  );
};

export default CommentForm;
