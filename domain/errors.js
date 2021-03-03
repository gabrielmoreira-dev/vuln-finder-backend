class UnauthorizedError extends Error {
  constructor() {
    super("The user is not authorized to access this resource")
  }
}

class MissingRequiredParameterError extends Error {
  constructor() {
    super("Missing required parameter")
  }
}

class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid credentials")
  }
}

class UserAlreadyRegisteredError extends Error {
  constructor() {
    super("User already registered")
  }
}

class AccessTokenError extends Error {
  constructor(message) {
    super(message)
  }
}

class InvalidAccessTokenError extends AccessTokenError {
  constructor() {
    super("The provided token is invalid")
  }
}

class NoAccessTokenProvidedError extends AccessTokenError {
  constructor() {
    super("No access token provided")
  }
}

class MalformattedTokenError extends AccessTokenError {
  constructor() {
    super("Malformatted token")
  }
}

class InvalidAuthenticationMethodError extends AccessTokenError {
  constructor() {
    super("Invalid authentication method")
  }
}

class CustomerNotFoundError extends Error {
  constructor() {
    super("Customer not found")
  }
}

class ProfessionalNotFoundError extends Error {
  constructor() {
    super("Professional not found")
  }
}

module.exports = {
  UnauthorizedError,
  MissingRequiredParameterError,
  InvalidCredentialsError,
  UserAlreadyRegisteredError,
  InvalidAccessTokenError,
  NoAccessTokenProvidedError,
  MalformattedTokenError,
  InvalidAuthenticationMethodError,
  CustomerNotFoundError,
  ProfessionalNotFoundError
}