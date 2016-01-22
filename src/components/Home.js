import React, { Component } from 'react';


export default class Home extends Component {
  renderToBePicked(people, i){
      return(
              <People 
                key= {i}
                name= {people.name}
                intersted= {people.intersted}
              />
              );
  }
  render() {
    return (
      <div>
        <h1>Pick one!</h1>
        {this.props.thread[0].home.map(this.renderToBePicked, this)}
      </div>
    );
  }
}

class People extends Component {
    render(){
        const {key, name, intersted} = this.props;
        return(
                <div>
                    <h3>{name}</h3>
                    <p>Interested {intersted}</p>
                </div>
                );
    }
}
