You need a session store

express-session comes with what is called a memory store
which is only useful for development and cant be used in production

we use a redis store
o

curl -v -X POST localhost:4000/register -H 'Content-Type: application/json' -d '{"email":"tom@gmail.com", "name":"Tom","password":"test1234","passwordConfirmation":"test1234"}'
