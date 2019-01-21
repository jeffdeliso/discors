import React from 'react';
import { Link } from 'react-router-dom';

class Splash extends React.Component {

  render() {

    return (
      <div className="splash-body">
        <header className="splash-header">
          <nav className="splash-nav">
            <img src="/assets/splash/discors.svg" className="discorLogo" alt=""></img>

            <ul className="rightNav">
              <li>
                <a href="https://github.com/jeffdeliso">
                  <i className="fab fa-github"></i>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/jdeliso/">
                  <i className="fab fa-linkedin"></i>
                </a>
              </li>
              <li>
                <Link to="/login" className="openButton">Open</Link>
              </li>
            </ul>
          </nav>
        </header>

        <section className="splash-main">
          <div className="content ">
            <h1>It's time to ditch Skype and TeamSpeak.</h1>
            <p>
              All-in-one voice and text chat for gamers that's free, secure, and works on both your desktop and phone. Stop
              paying
              for TeamSpeak servers and hassling with Skype. Simplify your life.
      </p>
            <div className="buttons">
              <a href="" className="downloadMac">Download for macOS</a>
              <Link to="/login" className="open-discors-top">Open Discors</Link>
            </div>
          </div>

          <div className="images">
            <img src="/assets/splash/dot.svg" alt="" className="pic dot1"></img>
            <img src="/assets/splash/dot.svg" alt="" className="pic dot2"></img>
            <img src="/assets/splash/dot.svg" alt="" className="pic dot3"></img>
            <img src="/assets/splash/dot.svg" alt="" className="pic dot4"></img>
            <img src="/assets/splash/x.svg" alt="" className="pic x1"></img>
            <img src="/assets/splash/x.svg" alt="" className="pic x2"></img>
            <img src="/assets/splash/circle.svg" alt="" className="pic circle1"></img>
            <img src="/assets/splash/circle.svg" alt="" className="pic circle2"></img>
            <img src="/assets/splash/triangle.svg" alt="" className="pic triangle1"></img>
            <img src="/assets/splash/triangle.svg" alt="" className="pic triangle2"></img>
            <img src="/assets/splash/square.svg" alt="" className="pic square2"></img>
            <img src="/assets/splash/square.svg" alt="" className="pic square1"></img>
            <img src="/assets/splash/floppy.svg" alt="" className="pic floppy"></img>
            <img src="/assets/splash/bomb.svg" alt="" className="pic bomb"></img>
            <img src="/assets/splash/question.svg" alt="" className="pic question"></img>
            <img src="/assets/splash/speaker.svg" alt="" className="pic speaker"></img>
            <img src="/assets/splash/flask.svg" alt="" className="pic flask"></img>
            <img src="/assets/splash/computer.svg" alt="" className="pic computer"></img>
            <img src="/assets/splash/laptop.svg" alt="" className="pic laptop"></img>
            <img src="/assets/splash/controller.svg" alt="" className="pic controller"></img>
            <img src="/assets/splash/iphone.svg" alt="" className="pic iphone"></img>
            <img src="/assets/splash/android.svg" alt="" className="pic android"></img>
            <img src="/assets/splash/coin.svg" alt="" className="pic coin1"></img>
            <img src="/assets/splash/coin.svg" alt="" className="pic coin2"></img>
            <img src="/assets/splash/headphones.svg" alt="" className="pic headphones"></img>
          </div>
        </section>

        <footer className="splash-footer">
          <img src="/assets/splash/underline.svg" alt="" className="underline"></img>
          <div className="footer-content">
            <div>
              <h2>Ready to try Discors? It's free!</h2>
              <h3>JOIN OVER 150 MILLION PLAYERS TODAY</h3>
            </div>
            <Link to="/login" className="open-discors-bottom">Open Discors</Link>
          </div>
        </footer>
      </div>
    )
  }
}

export default Splash;