import React, { Component } from 'react';
import { Input, CardHeader } from '@material-ui/core';
import MatchExplore from '../MatchExplore/MatchExplore';

class MatchesFilter extends Component {
  state={filter: new Date().toString()}
  render() {
    return (
      <div>
        <CardHeader
          title={"Choose any day to find matches"}
          subheader={<Input
            inputProps={{
              type:"date",
              onChange: (event)=>{this.setState({filter: event.target.value});}
            }}
          />}
        />
        <MatchExplore
          filter={this.state.filter}
        />
      </div>
    );
  }
}

export default MatchesFilter;