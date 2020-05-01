import { handleActions } from 'redux-actions'
import { RootState } from './state'
import { PlaylistActions } from '../actions'
import { PlaylistModel } from '../models'

export const initialState: RootState.PlaylistsState = {}

export const playlistsReducer = handleActions<RootState.PlaylistsState, PlaylistModel[] & PlaylistModel>(
  {
    [PlaylistActions.Type.SET]: (state, action) => {
      return {
        ...state, ...action.payload.reduce((acc: { [key: string]: PlaylistModel }, playlist: PlaylistModel) => {
          acc[playlist.id] = playlist
          return acc
        }, {})
      }
    },
    [PlaylistActions.Type.ADD]: (state, action) => {
      return {...state, ...{[action.payload.id]: action.payload}}
    },
  },
  initialState
)
