function processErrorMessage(err) {
  /* This selectively prints errors to the server and client. In the default case, where the error comes from a function such as knex, etc. where sending details to the client may be a security concern, we send a generic message to the client while printing the details on the server. This process also helps prevent the continued execution of chained promises after an error is thrown. */
  if (err.message) {
    switch (err.message) {
      case 'usernotfound': return { status: 404, message: 'The ID provided does not match any user on file  ' }
      case 'duplicateCart': return { status: 409, message: 'A cart for this user already exists' }
      case 'noCartFound': return { status: 404, message: 'A cart for this user does not exist' }
      case 'alreadyInCart': return { status: 409, message: 'Product already exists in user cart' }
      case 'notInCart': return { status: 409, message: 'Product does not exist in user cart' }
      case 'nomatchesfound': return { status: 404, message: 'No products containing that word found at this time' }
      case 'duplicateProduct': return { status: 409, message: 'A product with the exact same name exists' }
      case 'missingFirstName': return { status: 400, message: 'A first name is required' }
      case 'missingPhone': return { status: 400, message: 'A phone number is required' }
      case 'missingPhone': return { status: 400, message: 'A phone number is required' }
      case 'missingPassword': return { status: 400, message: 'A password is required'  }
      case 'duplicateUser': return { status: 409, message: 'A user with this phone number already exists' }
      case 'noSuchUser': return { status: 409, message: 'Incorrect phone number and/or password' }
      case 'invalidToken': return { status: 409, message: 'Invalid token' }

      default:
        return { status: 500, message: 'Our apologies, but an internal server error has occurred' }
    }
  }
}

module.exports = processErrorMessage
