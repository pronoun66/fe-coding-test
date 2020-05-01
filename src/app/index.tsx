import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { App as Main } from 'app/containers/App'
import { Auth, AuthCallback, AuthRefreshToken } from 'app/containers/Auth'
import { hot } from 'react-hot-loader'
import { isAuthorised } from 'app/utils'


export const App = hot(module)(() => (
  <Switch>
    <Route path="/callback" component={AuthCallback}/>
    <Route path="/refresh_token" component={AuthRefreshToken}/>
    <Route path="/login" component={Auth}/>

    <PrivateRoute path="/" component={Main}/>
  </Switch>
))

const PrivateRoute = ({component, ...rest}: any) => {
  const isAuthed = isAuthorised()

  return (
    <Route
      {...rest}
      component={(props: any) =>
        isAuthed ? (
          React.createElement(component, props)
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {from: props.location}
            }}
          />
        )
      }
    />
  )
}
