import React ,{Component, PropTypes} from 'react';

export default class Profile extends Component {
    static contextTypes = {
        history: PropTypes.object.isRequired
    }
    render() {
        const me = this.props.thread[0]
        return (
                <div>
                    <h1>My Profile</h1>
                    <p>Id = {me.id}</p>
                </div>
                );
    }

}
