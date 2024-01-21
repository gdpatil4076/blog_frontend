import React, { useContext } from "react";
import BlogContext from "../context/blogProvider";
import { Link, NavLink } from "react-router-dom";

const YourBlogs = () => {
  var { blogs } = useContext(BlogContext);
  const user = localStorage.getItem("user");
  const jsonUser = JSON.parse(user);
  const userId = jsonUser._id;
  console.log(userId);
  const filteredBlogs =
    blogs && blogs.filter((blog) => blog.createdBy === userId);

  return (
    <div className="container mt-4">
      <div className="row">
        {filteredBlogs &&
          filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="col-md-4 col-sm-6 mb-4 d-flex justify-content-center"
            >
              <div className="card" style={{ width: "18rem", height: "20rem" }}>
                
                <div
                  style={{
                    overflow: "hidden",
                    height: "50%",
                    width: "100%",
                    backgroundColor: "black",
                  }}
                >
                  <img
                    src={blog.profileImageUrl}
                    className="card-img-top"
                    alt="..."
                    style={{ objectFit: "contain", height: "100%" }}
                  />
                </div>


                <div className="card-body " style={{height : '60%'}}>
                  <h5 className="card-title">{blog.title}</h5>

                  {blog.likedBy.length > 0 && (
                    <p mt-2>Last liked by {blog.likedBy[blog.likedBy.length - 1]}</p>
                  )}
                  <Link
                    to={`/blog/edit/${blog._id}`}
                    className="btn btn-primary mt-2 mb-3"
                    
                  >
                    Edit Blog
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default YourBlogs;
