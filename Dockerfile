# Use docker image for debugging
FROM node:18
RUN git config --global url."https://github".insteadOf git://github
COPY . /src
WORKDIR /src
Run npm install

ENTRYPOINT ["node", "error-agent.js"]