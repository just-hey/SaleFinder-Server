const axios = require('axios')
let testURL = 'https://crawler-scrape.herokuapp.com/scrape/wholefoods/98177'

function testFire() {
  console.log('automated triggered!!!')
  return axios.get('${testURL}')
    .then(results => {
      console.log(results)
      return
    })
    .catch(err => {
      console.log(err)
      return
    })
}

testFire()
