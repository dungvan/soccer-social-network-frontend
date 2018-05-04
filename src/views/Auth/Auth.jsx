import React from "react";
import { LoginForm } from "./Login/login";
import { Grid } from "material-ui";
import { RegisterForm } from "./Register/register";
import { ItemGrid } from "components";
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

function AuthPage() {
  return (
    <Grid container>
      <ItemGrid xs={12} sm={12} md={5}>
        <LoginForm />
      </ItemGrid>
      <ItemGrid xs={12} sm={12} md={7}>
        <RegisterForm />
      </ItemGrid>
    </Grid>
  );
}

export default withStyles(styles)(AuthPage);