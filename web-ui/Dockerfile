FROM node:alpine

RUN apk update
RUN apk add make python3

RUN npm install -g yarn

WORKDIR /opt

ADD . /opt
# RUN make compile

# CMD python3 -m http.server

CMD ash