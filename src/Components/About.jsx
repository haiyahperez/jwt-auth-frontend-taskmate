import React from 'react';
import Header from './Header';

export default function About() {
  return (
    <div>
      {/* <Header /> */}
      <div className={`about-container`}>
        <h1 className="about-heading">About the Developer</h1>
        <div className="developer-card">
          <a className="developer-link" href="https://github.com/haiyahperez">
            <img className="developer-image" src="https://res.cloudinary.com/dhexjuuzd/image/upload/v1711574507/Data%20seed%20class/github-mark_edqyun.png" alt="Haiyah Perez GitHub" />
          </a>
          <h2 className="developer-name">Haiyah Perez</h2>
          <p> Queens. Tiny mighty <br/> gym rat.</p>
        </div>
      </div>
    </div>
  );
}
