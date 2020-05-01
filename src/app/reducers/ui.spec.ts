import { uiReducer } from './ui'
import { UiActions } from '../actions'

describe('search reducer', () => {
  it('should return the initial state', () => {
    expect(uiReducer(undefined, {} as any)).toEqual({
      trackInProcess: [],
      playlistsInProcess: false,
      searchInProcess: false,
      searchKeyword: undefined,
      error: undefined
    })
  })

  it('should handle TRACK_IN_PROCESS when track is in process', () => {
    const expectedPayload = {
      inProcess: true,
      trackId: 'trackId'
    }
    expect(uiReducer(undefined, {
      type: UiActions.Type.TRACK_IN_PROCESS,
      payload: expectedPayload
    })).toEqual({
      trackInProcess: ['trackId'],
      playlistsInProcess: false,
      searchInProcess: false,
      searchKeyword: undefined,
      error: undefined
    })
  })

  it('should handle TRACK_IN_PROCESS when track is not in process', () => {
    const expectedPayload = {
      inProcess: false,
      trackId: 'trackId'
    }
    expect(uiReducer({
      trackInProcess: ['trackId'],
      playlistsInProcess: false,
      searchInProcess: false,
      searchKeyword: undefined,
      error: undefined
    }, {
      type: UiActions.Type.TRACK_IN_PROCESS,
      payload: expectedPayload
    })).toEqual({
      trackInProcess: [],
      playlistsInProcess: false,
      searchInProcess: false,
      searchKeyword: undefined,
      error: undefined
    })
  })

  it('should handle PLAYLISTS_IN_PROCESS', () => {
    const expectedPayload = {
      inProcess: true
    }
    expect(uiReducer(undefined, {
      type: UiActions.Type.PLAYLISTS_IN_PROCESS,
      payload: expectedPayload
    })).toEqual({
      trackInProcess: [],
      playlistsInProcess: true,
      searchInProcess: false,
      searchKeyword: undefined,
      error: undefined
    })
  })

  it('should handle SEARCH_IN_PROCESS', () => {
    const expectedPayload = {
      inProcess: true,
      keyword: 'keyword'
    }
    expect(uiReducer(undefined, {
      type: UiActions.Type.SEARCH_IN_PROCESS,
      payload: expectedPayload
    })).toEqual({
      trackInProcess: [],
      playlistsInProcess: false,
      searchInProcess: true,
      searchKeyword: 'keyword',
      error: undefined
    })
  })

  it('should handle ERROR', () => {
    const expectedPayload = {
      error: new Error('Error')
    }
    expect(uiReducer(undefined, {
      type: UiActions.Type.ERROR,
      payload: expectedPayload
    })).toEqual({
      trackInProcess: [],
      playlistsInProcess: false,
      searchInProcess: false,
      searchKeyword: undefined,
      error: expectedPayload.error
    })
  })
})
