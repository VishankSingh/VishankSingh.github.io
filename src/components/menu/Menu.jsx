import './Menu.css';
import {Link} from 'react-router-dom';

function Menu() {
  return (
    <>
      <nav className='twocont'>
        <Link to='/' href='/' className='for-cursor-dialog' data='HOME'>
          <span className='menu-links'>HOME</span>
        </Link>
        &nbsp;/&nbsp;
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