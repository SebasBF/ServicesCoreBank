# API Core Banco

This project is the core API for the Banco application. It provides essential banking functionalities such as account management, transactions, and user authentication.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the dependencies, run:

```bash
npm install
```

## Usage

To start the server, use:

```bash
npm run build
```

And then


```bash
npm run start
```

## Endpoints

### Authentication
- `GET, POST, DELETE /user/**` - Login a user

### Accounts

- `GET, POST, DELETE /account/**` - Manage accounts

### Transactions

- `GET, POST, DELETE  /transactions/**` - Manage all transactions

### Loans

- `GET, POST, DELETE  /loans/**` - Manage all loans

### Client

- `GET, POST, DELETE  /client/**` - Manage all clients

### Transfers

- `GET, POST, DELETE  /transfer/**` - Manage all transfers