import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress, IconButton, Menu, MenuItem, Paper, Typography } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import { TrackModel } from '../../models'
import { RootState } from '../../reducers'
import { usePlaylistTrackActions } from '../../actions'


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '10px 0',
  },
  function: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  iconButton: {
    padding: 10,
  },
}))

interface Props {
  track: TrackModel
  playlistId?: string
}

export default ({track, playlistId}: Props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const playlistTrackActions = usePlaylistTrackActions(dispatch)

  const [anchorEl, setAnchorEl] = React.useState(null)

  const {trackInProcess} = useSelector((state: RootState) => state.ui)

  const playlistsMap = useSelector((state: RootState) => state.playlists)

  const playlistTracks = useSelector((state: RootState) => state.playlistTracks)
  const linkedPlaylistIds = Object.keys(playlistTracks).filter(playlistId => playlistTracks[playlistId].includes(track.id))
  const unlinkedPlaylists = Object.values(playlistsMap).filter(playlist => !linkedPlaylistIds.includes(playlist.id))

  const handleRemoveClick = (event: any) => {
    if (playlistId) {
      playlistTrackActions.remove(playlistId, track)
    }
  }

  const handleAddClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleAddClose = () => {
    setAnchorEl(null)
  }

  const handlePlaylistClick = (event: any) => {
    handleAddClose()
    const {playlistId} = event.currentTarget.dataset
    playlistTrackActions.add(playlistId, track)
  }

  return (
    <Paper component="div" className={classes.root}>
      <Typography>{track.name}</Typography>
      {
        trackInProcess.includes(track.id) ?
          <CircularProgress data-testid="in-process"/>
          :
          <div className={classes.function}>
            <div>
              <IconButton className={`${classes.iconButton}`} aria-label="add" onClick={handleAddClick}>
                <AddIcon/>
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleAddClose}
              >
                {
                  unlinkedPlaylists.map(playlist => <MenuItem key={playlist.id} data-playlist-id={playlist.id}
                                                              onClick={handlePlaylistClick}>{playlist.name}</MenuItem>)
                }
              </Menu>
            </div>
            {
              playlistId &&
              <IconButton className={`${classes.iconButton}`} aria-label="delete" onClick={handleRemoveClick}>
                <DeleteIcon/>
              </IconButton>
            }
          </div>
      }
    </Paper>
  )

}
