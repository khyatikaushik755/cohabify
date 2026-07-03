# Build frontend
FROM node:20-alpine AS frontend-build
WORKDIR /app
COPY package.json package-lock.json ./
COPY postcss.config.js tailwind.config.js vite.config.js ./
COPY src ./src
COPY index.html ./
RUN npm install
RUN npm run build

# Build backend runtime image
FROM node:20-alpine AS runtime
WORKDIR /app
COPY backend/package.json backend/package-lock.json ./backend/
RUN npm install --prefix backend
COPY backend ./backend
COPY --from=frontend-build /app/dist ./dist
COPY package.json package-lock.json ./

# Expose port
EXPOSE 5000

ENV NODE_ENV=production
ENV PORT=5000

WORKDIR /app/backend
CMD ["node", "server.js"]
