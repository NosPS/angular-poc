###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:gallium-alpine As development

WORKDIR /apps/angular-service

COPY --chown=node:node package*.json ./

RUN npm install --force

COPY --chown=node:node . .

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:gallium-alpine As build

WORKDIR /apps/angular-service

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /apps/angular-service/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm install -g nest --force

RUN npm run build app

RUN npm install --force --only=production && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:gallium-alpine As production

COPY --chown=node:node --from=build /apps/angular-service/package.json ./package.json
COPY --chown=node:node --from=build /apps/angular-service/node_modules ./node_modules
COPY --chown=node:node --from=build /apps/angular-service/dist ./dist
# COPY --chown=node:node --from=build /apps/app/.env.local .

CMD [ "npm", "run", "start:prod:angular-service" ]