package seg3x02.booksapigraphql.entity

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "user")
data class User(
  var username:String,
  var password: String,
  var role: String?,
  var licenceId:String?,
  var firstName:String?,
  var lastName: String?,
  var title:String?,
  var address: String?,
  var telephoneNumber: String?,
  var email: String?,
  var faxNumber: String?,
  var gender: String?,
  var dateOfBirth: String?,
  var allergies: String?,
  var currentMedications:String?,
  var insuranceNumber: String?) {
    @Id
    var userId: String = ""

    @Transient
    var prescriptions: List<Prescription> = ArrayList()
}
