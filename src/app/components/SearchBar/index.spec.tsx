import '@testing-library/jest-dom'
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import SearchBar from './index'
import { rootInitialState, rootReducer } from '../../reducers'

const renderWithRedux = (
  component: any,
  {initialState, store = createStore(rootReducer, initialState)} = {} as any
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  }
}

describe('SearchBar Component', () => {
  const expectTrack = {
    id: 'id',
    name: 'name',
  }
  const expectTitle = 'A'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should fire event after submit', () => {
    const {store, getByTestId} = renderWithRedux(
      <SearchBar/>,
      {initialState: rootInitialState}
    )

    expect(screen.queryByLabelText('search')).toBeInTheDocument()
    expect(screen.getByTestId('submit')).toBeInTheDocument()

    fireEvent.change(screen.queryByLabelText('search') as any, {target: {value: 'a'}})
  })
})

