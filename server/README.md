# api pear2pear

## Content

- Installation
- Configuration
- Endpoints
  - GET /
  - GET /version
  - GET /action/deposit
  - GET /action/withdraw
  - GET /challenge
  - POST /challenge

## Installation

To install and run the API locally, you need to have the following installed:

- Docker
- Docker Compose

1. Clone the repository

```bash
git clone git@gitlab.com:pear2pear/api-pear2pear.git
cd api-pear2pear
```

2. Create the environment file and fill in the necessary information

```bash
cp .env.example .env
```

3. Run the docker compose

```bash
docker-compose up --build
```

## Endpoints

### GET /

Return a welcome message and some infos

- URL: **'/'**
- Method: **GET**
- Response:

  - Status: **200 OK**
  - Body:

    ```json
    {
      "message": "Bienvenue sur notre API",
      "documentation": "le lien de la doc",
      "version": "1.0.0",
      "status": "OK"
    }
    ```

### GET /version

Return the version of the API

- URL: **'/version'**
- Method: **GET**
- Response:

  - Status: **200 OK**
  - Body:

    ```json
    {
      "version": "1.0.0"
    }
    ```

### GET /action/deposit

Return the adresses to deposit (max 5)

- URL: **'/action/deposit'**
- Method: **GET**
- Response:

  - Status: **200 OK**
  - Body:

    ```json
    [
        {
            "address": "the adresses4",
            "expiretm": "0",
            "new": true
        },
        ...
    ]
    ```

### GET /action/withdraw

Ask kraken to make the found transfert

- URL: **'/action/withdraw?key=key_name&amount=amount_to_transfert(0.04)'**
- Method: **GET**
- Response:

  - Status: **200 OK**
  - Body:

    ```json
    {
      "result": "success"
    }
    ```

### GET /challenge

Init the wallet verification

- URL: **'/challenge?address=the_wallet_address'**
- Method: **GET**
- Response:

  - Status: **200 OK**
  - Body:

    ```json
    {
      "challenge": "P2P!the_wallet_adress!timestamp" // the string to sign
    }
    ```

### POST /challenge

The verification of the challenge signature

- URL: **'/challenge'**
- Method: **POST**
- Body:

  ```json
  {
    "address": "the_wallet_address",
    "signature": "the_signature" // in base 58
  }
  ```

- Response:

  - Status: **200 OK**
  - Body:

    ```json
    {
      "success": true,
      "token": "token" // the token to navigate on the web site
    }
    ```
