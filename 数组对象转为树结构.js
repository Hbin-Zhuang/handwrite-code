/**
 * 数组转为树结构
 * 两个循环, 浅拷贝特性, 返回result
 * @param list 源数组
 */
const listToTree = (list) => {
  // 定义最终返回的数据结构
  const result = []

  // 用一个 map 定义数组的每一项, key为listItem的id, value为listItem
  // 每个 mapItem 加个children字段, pid不为-1 (有pidItem)
  // 就往当前item对应的pidItem的children里塞当前的mapItem
  // 否则就往result中塞当前的mapItem
  const listMap = {}

  // 循环一次, 将listMap填充
  for (let item of list) {
    listMap[item.id] = {
      ...item,
      children: []
    }
  }

  // 再循环一次, 判断, 将list转tree
  list.forEach(item => {
    const id = item.id
    const pid = item.pid
    // 父节点
    const pidItem = pid === -1 ? null : listMap[pid]
    // 当前的mapItem
    const mapItem = listMap[id]
    // 进行 push 操作
    if (pidItem) {
      pidItem.children.push({ ...mapItem })
    } else {
      result.push({ ...mapItem })
    }
  })
  return result
}


/**
 * 递归实现
 * @param list 源数组
 * @param parentId 父级 id
 * @returns newList 新数组
 */
const buildArrayTree = (arr, pid = -1) => {
  // 先找到根节点
  return arr.filter(i => i.pid === pid)
    // 再把对应的子节点往根节点里面塞
    .map(i => ({
      id: i.id,
      pid: i.pid,
      children: buildArrayTree(arr, i.id)
    }))
}



const data = [
  {
    pid: '-1',
    id: '1'
  },
  {
    pid: '-1',
    id: '2'
  },
  {
    pid: '2',
    id: '2-2'
  },
  {
    pid: '1',
    id: '1-1'
  },
  {
    pid: '1-1',
    id: '1-1-1'
  },
  {
    pid: '2',
    id: '2-1'
  },
  {
    pid: '1-1',
    id: '1-1-2'
  },
]

listToTree(data)


/** 结果对照 */
const target = [
  {
    pid: -1,
    id: 1,
    children: [
      {
        pid: 1,
        id: 1 - 1,
        children: [
          {
            pid: 1 - 1,
            id: 1 - 1 - 1
          },
          {
            pid: 1 - 1,
            id: 1 - 1 - 2
          }
        ]
      }
    ]
  },
  {
    pid: -1,
    id: 2,
    children: [
      {
        pid: 2,
        id: 2 - 1
      },
      {
        pid: 2,
        id: 2 - 2
      }
    ]
  }
]

