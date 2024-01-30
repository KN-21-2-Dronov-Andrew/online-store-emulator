FROM node
WORKDIR /admin-panel
COPY package.json .
RUN npm install
COPY . .
EXPOSE 6000
CMD [ "npm", "run", "dev" ]