# web-page-word-counter-backend

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

To view API information visit

```bash
localhost:3000
```

## Run as Kubernetes workloads

### Required installations (Docker, Kubernetes, Minikube, gettext)

```bash
docker login
```
```bash
docker tag web-page-word-counter-backend <your-docker-hub-username>/web-page-word-counter-backend .
```
```bash
docker push <your-docker-hub-username>/web-page-word-counter-backend
```
```bash
minikube start
```
```bash
minikube addons enable ingress
```
```bash
export DOCKER_HUB_USERNAME="<your-docker-hub-username>"
```
```bash
envsubst < k8s.yaml | kubectl apply -f -
```
```bash
kubectl port-forward service/api 30099:80
```
```bash
minikube dashboard
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

Molecular, Javascript, Axios, Docker, Kubernetes, Minikube, Jest, Cheerio

