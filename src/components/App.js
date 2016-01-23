import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';

const initialState = {
    userThread: 
        [
                {
                    id: '3345678',
                    profile: {
                              name: 'GBLin',
                              description: 'Tainan Boy',
                              profilePic: 'https://scontent-tpe1-1.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/11855831_1075120949199401_2404189872865217435_n.jpg?oh=a72522e249e450d9310c10ea4ee3fc20&oe=57471C0B',
                              intersted: 'Everywhere'
                          },
                    home: [
                        {
                            id: '2345124',
                            name: 'John',
                            intersted: 'Tainan'
                        }
                        ],
                    friendList: [
                        {
                            id: '1',
                            userId: '2343452',
                            msg: [
                            {fromMe: false, text: 'Hello'},
                            {fromMe: true, text: 'From the other side'}
                                ]
                        },
                        {
                            id: '2',
                            userId: '2564345',
                            msg: [
                            {fromMe: false, text: 'Demo?'},
                            {fromMe: true, text: 'Sure'}
                                ]
                        }
                        ]
                }
        ]
};

export default class App extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired
  }

  constructor(props){
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '1640526772891925',
        cookie     : true,  // enable cookies to allow the server to access
                          // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.5' // use version 2.5
      });

      // Now that we've initialized the JavaScript SDK, we call
      // FB.getLoginStatus().  This function gets the state of the
      // person visiting this page and can return one of three states to
      // the callback you provide.  They can be:
      //
      // 1. Logged into your app ('connected')
      // 2. Logged into Facebook, but not your app ('not_authorized')
      // 3. Not logged into Facebook and can't tell if they are logged into
      //    your app or not.
      //
      // These three cases are handled in the callback function.
      FB.getLoginStatus(function(response) {
        this.statusChangeCallback(response);
      }.bind(this));
    }.bind(this);

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    console.log('Successful login for: ' + response.id);
    });
  }

  // This is called with the results from from FB.getLoginStatus().
  statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      this.testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
        console.log('Plz log into this app');
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      console.log('Plz log into Facebook');
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  checkLoginState() {
    FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    }.bind(this));
  }

  handleClick() {
    let self = this;
    FB.getLoginStatus(function(response){
      if(response.status === 'connected'){
        FB.logout(function(response){
        console.log('User Logout');
      });
      }
      else{
        FB.login(self.checkLoginState.bind(self));
      }
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-9"
                aria-expanded="false"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">BackExchange</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-9">
              <ul className="nav navbar-nav">
                <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
                <li><Link to="/profile" activeClassName="active">Profile</Link></li>
                <li><Link to="/friends" activeClassName="active">Friends</Link></li>
                <li><a href='#' onClick={this.handleClick.bind(this)}>Login</a></li>
              </ul>
            </div>
          </div>
        </nav>
        {/* this will render the child routes */}
        <div className="container">
          {this.props.children && React.cloneElement(this.props.children, {
            thread: this.state.userThread
                                                                            })}
        </div>
      </div>
    );
  }
}






