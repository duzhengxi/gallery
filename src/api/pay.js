import request from '@/utils/request'

/**
 * 获取VIP支付接口
 */
export const getVipPayList = () => {
  return request({
    url: '/user/vip/pay/list'
  })
}
