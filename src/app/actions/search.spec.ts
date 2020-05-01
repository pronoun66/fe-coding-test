import thunk from 'redux-thunk'
import axios from 'axios'
import configureMockStore from 'redux-mock-store'
import '../../../test/util'
import { SearchActions, UiActions } from './index'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Search Action', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('searchTrack', () => {
    const expectedQuery = 'xxxxx'

    const expectedSearchResult = {
      data: {
        tracks: {
          items: [{
            id: 'id',
            name: 'name',
          }]
        }
      }
    }

    it('search tracks with query', async () => {
      jest.spyOn(axios, 'get').mockResolvedValue(expectedSearchResult)

      const expectedActions = [
        {type: UiActions.Type.SEARCH_IN_PROCESS, payload: {inProcess: true, keyword: expectedQuery}},
        {type: SearchActions.Type.TRACKS, payload: expectedSearchResult.data},
        {type: UiActions.Type.SEARCH_IN_PROCESS, payload: {inProcess: false}},
      ]

      const store = mockStore({})
      await store.dispatch(SearchActions.searchTrack(expectedQuery) as any)
      expect(store.getActions()).toEqual(expectedActions)
    })

    it('failed to search tracks with query', async () => {
      const expectedError = new Error('error')
      jest.spyOn(axios, 'get').mockRejectedValue(expectedError)

      const expectedActions = [
        {type: UiActions.Type.SEARCH_IN_PROCESS, payload: {inProcess: true, keyword: expectedQuery}},
        {type: UiActions.Type.ERROR, payload: {error: expectedError}},
        {type: UiActions.Type.SEARCH_IN_PROCESS, payload: {inProcess: false}},
      ]

      const store = mockStore({})
      await store.dispatch(SearchActions.searchTrack(expectedQuery) as any)
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

})
