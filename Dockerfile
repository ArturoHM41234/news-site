FROM node:18-alpine as build
WORKDIR /reto-ciid
COPY package* ./
COPY babel-plugin-macros.config.js ./
COPY tailwind.config.js ./
COPY .babelrc ./
RUN npm install
COPY public ./public
COPY src ./src
RUN npm run build 

FROM nginx:alpine
COPY --from=build /reto-ciid/build /usr/share/nginx/html
