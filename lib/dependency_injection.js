const ConsultancyLDS = require('./data/local/data_source/consultancy_lds')
const ConsultancyRepository = require('./data/repository/consultancy_repository')
const CustomerLDS = require('./data/local/data_source/customer_lds')
const CustomerRepository = require('./data/repository/customer_repository')
const ProfessionalLDS = require('./data/local/data_source/professional_lds')
const ProfessionalRepository = require('./data/repository/professional_repository')
const ReportLDS = require('./data/local/data_source/report_lds')
const ReportRepository = require('./data/repository/report_repository')
const UserLDS = require('./data/local/data_source/user_lds')
const UserRepository = require('./data/repository/user_repository')
const VulnerabilityRDS = require('./data/remote/data_source/vulnerability_rds')
const { GetAccessTokenUC } = require('../domain/use_case/get_access_token_uc')
const { GetCustomerUC } = require('../domain/use_case/get_customer_uc')
const { GetProfessionalListUC } = require('../domain/use_case/get_professional_list_uc')
const { GetProfessionalUC } = require('../domain/use_case/get_professional_uc')
const { InsertConsultancyUC } = require('../domain/use_case/insert_consultancy_uc')
const { InsertReportUC } = require('../domain/use_case/insert_report_uc')
const { InsertUserUC } = require('../domain/use_case/insert_user_uc')
const { UpsertCustomerUC } = require('../domain/use_case/upsert_customer_uc')
const { UpsertProfessionalUC } = require("../domain/use_case/upsert_professional_uc")
const { ValidateEmailFormatUC } = require('../domain/use_case/validate_email_format_uc')
const { ValidatePasswordFormatUC } = require('../domain/use_case/validate_password_format_uc')
const { ValidateUserPasswordUC } = require('../domain/use_case/validate_user_password_uc')
const { ValidateUserPermissionUC } = require('../domain/use_case/validate_user_permission_uc')

const buildRemoteDataSources = _ => {
  const vulnerabilityRDS = new VulnerabilityRDS()
  return { vulnerabilityRDS }
}

const buildLocalDataSources = _ => {
  const customerLDS = new CustomerLDS()
  const userLDS = new UserLDS()
  const professionalLDS = new ProfessionalLDS()
  const reportLDS = new ReportLDS()
  const consultancyLDS = new ConsultancyLDS()
  return { customerLDS, userLDS, professionalLDS, reportLDS, consultancyLDS }
}

const { vulnerabilityRDS } = buildRemoteDataSources()
const {
  customerLDS,
  userLDS,
  professionalLDS,
  reportLDS,
  consultancyLDS
} = buildLocalDataSources()

const buildRepositories = _ => {
  const customerRepository = new CustomerRepository({ customerLDS })
  const userRepository = new UserRepository({ userLDS })
  const professionalRepository = new ProfessionalRepository({ professionalLDS })
  const reportRepository = new ReportRepository({ vulnerabilityRDS, reportLDS })
  const consultancyRepository = new ConsultancyRepository({ consultancyLDS })
  return { customerRepository, userRepository, professionalRepository, reportRepository, consultancyRepository }
}

const {
  customerRepository,
  userRepository,
  professionalRepository,
  reportRepository,
  consultancyRepository
} = buildRepositories()

const buildGetAccessTokenUC = () => new GetAccessTokenUC({ userRepository })

const buildInsertUserUC = () => new InsertUserUC({ userRepository })

const buildValidateEmailFormatUC = () => new ValidateEmailFormatUC()

const buildValidatePasswordFormatUC = () => new ValidatePasswordFormatUC()

const buildValidateUserPasswordUC = () => new ValidateUserPasswordUC({ userRepository })

const buildValidateUserPermissionUC = () => new ValidateUserPermissionUC({ userRepository })

const buildUpsertCustomerUC = () => new UpsertCustomerUC({ customerRepository })

const buildGetCustomerUC = () => new GetCustomerUC({ customerRepository })

const buildUpsertProfessionalUC = () => new UpsertProfessionalUC({ professionalRepository })

const buildGetProfessionalUC = () => new GetProfessionalUC({ professionalRepository })

const buildGetProfessionalListUC = () => new GetProfessionalListUC({ professionalRepository })

const buildInsertReportUC = () => new InsertReportUC({ reportRepository })

const buildInsertConsultancyUC = () => new InsertConsultancyUC({ consultancyRepository })

module.exports = {
  buildGetAccessTokenUC,
  buildInsertUserUC,
  buildValidateEmailFormatUC,
  buildValidatePasswordFormatUC,
  buildValidateUserPasswordUC,
  buildValidateUserPermissionUC,
  buildUpsertCustomerUC,
  buildGetCustomerUC,
  buildUpsertProfessionalUC,
  buildGetProfessionalUC,
  buildGetProfessionalListUC,
  buildInsertReportUC,
  buildInsertConsultancyUC
}