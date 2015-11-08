# Bookstore.Extension

###介绍
作为文艺狗，每次闲得无聊都会去各大网上书店屯书，但一直以来本着“多读书，读好书”的策略，每次购书之前总是要选评一番，简而言之，我至少会看一下这本书豆瓣上的评分。然而终于有一天，一边浏览页面再一边新建一个Tab页去查豆瓣的行为让我忍无可忍，因此我开发了这款Chrome插件。

###效果
####京东
![image](https://raw.githubusercontent.com/Saviio/Saviio.github.io/master/images/jd.jpg)
####亚马逊
![image](https://raw.githubusercontent.com/Saviio/Saviio.github.io/master/images/amazon.jpg)

###原理
很简单，任何一本出版物都有全球唯一的编号，称为国际标准书号(ISBN)，而豆瓣也提供了基于ISBN查询书籍的API，所以每当浏览图书页面时，用页面上的ISBN编码就可以通过API去查询该书的一干资料了。

###使用
1. 下载Bookstore.Extension.zip
2. 打开Chrome
3. 在地址栏中输入chrome://extensions/
4. 将后缀为.crx的文件拖入浏览器
5. 安装完成

###Todo
1. 支持当当
2. 支持天猫书城?
3. 优化插件响应逻辑
4. 新增书籍详情功能


###License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2015 Saviio

---------
Thanks for your watching and using, Enjoy.
