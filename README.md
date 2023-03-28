# Pharmacy Prescription Management System
Project presentation: [link text](https://youtu.be/RXlMCf0Cd1M)
|Name|student number|
|---|---|
|Alexander Yu|300120635|
|Alexis Verana|300116080|
|Aloïs Clerc|300070936|
|Zijun Ye|300168065|
|Dhiaa Naas|300170251|

Course: SEG 3102 Software Design & Architecture

### Background:
The Umelaphi Yaodian Pharmacy is a neighbourhood Pharmacy that has been serving its community for the last 50 years. It is currently directed by Dr. Umelaphi III, grandchild of the creator and employs a dozen of agents. Being very traditional, the pharmacy still uses an essentially manual system to dispense the prescriptions of its loyal customers. However, technological advances require the adoption of a computerized system, in particular to be able to support e-prescriptions which are becoming more and more commonly used.

Dr. Umelaphi explored the possibility of acquiring an off-the-shelf prescription management system but was not satisfied with the reviewed applications. He would particularly like a system with which he would have more control for customization and which would allow in the future to offer health services beyond the prescription of drugs such as prescriptions relating to life-style and holistic health in general. This document was developed to capture the requirements for an electronic application that would replace the existing manual system and fulfill its functions.

### Description of project:
This project consists in the development of a system for the recording and tracking of patients’ medical prescriptions. Medication preparation, inventory tracking, and account billing are not part of the intended system. Additionally, although the UYP-PMS involves pharmacy personnel, human resource management is not part of the system's scope.

### Prerequisites:
Ensure all proper dependencies and tools are installed
1. Java (Check by running `java --version`)
2. Javac (Check by running `javac --version`)
3. gradle (Check by running `gradle --version`)
4. Angular (Check by running `ng v`)
5. Docker (Check by running `docker -v`)

### Initialization

First get mongodb by running the following docker command `docker run -p 27017:27017 --name mongodb -d mongo`

Next run the back end by changing directory to graphQLService-server and executing `gradle bootRun`

Once running (hangs at 83%, which is normal) navigate to `http://localhost:9000/graphiql`

Then insert the first Admin account:

```graphql
mutation {
  newUser(username: "Admin", password: "Admin") {
    userId
  }
}
```

Then hit the play button to insert the account into the database. From here you're able to create every account through the front-end.

### Running the program

First have two instances of your terminal open.

Have the first instance change directory to graphQLService-server and execute the command `gradle bootRun`. This will run the server side of the application (It is normal if it hangs at 83%)

Have the second instance change directory to graphQLService-client and execute the command `ng serve`. This will run the client side of the application.

Navigate to `http://localhost:4200/login` and play around with the application.
