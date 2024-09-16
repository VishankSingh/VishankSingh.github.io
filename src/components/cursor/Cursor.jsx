import './Cursor.css'
import {useEffect} from 'react';
import gsap from 'gsap';
import {useGSAP} from '@gsap/react';

function Cursor() {
  useEffect(() => {
    function handleStart(e) {
      const cursor_text_cont = document.getElementById('cursor-text-cont');
        const x = e.clientX - cursor_text_cont.offsetWidth / 2;
        const y = e.clientY + cursor_text_cont.offsetHeight;
        cursor_text_cont.style.left = x + 'px';
        cursor_text_cont.style.top = y + 'px';
      const cursor = document.getElementById('cursor');
        const cursor_x = e.clientX - cursor.offsetHeight / 2;
        const cursor_y = e.clientY - cursor.offsetWidth / 2;
        cursor.style.left = cursor_x + 'px';
        cursor.style.top = cursor_y + 'px';
    }
    document.addEventListener('DOMContentLoaded', handleStart);
    return () => {
      document.removeEventListener('DOMContentLoaded', handleStart);
    }
  }, []);


  useEffect(() => {
    const cursor_text_cont = document.getElementById('cursor-text-cont');
    function handleCursor(e) {
      const x = e.clientX - cursor_text_cont.offsetWidth / 2;
      const y = e.clientY + cursor_text_cont.offsetHeight ;
      const keyframes = {
        transform: `translate3d(${x}px, ${y}px, 0)`,
      }
      cursor_text_cont.animate(keyframes, {
        duration: 1000,
        fill: "forwards",
      });
    }
    document.addEventListener('mousemove', handleCursor);
    return () => {
      document.removeEventListener('mousemove', handleCursor);
    }
  })

  useEffect(() => {
    const cursor = document.getElementById('cursor');
    function handleCursor(e) {
      const cursor_x = e.clientX - cursor.offsetHeight / 2;
      const cursor_y = e.clientY - cursor.offsetWidth / 2;
      cursor.style.left = cursor_x + 'px';
      cursor.style.top = cursor_y + 'px';
    }
    document.addEventListener('mousemove', handleCursor);
    return () => {
      document.removeEventListener('mousemove', handleCursor);
    }
  }, []);


  useGSAP(() => {
    const cursor_text_cont = document.getElementById('cursor-text-cont');
    const hoverElem = document.querySelectorAll('.for-cursor-dialog');

    function onEnter(Event) {
      const hoveredText = Event.target.getAttribute("data"); // Get text of the hovered element
      cursor_text_cont.innerHTML = `<div class="cursor-text">${hoveredText}</div>`;
      gsap.to(cursor_text_cont, {
        opacity: 1, ease: 'expo.inOut', duration: 0.4
      });
    }

    function onLeave() {
      gsap.to(cursor_text_cont, {
        opacity: 0, ease: 'expo.inOut', duration: 0.4
      });
    }

    hoverElem.forEach(elem => {
      elem.addEventListener("mouseenter", () => onEnter(event));
      elem.addEventListener("mouseleave", onLeave);

      return () => {
        elem.removeEventListener("mouseenter", onEnter);
        elem.removeEventListener("mouseleave", onLeave);
      };
    });
  });


  return (
    <>
      <div id='cursor'></div>
      <div id='cursor-text-cont'>
        <div className='cursor-text'>
          CLICK
        </div>
      </div>
    </>
  )
}

export default Cursor