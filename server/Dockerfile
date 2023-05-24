######################################
# BUILD FOR LOCAL DEVELOPMENT
######################################

FROM node:18-alpine As development

WORKDIR /usr/src/app

# Pre-create the nestjs dist folder and grant permissions to node (1000)
RUN mkdir -p dist
RUN chown -R node:node dist

COPY --chown=node:node package*.json yarn*.lock ./

RUN yarn ci

COPY --chown=node:node . .

USER node

######################################
# BUILD FOR PRODUCTION
######################################

FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

RUN yarn run build

RUN yarn ci --production && yarn cache clean --force

USER node

######################################
# PRODUCTION
######################################

FROM node:18-alpine As production

# Import and run the env folder on the assumption that the docker image is built with env files.
# If env is not included in the image creation step, you must include it in .dockerignore and delete the line.
COPY --chown=node:node --from=build /usr/src/app/envs ./envs
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main" ]
