import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TeamCard, ItemGrid } from "components";
import { teamActions } from 'actions';
import { Grid } from "@material-ui/core";

class TeamProfile extends Component {
  state = {}
  componentWillMount() {
    this.props.getByUserName(this.props.match.params.username)
  }
  render () {
    const { items } = this.props;
    return(
      <Grid container>
      {items.map(team => {
        return (
          <ItemGrid xs={12} sm={12} md={4} key={team.id}>
            <TeamCard
              history={this.props.history}
              team={team}
            />
          </ItemGrid>
        );
      })
      }
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
	const { items } = state.teams;
	return {items}
}

export default connect(mapStateToProps, {
	getByUserName: teamActions.getByUserName
})(TeamProfile)
