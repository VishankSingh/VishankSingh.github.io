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
          Compilers, and GPU programming. This space serves as a log of my projects,
          writings, and technical explorations.
          {/* If you want to get in touch, you can contact me
          via <a href='mailto:vishanksinghh@gmail.com'>Mail</a> or&nbsp;
          <a
            href="https://discordapp.com/users/738448733615685652"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord
          </a> */}
          {/* or&nbsp;
            <a
              href="https://github.com/VishankSingh"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            // </a> */}
          {/* &nbsp;(Mail preferrably). */}
          <br />


          I'm currently completing my degree at IIT Hyderabad and am actively seeking
          full-time roles starting in June 2027 within ML systems, AI compilers, and
          hardware acceleration. Feel free to check out my&nbsp;
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            resume
            <div className="cursor-tooltip">
              <div className="tooltip-resume">
                <div className="tooltip-title">Resume.pdf</div>
                <div className="tooltip-desc">Yet to be updated!</div>
              </div>
            </div>
          </a>
          , and if you'd like to
          chat, the best way to reach me
          is via &nbsp;
          <a
            href='mailto:vishanksinghh@gmail.com'
          >
            Mail
            <div className="cursor-tooltip">
              <div className="tooltip-contact">
                <span className="tooltip-icon">✉</span> vishanksinghh@gmail.com
              </div>
            </div>
          </a>
          &nbsp;
          (
          <a
            href="https://discordapp.com/users/738448733615685652"
            target="_blank"
            rel="noopener noreferrer"
          // data-cursor-tooltip="Join Discord Server"
          >
            Discord
            <div className="cursor-tooltip">
              <div className="tooltip-contact">
                <span className="tooltip-icon">☿</span> .vis.xyz
              </div>
            </div>
          </a>
          &nbsp;
          is open too).
          <br />
          P.S.-
          When I'm not working, I'm usually reading philosophy (^=^).

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
