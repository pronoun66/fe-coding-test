import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton, InputBase, Paper } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { useDispatch } from 'react-redux'
import { useSearchActions } from '../../actions'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}))


export default () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const searchActions = useSearchActions(dispatch)

  const onSubmit = (event: any) => {
    event.preventDefault()

    const query = event.target.search.value
    if (query.length === 0) {
      return
    }

    searchActions.searchTrack(query)
  }

  return (
    <Paper component="form" className={classes.root} onSubmit={onSubmit}>
      <InputBase
        className={classes.input}
        name="search"
        placeholder="Search tracks"
        inputProps={{'aria-label': 'search spotify tracks'}}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search" data-testid="submit">
        <SearchIcon/>
      </IconButton>
    </Paper>
  )

}
