# See https://docs.docker.com/engine/reference/builder/
FROM node:20-alpine

WORKDIR /app

COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

COPY frontend ./

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
RUN backend-env\Scripts\activate.bat
