FROM node:20-alpine

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm install

# Copy the source code
COPY . .

# Build the app
RUN npm run build

# Start the app
EXPOSE 3000
CMD ["npm", "run", "start"]
