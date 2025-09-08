FROM node:20-alpine3.18

WORKDIR /app

# Copy package files first to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

RUN npm run build || echo "No build script found, continuing..."

USER node

CMD ["npm", "start"]

EXPOSE 5000