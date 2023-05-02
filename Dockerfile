FROM node:16

WORKDIR /app

COPY package*.json ./

# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 4000

ENV NODE_ENV production

CMD [ "npm", "start" ]
