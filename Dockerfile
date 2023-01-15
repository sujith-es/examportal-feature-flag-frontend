ARG WORK_DIR=/build

FROM node:16.15.1 as builder 
# node:16.15-alpine

ARG WORK_DIR
ENV PATH ${WORK_DIR}/node_modules/.bin:$PATH

RUN mkdir ${WORK_DIR}
WORKDIR ${WORK_DIR}

COPY package.json ${WORK_DIR}
COPY package-lock.json ${WORK_DIR}

RUN npm config set strict-ssl false
RUN npm install @angular/cli
RUN npm install

COPY . ${WORK_DIR}

RUN ng build --prod

FROM nginx:latest

ARG WORK_DIR

COPY --from=builder ${WORK_DIR}/dist/examfront /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD nginx -g "daemon off;"