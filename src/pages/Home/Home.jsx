import './Home.css';
import Menu from '../../components/menu/Menu.jsx';
import Cursor from '../../components/cursor/Cursor.jsx';
import {useEffect} from 'react';

function Home() {
  useEffect(() => {
    document.title = 'Home';
  }, []);


  return (
    <>
      <Menu/>
      <div className='Home'>
        <div className='home-note'>
          [NOTE] This website is incomplete (obviously +_+). Not much right now, but I
          will keep adding stuff. I was planning this website since a year, but was
          delayed due to some reasons(
          <span style={{textDecoration: 'line-through'}}>procrastination</span>).
          You might see some personal projects, random quotes, posters or links to
          websites (or other s**t as well) which piqued my interest. <span style={{textDecoration: 'line-through'}}>I might blog (or
          not, idk).</span> I blog. Writing is not really my thing (you can guess).<br/>
          There&apos;s some weed at the bottom <span style={{textDecoration: 'line-through'}}>left
          and some random text at bottom right (suggestions for the same are welcome)</span>.
        </div>


      </div>

    </>
  );
}

export default Home;