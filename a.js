/*
 * @author: hanxu 
 * @date: 2017-12-15 16:26:21 
 * @last modified by: hanxu 
 * @last modified time: 2017-12-15 16:26:21 
 * @description: 用来整理图片分类， 将拍照日期以年月的形式进行分类
 */

const fs = require("fs");
const moment = require("moment");



/**
 * 
 * @param {*} path 目录
 * @param {*} target  目标文件夹子
 */
function getFileInfo(path, target) {
    var dir = fs.readdirSync(path);
    var pathArray = path.split('/');
    pathArray.pop();
    // 上层路径
    var parent = pathArray.join("/");
    // 拷贝的文件目录路径
    var targetFilePath =  creatDir(parent, target);

    dir.forEach(function(v) {
        var filePath = path + '/' + v;
        fs.stat(filePath, function (err, res) {
            var birthDay = moment(res.birthtime).format("YYYY-MM");
            var dateFilePath = creatDir(targetFilePath, birthDay);
            fs.copyFileSync(filePath, dateFilePath + "/" + v);
        })
    });
} 

function creatDir(path, name) {
    if (!path || !name) {
        return false;
    }
    var targetPath = path + "/" + name;;
    
    var isExit = fs.existsSync(targetPath);
    if (isExit) {
        return targetPath;
    }

    fs.mkdirSync(path + "/" + name);
    return targetPath;
}



const url = '/Users/hanxu/Downloads/iphone';
const target = 'iphoneCopy';
getFileInfo(url, target);