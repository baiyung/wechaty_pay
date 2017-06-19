/*
Navicat MySQL Data Transfer

Source Server         : computer
Source Server Version : 50150
Source Host           : localhost:3306
Source Database       : grouponfee

Target Server Type    : MYSQL
Target Server Version : 50150
File Encoding         : 65001

Date: 2017-06-19 09:29:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `pay`
-- ----------------------------
DROP TABLE IF EXISTS `pay`;
CREATE TABLE `pay` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` varchar(255) NOT NULL,
  `contact_name` varchar(255) NOT NULL,
  `real_name` varchar(255) DEFAULT NULL,
  `mobile` varchar(11) DEFAULT NULL,
  `payment` int(1) NOT NULL,
  PRIMARY KEY (`id`,`contact_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pay
-- ----------------------------
INSERT INTO `pay` VALUES ('32', '@7697da79c594c33cfbf0019e3c9919fca9a54a5eb54a606fbbcb79cbaaf07573', 'dreaming', '白杨', '15910464608', '1');

-- ----------------------------
-- Table structure for `test`
-- ----------------------------
DROP TABLE IF EXISTS `test`;
CREATE TABLE `test` (
  `name` varchar(255) DEFAULT NULL,
  `mobile` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

