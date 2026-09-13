# Task Management App

## Description

A fullstack task management application built with ASP.NET Core Web API and Angular.

The project was created to learn frontend-backend interaction, HTTP services, RxJS operators and reactive handling of asynchronous requests.

## Features

- User registration and login
- JWT authentication and authorization
- Protected routes and API endpoints
- CRUD operations for projects and tasks
- Adding and managing project members
- Assigning project members to tasks
- Changing task status by the assigned user
- Task search, filtering and sorting
- Server-side pagination

## Technologies

### Backend

- C#
- ASP.NET Core Web API
- SQL Server
- Entity Framework Core
- JWT Bearer Authentication

### Frontend

- Angular
- TypeScript
- RxJS
- HTML
- CSS

## How to run

### Prerequisites

- .NET SDK
- Node.js
- Angular CLI
- SQL Server

### Backend

1. Navigate to the backend directory.
2. Configure the database connection string.
3. Apply the Entity Framework Core migrations.
4. Start the API.

```bash
cd TaskManagementApi
dotnet restore
dotnet ef database update
dotnet run
```

### Frontend

1. Open another terminal.
2. Navigate to the frontend directory.
3. Install the dependencies and start the application.

```bash
cd task-management-client
npm install
ng serve
```

4. Open the Angular application in your browser.

## Author

Yehor Radykop
