import './Menu.css';
import {Link} from 'react-router-dom';

function Menu() {
  return (
    <>
      <nav className='twocont'>
        <div className='link-cont'>
          <Link to='/' href='/' className='' data='HOME'>
            <div className='link-overlay'></div>
            <div className='link-div'>
              Home
            </div>
          </Link>
        </div>
        <div className='link-cont'>
          <Link to='/blog' href='/blog' className='' data='RANDOM SHIT'>
            <div className='link-overlay'></div>
            <div className='link-div'>
              Blog
            </div>
          </Link>
        </div>
        <div className='link-cont'>
          <Link to='/projects' href='/projects' className='' data='PROJECTS #_#'>
            <div className='link-overlay'></div>
            <div className='link-div'>
              Projects
            </div>
          </Link>
        </div>
        <div className='link-cont'>
          <Link to='/' href='/random' className='' data='PROJECTS #_#'>
            <div className='link-overlay'></div>
            <div className='link-div'>
              Random
            </div>
          </Link>
        </div>


      </nav>
    </>
  );
}

export default Menu;