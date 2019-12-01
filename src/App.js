import React from 'react';
import LoginForm from './components/LoginForm/LoginForm'
import styles from './App.module.scss';



class App extends React.Component {

  state = {
    server: {
      username: 'Username',
      password: 'Password',
      server: 'Server'
    },
    logonToken: null,
    reportId: null,
    reportName: ''

  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("test");
    fetch('http://localhost:6405/biprws/logon/long/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: 'Burung79!',
        clientType: '',
        auth: 'secEnterprise',
        userName: 'administrator'
      })
    }).then((response) => {

      return response.json();
    }).then((response) => {
      console.log(response.logonToken)
      this.setState({ logonToken: '"' + response.logonToken + '"' })
    })
  }

  handleChange = (event) => {
    const { name, value } = event.target
      this.setState({
        server: {
          [name]: value
        }
      })
  }

  handleClick = (event) => {
    const { name } = event.target;
    this.setState({
      [name]: ''
    })
  }

  welcomeMessage() {
    let message = 'Please login to start...'
    if (this.state.logonToken) {
      message = 'Please select a report ID'
    }

    return (
      <div>
        <h1>{message}</h1>
      </div>
    )
  }

  handleReportInfoChange = (event) => {
    this.setState({
      reportId: event.target.value
    })
  }

  handleReportInfoSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.reportId);

    const url = 'http://localhost:6405/biprws/v1/documents/' + this.state.reportId

    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-SAP-LogonToken': this.state.logonToken
      }
    }).then((response) => {

      return response.json();
    }).then((response) => {
      this.setState({
        reportName: response.name
      })

    })

  }

  render() {
    return (
      <div className={styles.App}>

        <div className={styles.box1}>
          <h1>Business Objects Scheduling Tool</h1>
        </div>

        <div className={styles.box2}>
          {this.welcomeMessage()}

          <form className={styles.loginform} onSubmit={this.handleReportInfoSubmit}>
            <label className={styles.label} onChange={this.handleReportInfoChange}> Enter Report ID:
              <input className={styles.login} type="text"></input>
            </label>
            <label className={styles.label}> Report Name:
              <input readOnly className={styles.login} type="text" value={this.state.reportName}></input>
            </label>
            <input type="submit" className={styles.loginbutton} value="Search..."></input>
          </form>

        </div>

        <div className={styles.box3}>
          <LoginForm
            handleSubmit = {(event) => { this.handleSubmit(event) }}
            onclick = {(event) => { this.onclick(event) }}
            server = { this.state.server }
            handleChange = {(event) => { this.handleChange(event) }}
          />
        </div>

        <div className={styles.box4}>
          <h1></h1>
        </div>

        <div className={styles.box5}>
          <h1></h1>
        </div>
      </div>
    )
  }
}

export default App;
