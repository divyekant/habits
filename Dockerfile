FROM node:20-alpine
WORKDIR /app
COPY server/package*.json /app/
RUN npm ci --omit=dev || npm i --omit=dev
COPY server /app/
COPY public /app/public
EXPOSE 9300
CMD ["node", "index.js"]