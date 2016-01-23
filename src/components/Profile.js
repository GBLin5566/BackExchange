import React ,{Component, PropTypes} from 'react';

export default class Profile extends Component {
    static contextTypes = {
        history: PropTypes.object.isRequired
    }

    render() {
        const me = this.props.user;
        if(typeof me.id !== 'undefined' && me.id !== null && me.id !== ''){
            return (
                    <div>
                        <h1>Hello, {me.name} !</h1>
                        <p>Id = {me.id}</p>
                        <img src={me.profilePic}></img>
                    </div>
                    );
        }
        else {
            return (
                    <div>
                        <h1>Please Login Facebook !</h1>
                    </div>
                    );
        }
    }

}
