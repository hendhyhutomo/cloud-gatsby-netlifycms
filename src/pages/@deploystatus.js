import React from 'react';
import 'stylesheet/status.scss';
import NetlifyAPI from 'netlify';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
//PAGE SPECIFIC
export default class Status extends React.Component {
  deployStatus = 'Loading';
  deployStatusPassword = null;
  componentDidMount() {
    //PAGE SPECIFIC
    if (typeof window !== `undefined`) {
      document.body.classList.remove('preloading');
    }
  }
  getStatus() {
    console.log('checking status');
    const client = new NetlifyAPI(
      'f302a97fa24fc20726bb9db6d53a097c011f8507a9a18f5f5fa50d0816926aca'
    );
    async function __getLatestStatus() {
      const DeployList = await client.listSiteDeploys({
        siteId: '238b6d36-0f00-4d02-85ae-f3e80db3a93b',
      });

      // const listSites = await client.listSites();
      // console.log(listSites);

      let count = 0;
      //CHECK IF DEPLOY IS SKIPPED or NEW
      while (count < DeployList.length) {
        if (
          DeployList[count].error_message === 'Skipped' ||
          DeployList[count].state === 'new'
        ) {
          count++;
        } else {
          break;
        }
      }

      const _r = DeployList[count];
      return _r;
    }

    __getLatestStatus().then((_r) => {
      let __printmessage = '';
      switch (_r.state.toString()) {
        case 'ready':
          __printmessage = 'Success';
          document.getElementById('DeployStatus').classList.add('success');
          document.getElementById('DeployStatus').classList.remove('build');
          document.getElementById('DeployStatus').classList.remove('error');
          break;

        case 'building':
          document.getElementById('DeployStatus').classList.remove('success');
          document.getElementById('DeployStatus').classList.remove('error');
          document.getElementById('DeployStatus').classList.add('build');
          __printmessage = 'Building';
          break;

        default:
          __printmessage = 'Error';
          document.getElementById('DeployStatus').classList.add('error');
          document.getElementById('DeployStatus').classList.remove('build');
          document.getElementById('DeployStatus').classList.remove('success');
          break;
      }
      document.getElementById('DeployStatus').innerHTML = __printmessage;
    });
  }
  fetchInterval = null;
  resetSubmitTimeout = null;
  checkPass = (e) => {
    if (this.deployStatusPassword !== null) {
      e.preventDefault();
      const getSubmitBtn = document.querySelector(
        '#CheckForm > input[type=submit]'
      );
      const getPass = document.querySelector('#CheckForm > input.password')
        .value;
      const getMainContainer = document.querySelector('main#status');
      if (getPass === this.deployStatusPassword) {
        // console.log('password correct');
        this.triggerStatus();
        getSubmitBtn.value = 'Accepted';
        getSubmitBtn.classList.remove('error');
        getSubmitBtn.classList.add('success');

        if (this.resetSubmitTimeout !== null)
          clearTimeout(this.resetSubmitTimeout);

        this.resetSubmitTimeout = setTimeout(() => {
          getMainContainer.classList.add('displayStatus');

          if (this.resetSubmitTimeout !== null)
            clearTimeout(this.resetSubmitTimeout);

          this.resetSubmitTimeout = setTimeout(() => {
            getSubmitBtn.classList.remove('success');
            getSubmitBtn.classList.remove('error');
            getSubmitBtn.value = 'Check Status';
          }, 2500);
        }, 500);
      } else {
        getSubmitBtn.value = 'Incorrect';
        getSubmitBtn.classList.remove('success');
        getSubmitBtn.classList.add('error');
        if (this.resetSubmitTimeout !== null)
          clearTimeout(this.resetSubmitTimeout);
        this.resetSubmitTimeout = setTimeout(() => {
          getSubmitBtn.classList.remove('success');
          getSubmitBtn.classList.remove('error');
          getSubmitBtn.value = 'Check Status';
          if (this.resetSubmitTimeout !== null)
            clearTimeout(this.resetSubmitTimeout);
        }, 2500);
      }
    }
  };
  triggerStatus() {
    this.getStatus();
    if (this.fetchInterval !== null) clearInterval(this.fetchInterval);
    this.fetchInterval = setInterval(() => {
      this.getStatus();
    }, 15000);
  }
  render() {
    // this.triggerStatus();
    if (
      typeof this.props.data.settings.deploy_status_password ===
      'string'
    ) {
      this.deployStatusPassword = this.props.data.settings.deploy_status_password;
    }
    return (
      <main id='status'>
        <Helmet>
          <meta charSet='utf-8' />
          <title>
            Deploy Status for {this.props.data.settings.web_name}
          </title>
        </Helmet>
        <form id='CheckForm'>
          <input
            className='password'
            type='password'
            name='pass'
            placeholder='Enter Password'
          />
          <input type='submit' value='Check Status' onClick={this.checkPass} />
        </form>
        <div id='StatusDisplay'>
          <span>Deploy Status</span>
          <span id='DeployStatus'>{this.deployStatus}</span>
          <span>Status is checked every 15 seconds</span>
        </div>
      </main>
    );
  }
}

export const query = graphql`
  query {
    settings: settingsJson {
      web_name
      deploy_status_password
    }
  }
`;
