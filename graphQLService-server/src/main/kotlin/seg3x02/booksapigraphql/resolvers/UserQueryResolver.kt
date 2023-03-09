package seg3x02.booksapigraphql.resolvers

import graphql.kickstart.tools.GraphQLQueryResolver
import org.springframework.data.mongodb.core.MongoOperations
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.stereotype.Component
import seg3x02.booksapigraphql.entity.Prescription
import seg3x02.booksapigraphql.entity.User
import seg3x02.booksapigraphql.repository.UserRepository

@Component
class UserQueryResolver(val userRepository: UserRepository,
                        private val mongoOperations: MongoOperations
) : GraphQLQueryResolver {
    fun users(): List<User> {
        val list = userRepository.findAll()
        for (bk in list) {
            bk.prescriptions = getPrescriptions(bk.username)
        }
        return list
    }

    private fun getPrescriptions(username: String): List<Prescription> {
        val query = Query()
        query.addCriteria(Criteria.where("username").`is`(username))
        return mongoOperations.find(query, Prescription::class.java)
    }

    fun userById(userId: String): User? {
        val user = userRepository.findById(userId)
        return if (user.isPresent) {
            val bk = user.get()
            bk.prescriptions = getPrescriptions(bk.username)
            bk
        } else {
            null
        }
    }

    fun userByUsername(username: String): User? {
        val query = Query()
        query.addCriteria(Criteria.where("username").`is`(username))
        val result = mongoOperations.find(query, User::class.java)
        return if (result.isNotEmpty()) {
          val bk = result[0]
            bk.prescriptions = getPrescriptions(bk.username)
            bk
        } else {
            null
        }
    }
}
