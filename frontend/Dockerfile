# pull the base image
FROM node:16-alpine AS development

# set the working direction
WORKDIR /app

# install app dependencies
COPY package.json ./

COPY package-lock.json ./

RUN npm ci
RUN npm install react-scripts -g 

# add app
COPY . ./
