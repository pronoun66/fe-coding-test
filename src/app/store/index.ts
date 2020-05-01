import { applyMiddleware, createStore, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer, RootState } from 'app/reducers'
import { logger, thunk } from 'app/middleware'

export function configureStore(initialState?: RootState): Store<RootState> {
  let middleware = applyMiddleware(thunk, logger)

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware)
  }

  const store = createStore(rootReducer as any, initialState as any, middleware) as Store<RootState>

  if (module.hot) {
    module.hot.accept('app/reducers', () => {
      const nextReducer = require('app/reducers') // eslint-disable-line @typescript-eslint/no-var-requires
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
