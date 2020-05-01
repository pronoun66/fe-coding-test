import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../reducers'
import { TrackModel } from '../../models'
import Track from '../Track'

interface Props {
  tracks: TrackModel[]
  playlistId?: string
  title?: string
}

export default ({tracks, playlistId, title}: Props) => {
  const { searchKeyword } = useSelector((state: RootState) => state.ui)

  return (
    <Fragment>
      {title &&
      <h2>{title.toLocaleUpperCase()}</h2>
      }
      {
        tracks.length > 0 ?
          tracks.map(track => <Track key={track.id} track={track} playlistId={playlistId}/>)
          :
          playlistId ?
            <p>Empty list</p>
            :
            searchKeyword ?
              <p>No track found</p>
              :
              <p>Please type to search</p>
      }
    </Fragment>
  )
}
