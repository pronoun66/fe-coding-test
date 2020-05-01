import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'
import Track from './index'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from '../../reducers'
import { initialState } from '../../reducers/ui'

const renderWithRedux = (
  component: any,
  {initialState, store = createStore(rootReducer, initialState)} = {} as any
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  }
}

describe('Track Component', () => {
  const expectTrack = {
    id: 'id',
    name: 'name',
  }
  const expectTitle = 'A'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('show loading if in process', () => {
    const {queryByTestId} = renderWithRedux(
      <div>
        <Track {...{
          track: expectTrack as any,
          playlistId: 'xxx',
        }} />
      </div>,
      {initialState: {ui: {...initialState, ...{trackInProcess: ['id']}}}}
    )

    expect(queryByTestId('in-process')).toBeInTheDocument()
  })

  test('show track if not in process', () => {
    const {queryByTestId} = renderWithRedux(
      <div>
        <Track {...{
          track: expectTrack as any,
          playlistId: 'xxx',
        }} />
      </div>
    )

    expect(queryByTestId('in-process')).toBeNull()
  })
})

