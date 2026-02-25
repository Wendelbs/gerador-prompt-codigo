FROM node:20-alpine
WORKDIR /app
COPY package.json /app/package.json
COPY tsconfig.base.json /app/tsconfig.base.json
COPY services/data-service/package.json /app/services/data-service/package.json
RUN npm install
COPY services/data-service /app/services/data-service
WORKDIR /app/services/data-service
RUN npm run build
EXPOSE 3002
CMD ["npm", "run", "start"]
