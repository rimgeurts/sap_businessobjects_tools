import React from "react";
import LoginForm from "./components/LoginForm/LoginForm";
import SearchForm from "./components/SearchForm/SearchForm";
import styles from "./App.module.scss";
import { login, getData } from "./api/BusinessObjectsAPI";

class App extends React.Component {
  state = {
    server: {
      username: "Username",
      password: "Password",
      server: "Server"
    },
    logonToken: null,
    reportId: null,
    reportName: ""
  };

  handleSubmit = event => {
    event.preventDefault();

    console.log("test");

    login().then(response =>
      this.setState({ logonToken: '"' + response.logonToken + '"' })
    );
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ server: { [name]: value } });
  };

  handleClick = event => {
    const { name } = event.target;
    this.setState({ [name]: "" });
  };

  handleReportInfoChange = event => {
    this.setState({ reportId: event.target.value });
  };

  handleReportInfoSubmit = event => {
    event.preventDefault();
    getData(this.state.logonToken, this.state.reportId).then(response => {
      this.setState({ reportName: response.name });
    });
  };

  render() {
    return (
      <div className={styles.App}>
        <div className={styles.box1}>
          <h1>Business Objects Scheduling Tool</h1>
        </div>

        <div className={styles.box2}>
          <SearchForm
            handleReportInfoChange={event => {
              this.handleReportInfoChange(event);
            }}
            handleReportInfoSubmit={event => {
              this.handleReportInfoSubmit(event);
            }}
            reportName={this.state.reportName}
          />
        </div>

        <div className={styles.box3}>
          <LoginForm
            handleSubmit={event => {
              this.handleSubmit(event);
            }}
            onclick={event => {
              this.onclick(event);
            }}
            server={this.state.server}
            handleChange={event => {
              this.handleChange(event);
            }}
          />
        </div>

        <div className={styles.box4}>
          <h1></h1>
        </div>

        <div className={styles.box5}>
          <h1></h1>
        </div>
      </div>
    );
  }
}

export default App;
