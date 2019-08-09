# CrDashboardAPI
>A REST API for the Clash Royale Dashboard application. All routes, exept from login and register is protected behind a JWT token that is retrived when logging in.

# Endpoints

<dl>
  <dt> <h2>Register user</h2> </dt>
  <dd>
  This endpoint posting a request to the server to register an user

  ### HTTP request
  ```
  POST http://crdashboard/api/user/register 
  ```

  ### Body
  ```json 
  {
    "name"    : "Sondre Knutsen",
    "email"   : "mail@example.mail",
    "password": "Password"
  }
  ```

  ### Response
  ```json
  {
    "user": "5d27d431ed835a5f7c395182" 
  }
  ```
  </dd>

  <br>
  <br>
  
  <dt><h2>Login user</h2></dt>
  <dd>
  This endpoint checking the login credentials in the request body and returning a JWT if the user existing and credentials is ok

  ### HTTP request
  ```
  POST http://crdashboard/api/user/login
  ```
  ### Body
  ```json 
  {
    "email"   : "Email",
    "password": "Password"
  }
  ```

  ### Response
  ```json
  {
    "success": "true",
    "massage": "Authorization successful",
    "token"  : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV....."
  }
  ```
  </dd>

  <br>
  <br>
  
  <dt><h2>Player profile</h2></dt>
  <dd>
  This endpoint returning the ingame information about a player

  ### HTTP request
  ```
  GET http://crdashboard/api/player/<TAG>
  ```
  ### Parameters
  Parameter | Description
  |---|---|
  | TAG | Clash royale ingame player tag|

  ### Example
  ```javascript
  axios.get("http://crdashboard/api/player/LL2Y89V9")
  ```

  ### Response
  https://docs.royaleapi.com/json/player_8L9L9GL.json
  </dd>

  <br>
  <br>

  <dt><h2>Verify user</h2></dt>
  <dd>
  This endpoint is setting the user verified field to true and store the new value in the database. This means that the user has entered his ingame player tag to connect his account to the application

  ### HTTP request
  ```
  POST http://crdashboard/api/user/verify
  ```
  ### Body
  ```json 
  {
    "id": "5d4ca07b9a19b52ed0afbbc5"
  }
  ```

  ### Response
  ```json
  {
    "id": "5d4ca07b9a19b52ed0afbbc5",
    "verified": "true"
  }
  ```
  </dd>

  <br>
  <br>
</dl>
  