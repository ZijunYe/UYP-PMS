package seg3x02.booksapigraphql.resolvers

import graphql.kickstart.tools.GraphQLMutationResolver
import org.springframework.stereotype.Component
import seg3x02.booksapigraphql.entity.Prescription
import seg3x02.booksapigraphql.repository.PrescriptionRepository
import java.util.*

@Component
class PrescriptionMutationResolver(private val prescriptionRepository: PrescriptionRepository):
    GraphQLMutationResolver {
    fun newPrescription(username: String,
                        prescriptionNumber: Int,
                        prescriptionDate: String,
                        medicationStrength: String,
                        amountMedication: String,
                        methodAdministration: String,
                        frequencyOfAdministration: String,
                        optionalConsideration: String,
                        status:String,
                        verified: String,
                        drug:String


                        ) : Prescription {
        val prescription = Prescription(
          username,
          prescriptionNumber,
          prescriptionDate,
          medicationStrength,
          amountMedication,
          methodAdministration,
          frequencyOfAdministration,
          optionalConsideration,
          status,
          verified,
          drug
        )
        prescription.prescriptionId = UUID.randomUUID().toString()
        prescriptionRepository.save(prescription)
        return prescription
    }

    fun updatePrescription(prescriptionId:String,
                           prescriptionNumber:Number,
                           prescriptionDate: String?,
                           medicationStrength:String?,
                           amountMedication:String?,
                           methodAdministration: String?,
                           frequencyOfAdministration:String?,
                           optionalConsideration: String?,
                           status: String?,
                           verified: String?,
                           drug: String
    ):Prescription{
        val prescription = prescriptionRepository.findById(prescriptionId)
        prescription.ifPresent{

            // TODO: verify this is the right way to deal with numbers
            if(prescriptionNumber != null){
                it.prescriptionNumber = prescriptionNumber
            }

            if(prescriptionDate !=null){
                it.prescriptionDate = prescriptionDate
            }

            if(medicationStrength !=null){
                it.medicationStrength = medicationStrength
            }
            if(amountMedication !=null){
                it.amountMedication = amountMedication
            }
            if(methodAdministration !=null){
                it.methodAdministration = methodAdministration
            }
            if(frequencyOfAdministration !=null){
                it.frequencyOfAdministration = frequencyOfAdministration
            }

            if(optionalConsideration !=null){
                it.optionalConsideration = optionalConsideration
            }
            if(status !=null){
                it.status = status
            }

            if(verified !=null){
                it.verified = verified
            }

            if(drug !=null){
                it.drug = drug
            }

        }
        return prescription.get()
    }

    fun verifyPrescription(id: String): Prescription {
        val prescription = prescriptionRepository.findById(id)
        prescription.ifPresent {
            it.verified = "true"
            it.status = "ready for pick-up"
            prescriptionRepository.save(it)
        }

        return prescription.get()

    }
}
