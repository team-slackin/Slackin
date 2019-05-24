import React from "react"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import FormControl from "@material-ui/core/FormControl"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import withStyles from "@material-ui/core/styles/withStyles"
import register from "./../../Assets/register.png"

const styles = theme => {
  return {
    main: {
      width: "auto",
      display: "block", // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: "auto",
        marginRight: "auto"
      }
    },
    paper: {
      backgroundColor: "var(--secondary-background-color)",
      marginTop: theme.spacing.unit * 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
        .spacing.unit * 3}px`
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: "0px"
    },
    submit: {
      marginTop: theme.spacing.unit * 3
    }
  }
}

function RegisterForm(props) {
  const { classes, userInfoHandle, handleSubmit } = props

  return (
    <main className={classes.main} style={{ marginTop: "0px" }}>
      <CssBaseline />
      <Paper className={classes.paper} style={{ marginTop: "0px" }}>
        <Typography component="h1" variant="h5">
          <span>
            <img
              className="signIn"
              style={{ height: "38px" }}
              src={register}
              alt=""
            />
          </span>
        </Typography>
        <form className={classes.form}>
          <FormControl
            margin="normal"
            required
            fullWidth
            style={{ marginBottom: "0px" }}
          >
            {/* <InputLabel htmlFor="email">Email Address</InputLabel> */}
            <div className="input-border">
              <Input
                className="color-input"
                style={{ color: "white" }}
                onChange={e => {
                  userInfoHandle(e)
                }}
                id="email"
                name="email"
                autoFocus
                placeholder="Email Address"
                fullWidth
              />
            </div>
          </FormControl>

          <FormControl
            margin="normal"
            required
            fullWidth
            style={{ marginBottom: "0px" }}
          >
            {/* <InputLabel>Display Name</InputLabel> */}
            <div className="input-border">
              <Input
                className="color-input"
                style={{ color: "white" }}
                onChange={e => {
                  userInfoHandle(e)
                }}
                name="user_display_name"
                placeholder="Display Name"
                fullWidth
              />
            </div>
          </FormControl>

          <FormControl
            margin="normal"
            required
            fullWidth
            style={{ marginBottom: "0px" }}
          >
            {/* <InputLabel>First Name</InputLabel> */}
            <div className="input-border">
              <Input
                className="color-input"
                style={{ color: "white" }}
                onChange={e => {
                  userInfoHandle(e)
                }}
                name="first_name"
                placeholder="First Name"
                fullWidth
              />
            </div>
          </FormControl>

          <FormControl
            margin="normal"
            required
            fullWidth
            style={{ marginBottom: "0px" }}
          >
            {/* <InputLabel>Last Name</InputLabel> */}
            <div className="input-border">
              <Input
                className="color-input"
                style={{ color: "white" }}
                onChange={e => {
                  userInfoHandle(e)
                }}
                name="last_name"
                placeholder="Last Name"
                fullWidth
              />
            </div>
          </FormControl>

          <FormControl
            margin="normal"
            required
            fullWidth
            style={{ marginBottom: "0px" }}
          >
            {/* <InputLabel htmlFor="password">Password</InputLabel> */}
            <div className="input-border">
              <Input
                className="color-input"
                style={{ color: "white" }}
                onChange={e => {
                  userInfoHandle(e)
                }}
                name="password"
                type="password"
                id="password"
                placeholder="Password"
                fullWidth
              />
            </div>
          </FormControl>

          <FormControl
            margin="normal"
            required
            fullWidth
            style={{ marginBottom: "0px" }}
          >
            {/* <InputLabel htmlFor="password">Confirm Password</InputLabel> */}
            <div className="input-border">
              <Input
                className="color-input"
                style={{ color: "white" }}
                onChange={e => {
                  userInfoHandle(e)
                }}
                name="confirm_password"
                type="password"
                id="password"
                placeholder="Confirm Password"
                fullWidth
              />
            </div>
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            style={{
              color: "#fff"
            }}
            onClick={handleSubmit}
          >
            Create Account
          </Button>
        </form>
      </Paper>
    </main>
  )
}

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(RegisterForm)
