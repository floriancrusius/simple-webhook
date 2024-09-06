# Webhook Service

A simple webhook service that displays incoming data on a webpage and stores the data in an SQLite database. The service is written in Node.js with Express and uses a simple HTML/JS/CSS frontend.

## Prerequisites

- Node.js
- Docker (optional, for containerization)

## Installation

1. **Clone the repository**:

   ```
   git clone floriancrusius/simple-webhook
   cd simple-webhook
   ```

2. **Install dependencies** (for use without Docker):

   ```
   npm install
   ```

3. **Create data directory**:
   ```
   mkdir data
   ```

## Starting the Server

### Without Docker

1. **Start the server**:

   ```
   node index.js
   ```

2. **Send webhook data**:

for example:

```
curl -X POST http://localhost:3000/webhook -H "Content-Type: application/json" -d '{
"user": {
"id": 12345,
"name": "John Doe",
"email": "john.doe@example.com",
"address": {
"street": "123 Main St",
"city": "Anytown",
"state": "CA",
"zip": "12345"
}
},
"order": {
"id": 67890,
"date": "2023-10-01T12:34:56Z",
"items": [
{
"product_id": 111,
"name": "Widget A",
"quantity": 2,
"price": 19.99
},
{
"product_id": 222,
"name": "Widget B",
"quantity": 1,
"price": 29.99
}
],
"total": 69.97
},
"metadata": {
"source": "web",
"campaign": "fall_sale"
}
}'
```

3. **Open the frontend in a browser**:
   Go to `http://localhost:3000` to view the webhook data.

### With Docker

1. **Build the Docker image**:

   ```
   docker build -t webhook-service .
   ```

2. **Run the Docker container**:

   ```
   docker run -p 3000:3000 -v $(pwd)/data:/usr/src/app/data webhook-service
   ```

3. **Send webhook data**:

for example:

```
curl -X POST http://localhost:3000/webhook -H "Content-Type: application/json" -d '{
"user": {
"id": 12345,
"name": "John Doe",
"email": "john.doe@example.com",
"address": {
"street": "123 Main St",
"city": "Anytown",
"state": "CA",
"zip": "12345"
}
},
"order": {
"id": 67890,
"date": "2023-10-01T12:34:56Z",
"items": [
{
"product_id": 111,
"name": "Widget A",
"quantity": 2,
"price": 19.99
},
{
"product_id": 222,
"name": "Widget B",
"quantity": 1,
"price": 29.99
}
],
"total": 69.97
},
"metadata": {
"source": "web",
"campaign": "fall_sale"
}
}'
```

4. **Open the frontend in a browser**:
   Go to `http://localhost:3000` to view the webhook data.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
