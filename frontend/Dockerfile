#-----Build Stage----
FROM node:22-alpine3.23 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

#PASS API URL
#ARG VITE_API_URL
#ENV VITE_API_URL=$VITE_API_URL

RUN npm run build


#------RuntimeStage(Distroless)-----
FROM nginx:alpine

#Remove default nginx static content
#RUN rm -rf /usr/share/nginx/html/*

#Copy built frontend from builder stage
COPY --from=builder /app/dist/ /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
