# .NET Full Stack Project

## Overview

This project is a full stack application built using .NET Core for the backend and Angular for the frontend. It includes a RESTful API and a dynamic user interface that allows interaction with the data.

## Features

- **Backend**: ASP.NET Core Web API
- **Frontend**: Angular 15
- **Database**: SQL Server (via Entity Framework Core)

## Getting Started

### Prerequisites

- .NET 8 SDK
- Node.js and npm
- Angular CLI
- Docker Desktop (containerizes SQL Server)

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jsparks9/net-flashcard-ui.git
   cd net-flashcard-ui
   ```

2. **Install frontend dependencies**:
   ```bash
   npm install
   ```

3. **Set up the database**:
   - Install Docker Desktop
   - Run MySQL_Setup.sh

4. **Run the application**:
   - **Backend**:
     ```bash
     dotnet run
     ```
   - **Frontend**:
     ```bash
     ng serve
     ```

### API Documentation

- **Base URL**: `https://localhost:7174/api`

  Example endpoints:
  - `GET /decks` - Retrieves all decks.
  - `POST /decks` - Creates a new deck.
  - `GET /decks/{id}` - Retrieves a specific deck by ID.

### UI Access

- **Frontend URL**: `http://localhost:4200`

### Future Enhancements

- Improved UI/UX
