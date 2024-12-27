import './Projects.css'
import Menu from '../../components/menu/Menu.jsx'
import Cursor from '../../components/cursor/Cursor.jsx';
import {useEffect} from 'react';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';

function Blog() {
  useEffect(() => {
    document.title = 'Projects'
  }, []);

  return (
    <>
      <Menu/>

    </>
  )
}

export default Blog