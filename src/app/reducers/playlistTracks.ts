import { handleActions } from 'redux-actions'
import { RootState } from './state'
import { PlaylistTrackActions } from '../actions'

export const initialState: RootState.PlaylistTracksState = {}

export const playlistTracksReducer = handleActions<RootState.PlaylistTracksState, RootState.PlaylistTracksState & PlaylistTracksPayload>(
  {
    [PlaylistTrackActions.Type.SET]: (state, action) => {
      return {...state, ...action.payload}
    },
    [PlaylistTrackActions.Type.ADD_TO_PLAYLIST]: (state, action) => {
      const trackIds = [...(state[action.payload.playlistId] || []), action.payload.trackId]
      return {...state, [action.payload.playlistId]: trackIds}
    },
    [PlaylistTrackActions.Type.REMOVE_FROM_PLAYLIST]: (state, action) => {
      return {
        ...state,
        [action.payload.playlistId]: state[action.payload.playlistId].filter(trackId => trackId != action.payload.trackId)
      }
    },
  },
  initialState
)

interface PlaylistTracksPayload {
  playlistId: string
  trackId: string
}
