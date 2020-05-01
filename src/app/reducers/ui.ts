import { handleActions } from 'redux-actions'
import { RootState } from './state'
import { UiActions } from '../actions'

export const initialState: RootState.UiState = {
  trackInProcess: [],
  playlistsInProcess: false,
  searchInProcess: false,
  searchKeyword: undefined,
  error: undefined
}

export const uiReducer = handleActions<RootState.UiState, any>(
  {
    [UiActions.Type.TRACK_IN_PROCESS]: (state, action) => {
      if (action.payload.inProcess) {
        return {...state, trackInProcess: [...state.trackInProcess, action.payload.trackId]}
      } else {
        return {...state, trackInProcess: state.trackInProcess.filter(trackId => !trackId === action.payload.trackId)}
      }
    },

    [UiActions.Type.PLAYLISTS_IN_PROCESS]: (state, action) => {
      return {...state, playlistsInProcess: action.payload.inProcess}
    },

    [UiActions.Type.SEARCH_IN_PROCESS]: (state, action) => {
      if (action.payload.inProcess) {
        return {...state, searchInProcess: true, searchKeyword: action.payload.keyword}
      } else {
        return {...state, searchInProcess: false}
      }
    },

    [UiActions.Type.ERROR]: (state, action) => {
      return {...state, error: action.payload.error}
    },
  },
  initialState
)
