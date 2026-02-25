FROM node:20-alpine
WORKDIR /app
COPY package.json /app/package.json
COPY tsconfig.base.json /app/tsconfig.base.json
COPY services/auth-service/package.json /app/services/auth-service/package.json
RUN npm install
COPY services/auth-service /app/services/auth-service
WORKDIR /app/services/auth-service
RUN npm run build
EXPOSE 3001
CMD ["npm", "run", "start"]
