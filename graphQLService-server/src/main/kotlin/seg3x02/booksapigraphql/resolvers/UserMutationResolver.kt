package seg3x02.booksapigraphql.resolvers

import graphql.kickstart.tools.GraphQLMutationResolver
import org.springframework.stereotype.Component
import seg3x02.booksapigraphql.entity.User
import seg3x02.booksapigraphql.repository.UserRepository
import java.util.*

@Component
class UserMutationResolver(private val userRepository: UserRepository):
    GraphQLMutationResolver {
    fun newUser(
                username:String,
                password:String
                ) : User {
        val user = User(
          username,
          password,
          "Admin",
         null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          )
        user.userId = UUID.randomUUID().toString()
        userRepository.save(user)
        return user
    }

    fun newAgent(
      username:String,
      password:String,
      licenceId: String,
      firstname:String,
      lastName:String,
      title:String,
      telephoneNumber:String,
      email:String,
      faxNumber:String,

    ): User{
      val user = User(
      username,
      password,
        "Agent",
        licenceId,
      firstname,
      lastName,
        title,
        null,
      telephoneNumber,
      email,
      faxNumber,
      null,
        null,
        null,
        null,
        null

      )
      user.userId = UUID.randomUUID().toString()
      userRepository.save(user)
      return user

    }

  fun newPatient(username:String,
                 password:String,
                 firstname:String,
                 lastName:String,
                 gender: String,
                 dateOfBirth: String,
                 allergies: String,
                 currentMedications:String,
                 insuranceNumber: String): User{
      val user = User(
        username,
        password,
        "Patient",
        null,
        firstname,
        lastName,
        null,
        null,
        null,
        null,
        null,
        gender,
        dateOfBirth, allergies, currentMedications, insuranceNumber
        )
      user.userId = UUID.randomUUID().toString()
      userRepository.save(user)
      return user
  }

    fun deleteUser(userId: String) : Boolean {
        userRepository.deleteById(userId)
        return true
    }


  fun updateUser(userId:String,
                 username:String?,
                 password: String?,
                 role:String?,
                 licenceId:String?,
                 firstName:String?,
                 lastName: String?,
                 title:String?,
                 address: String?,
                 telephoneNumber: String?,
                 email: String?,
                 faxNumber: String?,
                 gender: String?,
                 dateOfBirth: String?,
                 allergies: String?,
                 currentMedications:String?,
                 insuranceNumber: String?
  ):User{
    val user = userRepository.findById(userId)
    user.ifPresent{
      if(username != null){
        it.username = username
      }
      if(password != null){
        it.password = password
      }
      if(role != null){
        it.role = role
      }

      if(licenceId !=null){
        it.licenceId = licenceId.toString()
      }

      if(firstName !=null){
        it.firstName = firstName
      }
      if(lastName !=null){
        it.lastName = lastName
      }
      if(title !=null){
        it.title = title
      }
      if(address !=null){
        it.address = address
      }

      if(telephoneNumber !=null){
        it.telephoneNumber = telephoneNumber.toString()
      }
      if(email !=null){
        it.email = email
      }

      if(faxNumber !=null){
        it.faxNumber = faxNumber.toString()
      }

      if(gender !=null){
        it.gender = gender
      }

      if(dateOfBirth !=null){
        it.dateOfBirth = dateOfBirth
      }

      if(allergies !=null){
        it.allergies = allergies
      }

      if(currentMedications !=null){
        it.currentMedications = currentMedications
      }
      if(insuranceNumber !=null){
        it.insuranceNumber = insuranceNumber.toString()
      }
      userRepository.save(it)
    }
    return user.get()
  }


}
