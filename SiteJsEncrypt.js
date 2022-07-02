<script>
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
	n = s(p,e,r);
	console.log(n);
	psa = psa + n+ "\n";
  };
  writeFile("pass.txt",psa);
};
</script>