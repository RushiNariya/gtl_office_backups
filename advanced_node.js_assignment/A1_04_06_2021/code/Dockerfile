FROM node:12.18-alpine
ENV NODE_ENV=development
WORKDIR /app
COPY ./package.json /app
RUN npm install
COPY ./ /app
EXPOSE 9999
CMD ["npm", "run", "devrun"]
