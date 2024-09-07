//patchChildren
function patchChildren() {
  if (patchFlag > 0) {
    if (patchFlag && PatchFlags.KEYED_FRAGMENT) {
      //有key,使用diff算法
      patchKeyedChildren(
        c1 as VNode[],
        c2 as VNodeArrayChildren,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        optimized
      )
      return
    } else if (patchFlag && PatchFlags.UNKEYED_FRAGMENT) {
      //无key，patch
      patchUnkeyedChildren(
        c1 as VNode[],
        c2 as VNodeArrayChildren,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        optimized
      )
      return
    }
  }
}

//patchUnkeyedChildren
function patchUnkeyedChildren() {
  c1 = c1 || EMPTY_ARR
  c2 = c2 || EMPTY_ARR
  const oldLength = c1.length
  const newLength = c2.length
  //c1和c2公有的长度
  const commonLength = Math.min(oldLength, newLength)
  let i
  for (i = 0; i < commonLength; i++) {
    /*遍历进行patch*/
    const nextChild = (c2[i] = optimized ? cloneIfMounted(c2[i] as VNode) : normalizeVNode(c2[i]))
    patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, isSVG, optimized)
  }
  if (oldLength > newLength) {
    /* 删除多余的节点*/
    unmountChildren(c1, parentComponent, parentSuspense, true, commonLength)
  } else {
    /*创造新节点 */
    mountChildren(
      c2,
      container,
      anchor,
      parentComponent,
      parentSuspense,
      isSVG,
      optimized,
      commonLength
    )
  }
}

//patchKeyedChildren
function patchKeyedChildren() {
  /*记录索引*/
  let i = 0
  // 新vnode的数量
  const l2 = c2.length
  // 老vnode最后一个节点的索引
  let e1 = c1.length - 1
  // 新vnode最后一个节点的索引
  let e2 = l2 - 1
  // 第一步：从头向尾遍历patch
  while (i <= e1 && i <= e2) {
    const n1 = c1[i]
    const n2 = (c2[i] = optimized ? cloneIfMounted(c2[i] as VNode) : normalizeVNode(c2[i]))
    //判断key type是否相等
    if (isSameVNodeType(n1, n2)) {
      patch(n1, n2, container, parentAnchor, parentComponent, parentSuspense, isSVG, optimized)
    } else {
      //不同，立即跳出
      break
    }
    i++
  }

  //第二步：第一步结束后，若没有全部遍历patch完，则从尾向前遍历patch
  while (i <= e1 && i <= e2) {
    const n1 = c1[e1]
    const n2 = (c2[e2] = optimized ? clonsIfMounted(c2[e2] as VNode) : normalizeVNode(c2[e2]))
    if (isSameVNodeType(n1, n2)) {
      patch(n1, n2, container, parentAnchor, parentComponent, parentSuspense, isSVG, optimized)
    } else {
      break
    }
    e1--;
    e2-;
  }

  //第三步：老的vnode全部patch完,新的vnode未patch完，则创建新的节点
  if(i>e1){
    if(i<=e2){
      const nextPos = e2 +1;
      const anchor = nextPos < l2?(c2[nextPos] as VNode).el:parentAnchor;
      while(i<= e2){
        patch(
          null,
          (c2[i] = optimized?cloneIfMounted(c2[i] as VNode):normalizeVNode(c2[i])),
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG
        )
        i+++;
      }
    }
  }else if(i>e2){
    //第四步：新的vnode全部patch完，老的vnode未patch完，则删除多余的老节点
    while(i<=e1){
      unmount(
        c1[i],
        parentComponent,
        parentSuspense,
        true
      )
      i++;
    }
  }

  //第五步：新老节点都有剩余，在新老剩余节点中寻找可复用的节点
  //前面遍历到的索引
  let s1 = i;
  let s2 = i;
  //新节点剩余节点的map，即key和索引的map
  const keyToNewIndexMap = new Map();
}

function isSameVNodeType(n1: VNode, n2: VNode): boolean {
  return n1.type === n2.type && n1.key === n2.key
}
