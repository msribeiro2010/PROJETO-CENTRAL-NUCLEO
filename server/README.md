# Central Nucleo Server

This is the backend server for the Central Nucleo application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:

For development (with auto-reload):
```bash
npm run dev
```

For production:
```bash
npm start
```

## API Endpoints

### GET /api/aniversariantes
Returns the list of birthdays from the JSON file.

### GET /api/feriados
Returns the list of holidays from the JSON file.

## Error Handling
The server includes basic error handling for file reading operations and general server errors. All errors are logged to the console and return appropriate HTTP status codes.

## Project Structure

- `server.js` - Main server file with Express setup and routes
- `data/aniversariantes.json` - Birthday celebrants data
- `data/feriados.json` - Holidays data 