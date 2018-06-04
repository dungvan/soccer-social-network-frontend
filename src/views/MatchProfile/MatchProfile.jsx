
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MatchCard, ItemGrid, TeamCard } from 'components';
import { Grid } from "@material-ui/core";
import { matchActions } from 'actions';

class MatchProfile extends Component {
  state = {team1: null, team2: null, totalWin: 0, totalDraw: 0, totalLost: 0}
	componentWillMount() {
		this.props.getByUserName(this.props.match.params.username)
	}
	handleShowTeamName = (index) => {
    let {team1, team2} = this.props.items[index]
    this.setState({team1, team2})
  }
  resetStatus = false
  componentWillReceiveProps(){
    this.resetStatus = true
  }

  handleStatus = () => {
    let totalWin = 0;
    let totalDraw = 0;
    let totalLost = 0;
    const { items } = this.props;
    for (let key = 0; key < items.length; key++) {
      console.log(items[key])
      if (items[key].team1_goals != null && items[key].team2_goals != null)
        if (items[key].team1_goals === items[key].team2_goals){
          items[key].status = 'draw';
          totalDraw++;
        } else if (items[key].team1_goals > items[key].team2_goals) {
          if (items[key].team1.player.filter(player => (player.user_name === this.props.match.params.username)).length > 0){
            items[key].status = 'win';
            totalWin++;
          } else {
            items[key].status = 'lose';
            totalLost++;
          }
        } else {
          if (items[key].team1.players.filter(player => (player.user_name === this.props.match.params.username)).length > 0){
            items[key].status = 'lose';
            totalLost++;
          } else {
            items[key].status = 'win';
            totalWin++;
          }
        }
    }
    this.setState({totalDraw, totalLost, totalWin})
    this.resetStatus = false
  }
  
	render () {
    const { items } = this.props;
    const { totalWin, totalLost, totalDraw } = this.state;
    if (this.resetStatus) {
      this.handleStatus()
    }
    return (
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
        <div style={{paddingBottom: 20}}>
          <span style={{fontSize: '24px', fontWeight: 'bold', marginRight: 50}}>TOTAL: {this.props.total}</span>
          <span style={{fontSize: '24px', fontWeight: 'bold', marginRight: 50, color: 'green'}}>{totalWin} WIN</span>
          <span style={{fontSize: '24px', fontWeight: 'bold', marginRight: 50, color: 'gray'}}>{totalDraw} DRAW</span>
          <span style={{fontSize: '24px', fontWeight: 'bold', marginRight: 50, color: 'red'}}>{totalLost} LOST</span>
          <span style={{fontSize: '24px', fontWeight: 'bold', marginRight: 50, color: 'puple'}}>WIN RATE {(totalWin*100/(totalLost+totalWin+totalDraw)).toFixed(2)} %</span>
        </div>
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={4}>
          {items.map((match, index) => {
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
                onClick={this.handleShowTeamName.bind(this, index)}
              />
            );
          })}
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={8} style={{position: "relative"}}>
          <div style={{display: "flex", position: 'fixed'}}>
            <ItemGrid xs={12} sm={12} md={6}>
            {this.state.team1 &&
              <TeamCard
                history={this.props.history}
                team={this.state.team1}
              />
            }
            </ItemGrid>
            <ItemGrid xs={12} sm={12} md={6}>
            {this.state.team2 &&
              <TeamCard
                history={this.props.history}
                team={this.state.team2}
              />
            }
            </ItemGrid>
          </div>
        </ItemGrid>
      </Grid>
    );
	}
}

const mapStateToProps = (state) => {
	const { items, total } = state.matches;
	return {items, total}
}

export default connect(mapStateToProps, {
	getByUserName: matchActions.getByUserName
})(MatchProfile)