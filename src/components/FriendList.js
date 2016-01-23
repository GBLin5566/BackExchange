import React, { Component, PropTypes } from 'react';
import FriendItem from './FriendItem'

export default class FriendList extends Component {
    static contextType = {
        history: PropTypes.object.isRequired 
    }

    renderMSG(item, i) {
        const {id, userId, msg} = item;
        return(
                <div className='FriendItem' key={i}>
                    <FriendItem 
                        key={i}
                        id={id}
                        userId={userId}
                        msg={msg}
                    />
                </div>
                );
    }
    render() {
        return(
                <div className='FriendList'>
                    {this.props.thread[0].friendList.map(this.renderMSG, this)}
                </div>
                );
    }
}
