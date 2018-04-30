import React from 'react';

function About(props) {
  return (
    <section className="about">
      <h2>About</h2>
      <div  className="about-content" >
      <p>The purpose of the site is to share the best or worst advice you've ever gotten. Don't share anything illegal or harmful to others. Inappropriate posts will be deleted without notice.</p>

      <p>This site was developed as a practice in using React with Redux and Thunk to make asynchronous HTTP requests to a MongoDB database that I built and connect to with Mongoose.</p>


      <p>Photo of <a href="https://unsplash.com/photos/ktZZiHb-GoI">San Deigo</a> by <a href="https://unsplash.com/@montylov">MontyLov</a> on <a href="https://unsplash.com/">Unsplash</a>.</p>

      {/* <p>Photo of <a href="https://unsplash.com/photos/qr7SFqhrW0c">Venice</a> by <a href="https://unsplash.com/@adspedia">Val Vesa</a> on <a href="https://unsplash.com/">Unsplash</a>.</p>

      <p>Photo of <a href="https://unsplash.com/photos/2VDa8bnLM8c">Lake Carezza</a> by <a href="https://unsplash.com/@riccardoch">Riccardo Chiarini</a> on <a href="https://unsplash.com/">Unsplash</a>.</p> */}

      </div>
    </section>
  );
}

export default About;
