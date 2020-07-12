import React from 'react';
import Layout from 'components/layout';

export default (props) => {
  return (
    <Layout headerText='Form' layoutStyle={{ background: '#fff' }}>
      {/* SENDING FORM WITH FORMSPREE */}
      <form
        name='Formspree'
        method='post'
        action='https://formspree.io/hello@hendhyhutomo.com'
      >
        <label htmlFor="Formspree">Formspree</label>
        <br />
        <input type='text' name='name' />
        <input type='email' name='_replyto' />
        <button type='submit'>Send</button>
      </form>
    </Layout>
  );
};
