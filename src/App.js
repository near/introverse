import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import logo from './assets/logo.svg';
import introverselogo from './assets/logo.png';
import introverselogo2 from './assets/logo2.png';
import near from './assets/near.svg';
import Reader from './UploadCSV.js'
import Connections from './UploadCSV.js'
import './App.css';
import { stashLocally, grabFromStorage } from './utils.js'

// import { makeStyles } from '@material-ui/styles';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      speech: null,
      profileName: "there"
    }
    this.signedInFlow = this.signedInFlow.bind(this);
    this.requestSignIn = this.requestSignIn.bind(this);
    this.requestSignOut = this.requestSignOut.bind(this);
    this.signedOutFlow = this.signedOutFlow.bind(this);
    this.handleConnectionsData = this.handleConnectionsData.bind(this);
    this.handleProfileData = this.handleProfileData.bind(this);
  }

  init() {
    let fullName = grabFromStorage("profile");
    let profileInit = !!fullName;
    let connectionsInit = !!grabFromStorage("connections");
    console.log(profileInit, connectionsInit)
    this.setState({
      profileAdded: profileInit,
      connectionsAdded: connectionsInit
    });
    if (fullName) {
      this.setState({
        profileName: fullName
      });
    }
  }

  componentDidMount() {
    this.init();
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
    this.setState({speech: "The King's Speech"});
  }

  async requestSignIn() {
    const appTitle = "Sasha's Services";
    await this.props.wallet.requestSignIn(
      window.nearConfig.contractName,
      appTitle
    )
  }

  requestSignOut() {
    stashLocally("profile", null);
    stashLocally("connections", null);
    this.state({
      profile: "there",
      login: false
    })
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
    // console.log(data);
    // pass data to the server
    if (!!data){
    this.setState({
      connections: data,
      connectionsAdded: true
    });
      stashLocally("connections", data);
    }

  }

  handleProfileData(data) {
    let fullName = data[0]
    if (!!data){
      this.setState({
        profileName: fullName,
        profileAdded: true
      });
      stashLocally("profile", fullName);
    }
  }

  render() {
    let style = {
      fontSize: "1.5rem",
      color: "#0072CE",
      textShadow: "1px 1px #D1CCBD"
    }
    return (
      <Router>
        <Switch>
          <Route
            path="/"
            render={props => 
              <div className="App-header">
                <div className="image-wrapper">
                  {this.state.login ?
                    <img className="logo" src={introverselogo2} alt="INTROVERSE logo" />
                  :
                    <img className="logo" src={introverselogo} alt="INTROVERSE logo" />
                  }
                  <p style={style}>Hi, {this.state.profileName}!</p>

                  {this.state.connectionsAdded && (
                    <Link to="/connections"> View My Connections </Link>
                  )}
                </div>
                <div>
                  {this.state.login ? 
                    <div style={{color:"black"}}>
                      
                      <div>
                        {this.state.profileAdded ? <p>"Profile Added"</p> :
                          <Reader label={"Add your Profile here: "} handleData={this.handleProfileData} />
                        }
                        {this.state.connectionsAdded ? <p>"Connections Added"</p> : 
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

              </div>} />
          <Route 
            path="/connections"
            render={props => <Connections {...props}/>} />
        </Switch> 
      </Router>
    )
  }

}

export default App;
