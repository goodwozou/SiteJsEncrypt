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
xhr.open('GET', 'http://127.0.0.1:5000/dict');
xhr.send();
xhr.onload = function() {
  let as = xhr.responseText.split(",");
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
	p = as[i].replace(/\"|\\n|\s+/g,"");
	// 替换加密算法
	n = s(p,e,r);
	console.log(n);
	psa = psa + n+ "\n";
  };
  writeFile("pass.txt",psa);
};
```


