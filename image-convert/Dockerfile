FROM node
WORKDIR /convert
COPY package.json .
RUN npm install
COPY . .

CMD [ "npm", "start" ]