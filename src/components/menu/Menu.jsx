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
              HOME
            </div>
          </Link>
        </div>
        <div className='link-cont'>
          <Link to='/blog' href='/blog' className='' data='RANDOM SHIT'>
            <div className='link-overlay'></div>
            <div className='link-div'>
              BLOG
            </div>
          </Link>
        </div>
        <div className='link-cont'>
          <Link to='/projects' href='/projects' className='' data='PROJECTS #_#'>
            <div className='link-overlay'></div>
            <div className='link-div'>
              PROJECTS
            </div>
          </Link>
        </div>
        <div className='link-cont'>
          <Link to='/' href='/random' className='' data='PROJECTS #_#'>
            <div className='link-overlay'></div>
            <div className='link-div'>
              RANDOM
            </div>
          </Link>
        </div>


      </nav>
    </>
  );
}

export default Menu;