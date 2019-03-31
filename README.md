# Health Hub
-----------------
HealthHub is a Progressive WebApp which tries to solve the problem of maintaining confidentiality of health reports.

## Project Structure
- The `src` folder contains the code for frontend.
- `API/` folder contains the code for backend server.
- `model.py` contains a trained model to predict severity from medical symptoms.

## Technologies Used
- Backend is written with the help of Node.js+Express to provide a high performant API.
- MariaDB is used as database and `hacknsut.sql` is provided to recreate the table structure.
- Frontend is written with the help of React.js.
- The medical reports are hosted on IPFS to ensure immutability and confidentiality. It also provides a secure way for a user to access his records anywhere.
- Nginx is an excellent web server which along with it's reverse proxy capabilities, also provides HTTPS support to all of our public facing services.

## Installation Notes
- Clone the repo using `git clone https://github.com/ojaswa1942/hackNSUT-HealthHub.git`
- Change into newly created directory `cd hackNSUT-HealthHub`
- Frontend
	- Install dependencies for frontend `yarn install`
	- Start the frontend react server using `yarn start` or build for production `yarn build`
- Backend
	- Change into API `cd API` and install dependencies for backend `yarn install`
	- Start the backend server using `yarn start` or using forever for production `forever start server.js`
- IPFS, this website uses IPFS to store data securely on blockchain. You will need a IPFS node running on localhost to get this working.
	- Install `ipfs-go` and configure it [(Docs)](https://docs.ipfs.io) and configure it.
	- We will need an ipfs node working on `127.0.0.1:5001` and an IPFS gateway to download files from ipfs over http.
- Nginx is used as reverse proxy for API and IPFS Gateway. It also serves production build of the React frontend, and enables TLS over all of them with the help of LetsEncrypt.
- MariaDB is our database server. Import the `hacknsut.sql` file in a database.
- SMTP Server. An email server is required by this webapp to perform certain critical tasks such as notifications and account validation. 
	- This was done using `postfix` as Mail Transfer Agent and `dovecot` as Mail Delivery Agent.

## LICENSE

This code is licensed under GNU GPLv3 License.