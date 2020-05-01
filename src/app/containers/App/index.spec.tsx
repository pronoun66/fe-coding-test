import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { App } from './index'
import { Provider } from 'react-redux'
import { rootInitialState } from '../../reducers'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])

const renderWithRedux = (
  component: any,
  {initialState, store = mockStore(initialState)} = {} as any
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  }
}

describe('App Component', () => {
  const expectTrack = {
    id: 'id',
    name: 'name',
  }
  const expectTitle = 'A'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render page', () => {
    renderWithRedux(
      <App {...{
        history: {} as any,
        location: {} as any,
        match: {} as any
      }}/>,
      {initialState: rootInitialState}
    )

    expect(screen.queryByText('Loading...')).toBeNull()
  })
})

