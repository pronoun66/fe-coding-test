import { searchReducer } from './search'
import { SearchActions } from '../actions'
import { SearchModel } from '../models'

describe('search reducer', () => {
  it('should return the initial state', () => {
    expect(searchReducer(undefined, {} as any)).toEqual({})
  })

  it('should handle TRACKS', () => {
    const data = {
      tracks: {
        items: [{
          id: 'id'
        }]
      }
    } as SearchModel
    expect(searchReducer(undefined, {
      type: SearchActions.Type.TRACKS,
      payload: data as any
    })).toEqual(data)
  })
})
