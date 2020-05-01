import { RouteComponentProps } from 'react-router'
// @ts-ignore
import qs from 'qs'
import React from 'react'
import axios from 'axios'

import FullScreenSpinning from 'app/components/FullScreenSpinning'
import { genAuthToken, getDecodedToken } from 'app/utils'

const SCOPE = 'user-read-private user-read-email playlist-modify-private playlist-modify-public user-follow-modify'

interface Props extends RouteComponentProps<void> {
}

export const Auth = ({history, location}: any) => {
  const {from} = location.state

  const {refreshToken} = getDecodedToken() || {}
  if (refreshToken) {
    const params = qs.stringify({
      refresh_token: refreshToken,
      from: from.pathname,
    })

    window.location.replace(`/refresh_token?${params}`)
  } else {

    const params = qs.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_API_CLIENT_ID,
      scope: SCOPE,
      redirect_uri: process.env.SPOTIFY_ACCOUNT_CALLBACK_URL,
    })

    window.location.replace(`https://accounts.spotify.com/authorize?${params}`)
  }

  return <div/>
}

export const AuthCallback = ({history, location}: Props) => {
  const {code, from} = qs.parse(location.search, {ignoreQueryPrefix: true})
  getTokenFromAuthCode(code)
    .then(({access_token, refresh_token, expires_in}) => {
      return genTokenWithUserData(access_token, refresh_token, expires_in)
    }).then(() => {
    window.location.replace('/')
  })
    .catch(err => {
      console.log('err', err)
    })

  return <FullScreenSpinning/>
}

export const AuthRefreshToken = ({history, location}: Props) => {
  const {refresh_token, from} = qs.parse(location.search, {ignoreQueryPrefix: true})
  getTokenFromRefreshToken(refresh_token)
    .then(({access_token, expires_in}) => {
      return genTokenWithUserData(access_token, refresh_token, expires_in)
    }).then(() => {

    window.location.replace(from)
  })
    .catch(err => {
      console.log('err', err)
    })
  return <FullScreenSpinning/>
}

const getTokenFromAuthCode = async (code: string) => {
  const authorization =
    new Buffer(`${process.env.SPOTIFY_API_CLIENT_ID}:${process.env.SPOTIFY_API_CLIENT_SECRET}`)
      .toString('base64')

  const {data}: any = await axios({
    url: `${process.env.SPOTIFY_ACCOUNT_API_URL}/token`,
    method: 'POST',
    headers: {
      Authorization: `Basic ${authorization}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      code: code,
      redirect_uri: process.env.SPOTIFY_ACCOUNT_CALLBACK_URL,
      grant_type: 'authorization_code'
    }),
  })
  return data
}

const getTokenFromRefreshToken = async (refreshToken: string) => {
  const authorization =
    new Buffer(`${process.env.SPOTIFY_API_CLIENT_ID}:${process.env.SPOTIFY_API_CLIENT_SECRET}`)
      .toString('base64')

  const {data}: any = await axios({
    url: `${process.env.SPOTIFY_ACCOUNT_API_URL}/token`,
    method: 'POST',
    headers: {
      Authorization: `Basic ${authorization}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }),
  })
  return data
}

const genTokenWithUserData = async (accessToken: string, refreshToken: string, expiresIn: number = 3600) => {
  const {data}: any = await axios({
    url: `${process.env.SPOTIFY_WEB_API_URL}/v1/me`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }
  })

  genAuthToken({accessToken, refreshToken, expiresIn, userId: data.id})
}
