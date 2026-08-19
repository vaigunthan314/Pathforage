#!/bin/bash
# PathForge AI - Quick Start Script

echo "=================================="
echo "   PATHFORGE AI - Starting..."
echo "=================================="
echo ""

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "Error: Java is not installed."
    echo "Please install Java 17 or higher."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed."
    echo "Please install Node.js 18 or higher."
    exit 1
fi

echo "Starting Backend..."
cd backend
if command -v mvn &> /dev/null; then
    mvn spring-boot:run &
else
    ./mvnw spring-boot:run &
fi
BACKEND_PID=$!

echo "Waiting for backend to start..."
sleep 10

echo ""
echo "Starting Frontend..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "=================================="
echo "   PATHFORGE AI is running!"
echo "=================================="
echo ""
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:8080"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for user to stop
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT TERM
wait
