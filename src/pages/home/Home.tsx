import React from 'react';
import './Home.css';
import AsciiImage from '../../components/AsciiImage';
import starryNight from '../../assets/img/TheStarryNight.jpg';

export const Home: React.FC = () => {
  return (
    <div className="container">
      <div className="home-page">
        <AsciiImage url={starryNight} />
        {/* <AsciiImage url={starryNight} scale={0.65} color={true} /> */}

        <div className="home-page-main-text">

          Hello, I am Vishank. My work primarily focuses on the intersection
          of hardware and software, specifically ML Systems, RISC-V architecture,
          Compilers, and GPU programming. I'll be posting about them here, and some of my
          projects as well.
          I hope you find something useful here, or at least
          something interesting.
          If you want to get in touch, you can contact me
          via <a href='mailto:vishanksinghh@gmail.com'>Mail</a> or&nbsp;
          <a
            href="https://discordapp.com/users/738448733615685652"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord
          </a>
          {/* or&nbsp;
            <a
              href="https://github.com/VishankSingh"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a> */}&nbsp;(Mail preferrably).<br />
          Currently, I am still a student pursuing a Bachelor's degree at the
          Indian Institute of Technology, Hyderabad.
          {/* Academically, my interests
          lie in distribution agnostic machine learning, function approximation,
          boolean analysis. */}
          {/* &nbsp; */}
          {/* <span 
              style={{ 
                textDecoration: "underline 1px solid #d12f2f",
                // textUnderlineOffset: "3px" 
              }} 
              data-cursor-text="This is quite nice field of research!"
            >
              Distribution agnostic Machine Learning
            </span> */}


          <br />
          P.S.-
          To justify my unemployability, I am
          also interested in
          philosophy.

          {/* <span
            style={{ fontStyle: 'italic', fontFamily: 'var(--font-display)' }}
          >
            philosophy.
          </span> */}
        </div>

      </div>
    </div>
  );
};

export default Home;
