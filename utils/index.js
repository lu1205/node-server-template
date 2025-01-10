import jwt from "jsonwebtoken";
import config from "../config.js";

export const decodeJWT = (token) => {
  if (token) {
    return jwt.verify(token.split(" ")[1], config.secretKey);
  } else {
    return null;
  }
};

export const getAllChidlren = (data, parentId) => {
  let arr = [];

  const loop = (list, parentId) => {
    list.forEach((item) => {
      if (item.parentId === parentId) {
        arr.push(item);
      }
    });
  };
  loop(data, parentId);
  return arr;
};
export function findDescendantsById(items, targetId) {
  const descendants = [];

  // 辅助函数，用于递归查找
  function search(id) {
    const children = items.filter((item) => item.parentId === id);
    descendants.push(...children);

    children.forEach((child) => {
      // 继续查找当前子节点的子节点
      search(child.id);
    });
  }

  // 启动递归搜索
  search(targetId);

  return descendants;
}

// 通过 id 查询所有上级
export function findParentMenusById(id, menuList) {
  const parentMenus = [];
  const findParent = (currentId) => {
    const parentMenu = menuList.find(menu => menu.id === currentId);
    if (parentMenu && parentMenu.pid !== null) {
      parentMenus.unshift(parentMenu);
      findParent(parentMenu.pid);
    }
  };
  findParent(id);
  return parentMenus;
}