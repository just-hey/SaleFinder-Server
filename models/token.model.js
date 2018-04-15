const { promisify } = require('util')
const { sign, verify } = require('jsonwebtoken')
const signPromise = promisify(sign)
const verifyPromise = promisify(verify)
const secret = process.env.SECRET_KEY

class Token {

  static sign(id) {
    const sub = { id }
    const expiresIn = '7 days'
    return signPromise({ sub }, secret, { expiresIn })
  }

  static verifyAndExtractHeaderToken(header) {
    // console.log('line16 ',header)
    const token = header.authorization ? header.authorization.replace('Bearer ', '') : null
    console.log(token);
    return verifyPromise(token, secret)
  }

}

module.exports = Token
