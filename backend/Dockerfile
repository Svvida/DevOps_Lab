FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --omit=optional

COPY . .

RUN npm run build

EXPOSE 8800

CMD ["sh", "-c", "npm run migration:applyProd && npm run start:prod"]