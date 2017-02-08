FROM node:6-alpine

# Set env vars
ENV NODE_ENV=production
ENV NODE_CONFIG='{"db":{"host":"db","port":27017,"db":"oscars"}}'

# Install app
RUN [ "mkdir", "-p", "/usr/local/app" ]
COPY [ "package.json", "/usr/local/app" ]
COPY [ ".", "/usr/local/app" ]
WORKDIR /usr/local/app
RUN npm install

# Start application
CMD [ "npm", "start" ]
