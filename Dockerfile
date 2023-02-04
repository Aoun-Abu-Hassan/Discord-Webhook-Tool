FROM node

WORKDIR /webhooktool

COPY package.json .

RUN npm install

COPY . .

CMD [ "node","index.js" ]