# Express Digital Payments API
A RESTFul API for Indonesian digital products (pulsa, PLN, BPJS, and etc).

This project was developed as part of technical asessment, RESTful API using Node Express and SQL

## Features
- JWT Authentication
- Request Validation with [Joi](https://joi.dev)
- PostgreSQL database migration [node-pg-migrate](https://salsita.github.io/node-pg-migrate/)
- Global Error Handler
- Image uploads with [Multer](https://github.com/expressjs/multer)
- [Awilix](https://github.com/jeffijoe/awilix) for Dependency Injection
- [Eslint](https://eslint.org) + [Prettier](https://prettier.io) for code consistency

## Getting Started
### Pre-requisites
- Node.Js 20.19+
- PostgreSQL 16.8+

### Installation
``git clone`` <br>
``cd repo`` <br>
``npm install``

### Running the App
- Development <br>
``npm run start:dev``

- Production <br>
``npm run start``