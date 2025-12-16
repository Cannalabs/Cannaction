FROM node:18-alpine AS builder

WORKDIR /app

# Build arguments for Vite environment variables
ARG VITE_APP_BASE_URL
ARG VITE_APP_BASIC_TOKEN

# Set as environment variables for Vite to pick up during build
ENV VITE_APP_BASE_URL=${VITE_APP_BASE_URL}
ENV VITE_APP_BASIC_TOKEN=${VITE_APP_BASIC_TOKEN}

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Production stage with nginx
FROM nginx:alpine

# Copy built files to nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

