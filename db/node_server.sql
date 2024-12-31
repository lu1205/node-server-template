/*
 Navicat Premium Data Transfer

 Source Server         : mysql8
 Source Server Type    : MySQL
 Source Server Version : 80032 (8.0.32)
 Source Host           : localhost:3306
 Source Schema         : node_server

 Target Server Type    : MySQL
 Target Server Version : 80032 (8.0.32)
 File Encoding         : 65001

 Date: 31/12/2024 13:43:26
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for react_menu
-- ----------------------------
DROP TABLE IF EXISTS `react_menu`;
CREATE TABLE `react_menu`  (
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of react_menu
-- ----------------------------

-- ----------------------------
-- Table structure for react_role
-- ----------------------------
DROP TABLE IF EXISTS `react_role`;
CREATE TABLE `react_role`  (
  `id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of react_role
-- ----------------------------

-- ----------------------------
-- Table structure for react_user
-- ----------------------------
DROP TABLE IF EXISTS `react_user`;
CREATE TABLE `react_user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `is_delete` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of react_user
-- ----------------------------
INSERT INTO `react_user` VALUES (1, '超级管理员', 'admin', '123456', '111@qq.com', NULL, 0);

-- ----------------------------
-- Table structure for vue_logs
-- ----------------------------
DROP TABLE IF EXISTS `vue_logs`;
CREATE TABLE `vue_logs`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `module` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '操作类型',
  `username` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '操作人',
  `method` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `path` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `query` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `params` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `body` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `result_type` int NULL DEFAULT NULL COMMENT '1: 操作成功，0: 操作失败',
  `result` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '操作结果',
  `create_time` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `update_time` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 762 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of vue_logs
-- ----------------------------
INSERT INTO `vue_logs` VALUES (754, '7dxcbTZ890kaAr9kac2hD', '用户模块', '登录', 'admin', 'POST', '/vue/user/login', '{}', '{}', '{\"username\":\"admin\",\"password\":\"123456\"}', 1, '', '2024-12-31 13:43:03:882', '2024-12-31 13:43:03:889');
INSERT INTO `vue_logs` VALUES (755, 'guaOPF3qLdbCfv9T3IVYm', '用户模块', '登录用户信息', 'admin', 'GET', '/vue/user/userInfo', '{}', '{}', '{}', 1, '', '2024-12-31 13:43:03:905', '2024-12-31 13:43:03:909');
INSERT INTO `vue_logs` VALUES (756, 'Dpuw8SHrH7XH9lPqUi-9s', '用户模块', '查询登录用户权限', 'admin', 'GET', '/vue/user/userPermission', '{}', '{}', '{}', 1, '', '2024-12-31 13:43:03:924', '2024-12-31 13:43:03:927');
INSERT INTO `vue_logs` VALUES (757, 'waEQLVxA9Er5QF2JGuVO9', '用户模块', '查询用户列表', 'admin', 'POST', '/vue/user/list?pageNum=1&pageSize=10', '{\"pageNum\":\"1\",\"pageSize\":\"10\"}', '{}', '{\"username\":\"\"}', 1, '', '2024-12-31 13:43:07:763', '2024-12-31 13:43:07:767');
INSERT INTO `vue_logs` VALUES (758, 'XwvjA-1Fz3foW_cFnFrU3', '角色模块', '获取角色列表', 'admin', 'POST', '/vue/role/list?pageNum=1&pageSize=10', '{\"pageNum\":\"1\",\"pageSize\":\"10\"}', '{}', '{\"fullname\":\"\"}', 1, '', '2024-12-31 13:43:08:465', '2024-12-31 13:43:08:471');
INSERT INTO `vue_logs` VALUES (759, 'p5R7NVNW6MHqtdNCwYl6P', '菜单模块', '获取菜单列表', 'admin', 'GET', '/vue/menu/list', '{}', '{}', '{}', 1, '', '2024-12-31 13:43:08:467', '2024-12-31 13:43:08:473');
INSERT INTO `vue_logs` VALUES (760, 'GTSB1T4RDLwWRE8DrGWia', '菜单模块', '获取菜单列表', 'admin', 'GET', '/vue/menu/list', '{}', '{}', '{}', 1, '', '2024-12-31 13:43:09:140', '2024-12-31 13:43:09:143');
INSERT INTO `vue_logs` VALUES (761, 'jPuKEiu3RNLRSu16qyi7b', '用户模块', '退出登录', 'admin', 'GET', '/vue/user/logout', '{}', '{}', '{}', 1, '', '2024-12-31 13:43:12:937', '2024-12-31 13:43:12:939');

-- ----------------------------
-- Table structure for vue_menu
-- ----------------------------
DROP TABLE IF EXISTS `vue_menu`;
CREATE TABLE `vue_menu`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `pid` int NOT NULL DEFAULT 0 COMMENT '父级id',
  `fullname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '名称',
  `path` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '路由',
  `sort` int NULL DEFAULT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '图标',
  `permission_code` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '权限标识',
  `component` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '组件路径',
  `type` char(4) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '类型 - F: 目录；M: 菜单；B: 按钮',
  `status` int NOT NULL DEFAULT 0,
  `keep_alive` int NOT NULL DEFAULT 0 COMMENT '缓存页面 - 0: 不缓存；1: 缓存',
  `is_delete` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of vue_menu
-- ----------------------------
INSERT INTO `vue_menu` VALUES (1, 0, '系统设置', '/system', 1, 'Setting', NULL, NULL, 'F', 0, 0, 0);
INSERT INTO `vue_menu` VALUES (2, 1, '用户管理', '/system/user', 1, 'User', NULL, 'system/user', 'M', 0, 0, 0);
INSERT INTO `vue_menu` VALUES (3, 1, '角色管理', '/system/role', 2, NULL, NULL, 'system/role', 'M', 0, 0, 0);
INSERT INTO `vue_menu` VALUES (4, 1, '菜单管理', '/system/menu', 3, NULL, NULL, 'system/menu', 'M', 0, 0, 0);
INSERT INTO `vue_menu` VALUES (5, 2, '添加', NULL, 1, NULL, 'system:menu:add', NULL, 'B', 0, 0, 0);
INSERT INTO `vue_menu` VALUES (6, 2, '编辑', '', 1, '', 'system:menu:edit', '', 'B', 0, 0, 0);
INSERT INTO `vue_menu` VALUES (7, 3, '添加', '', NULL, '', 'system:role:add', '', 'B', 0, 0, 0);
INSERT INTO `vue_menu` VALUES (8, 3, '编辑', '', NULL, '', 'system:role:edit', '', 'B', 0, 0, 0);
INSERT INTO `vue_menu` VALUES (9, 4, '添加', '', NULL, '', 'system:menu:add', '', 'B', 0, 0, 0);
INSERT INTO `vue_menu` VALUES (10, 4, '编辑', '', NULL, '', 'system:menu:edit', '', 'B', 0, 0, 0);
INSERT INTO `vue_menu` VALUES (12, 0, '系统监控', '/monitor', NULL, 'Setting', '', '', 'F', 0, 0, 0);
INSERT INTO `vue_menu` VALUES (13, 12, '操作日志', '/monitor/logs', NULL, '', '', 'monitor/logs', 'M', 0, 0, 0);

-- ----------------------------
-- Table structure for vue_role
-- ----------------------------
DROP TABLE IF EXISTS `vue_role`;
CREATE TABLE `vue_role`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `permissions` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `status` int NOT NULL DEFAULT 0 COMMENT '状态 - 0: 启用；1: 停用',
  `is_delete` int NOT NULL DEFAULT 0 COMMENT '删除 - 0:未删除；1: 删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of vue_role
-- ----------------------------
INSERT INTO `vue_role` VALUES (1, '角色1', '角色1', '1,2,3,5,7', 0, 0);
INSERT INTO `vue_role` VALUES (2, '角色2', '213', '1,2,5,6,3,7,8,4,9,10', 0, 0);
INSERT INTO `vue_role` VALUES (3, '角色3', '角色3', '1,4,9', 0, 0);
INSERT INTO `vue_role` VALUES (4, '角色4', '角色4', '1,2,5,6', 0, 0);
INSERT INTO `vue_role` VALUES (5, '角色5', '角色5', '1,3,7,8', 0, 0);
INSERT INTO `vue_role` VALUES (6, '角色6', '角色6', '1,4,9,10', 0, 0);
INSERT INTO `vue_role` VALUES (7, '角色7', '角色7', '1,2,5,6,3,7,8', 0, 0);
INSERT INTO `vue_role` VALUES (8, '角色8', '角色8', '1,2,5,6,4,9,10', 0, 0);
INSERT INTO `vue_role` VALUES (9, '角色9', '角色9', '1,3,7,8,4,9,10', 0, 0);
INSERT INTO `vue_role` VALUES (10, '角色10', '角色10', '1,2,5,6,3,7,8,4,9,10', 0, 0);
INSERT INTO `vue_role` VALUES (11, '角色11', '角色11', NULL, 0, 0);
INSERT INTO `vue_role` VALUES (12, '角色12', '角色12', NULL, 0, 0);
INSERT INTO `vue_role` VALUES (13, '角色13', '角色13', NULL, 0, 0);
INSERT INTO `vue_role` VALUES (14, '角色14', '角色14', NULL, 0, 0);
INSERT INTO `vue_role` VALUES (15, '角色15', '角色15', NULL, 0, 0);

-- ----------------------------
-- Table structure for vue_user
-- ----------------------------
DROP TABLE IF EXISTS `vue_user`;
CREATE TABLE `vue_user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `roles` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `status` int NOT NULL DEFAULT 0 COMMENT '状态 - 0: 启用；1: 停用',
  `is_admin` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '0' COMMENT '超级管理员 - 0: 否；1: 是',
  `is_delete` int NOT NULL DEFAULT 0 COMMENT '删除 - 0:未删除；1: 删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of vue_user
-- ----------------------------
INSERT INTO `vue_user` VALUES (1, '超级管理员', 'admin', '123456', '111@qq.com', NULL, '', 0, '1', 0);
INSERT INTO `vue_user` VALUES (2, 'test1', 'test1', '123456', 'test1@qq.com', 'test1', '1', 0, '0', 0);
INSERT INTO `vue_user` VALUES (3, 'test2', 'test2', '123456', '123456@qq.com', '123456', NULL, 0, '0', 0);
INSERT INTO `vue_user` VALUES (4, 'test3', 'test3', '123456', '1', '2', NULL, 0, '0', 0);
INSERT INTO `vue_user` VALUES (5, 'test4', 'test4', '123456', '1', '3', NULL, 0, '0', 0);
INSERT INTO `vue_user` VALUES (6, 'test5', 'test5', '123456', '122223@qq.com', 'test5', NULL, 0, '0', 0);
INSERT INTO `vue_user` VALUES (7, 'test6', 'test6', '123456', '', '', NULL, 0, '0', 0);
INSERT INTO `vue_user` VALUES (8, 'test7', 'test7', '123456', '', '', NULL, 0, '0', 0);
INSERT INTO `vue_user` VALUES (9, 'test8', 'test8', '123456', '', '', NULL, 0, '0', 0);
INSERT INTO `vue_user` VALUES (10, 'test9', 'test9', '123456', '', '', NULL, 0, '0', 0);
INSERT INTO `vue_user` VALUES (11, 'test10', 'test10', '123456', '', '', NULL, 0, '0', 0);
INSERT INTO `vue_user` VALUES (12, 'test11', 'test11', '123456', '', '', NULL, 0, '0', 0);

SET FOREIGN_KEY_CHECKS = 1;
