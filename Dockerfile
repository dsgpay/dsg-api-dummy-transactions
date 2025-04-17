FROM node:20-slim
WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY . .
RUN npm install

CMD ["npm", "start"]