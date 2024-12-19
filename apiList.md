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
-POST /request/send/:status/:toUserId
-POST /request/review/:status/:requestId

userRouter
-GET /user/requests/received
-GET /user/connections
-GET /user/feed - Gets you the profiles of other users on platform 



Status: ignore, intrested,accpeted,rejected