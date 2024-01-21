import React,{useContext} from 'react';
import CommentContext  from '../context/CommentProvider';



const CommentList = (props) => {

    const { comments } = useContext(CommentContext);

    console.log("Commets on page" , comments);

    comments.reverse();

    if (!comments || comments.length === 0) {
        return null;
    }

  return (
    <div className="container">
      <div className="row row-cols-1">
        {comments.map((comment, index) => (
          <div key={index} className="col p-2">
            <p
              className="form-control text-start mb-3"
              type="text"
              id={`comment-${index}`}
              name="comment"
              style={{ fontFamily : "Playfair Display, serif" }}
              
            >  {comment.content} </p>
            
            <div className='text-center d-flex justify-content-end' style={{ fontFamily : "cursive" }}>
              <b>Posted By --  </b> { `${comment.createdBy.name}` }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;
