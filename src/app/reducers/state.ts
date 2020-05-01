import { PlaylistModel, SearchModel, TrackModel } from '../models'

export interface RootState {
  search: RootState.SearchState
  playlists: RootState.PlaylistsState
  tracks: RootState.TracksState
  playlistTracks: RootState.PlaylistTracksState
  ui: RootState.UiState
  router?: any
}

export namespace RootState {
  export type SearchState = SearchModel

  export type PlaylistsState = {
    [key: string]: PlaylistModel
  }

  export type TracksState = {
    [key: string]: TrackModel
  }

  // key is playlist id, value is track id
  export type PlaylistTracksState = {
    [key: string]: string[]
  }

  export type UiState = {
    trackInProcess: string[]
    playlistsInProcess: boolean
    searchInProcess: boolean
    searchKeyword: string | undefined
    error: Error | undefined
  }

}
