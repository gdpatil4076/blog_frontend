import './App.css';
import Home from './components/home';
import Navbar from './components/navbar';
import Signup from './components/signup';
import Signin from './components/signin';
import UserContext from './context/userProvider'; // context 
import BlogContext from './context/blogProvider';
import BlogForm from './components/AddBlog';
import BlogInfoComponent from './components/BlogView';
import YourBlogs from './components/YourBlogs';
import EditBlogForm from './components/EditBlog';
import NotificationList from './components/Notification';
import ChatComponent from './components/ChatComponent';
import YourLikes from './components/YourLikes';
import { useState , useEffect , useContext} from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';

import axios from "axios"
import Videocall from './components/Videocalll';
import Room from './components/Room';
import SearchResults from './components/SearchResults';
import {url} from './components/const'

function App() {

  const [Blog , SetBlog] = useState(null); 


  return (

    <Router>
      <Navbar /> 
      <Routes>
        {/* User Routes */}
        {/* <Route path="/user" exact component={User} />
        <Route path="/user/profile" component={UserProfile} /> */}

        <Route path="/" element={< Home />}/> 
        <Route path="/user/signup" element={<Signup/>}/>
        <Route path="/livechat" element={<ChatComponent/>}/>
        <Route path="/user/signin" element={<Signin/>} /> 
        <Route path="/user/notify" element={<NotificationList/>} /> 
        <Route path='/blog/addblog' element={<BlogForm/>} />
        <Route path='/blog/fullview' element={ <BlogInfoComponent blogComment={Blog} SetBlog={SetBlog}/>} />
        <Route path='/blog/edit/:id' element={<EditBlogForm/>} />
        <Route path='/blog/yourblog' element={<YourBlogs/>} />
        <Route path='/blog/yourlikes' element={<YourLikes/>} />
        <Route path='/videocall' element={<Videocall/>} />
        <Route path='/room/:roomId' element={<Room/>} />
        <Route path='/search' element={<SearchResults/>} />

        {/* Blog Routes */}
        {/* <Route path="/blog" exact component={Blog} />
        <Route path="/blog/list" component={BlogList} />
        <Route path="/blog/addnew" component={BlogAddNew} />
        <Route path="/blog/edit" component={BlogEdit} /> */}

        {/* Static Content Route */}
        {/* <Route path="/static" component={StaticContent} /> */}
      
      </Routes>
    </Router>
  );   
}


export default App;
