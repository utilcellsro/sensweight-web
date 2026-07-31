# Builds the sensweight.com static site and serves it via nginx — mirrors
# what the deploy-live GitHub Action ships to S3/CloudFront, so what you see
# locally is what goes live.

FROM node:20-alpine AS build
WORKDIR /app
COPY sensweight/package*.json ./
RUN npm ci
COPY sensweight/ .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/_site /usr/share/nginx/html
EXPOSE 80
