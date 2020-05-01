# Frontend coding test
Create a single page application that can be used to search for songs on Spotify. The user should be able to select songs from the result list to add to a playlist. This playlist they have created can then be saved on their Spotify account.

## Installation

```
$ npm ci
```

## Running
Copy `.env.example` into `.env`
```
$ cp .env.example .env
```
Refill blank values for environment variables in `.env`
```
SPOTIFY_ACCOUNT_API_URL=
SPOTIFY_ACCOUNT_CALLBACK_URL=
SPOTIFY_WEB_API_URL=
SPOTIFY_API_CLIENT_ID=
SPOTIFY_API_CLIENT_SECRET=
JWT_SECRET={secret}
```
Start application

```
$ npm start
```

Then open [http://localhost:3000/](http://localhost:3000/)

## Building

```
$ npm run build
```

## Testing

```
$ npm test
```

## Linting

```
$ npm run lint
```

## Tech stack

- [x] [Typescript](https://www.typescriptlang.org/)
- [x] [React](https://facebook.github.io/react/)
- [x] [Redux](https://github.com/reactjs/redux)
- [x] [Webpack](https://webpack.github.io)
- [x] [Materical UI](https://www.npmjs.com/package/@material-ui/core)
- [x] [Jest](https://www.npmjs.com/package/jest)
- [x] [@testing-library/react](https://www.npmjs.com/package/@testing-library/react)
- [x] [Eslint](https://www.npmjs.com/package/eslint)
- [x] [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

## Code Structure
In `/src` folder
  
`/app`  
- `/actions` redux actions   
- `/components` react functional components  
- `/containers` react containers (mapping to react-router)  
- `/middleware` redux middleware  
- `/models` type definition  
- `/reducers` redux reducers  
- `/store` redux store
- `/utils` utilities

`/assets` static files  
`main.tsx` main application



## TODO
- More unit tests for view components
- More integration tests with Selenium or Cypress