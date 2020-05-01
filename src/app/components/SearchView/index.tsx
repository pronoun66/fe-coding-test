import React from 'react'
import { useSelector } from 'react-redux'
import { CircularProgress } from '@material-ui/core'
import SearchBar from '../../components/SearchBar'
import Tracks from '../../components/Tracks'
import { TrackModel } from '../../models'
import { RootState } from '../../reducers'


export default () => {
  const searchResult = useSelector((state: RootState) => state.search)
  const {searchInProcess, searchKeyword, error} = useSelector((state: RootState) => state.ui)

  const getContent = () => {
    if (searchInProcess) {
      return <CircularProgress/>
    }

    if (error) {
      return <div> error </div>
    }

    const tracks: TrackModel[] = searchResult.tracks?.items || []
    return <Tracks tracks={tracks} {...searchKeyword && {title: `Search: ${searchKeyword}`}}/>
  }

  return (
    <div>
      <SearchBar/>
      {
        getContent()
      }
    </div>
  )

}
