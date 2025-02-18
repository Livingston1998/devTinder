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




# Deployment
- signup on aws
- Launch instance
- run this command in ssh command prompt "chmod 400 <secret>.pem"
- run this command to login to the remote aws machine "ssh -i "devTinder-secret.pem" ubuntu@ec2-43-204-96-49.ap-south-1.compute.amazonaws.com"
- Intall Node version 
      - To intall go to node website and select nvm and run the vm commmand in the connected Aws machine command prompt
-Git clone the project by runing the command "git clone https://github.com/Livingston1998/devTinder.git"
   
   - To Deploy frontend
        - install npm
        - npm run build
        - sudo apt build (to update all pacages in ubuntu)
        - sudo apt install nginx
        - sudo systemctl start nginx
        - sudo systemctl enable nginx
        -Copy cocde from dist(build files) to /var/www/html/
        - cd devTinder-web/
        - run this command "sudo scp -r dist/* /var/www/html"  (scp: is used to copy; -r: recurseviley; dist/*: all files from dist to /var/www/html)
        - cd /var/www/html
        - ls
        - now if we go to aws and we can find public IPv4 address. 
        - If we copy that IPv4 address and hit in th google we should ideally need to get our website but we will not be able to find it because AWS blocks all the ports of our application.
        - Since we are using nginx it will defaulty runs on port 80 .
        - to enable port 80 . We need to go to AWS and go to security
          - find security group
          - Inside security group we can find Inbound rules
          - click on edit 
          - custom TCP 
          -port range : 80 | 0.0.0.0/0(this means we are allowing all the ip address to access )

    - To Deploy Backend    
          