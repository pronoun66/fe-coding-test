import thunk from 'redux-thunk'
import axios from 'axios'

import configureMockStore from 'redux-mock-store'
import '../../../test/util'
import { PlaylistTrackActions, TrackActions, UiActions } from './index'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('PlaylistTrack Action', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Add', () => {
    const expectedPlaylistId = 'playlistID'
    const expectedTrack = {
      id: 'trackId',
      name: 'trackName',
    } as any

    it('add a track into playlist', async () => {
      jest.spyOn(axios, 'post').mockResolvedValue(null)

      const expectedActions = [
        {type: UiActions.Type.TRACK_IN_PROCESS, payload: {inProcess: true, trackId: expectedTrack.id}},
        {
          type: PlaylistTrackActions.Type.ADD_TO_PLAYLIST,
          payload: {playlistId: expectedPlaylistId, trackId: expectedTrack.id}
        },
        {type: TrackActions.Type.ADD, payload: expectedTrack},
        {type: UiActions.Type.TRACK_IN_PROCESS, payload: {inProcess: false, trackId: expectedTrack.id}},
      ]

      const store = mockStore({})
      await store.dispatch(PlaylistTrackActions.add(expectedPlaylistId, expectedTrack) as any)
      expect(store.getActions()).toEqual(expectedActions)
    })

    it('failed to add a track into playlist', async () => {
      const expectedError = new Error('error')
      jest.spyOn(axios, 'post').mockRejectedValue(new Error('error'))

      const expectedActions = [
        {type: UiActions.Type.TRACK_IN_PROCESS, payload: {inProcess: true, trackId: expectedTrack.id}},
        {type: UiActions.Type.ERROR, payload: {error: expectedError}},
        {type: UiActions.Type.TRACK_IN_PROCESS, payload: {inProcess: false, trackId: expectedTrack.id}},
      ]

      const store = mockStore({})
      await store.dispatch(PlaylistTrackActions.add(expectedPlaylistId, expectedTrack) as any)
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  describe('REMOVE', () => {
    const expectedPlaylistId = 'playlistID'
    const expectedTrack = {
      id: 'trackId',
      name: 'trackName',
    } as any

    it('remove a track from playlist', async () => {
      jest.spyOn(axios, 'delete').mockResolvedValue(null)

      const expectedActions = [
        {type: UiActions.Type.TRACK_IN_PROCESS, payload: {inProcess: true, trackId: expectedTrack.id}},
        {
          type: PlaylistTrackActions.Type.REMOVE_FROM_PLAYLIST,
          payload: {playlistId: expectedPlaylistId, trackId: expectedTrack.id}
        },
        {type: UiActions.Type.TRACK_IN_PROCESS, payload: {inProcess: false, trackId: expectedTrack.id}},
      ]

      const store = mockStore({})
      await store.dispatch(PlaylistTrackActions.remove(expectedPlaylistId, expectedTrack) as any)
      expect(store.getActions()).toEqual(expectedActions)
    })

    it('failed to remove a track from playlist', async () => {
      const expectedError = new Error('error')
      jest.spyOn(axios, 'delete').mockRejectedValue(expectedError)

      const expectedActions = [
        {type: UiActions.Type.TRACK_IN_PROCESS, payload: {inProcess: true, trackId: expectedTrack.id}},
        {type: UiActions.Type.ERROR, payload: {error: expectedError}},
        {type: UiActions.Type.TRACK_IN_PROCESS, payload: {inProcess: false, trackId: expectedTrack.id}},
      ]

      const store = mockStore({})
      await store.dispatch(PlaylistTrackActions.remove(expectedPlaylistId, expectedTrack) as any)
      expect(store.getActions()).toEqual(expectedActions)
    })
  })


})
