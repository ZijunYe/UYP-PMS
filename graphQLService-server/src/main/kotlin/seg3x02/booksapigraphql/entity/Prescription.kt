package seg3x02.booksapigraphql.entity

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "prescription")
data class Prescription(
  var username: String,
  var prescriptionNumber: Number,
  var prescriptionDate: String?,
  var medicationStrength: String?,
  var amountMedication: String?,
  var methodAdministration: String?,
  var frequencyOfAdministration: String?,
  var optionalConsideration: String?,
  var status: String?,
  var verified: String?,
  var drug:String){

  @Id
  var prescriptionId:String =""


}
