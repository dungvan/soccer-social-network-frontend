
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MatchCard, ItemGrid } from 'components';
import { Grid } from 'material-ui';
import { matchActions } from 'actions';

class Match extends Component {
	componentWillMount() {
    this.props.getByMaster()
	}
	render () {
		const { items } = this.props;
    return (
      <Grid container>
        <ItemGrid xs={12} sm={12} md={4}>
          {
            items.map(match => {
              return (
                <MatchCard
                  history={this.props.history}
                  key={match.id}
                  matchID={match.id}
                  user={match.master}
                  title={match.description}
                  date={new Date(match.start_date)}
                  tournament={match.tournament}
                  team={{1: match.team1, 2:match.team2}}
                  goals={{1: match.team1_goals, 2: match.team2_goals}}
                  goalsEditable
                />
              );
            })
          }
        </ItemGrid>
      </Grid>
    );
	}
}

const mapStateToProps = (state) => {
  const { items } = state.matches;
	return { items }
}

export default connect(mapStateToProps, {
	getByMaster: matchActions.getByMaster
})(Match)