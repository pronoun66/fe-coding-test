import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'
import SearchView from '../../components/SearchView'
import PlaylistView from '../../components/PlaylistView'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import SearchIcon from '@material-ui/icons/Search'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { useDispatch, useSelector } from 'react-redux'
import { usePlaylistActions } from '../../actions'
import { Typography } from '@material-ui/core'
import LibraryAddIcon from '@material-ui/icons/LibraryAdd'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import { RootState } from '../../reducers'
import { PlaylistModel } from '../../models'
import TabPanel from '../../components/TabPanel'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100vw',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tabPanel: {
    minWidth: '80vw',
  },
  hr: {
    width: '50%',
  },
}))

export namespace App {
  export interface Props extends RouteComponentProps<void> {
  }
}

export const App = ({history, location}: App.Props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const playlistActions = usePlaylistActions(dispatch)

  const [open, setOpen] = useState(false)
  const [tabValue, setTabValue] = React.useState(0)

  const playlistsMap = useSelector((state: RootState) => state.playlists)
  const {playlistsInProcess, error} = useSelector((state: RootState) => state.ui)

  const playlists: PlaylistModel[] = Object.values(playlistsMap)

  const getPlaylistTabs = () => {
    if (playlistsInProcess) {
      return <Tab label="Loading..."/>
    }

    return playlists.map(playlist => <Tab key={playlist.id} label={playlist.name}/>)
  }

  const handleChange = (event: any, newValue: any) => {
    if (event.currentTarget.id === 'add-playlist') {
      handleAddPlaylistClickOpen()
    } else if (event.currentTarget.id === 'playlists') {
      setTabValue(newValue + 1)
    } else {
      setTabValue(newValue)
    }
  }

  const handleAddPlaylistClickOpen = () => {
    setOpen(true)
  }

  const handleAddPlaylistDialogClose = () => {
    setOpen(false)
  }

  const onAddPlaylistSubmit = (event: any) => {
    event.preventDefault()

    const playlistName = event.target.playlist.value
    if (playlistName.length === 0) {
      return
    }

    playlistActions.add(playlistName)
    handleAddPlaylistDialogClose()
  }

  useEffect(() => {
    playlistActions.set()
  }, [])

  return (
    <Typography component="div" className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tabValue}
        onChange={handleChange}
        aria-label="main vertical tabs"
        className={classes.tabs}
      >
        <Tab icon={<SearchIcon/>} label="SEARCH"/>
        <Tab id="playlists" icon={<FavoriteIcon/>} label="PLAYLISTS"/>
        {
          getPlaylistTabs()
        }
        <Tab id="add-playlist" icon={<LibraryAddIcon/>} label="Add"/>
      </Tabs>
      <TabPanel value={tabValue} className={classes.tabPanel} index={0}>
        <SearchView/>
      </TabPanel>
      {
        playlists.map((playlist, i) =>
          <TabPanel key={playlist.id} value={tabValue} className={classes.tabPanel} index={i + 2}>
            <PlaylistView playlistId={playlist.id} title={playlist.name}/>
          </TabPanel>
        )
      }

      <Dialog
        open={open}
        onClose={handleAddPlaylistDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add Playlist</DialogTitle>
        <DialogContent>
          <form id="form" noValidate autoComplete="off" onSubmit={onAddPlaylistSubmit}>
            <TextField id="playlist" name="playlist" label="Playlist Name"/>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddPlaylistDialogClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" type="submit" form="form" value="Submit">
            ADD
          </Button>
        </DialogActions>
      </Dialog>
    </Typography>
  )

}
