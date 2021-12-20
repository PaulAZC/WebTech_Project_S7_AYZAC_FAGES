## Web Technologies Project for the semester 7
## Authors : Paul AYZAC & Clément FAGES
## Links to the content of our project :
- [1. Description of the project](#1-description-)
- [2. Specifications](#2-specifications-)
- [3. Project management](#3-project-management-)
- [4. Application development](#4-application-development-)
- [5. Bonus](#5-bonus-)

* Clone this repository, from your local machine:
  ```
  git clone https://github.com/PaulAZC/WebTech_Project_S7_AYZAC_FAGES.git
  cd WebTech_Project_S7_AYZAC_FAGES/project
  ```
* Install [Go](https://golang.org/) and [Dex](https://dexidp.io/docs/getting-started/). On Ubuntu, from your project root directory:   
  ```
  # Install Go
  apt install golang-go
  # Download Dex
  git clone https://github.com/dexidp/dex.git
  # Build Dex
  cd dex
  make
  make examples
  ```

* Register your GitHub application, get the `clientID` and `clientSecret` from GitHub and report them to your Dex configuration. Modify the provided `./dex-config/config.yml` configuration to look like:
  ```yaml
  - type: github
    id: github
    name: GitHub
    config:
      clientID: xxxx98f1c26493dbxxxx
      clientSecret: xxxxxxxxx80e139441b637796b128d8xxxxxxxxx
      redirectURI: http://127.0.0.1:5556/dex/callback
  ```
* Inside `./dex-config/config.yml`, the front-end application is already registered and CORS is activated. Now that Dex is built and configured, you can start the Dex server:
  ```yaml
  cd dex
  bin/dex serve dex-config/config.yaml
  ```
* Start the back-end
  ```bash
  cd back-end
  # Install dependencies (use yarn or npm)
  npm install
  # Optional, fill the database with initial data but recommended
  npm run develop
  # Start the back-end
  npm start
  ```
* Start the front-end
  ```bash
  cd front-end
  # Install dependencies (use yarn or npm)
  npm install
  # Start the front-end
  npm start
  ```

After all installation, the project is ready to be launched

## 1. Description :
This project is a chat application based on the work seen in class. The technologies used are ReactJS, NodeJS, expressJS and a LevelDB database
## 2. Specifications :
| Subjects                                                        | Grade |      Task done     |
| :-------------------------------------------------------------- | :---: | :----------------: |
| Naming convention                                               |  +2   | :white_check_mark: |
| Project structure                                               |  +4   | :white_check_mark: |
| Code quality                                                    |  +3   | :white_check_mark: |
| Git & DevOps                                                    |  +4   | :white_check_mark: |
| Design, UX                                                      |  +3   | :white_check_mark: |
| Welcome screen                                                  |  +3   | :white_check_mark: |
| New channel creation                                            |  +6   | :white_check_mark: |
| Channel membership access                                       |  +3   | :white_check_mark: |
| Ressource access control                                        |  +3   | :white_check_mark: |
| Invite users to channels                                        |  +6   | :white_check_mark: |
| Message modification                                            |  +2   | :white_check_mark: |
| Message removal                                                 |  +2   | :white_check_mark: |
| Account settings                                                |  +3   | :white_check_mark: |
| Gravatar integration                                            |  +2   | :white_check_mark: |
| Avatar selection                                                |  +4   | :white_check_mark: |   
| Personal customer avatar                                        |  +6   |         :x:        |
| Bonus : Leave a channel                                         |  +2   | :white_check_mark: |
| Bonus : Display the members of a channel                        |  +2   | :white_check_mark: |
| Total                                                           |  54   |

## 3. Project management :
* #### 3.1 Naming convention
    For the naming convention, we respected the community conventions and best practices, consistency in our code. All our code was written with the same conventions based on the React convention (capitalization for components, import at the top, etc...)
* #### 3.2 Project structure
    The project of our structure is very clear, for the front part, all the components are in a Component's folder, the css is stocked in a css folder appart the index and App files. The channel components are in a channel folder to list the component in the channel and the images in a static file. We differenciate the back, the front and dex. Finally, in the the back we respect the express conventions with a bin and a lib folder to which we add the test folder for the test part. In the db and app files, the routes and apis are separated according to the object they manage (channels, messages, users..)
* #### 3.3 Git & DevOps
    * For the Git part, we used gihub with 3 branchs : paul, clement and master. Each worked on his branch  to not disrupt the other. Once we finished a good step, we pushed our work on our branch with the same model of description : The title and in the description all the steps we realized and sometimes what we have to do next. After a serie of finished tasks, we pulled the other dev branch on our branch to test if it works and if it works, we pull it on the master branch so we have a stable version.
    * For the DevOps part, we created a CICD part where we etablished the test before each pull on a dev branch or on a merge on the master branch and an heroku deployment on this link : **link for heroku**.
    * For the docker part, we create three docker files : one in each folder so we can separate the different services. Once their container are created, we push them on docker hub so we can use their image in the docker compose file. The docker compose is an ocherstrer of the containers which enables to have them all in a single docker network and so they can communicate between each other.
* #### 3.4 Design, UX
    To create the design, we have been inspired by Messenger, Whatsapp and some other models but we create our own desing with a graphic chart realised on adobe color to which we have added the mui style. The colors are simple but meaningful and we design our app so it is very easy for the user to navigate threw the different functionnalities. Also, our app is responsive so it can be used on smartphone.

## 4. Application development : 
* #### 4.1 Welcome screen
    We created the welcome page inspired by the butternut page mixed with our ideas. This page shows to the user all the fonctionnalities of the chat application with a little tutorial. This page is accessible once the user is connected and the user can access to this page everywhere in the application because the header is fixed.
* #### 4.2 New channel creation
    The user is able to create a new channel with a button on the header. Then he accesses a form. He just have to enter the name of the channel and the application give a list of the user that he can invite and their mail according to what he writes in the TextField. After he created this channel, it will appear on the channel list at the left of the application.
* #### 4.3 Channel member access
    Once the user is connected, he can access to the channels where he was invited. All the information of the access channels are stored in a LevelDB database. We added in the headers of each API request the client access token so the application checks if he is well connected and if he can get the data. Also, we used the email from the request (initialized at the beginning) to check if the user information asked are the one of the client connected. After the connection with dex, when the user retrieved its tokens, if he is not in the database he is automatically added in.
* #### 4.4 Ressource access control
    The user can only access to his own channels and can't go to another channel if he is not invited. All this part is shielded. The user is only able to access to the channels he was invited in not the others thanks to a sort in the backend based on its access token. Every action is shielded in the front so the user can't do actions that could hack the application. But if he tries to send bad request to the backend, there are other shields in the back that returns an error to the user : Error 404 Not Found, Error 403 Forbidden or Error 409 Conflict. A message is displayed with a snackbar if a such error happens.
* #### 4.5 Invite users to channels
    The user can invite a member in the channel he wants. There is an add button at the top right of the channel page. Once he clicked on this button he can enter the name of the person he wants to invite and such as in the channel creation, a list of person will appear and he will be able to choose one or more among them. After adding the others users, they will appear on the connected user list (a drawer), that we can access with the menu button next to the add button.
* #### 4.6 Message modification and removal
    * A user can modify a message that he wrote and only the one with the edit button on the right of the button. Each message have his own buttons. So he can only edit the messages he wrote. The other messages don't allow these options.
    * A user can delete a message that he wrote and only the one he wrote. Thanks to the edit button on the right of the button next to the edit button he can manage them. All these functions are shielded.
* #### 4.7 Account settings 
    There is an account page accessible when the user clicks on the avatar image on the top right of the app. This page is independent with the channel pages. On this page, the user can access to his personal information and he can modify them with the `edit` button. He can also change his avatar and choose between gravatar or default avatar model that will change his avatar on all the app. When he changed the avatar, every avatar on the app are automatically changed. For example, the avatar in the header is also edited.
    PS : Dark theme is not working but we created the context to do it
* #### 4.8 Gravatar integration and avatar selection
    * We implemented the gravatar API using react-gravatar. The user can choose to use it or to use default avatar. If the user has a gravatar account and an image, it will automatically show it using his mail.
    * The user can also choose the default avatars in the settings options. He just have to click on the corresponding button to use it or to click on the gravatar. He can also choose a default image amoung the default images stored in the local app. Once he chose it, this avatar will be displayed in all the app.

## 5. Bonus : Leave a channel and diplay the member of a channel
* A user can leave a channel he wants with the menu button on the top right of the corresponding channel. This will open drawer where he can see all the user in the channel and a button `leave` that will delete the correspondant channel in the channel list.
* If a channel is empty because all the users left it, it will be automatically deleted.
* We added many tests in the test folder to check if all the request are working and if they are shielded and return correct http responses.
* We can add users to the application. The functionnality is implemented before the connection with dex. We don't provide password because the OAuth is provided so you can't connect with an address that is not yours. Also we check is the user already exist in the database. If it is the case, an error is returned and the status is diplayed with a snackbar.





