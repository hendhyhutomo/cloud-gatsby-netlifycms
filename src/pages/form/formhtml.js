import React from 'react';
import Layout from 'components/layout';

export default () => {
  return (
    <Layout headerText='Form' layoutStyle={{ background: '#fff' }}>
      {/* STANDARD FORM */}
      <form
        name='HTML Form'
        method='post'
        data-netlify-honeypot='bot-field'
        // data-netlify-recaptcha='true'
        action='./form/thankyou/'
        data-netlify='true'
      >
        <input type='hidden' name='bot-field' />
        <label htmlFor="Netlify HTML">Netlify Form</label>
        <br />
        <input type='text' name='name' />
        <input type='email' name='_replyto' />
        <input type='file' name='attachment' />
        {/* <div data-netlify-recaptcha='true'></div> */}
        <button type='submit'>Send</button>
      </form>
      <br />
    </Layout>
  );
};
