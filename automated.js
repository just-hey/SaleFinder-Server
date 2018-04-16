const axios = require('axios')
let testURL = 'https://crawler-scrape.herokuapp.com/scrape/wholefoods/98177'

function testFire() {
  return axios.get('${testURL}')
    .then(results => {
      console.log(results)
      return
    })
    .catch(console.error)
}

testFire()
