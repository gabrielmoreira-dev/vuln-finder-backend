const CustomerLDS = require('./data/local/data_source/customer_lds')
const CustomerRepository = require('./data/repository/customer_repository')
const UserLDS = require('./data/local/data_source/user_lds')
const UserRepository = require('./data/repository/user_repository')
const ProfessionalLDS = require('./data/local/data_source/professional_lds')
const ProfessionalRepository = require('./data/repository/professional_repository')
const { GetAccessTokenUC } = require('../domain/use_case/get_access_token_uc')
const { InsertUserUC } = require('../domain/use_case/insert_user_uc')
const { ValidateEmailFormatUC } = require('../domain/use_case/validate_email_format_uc')
const { ValidatePasswordFormatUC } = require('../domain/use_case/validate_password_format_uc')

const { customerLDS, userLDS, professionalLDS } = buildLocalDataSources()
const { customerRepository, userRepository, professionalRepository } = buildRepositories()

const buildGetAccessTokenUC = _ => new GetAccessTokenUC({ userRepository })

const buildInsertUserUC = _ => new InsertUserUC({ userRepository })

const buildValidateEmailFormatUC = _ => new ValidateEmailFormatUC()

const buildValidatePasswordFormatUC = _ => new ValidatePasswordFormatUC()

const buildRepositories = _ => {
  const customerRepository = new CustomerRepository({ customerLDS })
  const userRepository = new UserRepository({ userLDS })
  const professionalRepository = new ProfessionalRepository({ professionalLDS })
  return { customerRepository, userRepository, professionalRepository }
}

const buildLocalDataSources = _ => {
  const customerLDS = new CustomerLDS()
  const userLDS = new UserLDS()
  const professionalLDS = new ProfessionalLDS()
  return { customerLDS, userLDS, professionalLDS }
}

module.exports = {
  buildGetAccessTokenUC,
  buildInsertUserUC,
  buildValidateEmailFormatUC,
  buildValidatePasswordFormatUC
}