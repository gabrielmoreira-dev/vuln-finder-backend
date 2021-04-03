/* istanbul ignore file */

const ConsultancyDataRepository = require('../../../../domain/data_repository/consultancy_data_repository')

module.exports = class extends ConsultancyDataRepository {
  insterConsultancyIsCalled = false

  insertConsultancy = (_, __, ___, ____) => {
    this.insterConsultancyIsCalled = true
  }
}