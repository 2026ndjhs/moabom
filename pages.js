/* Public launcher only. Credentials, files and sessions stay inside Google. */
'use strict';
(()=>{
 const APP_URL='https://script.google.com/macros/s/AKfycbwNx-tav4ugldAqagWKFkDG95o9bsc81qoh_vr4iOrEs1RVWPEumuZxIBYTlrE2ebY/exec',channel='moabom-pages-v1',frame=document.querySelector('#moabom'),loading=document.querySelector('#loading'),status=document.querySelector('#status'),fallback=document.querySelector('#fallback'),retry=document.querySelector('#retry');
 if(window.self!==window.top){status.textContent='모아봄 공식 접속 주소에서 열어 주세요.';document.querySelector('#direct').href='https://2026ndjhs.github.io/moabom/';return;}
 let source=null,nonce='',timer;
 const googleOrigin=value=>{try{const u=new URL(value);return u.protocol==='https:'&&(u.hostname==='script.google.com'||u.hostname.endsWith('.googleusercontent.com'));}catch(error){return false;}};
 window.addEventListener('message',event=>{
  if(!googleOrigin(event.origin)||event.source===window||!event.source)return;
  try{if(event.source.top!==window)return;}catch(error){return;}
  const data=event.data;if(!data||data.channel!==channel||typeof data.nonce!=='string'||!/^[a-f0-9-]{36}$/i.test(data.nonce))return;
  if(data.type==='moabom:hello'){
   source=event.source;nonce=data.nonce;
   source.postMessage({type:'moabom:approved',channel,nonce,path:'/moabom/'},event.origin);
  }else if(data.type==='moabom:ready'&&event.source===source&&data.nonce===nonce){clearTimeout(timer);loading.hidden=true;frame.hidden=false;}
 });
 function connect(){
  clearTimeout(timer);source=null;nonce='';loading.hidden=false;fallback.hidden=true;retry.hidden=true;frame.hidden=true;status.textContent='학교 보고서 제출함에 연결하고 있습니다.';
  const target=new URL(APP_URL);target.searchParams.set('moabom_host','github-pages-v1');frame.src=target.href;
  timer=setTimeout(()=>{status.textContent='앱 연결을 기다리고 있습니다.';fallback.hidden=false;retry.hidden=false;},15000);
 }
 retry.addEventListener('click',connect);connect();
})();
