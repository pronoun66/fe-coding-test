import { useMemo } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { TrackModel } from '../models'
import { getDecodedToken } from '../utils'
import axios from 'axios'
import { TrackActions } from './track'
import { UiActions } from './ui'


export namespace PlaylistTrackActions {
  export enum Type {
    SET = 'PLAYLIST_TRACK_ACTIONS_SET',
    ADD_TO_PLAYLIST = 'PLAYLIST_TRACK_ACTIONS_ADD_TO_PLAYLIST',
    REMOVE_FROM_PLAYLIST = 'PLAYLIST_TRACK_ACTIONS_REMOVE_FROM_PLAYLIST',
  }

  const baseAction = async (dispatch: any, track: TrackModel, func: any) => {
    dispatch({
      type: UiActions.Type.TRACK_IN_PROCESS,
      payload: {
        trackId: track.id,
        inProcess: true
      }
    })

    try {
      await func()
    } catch (error) {
      dispatch({
        type: UiActions.Type.ERROR,
        payload: {
          error,
        }
      })
    } finally {
      return dispatch({
        type: UiActions.Type.TRACK_IN_PROCESS,
        payload: {
          trackId: track.id,
          inProcess: false
        }
      })
    }
  }

  export const add = (playlistId: string, track: TrackModel) => async (dispatch: any) => {
    return baseAction(dispatch, track, async () => {
      const {accessToken} = getDecodedToken()
      await axios.post(`${process.env.SPOTIFY_WEB_API_URL}/v1/playlists/${playlistId}/tracks`, {
        uris: [track.uri]
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      })
      dispatch({
        type: Type.ADD_TO_PLAYLIST,
        payload: {
          playlistId,
          trackId: track.id
        }
      })
      dispatch({
        type: TrackActions.Type.ADD,
        payload: track
      })
    })
  }

  export const remove = (playlistId: string, track: TrackModel) => async (dispatch: any) => {
    return baseAction(dispatch, track, async () => {
      const {accessToken} = getDecodedToken()
      await axios.delete(`${process.env.SPOTIFY_WEB_API_URL}/v1/playlists/${playlistId}/tracks`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        data: {
          uris: [track.uri]
        }
      })
      dispatch({
        type: Type.REMOVE_FROM_PLAYLIST,
        payload: {
          playlistId,
          trackId: track.id
        }
      })
    })
  }
}

export type PlaylistTrackActions = Omit<typeof PlaylistTrackActions, 'Type'>
export const usePlaylistTrackActions = (dispatch: Dispatch) => {
  const {Type, ...actions} = PlaylistTrackActions
  return useMemo(() => bindActionCreators(actions as any, dispatch), [dispatch]) as PlaylistTrackActions
}
