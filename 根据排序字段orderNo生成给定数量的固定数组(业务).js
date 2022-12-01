
/**
 * @desc 构造给定数量和占位空数据项格式并排序的数组
 * @author hbin
 * @param targetList 目标数组
 * @param emptyItem 空项对象
 * @param nums 返回的数组长度
 * @param order 排序 asc-升序; desc-降序
 * @date 2022/7/8
 */
function getNumsSortedList(targetList = [], emptyItem = {}, nums = 9, order = 'asc') {
  // 所有数据 orderNo 列表
  const dataOrderNoList = Array.from({ length: nums }, (item, index) => index + 1)

  // 返回 只含有目标数组元素的orderNo 的列表
  targetList = targetList.filter((target) => dataOrderNoList.some((orderNo) => target.orderNo === orderNo))

  // 返回的 targetList 数据条数的 orderNo 列表
  const targetsOrderNoList = targetList.map((record) => record.orderNo)
  // 空数据 orderNo 列表
  let leftTargetsOrderNoList = []
  // 获取 targetList 的 orderNo 列表
  // 有返回 targetList 数据条数, 过滤出剩余 orderNo 列表； 没有返回, 就是所有数据 orderNo 列表
  const dataExceptTargets = dataOrderNoList.filter((record) => !targetsOrderNoList.includes(record))
  leftTargetsOrderNoList = targetList.length ? dataExceptTargets : dataOrderNoList

  // 构造空数据集合
  const emptyList = []
  // 空数据集合开始索引
  const emptyListIdx = 0
  // 空数据条数
  const emptyListNums = leftTargetsOrderNoList.length
  // 渲染空数据列表
  for (let i = emptyListIdx; i < emptyListNums; i++) {
    // 每次循环都重新初始化 emptyItem, 确保前面 push 的数据不会被后面新增的数据覆盖
    emptyItem = { ...emptyItem, orderNo: leftTargetsOrderNoList[i] }
    emptyList.push(emptyItem)
  }
  let numsSortedList = [...targetList, ...emptyList]
    // 升序排序
    .sort((a, b) => a.orderNo - b.orderNo)

  // 降序排序
  if (order === 'desc') {
    numsSortedList = numsSortedList.sort((a, b) => b.orderNo - a.orderNo)
  }

  return numsSortedList
}
