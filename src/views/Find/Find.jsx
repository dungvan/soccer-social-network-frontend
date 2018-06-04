import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { userActions, teamActions, matchActions, postActions } from 'actions';
import { UserCard } from 'components'
import { ItemGrid, TeamCard, MatchCard, PostFindCard } from '../../components';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class ScrollableTabsButtonAuto extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentWillMount = () => {
    this.props.userSearch(1)
    this.props.teamSearch(1)
    this.props.matchSearch(1)
    this.props.postSearch("c")
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="auto"
          >
            <Tab label="Users" />
            <Tab label="Teams" />
            <Tab label="Matches" />
            <Tab label="Hashtag Posts" />
          </Tabs>
        </AppBar>
        {value === 0 &&
          <TabContainer>
            <ItemGrid xs={12} sm={12} md={12} style={{display: "block", height: '100vh'}}>
            {
              this.props.userItems.map(user=>(
                <ItemGrid xs={12} sm={12} md={4} key={"user"+user.id} style={{display: 'inline-block'}}>
                  <UserCard user={user} history={this.props.history} />
                </ItemGrid>
              ))
            }
            </ItemGrid>
          </TabContainer>}
        {value === 1 &&
          <TabContainer>
          <ItemGrid xs={12} sm={12} md={12} style={{display: "block", height: '100vh'}}>
            {
              this.props.teamItems.map(team=>(
                <ItemGrid xs={12} sm={12} md={4} key={"team"+team.id} style={{display: 'inline-block'}}>
                  <TeamCard team={team} history={this.props.history} />
                </ItemGrid>
              ))
            }
            </ItemGrid>
          </TabContainer>}
        {value === 2 &&
          <TabContainer>
            <ItemGrid xs={12} sm={12} md={12} style={{display: "block", height: '100vh'}}>
            {
              this.props.matchItems.map(match=>(
                <ItemGrid xs={12} sm={12} md={4} key={"match"+match.id} style={{display: 'inline-block'}}>
                  <MatchCard 
                    matchID={match.id}
                    user={match.master}
                    title={match.description}
                    date={new Date(match.start_date)}
                    tournament={match.tournament}
                    team={{1: match.team1, 2:match.team2}}
                    goals={{1: match.team1_goals, 2: match.team2_goals}}
                  />
                </ItemGrid>
              ))
            }
            </ItemGrid>
          </TabContainer>}
        {value === 3 &&
          <TabContainer>
          <ItemGrid xs={12} sm={12} md={12} style={{display: "block", height: '100vh'}}>
          {
            this.props.postItems.map(post=>(
              <ItemGrid xs={12} sm={12} md={6} key={"post"+post.id} style={{display: 'inline-block'}}>
                <PostFindCard 
                  history={this.props.history}
                  postID={post.id}
                  user={post.user}
                  postDate={new Date(post.created_at)}
                  mediaImages={post.image_urls}
                  content={post.caption}
                />
              </ItemGrid>
            ))
          }
          </ItemGrid>
          </TabContainer>}
      </div>
    );
  }
}

ScrollableTabsButtonAuto.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const userItems = state.users.items
  const teamItems = state.teams.items
  const matchItems = state.matches.items
  const postItems = state.posts.items
  return {
    userItems,
    teamItems,
    matchItems,
    postItems
  }
}

export default connect(mapStateToProps, {
  userSearch: userActions.getAll,
  teamSearch: teamActions.getAll,
  matchSearch: matchActions.getAll,
  postSearch: postActions.getByHashtag
})(withStyles(styles)(ScrollableTabsButtonAuto))
