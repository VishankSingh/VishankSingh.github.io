import {BrowserRouter, HashRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home.jsx';
import Blog from './pages/Blog/Blog.jsx';
import Feed from './pages/Feed/Feed.jsx';
import Projects from './pages/Projects/Projects.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog  />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
