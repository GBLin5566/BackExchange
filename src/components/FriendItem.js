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
        const {key, id, name,profilePic, msg} = this.props;
        return(
                <div className='friendItem'>
                    <h3>To {name}</h3>
                    {msg.map(this.renderMSG, this)}
                </div>
                );
    }
}
