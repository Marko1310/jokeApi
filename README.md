# Chuck Norris Jokes API
This is a Node.js API that allows users to sign up, log in, and send a random Chuck Norris joke. Authentication is handled with JWT tokens,
and passwords are hashed with bcrypt. The API is built with a PostgreSQL database connected with Sequelize.

## Routes
The following routes are available:

### POST /api/auth/signup:  
Creates a new user account.  
Requires a JSON payload with the following properties:  
firstName: The user's first name  
lastName: The user's last name  
email: The user's email address  
password: The user's password  

### POST /api/auth/login:  
Logs in a user.  
Requires a JSON payload with the following properties:  
email: The user's email address  
password: The user's password

### GET /api/joke/sendthejoke:  
Sends a random Chuck Norris joke to the user's email address. Requires an Authorization header with a JWT token.

## Database
The API uses a PostgreSQL database connected with Sequelize. The database is hosted online, so you don't need to set it up locally.

## Security
Passwords are hashed with bcrypt to ensure secure storage. Authentication is handled with JWT tokens, which are generated on login and sent back to the client.
The token is stored in a cookie to simplify subsequent requests.

## Usage
To run the API locally, follow these steps:

Clone this repository to your local machine.  
Install the required dependencies by running npm install.  
Start the development server with npm run dev.  
Use a tool like Postman to make requests to the API.

## Credits
This API was created by Marko Cabo.
