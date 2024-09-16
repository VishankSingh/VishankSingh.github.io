import './Home.css'
import Menu from '../../components/menu/Menu.jsx'
import Cursor from '../../components/cursor/Cursor.jsx';
import {useEffect, useState} from 'react';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import {Link} from 'react-router-dom';

function Home() {
  useEffect(() => {
    document.title = 'Home'
  }, []);

  useGSAP(() => {
      gsap.to(".block", {
        duration: 0.4,
        left: "100vw",
        ease: 'power3.inOut',
      })

  })

  return (
    <div className="Home">
      <Menu/>
      <Cursor/>
      <div className='note'>
        [NOTE] This website is incomplete (obviously +_+). Not much right now, but I
        will keep adding stuff. I was planning this website since a year, but was
        delayed due to some reasons(
        <span style={{textDecoration: 'line-through'}}>procrastination</span>).
        You might see some personal projects, random quotes, posters or links to
        websites (or other s**t as well) which piqued my interest. I might blog (or
        not, idk). Writing is not really my thing (you can guess).
        &nbsp;<span>(╯°□°)╯︵ ┻━┻</span> &nbsp;<br/>
      </div>

      <div className='vis'>SUP</div>
      <div className='socials'>
        <a href='https://github.com/VishankSingh' target='_blank'>
          <span></span>
        </a>
      </div>
    </div>

  )
}

export default Home