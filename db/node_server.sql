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

 Date: 02/01/2025 15:26:33
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
  `ip` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `module` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '操作类型',
  `username` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '操作人',
  `method` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `path` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `query` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `params` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `body` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `result_type` int NULL DEFAULT 0 COMMENT '1: 操作成功，0: 操作失败',
  `result` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL COMMENT '操作结果',
  `create_time` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `update_time` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `browser` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `os` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1196 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of vue_logs
-- ----------------------------
INSERT INTO `vue_logs` VALUES (1193, '3w6CYEHmL8drtHhUXWPd1', '127.0.0.1', '用户模块', '登录', 'admin', 'POST', '/vue/user/login', '{}', '{}', '{\"username\":\"admin\",\"password\":\"123456\"}', 1, '', '2025-01-02 15:26:15:834', '2025-01-02 15:26:15:847', 'Chrome 131.0.0.0', 'Windows 10.0');
INSERT INTO `vue_logs` VALUES (1194, 'MPPyIKZXuE3hIgM6vDuqx', '127.0.0.1', '用户模块', '登录用户信息', 'admin', 'GET', '/vue/user/userInfo', '{}', '{}', '{}', 1, '', '2025-01-02 15:26:15:855', '2025-01-02 15:26:15:858', 'Chrome 131.0.0.0', 'Windows 10.0');
INSERT INTO `vue_logs` VALUES (1195, '6w8EdLwE632nfRHWAyrO2', '127.0.0.1', '用户模块', '查询登录用户权限', 'admin', 'GET', '/vue/user/userPermission', '{}', '{}', '{}', 1, '', '2025-01-02 15:26:15:869', '2025-01-02 15:26:15:872', 'Chrome 131.0.0.0', 'Windows 10.0');

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
INSERT INTO `vue_user` VALUES (2, 'test1', 'test1', '123456', 'test1@qq.com', 'test1', '1,3', 0, '0', 0);
INSERT INTO `vue_user` VALUES (3, 'test2', 'test2', '123456', '123456@qq.com', '123456', '11', 0, '0', 0);
INSERT INTO `vue_user` VALUES (4, 'test3', 'test3', '123456', '1', '2', '', 0, '0', 0);
INSERT INTO `vue_user` VALUES (5, 'test4', 'test4', '123456', '1', '3', '', 0, '0', 0);
INSERT INTO `vue_user` VALUES (6, 'test5', 'test5', '123456', '122223@qq.com', 'test5', NULL, 0, '0', 0);
INSERT INTO `vue_user` VALUES (7, 'test6', 'test6', '123456', '', '', NULL, 0, '0', 0);
INSERT INTO `vue_user` VALUES (8, 'test7', 'test7', '123456', '', '', NULL, 0, '0', 0);
INSERT INTO `vue_user` VALUES (9, 'test8', 'test8', '123456', '', '', NULL, 0, '0', 0);
INSERT INTO `vue_user` VALUES (10, 'test9', 'test9', '123456', '', '', NULL, 0, '0', 0);
INSERT INTO `vue_user` VALUES (11, 'test10', 'test10', '123456', '', '', NULL, 0, '0', 0);
INSERT INTO `vue_user` VALUES (12, 'test11', 'test11', '123456', '', '', NULL, 0, '0', 0);

SET FOREIGN_KEY_CHECKS = 1;
