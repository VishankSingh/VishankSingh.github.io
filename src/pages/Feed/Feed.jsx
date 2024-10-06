import './Feed.css'
import Menu from '../../components/menu/Menu.jsx'
import Cursor from '../../components/cursor/Cursor.jsx';
import {useEffect} from 'react';

function Blog() {
  useEffect(() => {
    document.title = 'Feed'
  }, []);

  return (
    <>
      <Menu/>
      <Cursor/>

    </>
  )
}

export default Blog