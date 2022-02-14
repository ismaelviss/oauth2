# oauth2 JWT API width Express JS
OAuth 2.0

install express dotenv jsonwebtoken
mpm install -S express dotenv jsonwebtoken

install nodemon for dev environment
npm install nodemon

npm install
npm install

execute
npm start npm run dev

Pagina para genera JSON Web Key (JWK): https://mkjwk.org/
Se debe seleccionar el tamaño, en que se va a usar en este caso escogemos firma, el algoritmo RS256 el cual es asimetrico y el hash a utilizar:
<img width="1406" alt="image" src="https://user-images.githubusercontent.com/32187832/153966628-ff18f9a7-358e-4418-82e2-5db6b90073dc.png">
debe generar algo similar a esto:
<img width="1445" alt="image" src="https://user-images.githubusercontent.com/32187832/153966814-2ae1168a-d7e5-428c-b5ed-f88862cbd97c.png">

una vez implementada la funcion con la firma RS256 podemos verificar que funcione en la pagina https://jwt.io/, aqui debemos ingresar la informacion de la llave publica y privada para verificar la firma.
<img width="1329" alt="image" src="https://user-images.githubusercontent.com/32187832/153966964-1982ddde-f04d-42ea-aaa1-9b7fb7033f2c.png">
