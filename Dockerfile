# set the base image
FROM node:8.6.0-slim

# set working directory and copy our application code to it
WORKDIR /usr/src/todo-app
COPY . .

# prepare application
RUN npm install
RUN npm run build

# specify the port number the container should expose
ENV PORT=3000
EXPOSE ${PORT}

# start the application
CMD ["node", "./server.js"]
