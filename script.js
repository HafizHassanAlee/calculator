(function(){
  var cur="0",prev=null,op=null,fresh=false,exprEl=document.getElementById("expr"),outEl=document.getElementById("out"),opBtns=document.querySelectorAll("#keys button.op");
  function compute(a,b,o){a=parseFloat(a);b=parseFloat(b);if(o==="+")return a+b;if(o==="−")return a-b;if(o==="×")return a*b;if(o==="÷")return b===0?NaN:a/b;return b}
  function fmt(s){if(s==="Error")return s;var n=parseFloat(s);if(!isFinite(n))return "Error";if(typeof s==="string"&&/\.$|\.\d*0$/.test(s)&&s.length<14)return s;var r=parseFloat(n.toPrecision(12)),t=String(r);return t.length>14?r.toExponential(6):t}
  function hilite(){for(var i=0;i<opBtns.length;i++)opBtns[i].classList.toggle("on",op!==null&&fresh&&opBtns[i].dataset.v===op)}
  function render(){outEl.textContent=cur==="Error"?"Error":(fresh||/e/.test(cur)?fmt(cur):cur);outEl.style.fontSize=(outEl.textContent.length>11?30:44)+"px";exprEl.textContent=op!==null?fmt(prev)+" "+op:"";hilite()}
  function num(d){if(cur==="Error"||fresh){cur="0";fresh=false}if(cur.replace(/[-.]/g,"").length>=12)return;cur=cur==="0"?d:cur+d}
  function dot(){if(cur==="Error"||fresh){cur="0";fresh=false}if(cur.indexOf(".")<0)cur+="."}
  function setOp(o){if(cur==="Error")return;if(op!==null&&!fresh){prev=String(compute(prev,cur,op));cur=prev;if(isNaN(+prev)){cur="Error";op=null;prev=null;render();return}}else prev=cur;op=o;fresh=true}
  function eq(){if(op===null||cur==="Error")return;var res=compute(prev,cur,op);exprEl.textContent=fmt(prev)+" "+op+" "+fmt(cur)+" =";cur=isNaN(res)?"Error":String(parseFloat(res.toPrecision(12)));op=null;prev=null;fresh=true;outEl.textContent=fmt(cur);outEl.style.fontSize=outEl.textContent.length>11?"30px":"44px";hilite()}
  function act(a,v){if(a==="num")num(v);else if(a==="dot")dot();else if(a==="op")setOp(v);else if(a==="eq"){eq();return}else if(a==="clear"){cur="0";prev=null;op=null;fresh=false}else if(a==="sign"){if(cur!=="Error"&&cur!=="0")cur=cur[0]==="-"?cur.slice(1):"-"+cur}else if(a==="percent"&&cur!=="Error"){cur=String(parseFloat((parseFloat(cur)/100).toPrecision(12)));fresh=true}render()}
  document.getElementById("keys").addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;act(b.dataset.a,b.dataset.v)});
  document.addEventListener("keydown",function(e){var k=e.key;if(/^[0-9]$/.test(k))act("num",k);else if(k===".")act("dot");else if(k==="+")act("op","+");else if(k==="-")act("op","−");else if(k==="*")act("op","×");else if(k==="/"){e.preventDefault();act("op","÷")}else if(k==="Enter"||k==="="){e.preventDefault();act("eq")}else if(k==="%")act("percent");else if(k==="Escape"||k==="Delete")act("clear");else if(k==="Backspace"&&cur!=="Error"&&!fresh){cur=cur.length>1&&!(cur.length===2&&cur[0]==="-")?cur.slice(0,-1):"0";render()}});
  render();
})();
