const { InvalidCredentialsError, UnauthorizedError } = require('../errors')

const ValidateUserPermissionUC = class {
  constructor({ userRepository }) {
    this.userRepository = userRepository
  }

  getFuture = async params => {
    const user = await this.userRepository.getUserByEmail(params.email)
    if (!user) {
      throw new InvalidCredentialsError()
    }
    this.validatePermission(params.roleList, user.role)
  }

  validatePermission = (roleList, userRole) => {
    if (roleList.length && !roleList.includes(userRole)) {
      throw new UnauthorizedError()
    }
  }
}

const ValidateUserPermissionUCParams = class {
  constructor(email, roleList) {
    this.email = email
    this.roleList = roleList
  }
}

module.exports = { ValidateUserPermissionUC, ValidateUserPermissionUCParams }