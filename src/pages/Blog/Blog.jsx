import './Blog.css';
import Menu from '../../components/menu/Menu.jsx';
import Cursor from '../../components/cursor/Cursor.jsx';
import {blogData} from '../../data/blog.js';
import {useEffect} from 'react';

function Blog() {
  useEffect(() => {
    document.title = 'Blog';
  }, []);

  return (
    <>
      <Menu/>
      <Cursor/>
      <div className='cont'>
        {
          blogData.map((blog, index) => (
            <div className='post-cont' key={index}>
              <div className='title'>{blog.title}</div>
              <div className='desc'>{blog.content}</div>
              <div className='date'>{blog.date}</div>
            </div>
          ))
        }

      </div>
    </>
  );
}

export default Blog;