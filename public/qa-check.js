(async()=>{
 const checks=[],failures=[],mode=new URL(document.currentScript.src).searchParams.get('mode')||'layout';
 const sleep=ms=>new Promise(r=>setTimeout(r,ms));
 const wait=async(fn,message)=>{for(let i=0;i<160;i++){const r=fn();if(r)return r;await sleep(60);}throw new Error(message||'Timeout');};
 const assert=(condition,label)=>{checks.push({label,pass:!!condition});if(!condition)failures.push(label);};
 const select=async(selector,value)=>{const e=await wait(()=>document.querySelector(selector),selector);const cls=e instanceof HTMLSelectElement?HTMLSelectElement:e instanceof HTMLTextAreaElement?HTMLTextAreaElement:HTMLInputElement;Object.getOwnPropertyDescriptor(cls.prototype,'value').set.call(e,value);e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));await sleep(150);};
 const clickLink=async(path)=>{const a=await wait(()=>[...document.querySelectorAll('a')].find(a=>a.getAttribute('href')===path),path);a.click();await sleep(300);};
 const geometry=()=>({width:document.documentElement.clientWidth,innerWidth,scrollWidth:document.documentElement.scrollWidth,overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth+1});
 try{
 await sleep(450);
 if(mode==='flow'){
 localStorage.removeItem('legacylab-fitness:v1');
 if(innerWidth<1024){const toggle=document.querySelector('[aria-label="Открыть меню"]');toggle.click();await wait(()=>document.querySelector('dialog[open]'));assert(document.querySelector('dialog[open]').contains(document.activeElement),'mobile menu receives focus');document.querySelector('dialog[open] [aria-label="Закрыть"]').click();await sleep(100);assert(!document.querySelector('dialog[open]'),'mobile menu closes');}
 await clickLink('/schedule');
 const days=[...document.querySelectorAll('.day-tabs button')];days[1].click();await sleep(200);
 const chosenDay=new URL(location.href).searchParams.get('day');assert(!!chosenDay,'selected day is reflected in URL');
 await select('[aria-label="Фильтр по направлению"]','functional');assert(document.querySelectorAll('.schedule-row').length===1,'direction filter narrows sessions');
 await select('[aria-label="Фильтр по тренеру"]','anna');assert(!!document.querySelector('.empty'),'combined filters show useful empty state');
 document.querySelector('.reset-filters').click();await sleep(200);assert(document.querySelectorAll('.schedule-row').length===4,'filter reset restores sessions');
 await clickLink('/trainers');await clickLink('/trainers/alex');assert(document.querySelector('h1').textContent.includes('Алексей'),'trainer profile opens');
 await clickLink('/schedule?trainer=alex');assert(document.querySelector('[aria-label="Фильтр по тренеру"]').value==='alex','trainer profile links to filtered schedule');
 await clickLink('/plans');document.querySelector('.plan-card.featured .button').click();await wait(()=>location.pathname==='/booking');await sleep(300);
 assert(document.querySelector('select[name="plan"]').value==='month','plan selection reaches booking form');
 document.querySelector('.booking-form').requestSubmit();await sleep(150);assert(document.querySelectorAll('.field-error').length>=4,'booking shows adjacent field errors');assert(document.activeElement.name==='name','first invalid field receives focus');
 await select('[name="name"]','Тестовый гость');await select('[name="phone"]','+7 000 000 00 00');await select('[name="email"]','fitness-qa@example.com');await select('[name="time"]','12:00');
 document.querySelector('[name="consent"]').click();await sleep(80);document.querySelector('.booking-form').requestSubmit();document.querySelector('.booking-form').requestSubmit();
 await wait(()=>document.querySelector('#booking-success'),'booking success');assert(!!document.querySelector('#booking-success'),'successful demo confirmation');
 let stored=JSON.parse(localStorage.getItem('legacylab-fitness:v1'));assert(stored.bookings.length===1,'double submit creates one booking');assert(stored.planId==='month','selected plan persists');assert(stored.profile.name==='Тестовый гость','profile persists in browser');
 await clickLink('/account');await wait(()=>document.querySelector('.account-booking'));assert(document.querySelectorAll('.account-booking').length===1,'booking visible in demo account');document.querySelector('.account-booking button').click();await sleep(220);
 stored=JSON.parse(localStorage.getItem('legacylab-fitness:v1'));assert(stored.bookings[0].status==='cancelled','account cancellation persists');
 const history=[...document.querySelectorAll('.account-tabs button')].find(b=>b.textContent==='История');history.click();await sleep(100);assert(document.querySelector('.account-booking')?.textContent.includes('ОТМЕНЕНА'),'cancelled booking remains in history');
 await clickLink('/club');const details=document.querySelector('.faq-list details');details.querySelector('summary').click();assert(details.open,'FAQ expands');
 document.querySelector('.zone-image').click();await wait(()=>document.querySelector('dialog[open]'));assert(!!document.querySelector('.image-dialog[open]'),'space gallery opens');document.querySelector('dialog[open] [aria-label="Закрыть"]').click();await sleep(100);assert(!document.querySelector('dialog[open]'),'gallery closes');
 assert(!geometry().overflow,'flow has no page overflow');
 }else{
 for(let y=0;y<document.documentElement.scrollHeight;y+=650){window.scrollTo(0,y);await sleep(55);}window.scrollTo(0,0);await sleep(350);
 assert(!geometry().overflow,'no horizontal page overflow');
 const broken=[...document.images].filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.getAttribute('src'));
 assert(broken.length===0,'all loaded images resolve');
 assert(document.querySelectorAll('h1').length===1,'one main heading');
 assert(!!document.querySelector('link[rel="canonical"]'),'canonical present');
 }
 }catch(e){failures.push(e.message);}
 const report={mode,url:location.pathname,geometry:geometry(),checks,failures,overflowElements:[...document.querySelectorAll("main *,header *,footer *")].filter(e=>e.getBoundingClientRect().right>document.documentElement.clientWidth+2).slice(0,12).map(e=>({tag:e.tagName,cls:e.className,right:Math.round(e.getBoundingClientRect().right),text:e.textContent.slice(0,60)})),errors:window.__APP_ERRORS__||[]};
 const pre=document.createElement('pre');pre.id='ll-qa-report';pre.hidden=true;pre.textContent=JSON.stringify(report);document.body.append(pre);
})();