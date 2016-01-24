import React ,{Component, PropTypes} from 'react';

export default class Profile extends Component {
    static contextTypes = {
        history: PropTypes.object.isRequired
    }

    render() {
        const me = this.props.user;
        if(typeof me.id !== 'undefined' && me.id !== null && me.id !== ''){
            return (
                    <div className='container'>
                        <h1>Hello, {me.name} !</h1>
                        <div className="row">
                            <div className="col-md-1">
                                <div className="text-center">
                                    <img src={me.profilePic} className="img-rounded" ></img>
                                </div>
                            </div>
                            <form className="form-horizontal" role="form">
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">Interested: </label>
                                    <div className="col-lg-3">
                                        <input className="form-control" type="text" 
                                        value={this.props.tmpValue.tmpInterested}
                                        placeholder={this.props.thread[this.props.user.threadIndex].profile.intersted}
                                        onChange={this.props.handleInterestChange.bind(this)}
                                        onKeyDown={this.props.handleInterest.bind(this)}></input>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-4 control-label">Description: </label>
                                    <div className="col-lg-3">
                                        <input className="form-control" type="text"
                                        value={this.props.tmpValue.tmpDescription}
                                        placeholder={this.props.thread[this.props.user.threadIndex].profile.description}
                                        onChange={this.props.handleDescriptionChange.bind(this)}
                                        onKeyDown={this.props.handleDescription.bind(this)}></input>
                                    </div>
                                </div>
                            </form>
                        </div>
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
