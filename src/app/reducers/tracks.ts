import { handleActions } from 'redux-actions'
import { RootState } from './state'
import { TrackActions } from '../actions'
import { TrackModel } from '../models'

export const initialState: RootState.TracksState = {}

export const tracksReducer = handleActions<RootState.TracksState, TrackModel[] & TrackModel>(
  {
    [TrackActions.Type.SET]: (state, action) => {
      return {
        ...state, ...action.payload.reduce((acc: { [key: string]: TrackModel }, track: TrackModel) => {
          acc[track.id] = track
          return acc
        }, {})
      }
    },
    [TrackActions.Type.ADD]: (state, action) => {
      return {...state, ...{[action.payload.id]: action.payload}}
    },
  },
  initialState
)
