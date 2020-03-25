# Exchange money app

- Front-End: React, Redux Toolkit, ESLint and Ant Design
- Backend: ExpressJS
- Database: FaunaDB
- Rates API: https://exchangeratesapi.io/


## Live
Running on Netlify using Netlify-Lambda
> Live app: https://exchange.yolaine.dev/

> Widget view: https://exchange.yolaine.dev/widget


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
Using FaunaDB
```
export MONEY_DB_KEY=YOUR_FAUNA_DB_API_KEY
yarn install
yarn start.server
```

## Setup App
```
yarn install
yarn start
```

## TODO
- The tests are only testing the server and the app. The store is currently not tested.
- Adding singleton for pure components for avoiding useless rendering
