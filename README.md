# Flight Tracker

An application to find flights based on a given airport.

## What's inside?

This mono repo includes the following services:

### Apps

-   `api`: a JSON file containing flight info
-   `web`: a [Next.js](https://nextjs.org/) application

## Requirements

-   [Node](https://formulae.brew.sh/formula/node)
-   [Docker Desktop](https://www.docker.com/products/docker-desktop/)
-   [Docker Compose](https://formulae.brew.sh/formula/docker-compose)

## Start

To start the application, you need Docker with `docker-desktop` installed.
First, install all `node_modules` run:

`npm install`

Then run:

`docker compose up --build`

This will start all applications with the mocked API, Next.js, and UI components in a Docker container.

Navigate to:

`http://localhost:3000`

## Folder structure

The root of the Monorepo contains the turborepo configuration files, and the main package.json which defines the
directories and scripts used in the Monorepo. The directories set up in the template are following this structural
logic.

| Directory | What goes inside of it                |
| --------- | ------------------------------------- |
| apps      | All api and frontend apps             |
| packages  | Shared config files and UI components |
