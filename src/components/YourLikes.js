import React, { useContext } from 'react'
import BlogContext from '../context/blogProvider'


const YourLikes = () => {
    var {blogs} = useContext(BlogContext);
    const user = localStorage.getItem('user');

    const jsonUser = JSON.parse(user);
    const userId = jsonUser._id;

    
    var filteredBlogs = blogs && blogs.filter(blog => blog.likedBy && blog.likedBy.includes(jsonUser.name));



  return (
    <div className="container mt-4">

    <div className="row">
      {filteredBlogs && filteredBlogs.map((blog) => (
        <div key={blog._id} className="col-md-4 col-sm-6 mb-4 d-flex justify-content-center">
          <div className="card" style={{ width: '18rem', height : '20rem' }}>

            <div style={{ overflow : 'hidden' , height : '50%' , width : '100%' , backgroundColor : 'black'}}>
                <img src={blog.profileImageUrl} className="card-img-top" alt="..."  style={{objectFit : 'contain' , height : '100%' }}/>
            </div>

            <div className="card-body"  style={{height : '50%'}} >
              <h5 className="card-title">{blog.title}</h5>

              <button  className="btn btn-danger mt-2 mb-2"> Like </button>

              {blog.likedBy.length > 0 && (
                <p className='mt-2 mb-2'>Last liked by {blog.likedBy[blog.likedBy.length - 1]}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default YourLikes
