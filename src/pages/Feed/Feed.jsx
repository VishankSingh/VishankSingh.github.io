import './Feed.css'
import Menu from '../../components/menu/Menu.jsx'
import Cursor from '../../components/cursor/Cursor.jsx';
import {useEffect} from 'react';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';

function Blog() {
  useEffect(() => {
    document.title = 'Feed'
  }, []);
  useGSAP(() => {
    gsap.to(".block", {
      duration: 0.4,
      left: "100vw",
      ease: 'power3.inOut',
    })
  })

  return (
    <>
      <Menu/>
      <Cursor/>

    </>
  )
}

export default Blog