FROM node:19

WORKDIR /server
COPY server .

EXPOSE 3001

CMD rm -rf dist \
	&& npm install \
  && npm run start:dev
