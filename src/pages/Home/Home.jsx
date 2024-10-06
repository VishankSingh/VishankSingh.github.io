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
      <Cursor/>
      <div className='Home'>
        <div className='noteo'>
          [NOTE] This website is incomplete (obviously +_+). Not much right now, but I
          will keep adding stuff. I was planning this website since a year, but was
          delayed due to some reasons(
          <span style={{textDecoration: 'line-through'}}>procrastination</span>).
          You might see some personal projects, random quotes, posters or links to
          websites (or other s**t as well) which piqued my interest. <span style={{textDecoration: 'line-through'}}>I might blog (or
          not, idk).</span> I blog. Writing is not really my thing (you can guess).
        </div>

        <div className='bottom-bar'>
          <div className='note'>
            <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: '1.0em' }}>
{`
                       .
                       M
                      dM
                      MMr
                     4MMML                  .
                     MMMMM.                xf
     .              "MMMMM               .MM-
      Mh..          +MMMMMM            .MMMM
      .MMM.         .MMMMML.          MMMMMh
       )MMMh.        MMMMMM         MMMMMMM
        3MMMMx.     'MMMMMMf      xnMMMMMM"
        '*MMMMM      MMMMMM.     nMMMMMMP"
          *MMMMMx    "MMMMM\\    .MMMMMMM=
           *MMMMMh   "MMMMM"   JMMMMMMP
             MMMMMM   3MMMM.  dMMMMMM            .
              MMMMMM  "MMMM  .MMMMM(        .nnMP"
  =..          *MMMMx  MMM"  dMMMM"    .nnMMMMM*
    "MMn...     'MMMMr 'MM   MMM"   .nMMMMMMM*"
     "4MMMMnn..   *MMM  MM  MMP"  .dMMMMMMM""
       ^MMMMMMMMx.  *ML "M .M*  .MMMMMM**"
          *PMMMMMMhn. *x > M  .MMMM**""
             ""**MMMMhx/.h/ .=*"
                      .3P"%....
                    nP"     "*MMnx
                    
                    
                    
                    
                    
                    
`}
    </pre>
          </div>
          <div className='name'>
            <div>
             fdfsdfa
            </div>
          </div>
        </div>

      </div>

    </>
  );
}

export default Home;