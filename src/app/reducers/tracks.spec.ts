import { tracksReducer } from './tracks'
import { TrackActions } from '../actions'
import { TrackModel } from 'app/models'

describe('search reducer', () => {
  it('should return the initial state', () => {
    expect(tracksReducer(undefined, {} as any)).toEqual({})
  })

  it('should handle SET', () => {
    const tracks = [{
      id: 'id'
    }] as TrackModel[]
    expect(tracksReducer(undefined, {
      type: TrackActions.Type.SET,
      payload: tracks as any
    })).toEqual({
      [tracks[0].id]: tracks[0]
    })
  })

  it('should handle ADD', () => {
    const track = {
      id: 'id'
    } as TrackModel
    expect(tracksReducer(undefined, {
      type: TrackActions.Type.ADD,
      payload: track as any
    })).toEqual({
      [track.id]: track
    })
  })
})
