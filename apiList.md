#DevTinder API


// AuthRouter
- POST /signup
- POST/login
- POST/logout


// ProfileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password


// ConnectionequestRouter
status: accepted,ignore,rejected,intrested
- POST /request/send/intrested/:userId
- POST /request/send/ignore/:userId
- POST /request/send/accepted/:userId
- POST /request/send/rejected/:userId


// UserRouter
-GET user/connections
-GET user/request/recived
-Get user/feed - give profile of other user


