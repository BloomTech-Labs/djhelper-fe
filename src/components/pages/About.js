import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import NavigationBar from '../navigation/NavigationBar';
import Chawn from '../../images/Chawn.jpg';
import Shaya from '../../images/Shaya.jpg';
import Josh from '../../images/Josh.jpg';
import Wangdi from '../../images/Wangdi.png';
import Mohammad from '../../images/Mohd.jpg';
import Evgenii from '../../images/Ed.jpg';
import Maxwell from '../../images/Maxwell.jpg';
import Brian from '../../images/Brian.jpg';
import Dennis from '../../images/Dennis.png';
import Craig from '../../images/Craig.jpg';
import Michael from '../../images/Michael.jpg';

const About = () => {
  return (
    <div className="about-page">
      <NavigationBar />
      <div className="hero"></div>
      <section className="aboutTop">
        <h1>About Us</h1>
        <div className="aboutBox">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages.
          </p>
        </div>
      </section>
      <h1 className="title">Web Development Team</h1>
      <section className="djTeam">
        <div className="webteam">
          <img src={Shaya}></img>
          <h3>Shaya</h3>
          <p>Lorem Ipsum</p>
          <p>Lorem Ipsum</p>
        </div>
        <div className="webteam">
          <img src={Chawn}></img>
          <h3>Chawn</h3>
          <p>Lorem Ipsum</p>
          <p>Lorem Ipsum</p>
        </div>{' '}
        <div className="webteam">
          <img src={Mohammad}></img>
          <h3>Mohammad</h3>
          <p>Lorem Ipsum</p>
          <p>Lorem Ipsum</p>
        </div>{' '}
        <div className="webteam">
          <img src={Josh}></img>
          <h3>Josh</h3>
          <p>Lorem Ipsum</p>
          <p>Lorem Ipsum</p>
        </div>
        <div className="webteam">
          <img src={Wangdi}></img>
          <h3>Wangdi</h3>
          <p>Lorem Ipsum</p>
          <p>Lorem Ipsum</p>
        </div>
      </section>
      <h1 className="title">Data Science Team</h1>
      <section className="djTeam">
        <div className="team">
          <img src={Evgenii}></img>
          <h3>Evgenii</h3>
          <p>Lorem Ipsum</p>
          <p>Lorem Ipsum</p>
        </div>
      </section>
      <h1 className="title">UX Team</h1>
      <section className="djTeam">
        <div className="team">
          <img src={Brian}></img>
          <h3>Brian</h3>
          <p>Lorem Ipsum</p>
          <p>Lorem Ipsum</p>
        </div>
        <div className="team">
          <img src={Dennis}></img>
          <h3>Dennis</h3>
          <p>Lorem Ipsum</p>
          <p>Lorem Ipsum</p>
        </div>
      </section>
      <h1 className="title">IOS Team</h1>
      <section className="djTeam">
        <div className="team">
          <img src={Craig}></img>
          <h3>Craig</h3>
          <p>Lorem Ipsum</p>
          <p>Lorem Ipsum</p>
        </div>
        <div className="team">
          <img src={Michael}></img>
          <h3>Michael</h3>
          <p>Lorem Ipsum</p>
          <p>Lorem Ipsum</p>
        </div>
      </section>
    </div>
  );
};

export default About;
