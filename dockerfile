# Step 1: Build Stage
FROM node:20 AS build
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source files and build
COPY . .
RUN npm run build && echo "Build completed" && ls -al .next

# Step 2: Runtime Stage
FROM node:20-alpine AS runtime
WORKDIR /app

# Copy files explicitly from build stage
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules

# Verify .next exists in runtime
RUN ls -al .next

EXPOSE 3000
CMD ["npm", "start"]
