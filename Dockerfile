#ARG NODE_VERSION=18
#
##FROM node:${NODE_VERSION}-slim as base
#FROM node:${NODE_VERSION}-alpine as base
#
#ARG PORT=3000
#
#ENV NODE_ENV=production
#
#WORKDIR /src
#
## Build
#FROM base as build
#
#COPY --link package.json package-lock.json ./
#RUN apk --no-cache --virtual build-dependencies add \
#        python3 \
#        make \
#        g++ \
#&& npm install --production=false \
#&& apk del build-dependencies
##RUN apk --no-cache add python make g++ \
##    npm install --production=false
#
#COPY --link . .
#
#RUN npm run build
#RUN npm prune
#
## Run
#FROM base
#
#ENV PORT=$PORT
#
#COPY --from=build /src/.output /src/.output
## Optional, only needed if you rely on unbundled dependencies
## COPY --from=build /src/node_modules /src/node_modules
#
#CMD [ "node", ".output/server/index.mjs" ]

# Use the official Node.js v16 image as the base
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Generate the Prisma client
RUN npx prisma generate

# Apply database migrations
RUN chmod 400 keyfile
# RUN npx prisma db push

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]