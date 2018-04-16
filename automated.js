const axios = require('axios')
let testURL = 'https://crawler-scrape.herokuapp.com/scrape/kroger/98177'

function testFire() {
  console.log('automated triggered!!!')
  return axios.get(`${testURL}`)
    .then(results => {
      console.log('worked!',results)
      return
    })
    .catch(err => {
      console.log('errored out',err)
      return
    })
}

testFire()
