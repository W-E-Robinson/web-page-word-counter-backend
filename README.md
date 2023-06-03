# web-page-word-counter-frontend

This is a Molecular application that provides a service to analyse a web page URL for both a count of the words on the page as well as a breakdown of word frequency.

Accompanying frontend repo: [web-page-word-counter-frontend](https://github.com/W-E-Robinson/web-page-word-counter-frontend).

## Run app in development mode

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Run as kubernetes workloads

```bash
  TO_DO
```

## Run tests

```bash
  npm test
```

## Services
- **api**: API Gateway services
- **counter**: Service that returns the word analysis

## Used git hooks

[pre-push: jest](https://github.com/W-E-Robinson/git-hooks/blob/main/pre-push/jest.sh)

## Tech Stack

Molecular, Javascript, Axios, Docker, Jest, Cheerio
