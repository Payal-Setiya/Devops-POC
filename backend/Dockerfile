#-----Build Stage------
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

#---Runtime Stage(Distroless)-----
FROM gcr.io/distroless/nodejs18

WORKDIR /app

# Copy only required files
COPY --from=builder /app /app

#Set environment variable
ENV PORT=5000

#Expose port
EXPOSE 5000

#Run as non root(distroless default user)
USER nonroot

#ENTRYPOINT
CMD ["/app/server.js"]
