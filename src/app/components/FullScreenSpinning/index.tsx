import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress, Paper } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
}))


export default () => {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <CircularProgress/>
    </Paper>
  )

}
