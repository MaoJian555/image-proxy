import axios from 'axios'
import { isAllowedDomain } from './utils/domain.js'

export default async function (fastify) {
  fastify.get('/proxy-url', async (request, reply) => {
    const regionUrl = request.query?.url
    if (!regionUrl) {
      return reply.status(400).send('url required')
    }

    let imageUrl
    try {
      console.log('编码前URL:', regionUrl)
      imageUrl = decodeURI(regionUrl)
    } catch {
      return reply.status(400).send('invalid url encoding')
    }

    // 域名校验
    // if (!isAllowedDomain(imageUrl)) {
    //   return reply.status(403).send('Domain not allowed')
    // }

    try {
      const urlObj = new URL(imageUrl)
      // imageUrl = 'https://p3-sign.toutiaoimg.com/tos-cn-i-axegupay5k/2b924f2574c341e9aecbf77c211f2d71~tplv-tt-origin-web:gif.jpeg?_iz=58558&from=article.pc_detail&lk3s=953192f4&x-expires=1770109253&x-signature=S%2FsOp280EDg4JJav1I9crC0u2BM%3D'
      console.log('原始URL:', imageUrl)
      const { data, headers } = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
        timeout: 3000,
        headers: {
          Host: urlObj.host,
          Referer: `https://${urlObj.host}`
        }
      })

      reply.headers({
        'Content-Type': headers['content-type'] || 'application/octet-stream',
        'Cache-Control': 'public, max-age=86400',
        Expires: new Date(Date.now() + 86400000).toUTCString(),
        'X-Proxy-Source': urlObj.hostname,
        'Access-Control-Allow-Origin': '*',
        ...(headers['content-length']
          ? { 'Content-Length': headers['content-length'] }
          : {})
      })

      return reply.send(data)
    } catch (err) {
      // console.log(err)
      return reply.status(500).send('failed to fetch image')
    }
  })
}
