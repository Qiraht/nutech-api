# Express Digital Payments API
A RESTFul API for Indonesian digital products (pulsa, PLN, BPJS, and etc).

This project was developed as part of technical asessment, RESTful API using Node Express and SQL

You can check the app [here!](https://express-digital-payment-api.up.railway.app) (Powered by [Railway](https://railway.com))
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
- Node.js 20+
- PostgreSQL 16+

### Installation
```
git clone https://github.com/Qiraht/express-digital-payment-api
cd express-digital-payment-api
npm install
```

### Setup Database
1. Create a `.env` file (use `example.env` as template)
2. Run database migrations with `npm run migrate up`

### Running the App
- Development <br>
```
npm run start:dev
```

- Production <br>
```
npm run start
```
