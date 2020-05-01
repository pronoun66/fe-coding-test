// @ts-ignore
import jwt from 'jsonwebtoken'

export const genAuthToken = ({accessToken, refreshToken, expiresIn = 3600, userId}: any) => {
  const authToken = jwt.sign({
    accessToken,
    refreshToken,
    userId,
  }, process.env.JWT_SECRET, {expiresIn})

  sessionStorage.setItem('authToken', authToken)
}

export const isAuthorised = () => {
  const authToken = sessionStorage.getItem('authToken')
  if (authToken) {
    try {
      const {accessToken, refreshToken, userId} = jwt.verify(authToken, process.env.JWT_SECRET)
      return true
    } catch (err) {
      console.log('authToken verification error',)
    }
  }
  return false
}

export const getDecodedToken = () => {
  const authToken = sessionStorage.getItem('authToken')
  if (authToken) {
    try {
      const {accessToken, refreshToken, userId} = jwt.decode(authToken)
      return {accessToken, refreshToken, userId}
    } catch (err) {
      console.log('authToken decoding error',)
    }
  }
  return {}
}

