import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'app/reducers'
import Tracks from '../../components/Tracks'

interface Props {
  playlistId: string
  title?: string
}

export default ({playlistId, title}: Props) => {
  const playlistTracks = useSelector((state: RootState) => state.playlistTracks)
  const tracksMap = useSelector((state: RootState) => state.tracks)
  const tracks = (playlistTracks[playlistId] || []).map(trackId => tracksMap[trackId])

  return (
    <div>
      <Tracks tracks={tracks} playlistId={playlistId} title={title}/>
    </div>
  )

}
