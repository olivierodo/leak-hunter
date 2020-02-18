const rp = require('request-promise')
const Config = require('../../config').slack

module.exports = function (data, opt) {
  const msg = {
    attachments: [
      {
        title: data.name,
        pretext: `Security leak from the user *${data.user}* on *${data.provider}*`,
        text: [
          `Repository: ${data.url}`,
          `Path: *${data.content.path}*`,
          '```' + data.content.text + '```',
          `user: ${data.userUrl}`
        ].join('\n'),
        thumb_url: data.logo,
        color: '#ff0000',
        mrkdwn_in: [
          'text',
          'pretext'
        ]
      }
    ]
  }

  return rp({
    method: 'POST',
    url: Config.url,
    form: {
      payload: JSON.stringify(msg)
    }
  })
}
