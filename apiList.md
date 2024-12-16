# DevTinder APIs

AuthRouter
-POST /signup
-POST /login
-POST /logout

profileRouter
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/pasword

connectionRequestRouter
-POST /request/send/intrested/:userId
-POST /request/send/ignored/:userId
-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId

userRouter
-GET /user/connections
-GET /user/requests/received
-GET /user/feed - Gets you the profiles of other users on platform 



Status: ignore, intrested,accpeted,rejected