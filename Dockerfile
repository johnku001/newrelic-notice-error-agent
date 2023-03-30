FROM node:18-slim
COPY . /src
WORKDIR /src
Run npm install

ENTRYPOINT ["node", "error-agent.js"]