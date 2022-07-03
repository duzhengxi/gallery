import OSS from 'ali-oss'
import { getSts } from '@/api/sys'
import { REGION, BUCKET } from '@/constants'

export const getOSSClient = async () => {
  const res = await getSts()
  return new OSS({
    // bucket 所在区域  存储桶
    region: REGION,
    // id
    accessKeyId: res.Credentials.AccessKeyId,
    // secret
    accessKeySecret: res.Credentials.AccessKeySecret,
    // token
    stsToken: res.Credentials.SecurityToken,
    // 存储桶名字
    bucket: BUCKET,
    // 刷新token
    refreshSTSToken: async () => {
      const res = await getSts()
      return {
        // id
        accessKeyId: res.Credentials.AccessKeyId,
        // secret
        accessKeySecret: res.Credentials.AccessKeySecret,
        // token
        stsToken: res.Credentials.SecurityToken
      }
    },
    // 刷新临时凭证的间隔
    refreshSTSTokenInterval: 5 * 1000
  })
}
