# SiteJsEncrypt
渗透测试过程中往往会遇到爆破密码的场景，但往往网站前端密码会经过加密，
如果加密复杂且js经过压缩，加密算法往往不好提取。本工具直接利用网站加密功能
加载字典生成加密后密文密码用于爆破。

## SiteJsEncrypt解决方案
1. 利用chrome动态调试功能运行到加密算法上下文环境。
2. 采用python开启http服务用于js获取字典。
3. 网站运行到加密算法时，在控制台利用js xhr获取字典并加密。
4. 加密后密文通过js写入本地文件。

## 步骤
1. python开启http服务
```
python -m http.server 5000
```
2. 找到加密算法并下断点
# ![image](https://user-images.githubusercontent.com/57278197/176987563-12df5152-398a-46cc-a06f-a52bae39fe87.png)


