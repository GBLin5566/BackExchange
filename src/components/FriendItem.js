import React, { Component, PropTypes } from 'react';

export default class FriendItem extends Component {
    renderMSG(msg, i){
        return(
                <div key={i}>
                    {msg.text}
                </div>
                );
    }
    render(){
        const {id, userId, msg} = this.props;
        return(
                <div className='friendItem'>
                    <h3>{id}</h3>
                    <p>To {userId}</p>
                    {msg.map(this.renderMSG, this)}
                </div>
                );
    }
}
