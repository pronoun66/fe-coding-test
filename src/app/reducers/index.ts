import { combineReducers } from 'redux'
import { RootState } from './state'
import * as search from './search'
import * as playlists from './playlists'
import * as playlistTracks from './playlistTracks'
import * as track from './tracks'
import * as ui from './ui'

export { RootState }

export const rootReducer = combineReducers<RootState>({
  search: search.searchReducer,
  playlists: playlists.playlistsReducer,
  playlistTracks: playlistTracks.playlistTracksReducer,
  tracks: track.tracksReducer,
  ui: ui.uiReducer,
})

export const rootInitialState = {
  search: search.initialState,
  playlists: playlists.initialState,
  playlistTracks: playlistTracks.initialState,
  tracks: track.initialState,
  ui: ui.initialState,
}
