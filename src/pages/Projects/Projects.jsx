import './Projects.css'
import Menu from '../../components/menu/Menu.jsx'
import Cursor from '../../components/cursor/Cursor.jsx';
import {useEffect} from 'react';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import pic from './pixil-frame-0(4).png';

function Blog() {
  useEffect(() => {
    document.title = 'Projects'
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
      <img src={pic} alt="projects" width="1%"/>

    </>
  )
}

export default Blog