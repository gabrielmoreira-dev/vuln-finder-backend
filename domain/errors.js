class InvalidEmailFormatError extends Error {
  constructor() {
    super("The provided email is invalid")
  }
}

class PasswordFormatError extends Error {
  constructor(message) {
    super(message)
  }
}

class InvalidPasswordLengthError extends PasswordFormatError {
  constructor() {
    super("The password must contain at least 8 characters")
  }
}

class InvalidPasswordFormatError extends PasswordFormatError {
  constructor() {
    super("The password must contain an uppercase letter, a downcase letter, a number and a special character ")
  }
}

class UserNotFoundError extends Error {
  constructor() {
    super("User not found")
  }
}

class UserAlreadyRegisteredError extends Error {
  constructor() {
    super("User already registered")
  }
}

module.exports = {
  InvalidEmailFormatError,
  InvalidPasswordLengthError,
  InvalidPasswordFormatError,
  UserNotFoundError,
  UserAlreadyRegisteredError
}