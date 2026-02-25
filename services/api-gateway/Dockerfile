FROM node:20-alpine
WORKDIR /app
COPY package.json /app/package.json
COPY tsconfig.base.json /app/tsconfig.base.json
COPY services/api-gateway/package.json /app/services/api-gateway/package.json
RUN npm install
COPY services/api-gateway /app/services/api-gateway
WORKDIR /app/services/api-gateway
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
