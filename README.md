## Web Technologies Project for the semester 7
## Authors : Paul AYZAC & Clément FAGES
## Links to the content of our project :
- [1. Description of the project](#1-description-)
- [2. Specifications](#2-specifications-)
- [3. Project management](#3-project-management-)
- [4. Application development](#4-application-development-)

## 1. Description :
This project is a chat application based on the work seen in class. The technologies used are ReactJS, NodeJS, expressJS and a LevelDB database
## 2. Specifications :
| Subjects                                                        | Grade |      Task done     |
| :-------------------------------------------------------------- | :---: | :----------------: |
| Naming convention                                               |  +2   | :white_check_mark: |
| Project structure                                               |  +4   | :white_check_mark: |
| Code quality                                                    |  +3   | :white_check_mark: |
| Git & DevOps                                                    |  +4   |         :x:        |
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
| Total                                                           |  50   |

## 3. Project management :
* #### 3.1 Naming convention
    For the naming convention, we respected the community conventions and best practices, consistency in our code. All our code was written with the same conventions based on the React convention (capitalization for components, import at the top, etc...)
* #### 3.2 Project structure
    The project of our structure is very clear, for the front part, all the components are in a Component's folder, the css is stocked in a css folder appart the index and App files. The channel components are in a channel folder and the images in a static file. We differenciate the back, the front and dex. Finally, in the the back we respect the express conventions with a bin and a lib folder to which we add the test folder.
* #### 3.3 Git & DevOps
    * For the Git part, we used gihub with 3 branchs : paul, clement and master. We all works on our branch of our size to don't disrupt the other. Once we finished a good step, we pushed our work on our branch with the same model of description : The title and in the description all the steps we realized and sometimes what we have to do. After a series of finished tasks, we pulled the other dev branch on our branch to test if it works and if it works, we pull it on the master branch.
    * For the DevOps part, we created a CICD part where we etablished the test before each pull on a dev branch or on a merge on the master branch and an heroku deployment on this link : **link for heroku**.
* #### 3.4 Design, UX
    To create the design, we have been inspired by Messenger, Whatsapp and some other models but we create our own desing with a graphic chart realised on adobe color to which we have added the mui style.

## 4. Application development : 
* #### 4.1 Welcome screen
    We created the welcome page inspired by the butternut page but with our own style. This page show to the user all the fonctionnalities of the chat application with some tutorials. This page is accessible once the user is connected and the user can access to this page every where in the application because the header is fixed.
* #### 4.2 New channel creation
    Is user is able to create a new channel with a button accessible on the header. He just have to enter the name of the channel that he wants to give and the application give a list of the user that he can invite and their mail. After he crate this channel, this one will appears on the channel list on the left of the application.
* #### 4.3 Channel member access
    Once the user is connected, he access to the channels where he was invited. All the information of the access channels are stored in a LevelDB database. So, the channel appears automatically at the initialisation of the application.
* #### 4.4 Ressource access control
    The user can only access to his own channels and can't go to another channel if he is not invited. All this part is shielded.
* #### 4.5 Invite users to channels
    The user can invite a membre in the channel he wants. There the add button on the top right of the channel page. Once he click on this button he have to enter the name of the person he wants to invite and like in the channel creation, a list of person will appears and can choose among them. After adding the other user, this one will appears on the connected user list we can access with the menu button next to the add button.
* #### 4.6 Message modification and removal
    * A user can modify a message that he wrote and only his one with the edit button on the right of the button. Each message have his own buttons.
    * A user can delete a message that he wrote and only his one with the edit button on the right of the button next to the edit button, all these functions are shielded.
* #### 4.7 Account settings 
    There is an account page accessible when we click on the avatar image on the top right of the app. This page is independent with the channel pages. On this page, the user can access to his personal informations and he can modify them with the `edit` button. He can also change his avatar and choose between gravatar or default avatar model that will change his avatar on all the app.
* #### 4.8 Gravatar integration and avatar selection
    * We implemented the gravatar API using react-gravatar. The user can choose to use it or to use default avatar. If the user has a gravatar account and an image, it will automatically show it using his mail.
    * The user can also choose the default avatars in the settings options. He just have to click on the correspondant button to use it or the gravatar. He can also choose a default image amoung the default images stored in the local app. Once he choose it, this avatar will be display in all the app.

## 5. Bonus : Leave a channel and diplay the member of a channel
A user can leave a channel he wants with the menu button on the top right of the correspondant channel. This will open drawer where he can see all the user in the channel and a button `leave` that will delete the correspondant channel in the channel list.





