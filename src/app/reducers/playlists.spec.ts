import { playlistsReducer } from './playlists'
import { PlaylistActions } from '../actions'

describe('playlists reducer', () => {
  it('should return the initial state', () => {
    expect(playlistsReducer(undefined, {} as any)).toEqual({})
  })

  it('should handle SET', () => {
    const playlists = [{
      id: 'id',
      name: 'name'
    }]
    expect(playlistsReducer(undefined, {
      type: PlaylistActions.Type.SET,
      payload: playlists as any
    })).toEqual({
      'id': playlists[0]
    })
  })

  it('should handle ADD', () => {
    const playlists = {
      id: 'id',
      name: 'name'
    }
    expect(playlistsReducer(undefined, {
      type: PlaylistActions.Type.ADD,
      payload: playlists as any
    })).toEqual({
      [playlists.id]: playlists
    })
  })
})
