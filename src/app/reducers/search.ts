import { handleActions } from 'redux-actions'
import { RootState } from './state'
import { SearchActions } from '../actions'
import { SearchModel } from '../models'

export const initialState: RootState.SearchState = {}

export const searchReducer = handleActions<RootState.SearchState, SearchModel>(
  {
    [SearchActions.Type.TRACKS]: (state, action) => {
      return action.payload
    },
  },
  initialState
)
