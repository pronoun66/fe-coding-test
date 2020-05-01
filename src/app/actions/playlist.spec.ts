import thunk from 'redux-thunk'
import axios from 'axios'
import configureMockStore from 'redux-mock-store'
import '../../../test/util'
import { PlaylistActions, PlaylistTrackActions, TrackActions, UiActions } from './index'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Playlist Action', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('SET', () => {
    const expectedPlaylists = [{
      id: 'playlistId',
      name: 'test_playlistName',
    }]

    const expectedTrack = {
      id: 'trackId',
      name: 'trackName',
    }

    it('set playlists', async () => {
      jest.spyOn(axios, 'get').mockImplementation((url: string) => {
        if (url.includes('tracks')) {
          return Promise.resolve({
            data: {
              items: [{
                track: expectedTrack
              }]
            }
          })
        }

        return Promise.resolve({
          data: {
            items: expectedPlaylists
          }
        })
      })

      const expectedActions = [
        {type: UiActions.Type.PLAYLISTS_IN_PROCESS, payload: {inProcess: true}},
        {type: PlaylistActions.Type.SET, payload: expectedPlaylists},
        {type: PlaylistTrackActions.Type.SET, payload: {[expectedPlaylists[0].id]: [expectedTrack.id]}},
        {type: TrackActions.Type.SET, payload: [expectedTrack]},
        {type: UiActions.Type.PLAYLISTS_IN_PROCESS, payload: {inProcess: false}},
      ]

      const store = mockStore({
        playlists: {},
        playlistTracks: {},
        tracks: {},
        ui: {
          trackInProcess: [],
          playlistsInProcess: false,
          searchInProcess: false,
          searchKeyword: undefined,
          error: undefined
        }
      })

      await store.dispatch(PlaylistActions.set() as any)
      expect(store.getActions()).toEqual(expectedActions)
    })

    it('failed to set playlists', async () => {
      const expectedError = new Error('error')
      jest.spyOn(axios, 'get').mockRejectedValue(new Error('error'))

      const expectedActions = [
        {type: UiActions.Type.PLAYLISTS_IN_PROCESS, payload: {inProcess: true}},
        {type: UiActions.Type.ERROR, payload: {error: expectedError}},
        {type: UiActions.Type.PLAYLISTS_IN_PROCESS, payload: {inProcess: false}},
      ]

      const store = mockStore({
        playlists: {},
        ui: {
          trackInProcess: [],
          playlistsInProcess: false,
          searchInProcess: false,
          searchKeyword: undefined,
          error: undefined
        }
      })

      await store.dispatch(PlaylistActions.set() as any)
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  describe('Add', () => {
    const expectedPlaylist = {
      id: 'id',
      name: 'name',
    }

    it('add a playlist', async () => {
      jest.spyOn(axios, 'post').mockResolvedValue({data: expectedPlaylist})

      const expectedActions = [
        {type: UiActions.Type.PLAYLISTS_IN_PROCESS, payload: {inProcess: true}},
        {type: PlaylistActions.Type.ADD, payload: expectedPlaylist},
        {type: UiActions.Type.PLAYLISTS_IN_PROCESS, payload: {inProcess: false}},
      ]

      const store = mockStore({
        playlists: {},
        ui: {
          trackInProcess: [],
          playlistsInProcess: false,
          searchInProcess: false,
          searchKeyword: undefined,
          error: undefined
        }
      })

      await store.dispatch(PlaylistActions.add(expectedPlaylist.name) as any)
      expect(store.getActions()).toEqual(expectedActions)
    })

    it('failed to add a playlist', async () => {
      const expectedError = new Error('error')
      jest.spyOn(axios, 'post').mockRejectedValue(expectedError)

      const expectedActions = [
        {type: UiActions.Type.PLAYLISTS_IN_PROCESS, payload: {inProcess: true}},
        {type: UiActions.Type.ERROR, payload: {error: expectedError}},
        {type: UiActions.Type.PLAYLISTS_IN_PROCESS, payload: {inProcess: false}},
      ]

      const store = mockStore({
        playlists: {},
        ui: {
          trackInProcess: [],
          playlistsInProcess: false,
          searchInProcess: false,
          searchKeyword: undefined,
          error: undefined
        }
      })

      await store.dispatch(PlaylistActions.add(expectedPlaylist.name) as any)
      expect(store.getActions()).toEqual(expectedActions)
    })
  })


})
