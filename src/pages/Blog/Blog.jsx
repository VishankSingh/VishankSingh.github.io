import './Blog.css';
import Menu from '../../components/menu/Menu.jsx';
import Cursor from '../../components/cursor/Cursor.jsx';
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
        <div className='post-cont'>
          <div className='title'>Something I heard today</div>
          <div className='desc'>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            "Procrastination is caused by the fear of success. You know if you did it you'd win and you'd be better. So I didn't do it, so i could be my conformable self. Next thing I know the opportunity passed. It felt so good, just to be me again."
          </div>
          <div className='date'>September 21, 2024</div>
        </div>
        <div className='post-cont'>
          <div className='title'>Realization ^_^</div>
          <div className='desc'>
            Realization, its an extremely strong feeling. It can make you happy, sad, or regretful, but it helps you.
            I've realized some things today. I am not doing my best in pursuing what I want. I want to do a lot, but I
            just can’t seem to.
            <br/><br/>
            I exercised today after a period of around 7-8 months. I picked up a pen and wrote my thoughts. It felt good
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            to write again after such a long time. I "saw" what I
            want to do and I did that. I wrote down my goals: short-term, medium-term, and laughably
            long-term. I didn’t complete all my goals for today, but I will complete them by night for sure.
            <br/><br/>
            But all this time, a question still lingers in my mind: Who am I? I guess I’ll keep searching for that
            question, or is it even necessary to search for an answer? I don’t know.
          </div>
          <div className='date'>September 09, 2024</div>
        </div>
      </div>
    </>
  );
}

export default Blog;