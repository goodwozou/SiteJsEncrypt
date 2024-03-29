# SiteJsEncrypt
渗透测试过程中往往会遇到爆破密码的场景，但往往网站前端密码会经过加密，
如果加密复杂且js经过压缩，加密算法往往不好提取。本工具直接利用网站加密功能
加载字典生成加密后密文密码用于爆破。

## SiteJsEncrypt解决方案
1. 利用chrome动态调试功能运行到加密算法上下文环境。
2. 采用python flask开启http服务用于js获取字典。
3. 网站运行到加密算法时，在控制台利用js xhr获取字典并加密。
4. 加密后密文通过js写入本地文件。

## 步骤
1. python开启http服务，dictPath改为字典文件路径
```
dictPath = "dict.txt"
```
2. 找到加密算法并下断点
# ![image](https://user-images.githubusercontent.com/57278197/176987563-12df5152-398a-46cc-a06f-a52bae39fe87.png)

3. 运行到加密算法处
# ![image](https://user-images.githubusercontent.com/57278197/176987668-81ece070-63ee-4b2a-a715-0fcf56ba8e4f.png)

4. 控制台输入SiteJsEncrypt.js脚本内容
请求地址替换为要加密的字典路径，删除所有断点，运行到结束。
xhr.open('GET', 'http://127.0.0.1:5000/dict');
n = s(p,e,r); 加密算法根据网站进行替换。
```
let xhr = new XMLHttpRequest();
xhr.open('GET', 'http://127.0.0.1:5000/');
xhr.send();
xhr.onload = function() {
    let as = xhr.responseText.split("\n");
    console.log(as);
    let psa = "";
    function writeFile(fileName, content){
        let a= document.createElement('a');
        let blob = new Blob([content],{type:'text/plain'});
        a.download = fileName;
        a.href = URL.createObjectURL(blob);
        a.click();
    };
    for(let i=0;i<as.length;i++)
    {
        let p = as[i].replace(/\"|\\n|\s+/g,"");
        //console.log(p);
        // 替换加密算法
        let n = Q["a"].aesEncrypt(p);
        console.log(n);
        psa = psa + n+ "\n";
    };
    writeFile("pass.txt",psa);
};
```
## 问题
### 问题1: 不安全的连接
# ![image](https://user-images.githubusercontent.com/57278197/196833361-d62457c9-48f5-4b1f-b58d-28445c4ff2df.png)
网站设置
# ![image](https://user-images.githubusercontent.com/57278197/196833850-11088462-16aa-4d22-9b57-c4e444fa82cc.png)
不安全内容改为允许
# ![image](https://user-images.githubusercontent.com/57278197/196833909-10743fa4-d6a5-44af-ab80-6c7c8f4617c6.png)

### 问题2: 解决跨域问题
```
from flask import Flask
from flask_cors import *

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
@app.route('/')
def password():
   with open("newp.txt","r") as file:
       str =""
       fs = file.readlines()
       for f in fs:
           str = str + f 
   return str

if __name__ == '__main__':
   app.run()

```




