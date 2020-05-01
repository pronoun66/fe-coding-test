import { useMemo } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { PlaylistModel, TrackModel } from '../models'
import { getDecodedToken } from '../utils'
import axios from 'axios'
import { TrackActions } from './track'
import { PlaylistTrackActions } from './playlistTrack'
import { UiActions } from './ui'

const PLAYLIST_NAME_PREFIX = 'test_'

export namespace PlaylistActions {
  export enum Type {
    SET = 'PLAYLIST_ACTIONS_SET',
    ADD = 'PLAYLIST_ACTIONS_ADD',
  }

  const baseAction = async (dispatch: any, func: any) => {
    dispatch({
      type: UiActions.Type.PLAYLISTS_IN_PROCESS,
      payload: {
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
        type: UiActions.Type.PLAYLISTS_IN_PROCESS,
        payload: {
          inProcess: false
        }
      })
    }
  }

  // TODO need to support pagination
  export const set = () => (dispatch: any) => {
    return baseAction(dispatch, async () => {
      const {accessToken, userId} = getDecodedToken()
      const {data} = await axios.get(`${process.env.SPOTIFY_WEB_API_URL}/v1/users/${userId}/playlists`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      })

      const playlists = (data.items || [])
        .filter((playlist: any) => playlist.name.includes(PLAYLIST_NAME_PREFIX))
        .map((playlist: any) => {
          playlist.name = playlist.name.replace(PLAYLIST_NAME_PREFIX, '')
          return playlist
        }) as PlaylistModel[]

      dispatch({
        type: Type.SET,
        payload: playlists
      })

      await Promise.all(playlists.map(async (playlist) => {
        const {data} = await axios.get(`${process.env.SPOTIFY_WEB_API_URL}/v1/playlists/${playlist.id}/tracks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        })

        const tracks = data.items.map((track: any) => track.track) as TrackModel[]

        dispatch({
          type: PlaylistTrackActions.Type.SET,
          payload: {
            [playlist.id]: tracks.map(track => track.id)
          }
        })
        dispatch({
          type: TrackActions.Type.SET,
          payload: tracks,
        })
      }))
    })
  }

  export const add = (playlistName: string) => async (dispatch: any) => {
    return baseAction(dispatch, async () => {
      const {accessToken, userId} = getDecodedToken()
      const {data} = await axios.post(`${process.env.SPOTIFY_WEB_API_URL}/v1/users/${userId}/playlists`, {
        name: PLAYLIST_NAME_PREFIX + playlistName
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      })
      dispatch({
        type: Type.ADD,
        payload: {...data, name: data.name.replace(PLAYLIST_NAME_PREFIX, '')},
      })
    })
  }
}

export type PlaylistActions = Omit<typeof PlaylistActions, 'Type'>
export const usePlaylistActions = (dispatch: Dispatch) => {
  const {Type, ...actions} = PlaylistActions
  return useMemo(() => bindActionCreators(actions as any, dispatch), [dispatch]) as PlaylistActions
}
