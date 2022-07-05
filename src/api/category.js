import request from '@/utils/request'
/**
 *
 * @returns 获取分类列表
 */
export const getCategory = () => {
  return request({
    url: '/category'
  })
}
