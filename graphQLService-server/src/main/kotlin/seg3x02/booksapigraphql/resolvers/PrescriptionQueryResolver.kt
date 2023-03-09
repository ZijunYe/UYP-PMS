package seg3x02.booksapigraphql.resolvers

import graphql.kickstart.tools.GraphQLQueryResolver
import org.springframework.data.mongodb.core.MongoOperations
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.stereotype.Component
import seg3x02.booksapigraphql.entity.Prescription
import seg3x02.booksapigraphql.repository.PrescriptionRepository

@Component
class PrescriptionQueryResolver(val mongoOperations: MongoOperations,
                                private val prescriptionRepository: PrescriptionRepository): GraphQLQueryResolver {
    fun prescriptions(username: String): List<Prescription> {
        val query = Query()
        query.addCriteria(Criteria.where("username").`is`(username))
        return mongoOperations.find(query, Prescription::class.java)
    }

    fun allPrescriptions(): List<Prescription> {
        val list = prescriptionRepository.findAll()
        return list
    }


}
