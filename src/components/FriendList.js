import React, { Component, PropTypes } from 'react';
import FriendItem from './FriendItem'

export default class FriendList extends Component {
    static contextType = {
        history: PropTypes.object.isRequired 
    }

    renderMSG(item, i) {
        const {id, name,profilePic, msg} = item;
        return(
                <div className='FriendItem panel panel-success' key={i}>
                    <FriendItem 
                        key={i}
                        index={i}
                        id={id}
                        name={name}
                        profilePic={profilePic}
                        msg={msg}
                        place={this.props.tmpValue.tmpMsg[i]}
                        handleMSG={this.props.handleMSG.bind(this)}
                        handleMSGChange={this.props.handleMSGChange.bind(this)}
                    />
                </div>
                );
    }
    renderNoFriend(){
        return(
                <div>
                    <h1>You have no friends !</h1>
                    <p>Go Home to pick some friends</p>
                </div>
                );
    }
    render() {
        const me = this.props.user;
        if (typeof me.id !== 'undefined' && me.id !== null && me.id !== '' && typeof this.props.thread[me.threadIndex] !== 'undefined'){
            if (this.props.thread[me.threadIndex].friendList.length !== 0){
                return(
                    <div className='FriendList'>
                    {this.props.thread[me.threadIndex].friendList.map(this.renderMSG, this)}
                    </div>
                        );
            }
            else {
                return(
                    <div>
                        <h1>You have no friends !</h1>
                        <p>Go Home to pick some NICE friends </p>
                    </div>
                        );
            }
        }
        else {
            return(
                    <div>
                        <h1>Please Login Facebook !</h1>
                    </div>
                    );
        }
    }
}
