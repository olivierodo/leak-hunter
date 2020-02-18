const rp = require('request-promise')

module.exports = function (opt) {
  const defaultOptions = {
    headers: {
      'User-Agent': 'insomnia/6.5.4'
    },
    auth: {
      bearer: opt.accessToken
    },
    method: 'GET',
    json: true
  }

  return new Promise(async (resolve, reject) => { // eslint-disable-line
    try {
      const options = {
        baseUrl: 'https://api.github.com',
        uri: '/search/code',
        qs: {
          q: opt.keyword
        },
        ...defaultOptions
      }

      const search = (await rp(options))
        .items
        .filter(_ => !_.repository.private)
        .map(_ => {
          return {
            name: _.name,
            url: _.repository.html_url,
            user: _.repository.owner.login,
            userUrl: _.repository.owner.html_url,
            contentUrl: _.url
          }
        })

      const contents = await Promise.all(search.map(_ => rp(_.contentUrl, defaultOptions)))
      let result = contents.map((_, i) => {
        delete search[i].contentUrl
        search[i].provider = 'Github'
        search[i].logo = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
        search[i].content = {
          path: _.path,
          text: Buffer.from(_.content, 'base64').toString('utf-8')
        }
        return search[i]
      })

      if (opt.ignore.length) {
        result = result.filter(item => {
          return JSON.stringify(item).match(new RegExp(opt.ignore.join('|'), 'gi')) === null
        })
      }

      resolve(result)
    } catch (e) {
      reject(e)
    }
  })
}
