import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import Tracks from './index'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from '../../reducers'

jest.mock('../Track', () => {
  return {
    __esModule: true,
    default: () => <div/>
  }
})

const renderWithRedux = (
  component: any,
  {initialState, store = createStore(rootReducer, initialState)} = {} as any
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  }
}

describe('Tracks Component', () => {
  const expectTracks = [{
    id: 'id',
    name: 'name',
  }]
  const expectTitle = 'A'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('show title if exists', () => {
    renderWithRedux(
      <div>
        <Tracks {...{
          tracks: expectTracks as any,
          playlistId: 'xxx',
          title: expectTitle,
        }} />
      </div>)

    expect(screen.queryByText(expectTitle)).toBeInTheDocument()
  })

  test('hide title if not exist', () => {
    renderWithRedux(
      <div>
        <Tracks {...{
          tracks: expectTracks as any,
          playlistId: 'xxx',
        }} />
      </div>)

    expect(screen.queryByText(expectTitle)).toBeNull()
  })
})

