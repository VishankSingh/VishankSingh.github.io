import './Blog.css';
import Menu from '../../components/menu/Menu.jsx';
import Cursor from '../../components/cursor/Cursor.jsx';
import {blogData} from '../../data/blog.js';
import {useEffect} from 'react';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';

function Blog() {
  useEffect(() => {
    document.title = 'Blog';
  }, []);
  useGSAP(() => {
    gsap.to('.block', {
      duration: 0.4,
      left: '100vw',
      ease: 'power3.inOut'
    });
  });

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