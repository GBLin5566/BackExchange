import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';

const initialState = {
    userThread: 
        [
                {
                    
                    id: '1125782029',
                    profile: {
                              name: 'John',
                              description: 'Want to visit Asia',
                              profilePic: 'http://api.randomuser.me/portraits/men/49.jpg',
                              intersted: 'Couchsurfing'
                          },
                    friendList: [
                        {
                            id: '1',
                            name: 'DDD',
                            msg: [
                            {fromMe: false, text: 'Hello'},
                            {fromMe: true, text: 'From the other side'}
                                ]
                        },
                        {
                            id: '2',
                            name: 'SDF',
                            msg: [
                            {fromMe: false, text: 'Demo?'},
                            {fromMe: true, text: 'Sure'}
                                ]
                        }
                        ]
                },
                {
                    id: '23',
                    profile: {
                        name: 'James',
                        description: 'Legs',
                        profilePic: 'http://l1.yimg.com/bt/api/res/1.2/a3msGgStarpOr9C2Gaygnw--/YXBwaWQ9eW5ld3NfbGVnbztpbD1wbGFuZTtxPTc1O3c9NjAw/http://media.zenfs.com/en/person/Ysports/lebron-james-basketball-headshot-photo.jpg',
                        intersted: 'rings'
                    },
                    friendList:[]
                }
        ],
    currentUser: {
        id: '',
        threadIndex: '',
        name: '',
        description: '',
        profilePic: '',
        intersted: ''
    }
};

export default class App extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired
  }

  constructor(props){
    super(props);
    this.state = initialState;
  }

  // Facebook API
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
  // This is called with the results from from FB.getLoginStatus().
  statusChangeCallback(response) {
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      console.log('Welcome! Fetching your information.... ');
      let self = this;
      FB.api('/me', function(response){
        if (response && !response.error){
        console.log('Successful login for: ' + response.name);
        self.setState({
            currentUser:{
                    id: response.id,
                    name: response.name,
                    profilePic: self.state.currentUser.profilePic,
                    threadIndex: self.state.currentUser.threadIndex
                        }
        });
        for (let userIndex = 0 ; userIndex < self.state.userThread.length ; userIndex ++){ 
            if (self.state.userThread[userIndex].id === self.state.currentUser.id){
                console.log('Find exists user ' + userIndex);
                self.setState({
                    currentUser:{
                            id: self.state.currentUser.id,
                            name: self.state.currentUser.name,
                            profilePic: self.state.currentUser.profilePic,
                            intersted: self.state.userThread[userIndex].intersted,
                            description: self.state.userThread[userIndex].description,
                            threadIndex: userIndex
                                }
                });
                break;
            }
        }
        // Add the new user to the userThread
        if (self.state.currentUser.threadIndex === ''){
            self.state.userThread.push({
                id: self.state.currentUser.id,
                profile: {
                    name: self.state.currentUser.name,
                    description: '',
                    profilePic: self.state.currentUser.profilePic,
                    intersted: ''
                },
                home: [],
                friendList:[]
            });
            self.setState({
                currentUser:{
                        id: self.state.currentUser.id,
                        name: self.state.currentUser.name,
                        profilePic: self.state.currentUser.profilePic,
                        threadIndex: self.state.userThread.length - 1
                            }
            });
            console.log('Add a new user to array index ' + self.state.currentUser.threadIndex);
        }
        //
        }
      });
      FB.api('/me/picture?type=large', function(response){
          if(response && ! response.error) {
              self.setState({
                  currentUser:{
                        id: self.state.currentUser.id,
                        name: self.state.currentUser.name,
                        profilePic: response.data.url,
                        threadIndex: self.state.currentUser.threadIndex
                            }
              });
          }
      });
      
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
        // clear the data
        self.setState(initialState);
        console.log('User Logout');
      });
      }
      else{
        FB.login(self.checkLoginState.bind(self));

      }
    });
  }

  // API Ends
  handleAddPeople(i){
    // Add a friend
    let thread = this.state.userThread;

    // Add a user into currentUser's data
    thread[this.state.currentUser.threadIndex].friendList.push({
        id: thread[i].id,
        name: thread[i].profile.name,
        profilePic: thread[i].profile.profilePic,
        msg: []
    });

    this.setState({
        userThread: thread
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
                <li><a href='#' onClick={this.handleClick.bind(this)}>{`${this.state.currentUser.id ? 'Logout' : 'Login' }`}</a></li>
              </ul>
            </div>
          </div>
        </nav>
        {/* this will render the child routes */}
        <div className="container">
          {this.props.children && React.cloneElement(this.props.children, {
            thread: this.state.userThread,
            user: this.state.currentUser,
            handleAddPeople: this.handleAddPeople.bind(this)

                                                                            })}
        </div>
      </div>
    );
  }
}






