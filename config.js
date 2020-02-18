require('dotenv').config()
module.exports = {
  keyword: process.env.KEYWORD,
  slack: {
    url: process.env.SLACK_URL
  },
  github: {
    accessToken: process.env.GITHUB_ACCESS_TOKEN
  },
  gitlab: {
    accessToken: process.env.GITLAB_ACCESS_TOKEN
  },
  bitbucket: {
    accessToken: process.env.BITBUCKET_ACCESS_TOKEN
  }
}
