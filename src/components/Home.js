import React, { Component } from 'react';


export default class Home extends Component {
  renderToBePicked(people, i){
      let checkExistFriend = false;
      for (var f = 0 ; f < this.props.thread[this.props.user.threadIndex].friendList.length ; f ++){
        if (this.props.thread[this.props.user.threadIndex].friendList[f].id === people.id){
            checkExistFriend = true;
            break;
        }
      }
      if (people.id !== this.props.user.id && !checkExistFriend){
      return(
              <People 
                key= {i}
                index = {i}
                name= {people.profile.name}
                description = {people.profile.description}
                profilePic = {people.profile.profilePic}
                intersted= {people.profile.intersted}
                onAdd = {this.props.handleAddPeople.bind(this)}
              />
              );
      }
  }

  render() {
    const me = this.props.user;
    if (typeof this.props.thread[me.threadIndex] !== 'undefined' && this.props.thread.length > (this.props.thread[me.threadIndex].friendList.length + 1)){
    return (
      <div>
        {this.props.thread.map(this.renderToBePicked, this)}
      </div>
    );
    }
    else  if (me.id === '') {
        return(
            <div>
                <h1>Please Login Facebook !</h1>
            </div>
                );
    }
    else {
        return(
            <div>
                <h1>No User can be friend now...</h1>
                <p>Wait for a while !</p>
            </div>
                );
    }
  }
}

class People extends Component {

    render(){
        const {key,index, name, intersted, description, profilePic, onAdd} = this.props;
        return(
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <div className="panel panel-default">
                      <div className="panel-body">
                        <div className="row">
                          <div className="col-xs-12 col-sm-8">
                            <h2>{name}</h2>
                            <p><strong>Interested: </strong> {intersted} </p>
                            <p><strong>Description: </strong> {description} </p>
                          </div>         
                          <div className="col-xs-12 col-sm-4 text-center">
                            <img src={profilePic} className="center-block img-circle img-responsive"></img>
                          </div>
                        </div>
                        <button type='button' className='btn btn-primary' onClick={(event) => onAdd(index)}>Add</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

                );
    }
}
