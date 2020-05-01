import { useMemo } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import axios, { AxiosResponse } from 'axios'
import { SearchModel } from '../models'
import { getDecodedToken } from '../utils'
import { UiActions } from './ui'


export namespace SearchActions {
  export enum Type {
    TRACKS = 'SEARCH_ACTIONS_TRACKS',
  }

  export const searchTrack = (query: string) => async (dispatch: any) => {
    try {
      dispatch({
        type: UiActions.Type.SEARCH_IN_PROCESS,
        payload: {
          inProcess: true,
          keyword: query
        }
      })

      const {accessToken} = getDecodedToken()
      const result: AxiosResponse<SearchModel> = await axios.get(`${process.env.SPOTIFY_WEB_API_URL}/v1/search`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        params: {
          q: query,
          type: 'track'
        }
      })
      return dispatch({
        type: Type.TRACKS,
        payload: result.data
      })
    } catch (error) {
      return dispatch({
        type: UiActions.Type.ERROR,
        payload: {
          error
        }
      })
    } finally {
      return dispatch({
        type: UiActions.Type.SEARCH_IN_PROCESS,
        payload: {
          inProcess: false
        }
      })
    }
  }
}

export type SearchActions = Omit<typeof SearchActions, 'Type'>
export const useSearchActions = (dispatch: Dispatch) => {
  const {Type, ...actions} = SearchActions
  return useMemo(() => bindActionCreators(actions as any, dispatch), [dispatch]) as SearchActions
}
