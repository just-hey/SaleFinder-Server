const { promisify } = require('util')
const { sign, verify } = require('jsonwebtoken')
const signPromise = promisify(sign)
const verifyPromise = promisify(verify)
const secret = process.env.SECRET_KEY

class Token {

  static sign(id) {
    console.log('incoming ID in sign = ');
    let sub = { id }
    let expiresIn = '7 days'
    console.log('sub = ',sub);
    return signPromise({ sub }, secret, { expiresIn })
  }

  static verifyAndExtractHeaderToken(headers) {
    let token = headers.authorization ? headers.authorization.replace('Bearer ', '') : null
    return verifyPromise(token, secret)
  }

}

module.exports = Token
