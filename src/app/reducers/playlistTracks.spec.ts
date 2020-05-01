import { playlistTracksReducer } from './playlistTracks'
import { PlaylistTrackActions } from '../actions'

describe('playlistTracks reducer', () => {
  it('should return the initial state', () => {
    expect(playlistTracksReducer(undefined, {} as any)).toEqual({})
  })

  it('should handle SET', () => {
    const playlistTracks = {
      'playlistId': ['trackId']
    }
    expect(playlistTracksReducer(undefined, {
      type: PlaylistTrackActions.Type.SET,
      payload: playlistTracks as any
    })).toEqual({
      'playlistId': ['trackId']
    })
  })

  it('should handle ADD_TO_PLAYLIST', () => {
    const playlistTracks = {
      playlistId: 'playlistId',
      trackId: 'trackId',
    }
    expect(playlistTracksReducer(undefined, {
      type: PlaylistTrackActions.Type.ADD_TO_PLAYLIST,
      payload: playlistTracks as any
    })).toEqual({
      'playlistId': ['trackId']
    })
  })

  it('should handle REMOVE_FROM_PLAYLIST', () => {
    const playlistTracks = {
      playlistId: 'playlistId',
      trackId: 'trackId',
    }
    expect(playlistTracksReducer({
      'playlistId': ['trackId']
    }, {
      type: PlaylistTrackActions.Type.REMOVE_FROM_PLAYLIST,
      payload: playlistTracks as any
    })).toEqual({
      'playlistId': []
    })
  })
})
