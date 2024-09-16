import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home.jsx';
import Blog from './pages/Blog/Blog.jsx';
import Feed from './pages/Feed/Feed.jsx';
import Projects from './pages/Projects/Projects.jsx';
import {useEffect} from 'react';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/blog" element={<Blog />}></Route>
          <Route path="/feed" element={<Feed />}></Route>
          <Route path="/projects" element={<Projects />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
