import React, { Component } from 'react';
import { Card } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { CardContent } from 'material-ui';
import { CardHeader } from 'material-ui';

const styles = theme => ({
  card: {
    width: 320
  },
  cardHeader: {
    textAlign: 'center'
  },
  cardContent: {
    display: 'flex'
  },
  left: {
    display: 'flex',
    width: 150,
    height: 150
  },
  right: {
    display: 'flex',
    width: 150,
    height: 150
  }
})

class MatchCard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          title={"match 1"}
          subheader={"tournament 1"}
        />
        <CardContent className={classes.cardContent} >

        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(MatchCard);