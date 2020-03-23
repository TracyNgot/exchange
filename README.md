# Exchange money app

- Front-End: React, Redux Toolkit, ESLint and Ant Design
- Backend: ExpressJS
- Database: FaunaDB
- Rates API: https://api.exchangeratesapi.io/


## Live
Running on Netlify using Netlify-Lambda
> Live app: https://exchange.yolaine.dev/

## Github Actions
It builds, lints and checks coverage

### Run tests locally
```
yarn test.ci
yarn test.server.ci
```

## Analyze bundles performance
```
yarn analyze
```

## Lint
```
yarn lint
```

## Setup Server
```
export MONEY_DB_KEY=YOUR_API_KEY
yarn install
yarn start.server
```

## Setup App
```
yarn install
yarn start
```

## TODO
- Missing design. Working on it
- The tests are only testing the server and the app. The store is currently not tested.
- Adding singleton for pure components for avoiding useless rendering
