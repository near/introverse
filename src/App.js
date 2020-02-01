import React, { Component } from 'react';
import logo from './assets/logo.svg';
import nearlogo from './assets/gray_near_logo.svg';
import near from './assets/near.svg';
import Reader from './UploadCSV.js'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      speech: null,
      profileName: "there",
      addedProfile: false,
      addedConnections: false
    }
    this.signedInFlow = this.signedInFlow.bind(this);
    this.requestSignIn = this.requestSignIn.bind(this);
    this.requestSignOut = this.requestSignOut.bind(this);
    this.signedOutFlow = this.signedOutFlow.bind(this);
    this.handleConnectionsData = this.handleConnectionsData.bind(this);
    this.handleProfileData = this.handleProfileData.bind(this);

  }

  componentDidMount() {
    let loggedIn = this.props.wallet.isSignedIn();
    if (loggedIn) {
      this.signedInFlow();
    } else {
      this.signedOutFlow();
    }
  }

  async signedInFlow() {
    console.log("come in sign in flow")
    this.setState({
      login: true,
    })
    const accountId = await this.props.wallet.getAccountId()
    if (window.location.search.includes("account_id")) {
      window.location.replace(window.location.origin + window.location.pathname)
    }
    this.props.contract.welcome({ name: accountId }).then(response => this.setState({speech: response.text}))
  }

  async requestSignIn() {
    const appTitle = 'Sasha Services';
    await this.props.wallet.requestSignIn(
      window.nearConfig.contractName,
      appTitle
    )
  }

  requestSignOut() {
    this.props.wallet.signOut();
    setTimeout(this.signedOutFlow, 500);
    console.log("after sign out", this.props.wallet.isSignedIn())
  }

  signedOutFlow() {
    if (window.location.search.includes("account_id")) {
      window.location.replace(window.location.origin + window.location.pathname)
    }
    this.setState({
      login: false,
      speech: null
    })
  }

  handleConnectionsData(data) {
    console.log(data);
    // pass data to the server
    this.setState({
      connections: data,
      connectionsAdded: true
    })
  }

  handleProfileData(data) {
    let fullName = data[0]
    this.setState({
      profileName: fullName,
      profileAdded: true
    });
  }

  render() {
    let style = {
      fontSize: "1.5rem",
      color: "#0072CE",
      textShadow: "1px 1px #D1CCBD"
    }
    return (
      <div className="App-header">
        <div className="image-wrapper">
          <img className="logo" src={nearlogo} alt="NEAR logo" />
          <p style={style}>Hi, {this.state.profileName}!</p>
        </div>
        <div>
          {this.state.login ? 
            <div style={{color:"black"}}>
              <div>
                {this.state.profileAdded ? "Profile Added" :
                  <Reader label={"Add your Profile here: "} handleData={this.handleProfileData} />
                }
                {this.state.connectionsAdded ? "Connections Added" : 
                  <Reader label={"Add your Connections here: "} handleData={this.handleConnectionsData} />
                }
              </div>
            </div>
            :
            "Login to upload your homies"
          }
        </div>
        <div>
          {this.state.login ? <button onClick={this.requestSignOut}>Log out</button>
            : <button onClick={this.requestSignIn}>Log in with NEAR</button>}
        </div>

        <div>
          <div className="logo-wrapper">
            <img src={near} className="App-logo margin-logo" alt="logo" />
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>

        </div>
      </div>
    )
  }

}

export default App;
