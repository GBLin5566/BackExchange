import React, { Component, PropTypes } from 'react';

export default class FriendItem extends Component {
    render(){
        const {id, userId, msg} = this.props;
        return(
                <div className='friendItem'>
                    <h3>{id}</h3>
                    <p>To {userId}</p>
                </div>
                );
    }
}
