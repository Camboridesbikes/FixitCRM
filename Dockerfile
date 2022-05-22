FROM node:lts

WORKDIR /

COPY . .

RUN npm ci && npm run build && npm prune --production

EXPOSE 8080

CMD ["npm", "start"]