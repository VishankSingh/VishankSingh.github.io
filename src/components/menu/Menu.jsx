import './Menu.css';
import gsap from 'gsap';
import {useGSAP} from '@gsap/react';
import {Link} from 'react-router-dom';

function Menu() {
  return (
    <>
      <nav className='twocont'>
        <Link to='/' href='/' className='for-cursor-dialog' data='HOME'>
          <span className='menu-links'>HOME</span>
        </Link>
        &nbsp;/&nbsp;
        <Link to='/feed' href='/feed' className='for-cursor-dialog' data='FEED?'>
          <span className='menu-links'>FEED</span>
        </Link>&nbsp;/&nbsp;
        <Link to='/blog' href='/blog' className='for-cursor-dialog' data='RANDOM SHIT'>
          <span className='menu-links'>BLOG</span>
        </Link>&nbsp;/&nbsp;
        <Link to='/projects' href='/projects' className='for-cursor-dialog' data='PROJECTS #_#'>
          <span className='menu-links'>PROJECTS?</span>
        </Link>
      </nav>
    </>
  );
}

export default Menu;