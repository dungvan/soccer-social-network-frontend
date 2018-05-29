
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MatchCard, ItemGrid } from 'components';
import { Grid } from 'material-ui';
import { matchActions } from '../../actions';

class MatchProfile extends Component {
	componentWillMount() {
    this.props.getAll(1)
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
                  key={match.id}
                  user={match.master}
                  title={match.description}
                  date={new Date(match.start_date)}
                  tournament={match.tournament}
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
	getAll: matchActions.getAll
})(MatchProfile)