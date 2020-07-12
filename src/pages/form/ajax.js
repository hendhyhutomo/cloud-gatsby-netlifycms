import React, { useState } from 'react';
import { navigate } from 'gatsby';
import Layout from 'components/layout';
// import Recaptcha from 'react-google-recaptcha';

// GET RECAPTCHA VALUE & SETTINGS
const RECAPTCHA_KEY = process.env.RECAPTCHA_SITE_KEY;
if (typeof RECAPTCHA_KEY === 'undefined') {
  throw new Error(`
  Env var RECAPTCHA_SITE_KEY is undefined! 
  You probably forget to set it in your Netlify build environment variables. 
  Make sure to get a Recaptcha key at https://www.netlify.com/docs/form-handling/#custom-recaptcha-2-with-your-own-settings
  Note this demo is specifically for Recaptcha v2
  `);
}

const encode = (data) => {
  const formData = new FormData();

  for (const key of Object.keys(data)) {
    formData.append(key, data[key]);
  }

  return formData;
};

/* function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
} */

export default (props) => {
  const [state, setState] = useState({});
  // const recaptchaRef = React.createRef();

  const handleChange = (e) => {
    // Change state Attribrute and Value
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    // const recaptchaValue = recaptchaRef.current.getValue();
    // GRAB FORM
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        // 'g-recaptcha-response': recaptchaValue,
        ...state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error));
  };

  // Handle FIile Upload
  const handleAttachment = (e) => {
    setState({ ...state, [e.target.name]: e.target.files[0] });
  };

  return (
    <Layout headerText='Form' layoutStyle={{ background: '#fff' }}>
      {/* SENDING FORM WITH NETLIFY */}
      {/* AJAX & RECAPTCHA SUMISSION */}
      <form
        name='AJAX Form'
        method='post'
        action='./form/thankyou/'
        data-netlify='true'
        // data-netlify-recaptcha='true'
        data-netlify-honeypot='bot-field'
        onSubmit={handleSubmit}
      >
        <input type='hidden' name='form-name' value='netlifyform' />
        <input type='hidden' name='bot-field' onChange={handleChange} />
        <p>
          <label htmlFor="Netlify AJAX">Netlify Form with Recaptcha & Ajax</label>
          <br />
          <input type='text' name='name' onChange={handleChange} />
          <input type='email' name='email' onChange={handleChange} />
        </p>
        {/* <Recaptcha ref={recaptchaRef} sitekey={RECAPTCHA_KEY} /> */}
        <input type='file' name='attachment' onChange={handleAttachment} />
        <p>
          <button type='submit'>Send</button>
        </p>
      </form>
    </Layout>
  );
};
