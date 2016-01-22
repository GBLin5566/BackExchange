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
