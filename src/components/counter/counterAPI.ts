

// 异步请求的方法 
export const fetchCount = (amount = 1): Promise<{ data: number }> => {
  return new Promise<{
    data: number
  }>((resolve) => {
    setTimeout(() => {
      resolve({
        data: amount
      })
    }, 1 * 1000)
  })
}
