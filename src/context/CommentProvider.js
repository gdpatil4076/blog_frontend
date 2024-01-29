// CommentContext.js
import React, { createContext,  useState } from 'react';
const CommentContext = createContext();


export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  
  const addComment = (comment) => {

    setComments([...comments, comment]);
  
  };

  const deleteComment = (commentId) => {
    setComments(comments.filter(comment => comment._id !== commentId));
  };

  const setAllComments = (newComments) => {
    console.log("Setting New Comments : " , newComments);
    setComments(newComments);
  };

  return (
    <CommentContext.Provider value={{ comments, addComment, deleteComment,setAllComments }}>
      {children}
    </CommentContext.Provider>
  );
};

export default CommentContext;
