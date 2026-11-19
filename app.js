
(function(){
'use strict';
var $=function(s){return document.querySelector(s)};
var esc=function(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};

/* ---------- constants (from the official GPX) ---------- */
var KM_TOTAL=208.6, KM_FIN=206.94;
var TEAMS={black:'WMD',red:'Township Dogs',blue:'The Diesels',white:'The Bombsquad'};
var STAT={L:{n:'Riding',s:'Ride',c:'#4c8df6'},P:{n:'Easy (business class)',s:'Easy',c:'#f5f7fa'},R:{n:'Rested (off the back)',s:'Off',c:'#7f8ea6'},S:{n:'Empty the tank',s:'Empty',c:'#ef4135'},B:{n:'Backup',s:'Back',c:'#56637a'}};
var ORDER=['L','P','R','S','B'];
var ROLES={sw:{n:'Sweeper',s:'SW'},en:{n:'Engine',s:'EN'},bz:{n:'Business class',s:'BZ'},ot:{n:'Others',s:'OT'}};
var STYLES=['Rolling (through and off)','Two lines','Single line'];

var ROUTE=[[887,521,0.0],[899,503,1.38],[909,512,2.26],[918,512,2.81],[997,539,7.97],[1025,536,9.68],[1065,546,12.26],[1070,538,12.83],[1122,511,16.45],[1146,493,18.3],[1157,491,18.96],[1165,475,20.11],[1200,477,22.3],[1217,481,23.4],[1251,480,25.52],[1268,486,26.65],[1283,489,27.58],[1279,471,28.7],[1280,456,29.65],[1287,451,30.2],[1295,451,30.77],[1300,445,31.26],[1295,448,31.68],[1286,448,32.24],[1286,442,32.66],[1284,439,32.85],[1285,431,33.42],[1277,429,33.96],[1270,424,34.49],[1278,413,35.39],[1276,400,36.21],[1281,400,36.52],[1283,397,36.73],[1282,387,37.35],[1276,386,37.8],[1275,382,38.05],[1270,380,38.38],[1270,373,38.84],[1273,372,39.03],[1279,378,39.59],[1283,377,39.88],[1285,373,40.13],[1282,358,41.09],[1290,352,41.75],[1289,349,41.96],[1283,346,42.4],[1291,323,43.95],[1286,311,44.73],[1278,314,45.21],[1267,311,45.92],[1234,308,48.01],[1204,310,49.86],[1182,318,51.3],[1138,328,54.08],[1115,332,55.51],[1102,330,56.34],[1068,339,58.49],[1053,347,59.57],[1041,345,60.3],[1035,347,60.72],[1019,339,61.87],[1005,335,62.76],[997,329,63.4],[974,325,64.87],[962,328,65.66],[940,340,67.16],[924,339,68.19],[916,337,68.71],[903,339,69.52],[885,338,70.64],[865,321,72.29],[814,297,75.78],[798,285,77.03],[789,285,77.61],[760,275,79.5],[723,273,81.79],[677,255,84.86],[631,243,87.78],[614,231,89.05],[596,213,90.63],[546,196,93.93],[482,135,99.37],[438,109,102.54],[424,90,104.04],[413,96,104.79],[396,100,105.86],[379,100,106.94],[377,105,107.3],[381,112,107.82],[379,116,108.13],[365,115,109.06],[363,117,109.25],[363,129,110.0],[358,133,110.42],[357,137,110.66],[360,149,111.42],[355,160,112.17],[345,165,112.86],[305,172,115.37],[301,184,116.16],[289,192,117.11],[282,187,117.67],[277,177,118.37],[252,181,119.89],[238,181,120.81],[174,144,125.39],[149,142,126.94],[126,136,128.39],[70,137,131.83],[71,143,132.18],[82,155,133.24],[105,168,134.85],[139,180,137.07],[148,185,137.71],[165,190,138.8],[187,213,140.75],[198,217,141.49],[214,235,142.98],[224,238,143.61],[244,267,145.79],[253,275,146.53],[253,280,146.86],[242,289,147.77],[240,297,148.28],[241,302,148.63],[268,333,151.12],[269,341,151.68],[280,344,152.4],[281,349,152.69],[287,353,153.15],[288,366,153.98],[304,365,154.95],[322,361,156.09],[335,364,156.97],[359,364,158.41],[360,355,159.01],[375,351,160.03],[374,346,160.39],[379,324,161.76],[382,319,162.16],[383,308,162.83],[381,300,163.3],[372,286,164.34],[369,274,165.1],[387,258,166.61],[397,254,167.27],[400,247,167.75],[399,241,168.11],[406,234,168.72],[407,229,169.04],[414,229,169.47],[437,239,171.04],[464,243,172.72],[487,254,174.32],[489,258,174.61],[487,266,175.13],[498,289,176.68],[500,312,178.1],[511,326,179.24],[530,337,180.63],[545,363,182.46],[546,374,183.15],[553,379,183.72],[562,381,184.3],[599,415,187.39],[626,434,189.42],[653,445,191.26],[669,444,192.23],[675,442,192.66],[687,443,193.37],[701,462,194.86],[720,476,196.36],[724,475,196.64],[736,464,197.61],[748,459,198.45],[759,468,199.31],[775,471,200.31],[784,478,201.03],[791,480,201.45],[802,490,202.4],[841,507,205.06],[852,517,205.95],[869,515,207.07],[873,512,207.38],[884,524,208.37],[885,521,208.6]];
var ELEV=[[0.0,121],[0.3,127],[0.6,130],[0.9,134],[1.2,137],[1.5,145],[1.8,167],[2.1,185],[2.4,184],[2.7,173],[3.0,167],[3.3,164],[3.6,158],[3.9,159],[4.2,163],[4.5,154],[4.8,155],[5.1,162],[5.4,162],[5.7,159],[6.0,147],[6.3,133],[6.6,130],[6.9,121],[7.2,113],[7.5,105],[7.8,93],[8.1,82],[8.4,81],[8.7,78],[9.0,75],[9.3,75],[9.6,74],[9.9,74],[10.2,75],[10.5,76],[10.8,76],[11.1,75],[11.4,76],[11.7,80],[12.0,89],[12.3,93],[12.6,89],[12.9,86],[13.2,86],[13.5,87],[13.8,90],[14.1,92],[14.4,94],[14.7,96],[15.0,96],[15.3,101],[15.6,105],[15.9,104],[16.2,107],[16.5,110],[16.8,112],[17.1,112],[17.4,114],[17.7,121],[18.0,127],[18.3,128],[18.6,129],[18.9,124],[19.2,126],[19.5,122],[19.8,105],[20.1,111],[20.4,113],[20.7,107],[21.0,112],[21.3,114],[21.6,116],[21.9,116],[22.2,117],[22.5,119],[22.8,121],[23.1,119],[23.4,117],[23.7,121],[24.0,125],[24.3,130],[24.6,137],[24.9,140],[25.2,139],[25.5,146],[25.8,153],[26.1,160],[26.4,165],[26.7,169],[27.0,164],[27.3,149],[27.6,146],[27.9,137],[28.2,139],[28.5,147],[28.8,147],[29.1,150],[29.4,159],[29.7,175],[30.0,184],[30.3,190],[30.6,186],[30.9,187],[31.2,191],[31.5,203],[31.8,226],[32.1,249],[32.4,273],[32.7,292],[33.0,298],[33.3,318],[33.6,337],[33.9,340],[34.2,346],[34.5,333],[34.8,306],[35.1,284],[35.4,280],[35.7,283],[36.0,284],[36.3,276],[36.6,254],[36.9,237],[37.2,249],[37.5,269],[37.8,291],[38.1,301],[38.4,300],[38.7,299],[39.0,296],[39.3,291],[39.6,297],[39.9,303],[40.2,306],[40.5,309],[40.8,315],[41.1,321],[41.4,325],[41.7,327],[42.0,331],[42.3,344],[42.6,351],[42.9,344],[43.2,341],[43.5,349],[43.8,347],[44.1,347],[44.4,350],[44.7,352],[45.0,359],[45.3,368],[45.6,375],[45.9,383],[46.2,382],[46.5,378],[46.8,370],[47.1,363],[47.4,366],[47.7,366],[48.0,365],[48.3,364],[48.6,367],[48.9,376],[49.2,374],[49.5,369],[49.8,368],[50.1,368],[50.4,374],[50.7,384],[51.0,386],[51.3,385],[51.6,382],[51.9,381],[52.2,385],[52.5,390],[52.8,395],[53.1,399],[53.4,396],[53.7,398],[54.0,405],[54.3,404],[54.6,402],[54.9,403],[55.2,405],[55.5,408],[55.8,409],[56.1,408],[56.4,414],[56.7,418],[57.0,415],[57.3,418],[57.6,421],[57.9,429],[58.2,436],[58.5,430],[58.8,430],[59.1,444],[59.4,460],[59.7,474],[60.0,484],[60.3,490],[60.6,509],[60.9,530],[61.2,552],[61.5,572],[61.8,593],[62.1,617],[62.4,640],[62.7,664],[63.0,687],[63.3,708],[63.6,724],[63.9,728],[64.2,723],[64.5,716],[64.8,712],[65.1,707],[65.4,702],[65.7,703],[66.0,701],[66.3,694],[66.6,676],[66.9,654],[67.2,648],[67.5,663],[67.8,675],[68.1,675],[68.4,660],[68.7,641],[69.0,621],[69.3,601],[69.6,592],[69.9,594],[70.2,578],[70.5,555],[70.8,533],[71.1,509],[71.4,495],[71.7,486],[72.0,465],[72.3,450],[72.6,458],[72.9,467],[73.2,462],[73.5,461],[73.8,470],[74.1,467],[74.4,450],[74.7,433],[75.0,426],[75.3,434],[75.6,435],[75.9,432],[76.2,435],[76.5,443],[76.8,441],[77.1,431],[77.4,427],[77.7,438],[78.0,446],[78.3,440],[78.6,426],[78.9,431],[79.2,433],[79.5,423],[79.8,409],[80.1,400],[80.4,406],[80.7,408],[81.0,397],[81.3,384],[81.6,377],[81.9,376],[82.2,382],[82.5,381],[82.8,373],[83.1,362],[83.4,353],[83.7,351],[84.0,356],[84.3,362],[84.6,367],[84.9,364],[85.2,355],[85.5,345],[85.8,336],[86.1,333],[86.4,339],[86.7,334],[87.0,332],[87.3,339],[87.6,345],[87.9,351],[88.2,352],[88.5,349],[88.8,347],[89.1,344],[89.4,337],[89.7,331],[90.0,327],[90.3,318],[90.6,313],[90.9,316],[91.2,314],[91.5,321],[91.8,326],[92.1,322],[92.4,327],[92.7,332],[93.0,327],[93.3,319],[93.6,315],[93.9,316],[94.2,323],[94.5,330],[94.8,326],[95.1,314],[95.4,312],[95.7,318],[96.0,321],[96.3,314],[96.6,308],[96.9,312],[97.2,318],[97.5,324],[97.8,323],[98.1,312],[98.4,309],[98.7,307],[99.0,306],[99.3,315],[99.6,314],[99.9,301],[100.2,293],[100.5,304],[100.8,305],[101.1,295],[101.4,292],[101.7,295],[102.0,286],[102.3,271],[102.6,261],[102.9,259],[103.2,246],[103.5,237],[103.8,233],[104.1,232],[104.4,229],[104.7,228],[105.0,230],[105.3,227],[105.6,227],[105.9,222],[106.2,219],[106.5,217],[106.8,215],[107.1,215],[107.4,216],[107.7,213],[108.0,210],[108.3,209],[108.6,208],[108.9,208],[109.2,202],[109.5,202],[109.8,200],[110.1,194],[110.4,191],[110.7,189],[111.0,187],[111.3,185],[111.6,183],[111.9,185],[112.2,183],[112.5,184],[112.8,183],[113.1,182],[113.4,179],[113.7,176],[114.0,172],[114.3,170],[114.6,169],[114.9,169],[115.2,173],[115.5,174],[115.8,170],[116.1,169],[116.4,168],[116.7,168],[117.0,165],[117.3,167],[117.6,171],[117.9,175],[118.2,180],[118.5,183],[118.8,185],[119.1,185],[119.4,182],[119.7,182],[120.0,181],[120.3,179],[120.6,179],[120.9,183],[121.2,187],[121.5,191],[121.8,189],[122.1,187],[122.4,188],[122.7,192],[123.0,197],[123.3,196],[123.6,190],[123.9,189],[124.2,191],[124.5,192],[124.8,194],[125.1,200],[125.4,205],[125.7,213],[126.0,221],[126.3,219],[126.6,210],[126.9,214],[127.2,212],[127.5,205],[127.8,202],[128.1,201],[128.4,199],[128.7,194],[129.0,187],[129.3,195],[129.6,201],[129.9,200],[130.2,199],[130.5,198],[130.8,197],[131.1,195],[131.4,193],[131.7,190],[132.0,187],[132.3,185],[132.6,182],[132.9,179],[133.2,177],[133.5,177],[133.8,177],[134.1,176],[134.4,176],[134.7,172],[135.0,166],[135.3,163],[135.6,161],[135.9,160],[136.2,157],[136.5,153],[136.8,153],[137.1,153],[137.4,152],[137.7,159],[138.0,161],[138.3,155],[138.6,151],[138.9,152],[139.2,151],[139.5,157],[139.8,156],[140.1,153],[140.4,151],[140.7,148],[141.0,146],[141.3,146],[141.6,146],[141.9,145],[142.2,145],[142.5,143],[142.8,141],[143.1,141],[143.4,141],[143.7,142],[144.0,141],[144.3,141],[144.6,142],[144.9,141],[145.2,140],[145.5,139],[145.8,138],[146.1,141],[146.4,149],[146.7,154],[147.0,150],[147.3,152],[147.6,156],[147.9,143],[148.2,139],[148.5,142],[148.8,144],[149.1,147],[149.4,152],[149.7,153],[150.0,148],[150.3,145],[150.6,146],[150.9,145],[151.2,142],[151.5,144],[151.8,144],[152.1,144],[152.4,139],[152.7,147],[153.0,140],[153.3,155],[153.6,152],[153.9,154],[154.2,144],[154.5,134],[154.8,134],[155.1,137],[155.4,142],[155.7,139],[156.0,144],[156.3,132],[156.6,120],[156.9,121],[157.2,119],[157.5,118],[157.8,118],[158.1,118],[158.4,118],[158.7,124],[159.0,131],[159.3,136],[159.6,133],[159.9,132],[160.2,143],[160.5,155],[160.8,149],[161.1,144],[161.4,144],[161.7,145],[162.0,146],[162.3,148],[162.6,152],[162.9,154],[163.2,160],[163.5,167],[163.8,165],[164.1,171],[164.4,176],[164.7,178],[165.0,182],[165.3,185],[165.6,189],[165.9,194],[166.2,198],[166.5,204],[166.8,213],[167.1,221],[167.4,238],[167.7,245],[168.0,253],[168.3,275],[168.6,276],[168.9,261],[169.2,261],[169.5,269],[169.8,270],[170.1,272],[170.4,274],[170.7,284],[171.0,298],[171.3,308],[171.6,317],[171.9,317],[172.2,315],[172.5,331],[172.8,346],[173.1,354],[173.4,364],[173.7,379],[174.0,397],[174.3,406],[174.6,395],[174.9,371],[175.2,351],[175.5,328],[175.8,314],[176.1,302],[176.4,287],[176.7,276],[177.0,266],[177.3,257],[177.6,255],[177.9,255],[178.2,252],[178.5,243],[178.8,241],[179.1,237],[179.4,233],[179.7,224],[180.0,217],[180.3,204],[180.6,197],[180.9,196],[181.2,198],[181.5,195],[181.8,194],[182.1,189],[182.4,190],[182.7,184],[183.0,164],[183.3,147],[183.6,138],[183.9,152],[184.2,173],[184.5,186],[184.8,202],[185.1,208],[185.4,198],[185.7,189],[186.0,178],[186.3,169],[186.6,166],[186.9,180],[187.2,202],[187.5,219],[187.8,218],[188.1,199],[188.4,186],[188.7,173],[189.0,165],[189.3,169],[189.6,186],[189.9,204],[190.2,216],[190.5,221],[190.8,233],[191.1,248],[191.4,255],[191.7,259],[192.0,265],[192.3,262],[192.6,251],[192.9,246],[193.2,240],[193.5,244],[193.8,232],[194.1,212],[194.4,197],[194.7,192],[195.0,188],[195.3,183],[195.6,177],[195.9,174],[196.2,169],[196.5,172],[196.8,190],[197.1,204],[197.4,222],[197.7,247],[198.0,265],[198.3,261],[198.6,248],[198.9,233],[199.2,219],[199.5,212],[199.8,199],[200.1,185],[200.4,177],[200.7,169],[201.0,165],[201.3,162],[201.6,162],[201.9,159],[202.2,152],[202.5,148],[202.8,145],[203.1,143],[203.4,141],[203.7,145],[204.0,140],[204.3,130],[204.6,127],[204.9,125],[205.2,122],[205.5,120],[205.8,120],[206.1,128],[206.4,151],[206.7,155],[207.0,156],[207.3,155],[207.6,134],[207.9,118],[208.2,115],[208.5,119],[208.6,119]];
var TOWNS=[["Swellendam",885,512,0.4,0.3,0,-16,"middle"],["Suurbraak",1211,477,0.1,23.0,0,24,"middle"],["Barrydale",1292,304,0.6,44.7,-12,-10,"end"],["Montagu",407,95,0.1,105.2,10,-10,"start"],["Robertson",50,114,1.9,131.8,0,-14,"middle"],["Bonnievale",373,350,0.1,159.9,14,22,"start"],["Ashton",323,170,0.1,114.3,-12,22,"end"],["McGregor",-27,370,14.8,133.6,0,-12,"middle"]];
var FUEL=[[34.28,'Tradouw Pass water station','Coca Cola and water'],[65.9,'Op de Tradouw feeding station','Coca Cola, water and a selection of food'],[171.33,'Feeding station','Coca-cola, water and a selection of food'],[190.85,'Refreshment station','Coca-cola and water']];
var CLIMBS=[
 {n:'Tradouw Pass',sid:'s1b',a:30.0,b:33.5,gain:147,avg:'4.2',hum:[[30.0,33.5]],note:'Short and sharp, then a drop and a long drag towards ODT'},
 {n:'Op de Tradouw',sid:'s1d',a:60.0,b:63.9,gain:244,avg:'6.3',hum:[[60.0,63.9]],note:'Starts at 60 km and tops out at 728 m, after a long drag from Tradouw'},
 {n:'Final climb',sid:'s3a',a:158.1,b:174.3,gain:285,avg:'1.8',hum:[[158.1,174.3]],note:'Starts before Sector 3. The last 8 km averages about 2.5%, the last 3.3 km about 3.3%'},
 {n:'4 Sisters hills',a:183.6,b:198.1,gain:298,avg:'3 to 5',hum:[[183.6,185.0],[186.5,187.6],[189.0,192.0],[196.2,198.1]],note:'Four hills at 183.6-185.0, 186.5-187.6, 189.0-192.0 and 196.2-198.1 km'}
];

/* easy stretches: first 3 km of the race and first 3 km of sector 2 */
var EASY_KM=[[0,3],[118.3,121.3]];
function easyBadge(x,y){return '<circle cx="'+x+'" cy="'+y+'" r="9" fill="#1f5b4c" stroke="#3ddbb0" stroke-width="2"/>';}
/* route helpers: ROUTE points are [x, y, km] */
var PL=[0];for(var i=1;i<ROUTE.length;i++){PL[i]=PL[i-1]+Math.hypot(ROUTE[i][0]-ROUTE[i-1][0],ROUTE[i][1]-ROUTE[i-1][1]);}
var PLT=PL[PL.length-1];
function kmLen(km){km=Math.max(0,Math.min(KM_TOTAL,km));var lo=0,hi=ROUTE.length-1;while(hi-lo>1){var m=(lo+hi)>>1;if(ROUTE[m][2]<=km)lo=m;else hi=m;}var a=ROUTE[lo],b=ROUTE[hi];var f=(km-a[2])/((b[2]-a[2])||1);return PL[lo]+(PL[hi]-PL[lo])*Math.max(0,Math.min(1,f));}
function ptAt(len){for(var i=1;i<PL.length;i++){if(len<=PL[i]){var f=(len-PL[i-1])/((PL[i]-PL[i-1])||1);return [ROUTE[i-1][0]+(ROUTE[i][0]-ROUTE[i-1][0])*f,ROUTE[i-1][1]+(ROUTE[i][1]-ROUTE[i-1][1])*f];}}var l=ROUTE[ROUTE.length-1];return [l[0],l[1]];}
function kmPt(km){return ptAt(kmLen(km));}
function dash(k0,k1){var a=kmLen(k0)/PLT*1000,b=kmLen(k1)/PLT*1000;return '0 '+a.toFixed(2)+' '+Math.max(0.5,b-a).toFixed(2)+' 3000';}
var ROUTE_D='M'+ROUTE.map(function(p){return p[0]+','+p[1]}).join(' L');
function elevAt(km){var lo=0,hi=ELEV.length-1;while(hi-lo>1){var m=(lo+hi)>>1;if(ELEV[m][0]<=km)lo=m;else hi=m;}return ELEV[lo][1]+(ELEV[hi][1]-ELEV[lo][1])*((km-ELEV[lo][0])/((ELEV[hi][0]-ELEV[lo][0])||1));}

/* ---------- state ---------- */
function defaults(){
  var riders=[];for(var i=1;i<=12;i++)riders.push({id:'r'+i,name:'',team:'',type:'',note:''});
  var n=[['s1a',1,'Start to Tradouw',0,30],['s1b',1,'Tradouw Pass',30,33.5],['s1c',1,'Tradouw to ODT',33.5,60],['s1d',1,'ODT',60,63.9],['s1e',1,'ODT to Ashton',63.9,112.26],['s2a',2,'Out of Ashton',118.3,146],['s2b',2,'Into Bonnievale',146,156],['s3a',3,'Final climb',162.04,174.3],['s3b',3,'Descent',174.3,183.6],['s3c',3,'4 Sisters to finish',183.6,206.94]];
  var sectors=n.map(function(q){return {id:q[0],grp:q[1],name:q[2],a:q[3],b:q[4],goal:'',style:'',kph:'',wf:'',wb:'',speed:false,easy:false};});
  return {v:2,riders:riders,sectors:sectors,stops:[{after:'s1e',name:'Neutral 1 Ashton TSZ',km:112.26,tsz:118.3,mins:45},{after:'s2b',name:'Neutral 2 Bonnievale TSZ',km:156,tsz:162.04,mins:45}],plan:{},roles:{},tasks:{}};
}
var S=defaults();
var ui={sel:null,brush:'inspect',compact:(function(){try{return localStorage.getItem('dc26-compact')!=='0';}catch(e){return true;}})()};
function cmpLabel(){var b=document.getElementById('cmpbtn');if(b)b.textContent=ui.compact?'Riding: compact (tap for full list)':'Riding: full list (tap for compact)';}
var MODE=document.body.getAttribute('data-mode');var SHARE=(MODE==='plan');
var saveStatus='boot';

/* master plan lives in master.js; reset and the game plan page both read it */
function masterPlan(){return window.MASTER_PLAN?normalize(JSON.parse(JSON.stringify(window.MASTER_PLAN))):seedRiders(defaults());}
function on(id,ev,fn){var el=document.getElementById(id);if(el)el.addEventListener(ev,fn);}
function sector(id){return S.sectors.filter(function(s){return s.id===id})[0]}
function rider(id){return S.riders.filter(function(r){return r.id===id})[0]}
function cname(c){var q=c.sid&&S.sectors.filter(function(x){return x.id===c.sid})[0];return q&&q.name?q.name:c.n}
function cnameStr(n){var c=CLIMBS.filter(function(k){return k.n===n})[0];return c?cname(c):n}
function lab(s){return s.id.toUpperCase()}
function rname(r){return (r.name&&r.name.trim())?r.name.trim():'Rider '+r.id.slice(1)}
function st(rid,sid){return (S.plan[rid]&&S.plan[rid][sid])||''}
function setSt(rid,sid,v){S.plan[rid]=S.plan[rid]||{};if(v)S.plan[rid][sid]=v;else delete S.plan[rid][sid];}
function role(rid,sid){return (S.roles[rid]&&S.roles[rid][sid])||''}
function setRole(rid,sid,v){S.roles[rid]=S.roles[rid]||{};if(v)S.roles[rid][sid]=v;else delete S.roles[rid][sid];}
function task(rid,sid){return (S.tasks&&S.tasks[rid]&&S.tasks[rid][sid])||'';}
function setTask(rid,sid,v){S.tasks=S.tasks||{};S.tasks[rid]=S.tasks[rid]||{};if(v)S.tasks[rid][sid]=v;else delete S.tasks[rid][sid];}
function goalText(s){return s.goal&&s.goal.trim()?esc(s.goal):'<i style="color:#5b6677">Goal not set</i>';}
function dist(s){return Math.max(0,Math.round(((+s.b)-(+s.a))*100)/100)}
function k1(n){return String(Math.round(n*10)/10)}
function stopAfter(sid){return S.stops.filter(function(x){return x.after===sid})[0]}
function groups(sid){var g={L:[],P:[],R:[],S:[],B:[]};S.riders.forEach(function(r){var v=st(r.id,sid);if(g[v])g[v].push(r);});return g;}
function fm(m){if(m==null)return '-';var h=Math.floor(m/60),mm=Math.round(m-h*60);if(mm===60){h++;mm=0;}return h?h+'h'+(mm<10?'0':'')+mm:mm+'′';}
function timesById(){var cum=0,o={};S.sectors.forEach(function(s){var k=parseFloat(s.kph);var t=k>0?dist(s)/k*60:null;if(t!=null)cum+=t;o[s.id]={t:t,cum:t!=null?cum:null};});return o;}
var SEED=[['Waldo','black','','85kg, 383w, all day long'],['Darren','black','','80kg, 350w. Use punch rather than risk duration'],['Miguel','black','','75kg, 4.5 W/kg, all day long'],['Corbin','red','','60kg, 280w, duration TBC'],['Jason','red','','70kg, 4.3+ W/kg. Use the watts to be safe'],['David','red','','75kg, 4.3 W/kg, all day long'],['Cam','blue','Diesel','79 to 85kg, 6ft+, 4 W/kg. Drive to 170'],['Sean','blue','Diesel','79 to 85kg, 6ft+, 4 W/kg. Drive to 170'],['Ben','blue','Diesel','79 to 85kg, 6ft+, 4 W/kg, all day. Momentum and backup'],['Emil','blue','Diesel','79 to 85kg, 6ft+, 4 W/kg, all day. The TopGear Beetle plus S2 banger'],['Brendon','white','Bomb','Still fat. Mystery plus the DC bonus. Just here to lengthen gaps on the flats (with Matt)'],['Matt','white','Bomb','Dad muscles now, lame W/kg. Just here to lengthen gaps on the flats (with Brendon)']];
function seedRiders(o){var blank=o.riders.every(function(r){return !r.name&&!r.team&&!r.note&&!r.type;});var noPlan=!o.plan||!Object.keys(o.plan).length;if(!(blank&&noPlan))return o;o.riders=SEED.map(function(q,i){return {id:'r'+(i+1),name:q[0],team:q[1],type:q[2],note:q[3]};});o.plan={};o.riders.forEach(function(r){o.plan[r.id]={};o.sectors.forEach(function(x){o.plan[r.id][x.id]='L';});});return o;}
S=masterPlan();
function migrate2(d){if(!d||!Array.isArray(d.sectors))return d;var ids=d.sectors.map(function(q){return q.id});if(ids.indexOf('s1e')>=0||ids.indexOf('s1d')<0)return d;
var g=function(id){return d.sectors.filter(function(q){return q.id===id})[0]};var a=g('s1a'),b=g('s1b'),c=g('s1c'),e=g('s1d');
if(a&&+a.b===28)a.b=30;
if(b&&+b.a===28&&+b.b===36.9){b.a=30;b.b=33.5;}
var nc={id:'s1c',grp:1,name:'Tradouw to ODT',a:33.5,b:60,goal:'',style:'',kph:'',wf:'',wb:'',speed:false,easy:false};
if(c){c.id='s1d';if(+c.a===36.9)c.a=60;if(c.name==='Op de Tradouw')c.name='ODT';}
if(e)e.id='s1e';
var out=[];d.sectors.forEach(function(q){out.push(q);if(q.id==='s1b')out.push(nc);});d.sectors=out;
if(d.plan){Object.keys(d.plan).forEach(function(r){var p=d.plan[r]||{};var n={};Object.keys(p).forEach(function(k){if(['s1b','s1c','s1d'].indexOf(k)<0)n[k]=p[k];});if(p.s1b)n.s1c=p.s1b;if(p.s1b)n.s1b=p.s1b;if(p.s1c)n.s1d=p.s1c;if(p.s1d)n.s1e=p.s1d;d.plan[r]=n;});}
if(Array.isArray(d.stops))d.stops.forEach(function(x){if(x.after==='s1d')x.after='s1e';});
return d;}
function migrate(d){if(!d||!Array.isArray(d.sectors))return d;d.sectors.forEach(function(q){if(q.id==='s3c'&&q.name==='3 Sisters to finish')q.name='4 Sisters to finish';});var M={s1b:[28,59.5,'Tradouw to ODT',28,36.9,'Tradouw Pass'],s1c:[59.5,102,'ODT and descent',36.9,63.9,'Op de Tradouw'],s1d:[102,112.26,'Into Ashton',63.9,112.26,'ODT to Ashton']};d.sectors.forEach(function(q){var m=M[q.id];if(m&&+q.a===m[0]&&+q.b===m[1]){q.a=m[3];q.b=m[4];if(q.name===m[2])q.name=m[5];}});return d;}
function normalize(d){
  d=migrate2(migrate(d));var b=defaults();if(!d||typeof d!=='object')return seedRiders(b);
  if(d.v!==2){if(Array.isArray(d.riders)&&d.riders.length)b.riders=d.riders;while(b.riders.length<12)b.riders.push({id:'r'+(b.riders.length+1),name:'',team:'',type:'',note:''});return seedRiders(b);}
  var o={v:2,riders:Array.isArray(d.riders)&&d.riders.length?d.riders:b.riders,sectors:Array.isArray(d.sectors)&&d.sectors.length?d.sectors:b.sectors,stops:Array.isArray(d.stops)?d.stops:b.stops,plan:d.plan&&typeof d.plan==='object'?d.plan:{},roles:d.roles&&typeof d.roles==='object'?d.roles:{},tasks:d.tasks&&typeof d.tasks==='object'?d.tasks:{}};
  while(o.riders.length<12)o.riders.push({id:'r'+(o.riders.length+1),name:'',team:'',type:'',note:''});
  o.rev=+d.rev||0;
  return seedRiders(o);
}
function colsList(){var cols=[];S.sectors.forEach(function(s){cols.push({k:'s',s:s});var x=stopAfter(s.id);if(x)cols.push({k:'x',x:x});});return cols;}
function groupHeads(cols){var out=[],cur=null;cols.forEach(function(c){if(c.k==='s'){if(cur&&cur.grp===c.s.grp)cur.span++;else{cur={grp:c.s.grp,span:1,km:0};out.push(cur);}cur.km+=dist(c.s);}else{cur=null;out.push({stop:c.x});}});return out;}

/* ---------- persistence (this device only, localStorage) ---------- */
function setStatus(s){saveStatus=s;var m={boot:['Loading','pill'],local:['Saved on this device only','pill warn'],saving:['Saving...','pill'],err:['Save failed','pill warn']}[s]||['','pill'];var els=document.querySelectorAll('#status,.sstat');for(var i=0;i<els.length;i++){els[i].textContent=m[0];els[i].className=m[1]+(els[i].id==='status'?'':' sstat');}}
var LSK='dc26-board-v2';
function lsSave(){if(SHARE)return true;try{localStorage.setItem(LSK,JSON.stringify(S));return true;}catch(e){return false;}}
function lsLoad(){try{var t=localStorage.getItem(LSK);return t?JSON.parse(t):null;}catch(e){return null;}}
function touch(){if(SHARE)return;S.rev=Date.now();setStatus(lsSave()?'local':'err');}

/* ---------- export, import, reset, send ---------- */
var MAX_IMPORT=1000000,sending=false,modalReturn=null;
function showMsg(t,ok){var m=document.getElementById('msg');if(!m)return;m.textContent=t;m.style.color=ok?'#7fd6a6':'#ffb020';}
function isStrOpt(x){return x==null||typeof x==='string';}
function isOptNum(x){return x==null||x===''||typeof x==='number';}
function validatePlan(d){
  if(!d||typeof d!=='object'||Array.isArray(d))return 'this file is not a race plan.';
  if(!Array.isArray(d.riders)||d.riders.length<1||d.riders.length>24)return 'the riders list must hold 1 to 24 riders.';
  var ids={},i;
  for(i=0;i<d.riders.length;i++){var r=d.riders[i];
    if(!r||typeof r!=='object'||typeof r.id!=='string'||!/^r\d{1,2}$/.test(r.id)||ids[r.id])return 'rider '+(i+1)+' has a missing or repeated id.';
    ids[r.id]=1;
    if(!isStrOpt(r.name)||!isStrOpt(r.type)||!isStrOpt(r.note))return 'rider '+(i+1)+' has a name, type or note that is not text.';
    if(r.team!=null&&r.team!==''&&!Object.prototype.hasOwnProperty.call(TEAMS,r.team))return 'rider '+(i+1)+' has an unknown team.';
  }
  if(!Array.isArray(d.sectors)||d.sectors.length<1||d.sectors.length>30)return 'the sectors list must hold 1 to 30 sectors.';
  ids={};
  for(i=0;i<d.sectors.length;i++){var q=d.sectors[i];
    if(!q||typeof q!=='object'||typeof q.id!=='string'||!/^s[0-9a-z]{1,6}$/.test(q.id)||ids[q.id])return 'sector '+(i+1)+' has a missing or repeated id.';
    ids[q.id]=1;
    if(typeof q.name!=='string'||typeof q.a!=='number'||typeof q.b!=='number'||!isFinite(q.a)||!isFinite(q.b)||q.b<q.a)return 'sector '+q.id+' needs a name and valid from and to km.';
    if(q.grp!=null&&[1,2,3].indexOf(+q.grp)<0)return 'sector '+q.id+' has an unknown group.';
    if(!isStrOpt(q.goal)||!isStrOpt(q.style))return 'sector '+q.id+' has a goal or style that is not text.';
    if(!isOptNum(q.kph)||!isOptNum(q.wf)||!isOptNum(q.wb))return 'sector '+q.id+' has a speed or W/kg value that is not a number.';
  }
  if(d.stops!=null){
    if(!Array.isArray(d.stops)||d.stops.length>10)return 'the neutral zones list must hold up to 10 entries.';
    for(i=0;i<d.stops.length;i++){var x=d.stops[i];
      if(!x||typeof x!=='object'||typeof x.after!=='string'||typeof x.name!=='string'||!isFinite(+x.km)||!isFinite(+x.tsz)||!isFinite(+x.mins))return 'neutral zone '+(i+1)+' is incomplete.';
    }
  }
  if(d.plan!=null){
    if(typeof d.plan!=='object'||Array.isArray(d.plan))return 'the allocations are not in the right shape.';
    var pk=Object.keys(d.plan);
    for(i=0;i<pk.length;i++){var p=d.plan[pk[i]];
      if(!p||typeof p!=='object'||Array.isArray(p))return 'the allocations are not in the right shape.';
      var sk=Object.keys(p);
      for(var j=0;j<sk.length;j++){if(ORDER.indexOf(p[sk[j]])<0&&p[sk[j]]!=='')return 'the allocation for '+pk[i]+' uses an unknown status.';}
    }
  }
  if(d.roles!=null){
    if(typeof d.roles!=='object'||Array.isArray(d.roles))return 'the roles are not in the right shape.';
    var rk=Object.keys(d.roles);
    for(i=0;i<rk.length;i++){var rr=d.roles[rk[i]];
      if(!rr||typeof rr!=='object'||Array.isArray(rr))return 'the roles are not in the right shape.';
      var rsk=Object.keys(rr);
      for(var k=0;k<rsk.length;k++){if(typeof rr[rsk[k]]!=='string'||(rr[rsk[k]]!==''&&!Object.prototype.hasOwnProperty.call(ROLES,rr[rsk[k]])))return 'the roles use an unknown role.';}
    }
  }
  if(d.tasks!=null){if(typeof d.tasks!=='object'||Array.isArray(d.tasks))return 'the task notes are not in the right shape.';var tk=Object.keys(d.tasks);for(i=0;i<tk.length;i++){var tt=d.tasks[tk[i]];if(!tt||typeof tt!=='object'||Array.isArray(tt))return 'the task notes are not in the right shape.';var tsk=Object.keys(tt);for(var m=0;m<tsk.length;m++){if(typeof tt[tsk[m]]!=='string')return 'the task notes must be text.';}}}
  return null;
}
function download(name,text){var b=new Blob([text],{type:'application/json'});var u=URL.createObjectURL(b);var a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(u);a.remove();},1000);}
function exportPlan(){download('double-century-plan.json',JSON.stringify(S,null,1));showMsg('Plan downloaded as double-century-plan.json.',true);}
function importPlan(file){
  if(!file)return;
  if(file.size>MAX_IMPORT){showMsg('Import failed: the file is too large to be a race plan.',false);return;}
  var fr=new FileReader();
  fr.onload=function(){
    var d;
    try{d=JSON.parse(String(fr.result));}catch(e){showMsg('Import failed: the file is not valid JSON.',false);return;}
    if(d&&d.format==='dc26-submission'&&d.plan)d=d.plan;
    var err=validatePlan(d);
    if(err){showMsg('Import failed: '+err,false);return;}
    S=normalize(d);ui.sel=null;setStatus(lsSave()?'local':'err');renderAll();
    showMsg('Plan imported and saved on this device.',true);
  };
  fr.onerror=function(){showMsg('Import failed: the file could not be read.',false);};
  fr.readAsText(file);
}
function openModal(id){var m=document.getElementById(id);modalReturn=document.activeElement;m.hidden=false;var f=m.querySelector('[data-first]');if(f)f.focus();}
function closeModal(id){var m=document.getElementById(id);m.hidden=true;if(modalReturn&&modalReturn.focus)modalReturn.focus();}
function resetPlan(){S=masterPlan();ui.sel=null;setStatus(lsSave()?'local':'err');closeModal('resetpanel');renderAll();showMsg('Reset to the original plan.',true);}
function sendFields(){return {n:document.getElementById('fname').value.trim(),c:document.getElementById('fcomment').value.trim()};}
function refreshSend(){var btn=document.getElementById('sendbtn');if(!btn)return;var f=sendFields();btn.disabled=sending||!f.n||!f.c;}
function sendPlan(e){
  e.preventDefault();
  var f=sendFields(),msg=document.getElementById('sendmsg'),fb=document.getElementById('sendfallback');
  if(!f.n||!f.c){msg.textContent='Enter your name and the key changes before sending.';msg.style.color='#ffb020';refreshSend();return;}
  var body=new URLSearchParams();
  body.append('form-name','race-plan');body.append('bot-field','');body.append('name',f.n);body.append('comment',f.c);body.append('plan',JSON.stringify(S,null,1));
  sending=true;refreshSend();fb.hidden=true;msg.style.color='var(--mu)';msg.textContent='Sending...';
  var ctl=typeof AbortController!=='undefined'?new AbortController():null;
  var to=setTimeout(function(){if(ctl)ctl.abort();},20000);
  fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:body.toString(),signal:ctl?ctl.signal:undefined})
    .then(function(r){clearTimeout(to);if(!r.ok)throw new Error('HTTP '+r.status);sending=false;
      msg.style.color='#7fd6a6';msg.textContent='Sent. Thank you, '+f.n+'. Your plan and comment have reached Matt.';
      document.getElementById('fname').value='';document.getElementById('fcomment').value='';refreshSend();})
    .catch(function(err){clearTimeout(to);sending=false;
      msg.style.color='#ffb020';
      msg.textContent='The send did not go through ('+(err&&err.name==='AbortError'?'timed out':'the form is not reachable here')+'). Download the plan file below and send it to Matt on WhatsApp or email.';
      fb.hidden=false;refreshSend();});
}
function fallbackText(){var f=sendFields();return JSON.stringify({format:'dc26-submission',name:f.n,comment:f.c,submittedAt:new Date().toISOString(),plan:S},null,1);}
function downloadFallback(){var f=sendFields();var slug=f.n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'rider';download('double-century-plan-'+slug+'.json',fallbackText());document.getElementById('sendmsg').style.color='#7fd6a6';document.getElementById('sendmsg').textContent='Downloaded. Send that file to Matt on WhatsApp or email.';}
function copyFallback(){var msg=document.getElementById('sendmsg');var t=fallbackText();
  try{navigator.clipboard.writeText(t).then(function(){msg.style.color='#7fd6a6';msg.textContent='Copied. Paste it into a WhatsApp or email message to Matt.';},function(){msg.style.color='#ffb020';msg.textContent='Copy was blocked here. Use the download instead.';});}
  catch(e){msg.style.color='#ffb020';msg.textContent='Copy was blocked here. Use the download instead.';}}

/* ---------- map ---------- */
function renderMap(){
  var sel=ui.sel&&ui.sel.t==='sector'?sector(ui.sel.id):null;
  var h='<svg viewBox="0 30 1340 580" role="img" aria-label="Route map">';
  h+='<defs><filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>';
  h+='<rect x="0" y="30" width="1340" height="580" fill="#10161f" rx="10"/>';
  h+='<path d="'+ROUTE_D+'" fill="none" stroke="#06090d" stroke-width="16" stroke-linejoin="round" stroke-linecap="round"/>';
  h+='<path d="'+ROUTE_D+'" pathLength="1000" fill="none" stroke="#4c8df6" stroke-width="8" stroke-linejoin="round" stroke-linecap="round" stroke-dasharray="'+dash(0,KM_FIN)+'"/>';
  h+='<path d="'+ROUTE_D+'" pathLength="1000" fill="none" stroke="#6b7686" stroke-width="8" stroke-linejoin="round" stroke-dasharray="'+dash(KM_FIN,KM_TOTAL)+'"/>';
  CLIMBS.forEach(function(c){c.hum.forEach(function(q){h+='<path d="'+ROUTE_D+'" pathLength="1000" fill="none" stroke="#ffffff" stroke-width="10" stroke-linejoin="round" opacity=".75" stroke-dasharray="'+dash(q[0],q[1])+'"/>';});});
  if(sel)h+='<path d="'+ROUTE_D+'" pathLength="1000" fill="none" stroke="#ffe08a" stroke-width="12" stroke-linejoin="round" filter="url(#glow)" stroke-dasharray="'+dash(sel.a,sel.b)+'"/>';
  EASY_KM.forEach(function(e){h+='<path d="'+ROUTE_D+'" pathLength="1000" fill="none" stroke="#3ddbb0" stroke-width="10" stroke-linejoin="round" opacity=".85" stroke-dasharray="'+dash(e[0],e[1])+'"/>';var q=kmPt((e[0]+e[1])/2);h+=easyBadge(q[0],q[1]-20);});
  S.stops.forEach(function(x){h+='<path d="'+ROUTE_D+'" pathLength="1000" fill="none" stroke="#ef4135" stroke-width="10" stroke-linejoin="round" stroke-dasharray="'+dash(x.km,x.tsz)+'"/>';});
  [8,24,70,125,150,170,195].forEach(function(k){var p=kmPt(k),q=kmPt(k+1.2),a=Math.atan2(q[1]-p[1],q[0]-p[0])*180/Math.PI;h+='<polygon points="-5,-5 6,0 -5,5" fill="#06090d" opacity=".8" transform="translate('+p[0]+','+p[1]+') rotate('+a+')"/>';});
  FUEL.forEach(function(f){var p=kmPt(f[0]);h+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="6.5" fill="#3ddbb0" stroke="#06090d" stroke-width="2"><title>'+esc(f[1])+' at '+f[0]+' km. '+esc(f[2])+'</title></circle>';});
  TOWNS.forEach(function(t){if(t[3]>5||t[0]==='Ashton')return;h+='<circle cx="'+t[1]+'" cy="'+t[2]+'" r="4.5" fill="#cfd6e2"/><text x="'+(t[1]+(t[5]||0))+'" y="'+(t[2]+(t[6]||-12))+'" fill="#aeb8c8" font-size="15" font-weight="600" text-anchor="'+(t[7]||'middle')+'">'+t[0]+'</text>';});
  var sp=kmPt(0);
  h+='<g transform="translate('+(sp[0]-12)+','+(sp[1]+14)+')"><rect width="24" height="24" rx="4" fill="#fff"/><path d="M0,0h12v12h-12zM12,12h12v12h-12z" fill="#111"/></g><text x="'+sp[0]+'" y="'+(sp[1]+56)+'" fill="#fff" font-size="14" font-weight="700" text-anchor="middle">START / FINISH LINE</text><text x="'+sp[0]+'" y="'+(sp[1]+72)+'" fill="#8e99aa" font-size="11" text-anchor="middle">finish at '+KM_FIN+' km, then neutral to venue</text>';
  var so=[[-30,-36,'end'],[-24,44,'end']];
  S.stops.forEach(function(x,i){var p=kmPt(x.km),m=kmPt((+x.km+ +x.tsz)/2);var o=so[i]||[0,40,'middle'];
    h+='<g transform="translate('+m[0]+','+m[1]+')"><circle r="15" fill="#ef4135" stroke="#fff" stroke-width="2.5"/><text y="5" fill="#fff" font-size="13" font-weight="800" text-anchor="middle">N'+(i+1)+'</text></g>';
    h+='<text x="'+(m[0]+o[0])+'" y="'+(m[1]+o[1])+'" fill="#fff" font-size="13" font-weight="700" text-anchor="'+o[2]+'">'+esc(x.name)+'</text><text x="'+(m[0]+o[0])+'" y="'+(m[1]+o[1]+15)+'" fill="#ff8a82" font-size="11" font-weight="700" text-anchor="'+o[2]+'">'+k1(x.km)+' to '+k1(x.tsz)+' km · '+esc(x.mins)+'′ break</text>';
  });
  S.sectors.forEach(function(s){var p=kmPt((+s.a+ +s.b)/2);var on=sel&&sel.id===s.id;
    h+='<g data-sector="'+s.id+'" transform="translate('+p[0]+','+p[1]+')"><circle r="16" fill="'+(on?'#ef4135':'#151b24')+'" stroke="'+(on?'#fff':'#ef4135')+'" stroke-width="2.5"/><text y="4" fill="'+(on?'#111':'#ef4135')+'" font-size="11.5" font-weight="800" text-anchor="middle">'+lab(s).slice(1)+'</text></g>';
  });
  [[33.5,cnameStr('Tradouw Pass'),-16,-14,'end'],[63.9,cnameStr('Op de Tradouw'),0,-16,'middle'],[174.3,cnameStr('Final climb'),-14,22,'end'],[191,'4 Sisters',0,32,'middle']].forEach(function(c){var p=kmPt(c[0]);h+='<text x="'+(p[0]+c[2])+'" y="'+(p[1]+c[3])+'" fill="#ffffff" font-size="13" font-weight="700" text-anchor="'+c[4]+'">▲ '+c[1]+'</text>';});
  h+='</svg>';
  $('#map').innerHTML=h+'<div class="note" style="margin-top:6px"><span style="color:#4c8df6">●</span> route &nbsp; <span style="color:#ffffff">●</span> climbs &nbsp; <span style="color:#ef4135">●</span> neutral zone to team support zone &nbsp; <span style="color:#3ddbb0">●</span> feed, water or refreshment &nbsp; <span style="color:#6b7686">●</span> neutral to venue &nbsp; badges are subsectors</div>';
}

/* ---------- profile ---------- */
function renderProfile(){
  var W=1000,H=330,L=42,R=10,top=52,base=210;
  function X(k){return L+(W-L-R)*k/KM_TOTAL}
  function Y(m){return base-(m/800)*(base-top)}
  var sel=ui.sel&&ui.sel.t==='sector'?ui.sel.id:null;
  var h='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Elevation profile"><defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8e99aa" stop-opacity=".75"/><stop offset="1" stop-color="#8e99aa" stop-opacity=".12"/></linearGradient></defs>';
  [200,400,600].forEach(function(m){h+='<line x1="'+L+'" x2="'+(W-R)+'" y1="'+Y(m)+'" y2="'+Y(m)+'" stroke="#222b38"/><text x="'+(L-6)+'" y="'+(Y(m)+4)+'" fill="#667286" font-size="11" text-anchor="end">'+m+' m</text>';});
  /* neutral zones, ride to venue */
  S.stops.forEach(function(x){h+='<rect x="'+X(x.km)+'" y="'+top+'" width="'+Math.max(2,X(x.tsz)-X(x.km))+'" height="'+(base-top)+'" fill="rgba(255,59,48,.13)"/>';});
  h+='<rect x="'+X(KM_FIN)+'" y="'+top+'" width="'+(X(KM_TOTAL)-X(KM_FIN))+'" height="'+(base-top)+'" fill="rgba(255,255,255,.05)"/>';
  EASY_KM.forEach(function(e){var x0=X(e[0]),x1=X(e[1]);h+='<rect x="'+x0+'" y="'+top+'" width="'+(x1-x0)+'" height="'+(base-top)+'" fill="rgba(61,219,176,.18)"/>'+easyBadge((x0+x1)/2,top+18);});
  /* climbs */
  CLIMBS.forEach(function(c){c.hum.forEach(function(q){h+='<rect x="'+X(q[0])+'" y="'+top+'" width="'+Math.max(2,X(q[1])-X(q[0]))+'" height="'+(base-top)+'" fill="rgba(255,122,47,.11)"/>';});});
  /* sector bands */
  var gh={};
  S.sectors.forEach(function(s,i){var x0=X(Math.max(0,+s.a)),x1=X(Math.min(KM_TOTAL,+s.b));var on=sel===s.id;
    h+='<g data-sector="'+s.id+'"><rect x="'+x0+'" y="'+top+'" width="'+Math.max(1,x1-x0)+'" height="'+(base-top)+'" fill="'+(on?'rgba(239,65,53,.22)':'rgba(255,255,255,0)')+'" stroke="'+(on?'#ef4135':'#2f3a4a')+'" stroke-width="'+(on?2:1)+'"/><text x="'+((x0+x1)/2)+'" y="'+(top-8)+'" fill="'+(on?'#ef4135':'#aeb8c8')+'" font-size="12" font-weight="700" text-anchor="middle">'+lab(s)+'</text></g>';
    var g=gh[s.grp]=gh[s.grp]||{a:x0,b:x1};g.a=Math.min(g.a,x0);g.b=Math.max(g.b,x1);
  });
  Object.keys(gh).forEach(function(k){var g=gh[k];h+='<path d="M'+g.a+',28 L'+g.a+',22 L'+g.b+',22 L'+g.b+',28" fill="none" stroke="#ef4135" stroke-width="1.5"/><text x="'+((g.a+g.b)/2)+'" y="16" fill="#ef4135" font-size="13" font-weight="800" text-anchor="middle" letter-spacing="1.2">SECTOR '+k+'</text>';});
  var pts=ELEV.map(function(p){return X(p[0])+','+Y(p[1])}).join(' L');
  h+='<path d="M'+X(0)+','+base+' L'+pts+' L'+X(KM_TOTAL)+','+base+' Z" fill="url(#g1)" stroke="#cfd6e2" stroke-width="1.5" style="pointer-events:none"/>';
  /* climb labels */
  [[cnameStr('Tradouw Pass'),33.5,-4,'end'],[cnameStr('Op de Tradouw'),63.9,0,'middle'],[cnameStr('Final climb'),174.3,0,'middle']].forEach(function(c){var y=Y(elevAt(c[1]))-8;h+='<text x="'+(X(c[1])+c[2])+'" y="'+y+'" fill="#ffffff" font-size="12" font-weight="700" text-anchor="'+c[3]+'" style="pointer-events:none">▲ '+c[0]+'</text>';});
  h+='<text x="'+X(190.9)+'" y="'+(Y(300)-20)+'" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle" style="pointer-events:none">4 SISTERS</text><path d="M'+X(183.6)+','+(Y(300)-12)+' L'+X(183.6)+','+(Y(300)-8)+' L'+X(198.1)+','+(Y(300)-8)+' L'+X(198.1)+','+(Y(300)-12)+'" fill="none" stroke="#ffffff" stroke-width="1.2"/>';
  S.stops.forEach(function(x,i){h+='<line x1="'+X(x.km)+'" x2="'+X(x.km)+'" y1="'+top+'" y2="'+base+'" stroke="#ef4135" stroke-dasharray="4 4" stroke-width="1.5"/><rect x="'+X(x.km)+'" y="'+(base-5)+'" width="'+Math.max(3,X(x.tsz)-X(x.km))+'" height="9" fill="#ef4135"/>';});
  h+='<line x1="'+X(KM_FIN)+'" x2="'+X(KM_FIN)+'" y1="'+top+'" y2="'+base+'" stroke="#fff" stroke-width="1.5"/>';
  /* landmark rows */
  var A=base+30,B=base+47;
  function lbl(k,t,y,col,anchor){return '<text x="'+X(k)+'" y="'+y+'" fill="'+col+'" font-size="11.5" text-anchor="'+(anchor||'middle')+'">'+t+'</text><line x1="'+X(k)+'" x2="'+X(k)+'" y1="'+base+'" y2="'+(base+4)+'" stroke="#667286"/>';}
  h+=lbl(0,'Start',A,'#aeb8c8','start');
  S.stops.forEach(function(x,i){h+=lbl((+x.km+ +x.tsz)/2,esc(x.name.replace(/^Neutral \d /,''))+' ('+k1(x.km)+' to '+k1(x.tsz)+')',A,'#ff8a82');});
  h+=lbl(KM_FIN,'Finish '+KM_FIN,A,'#fff','end');
  var fcol='#3ddbb0';
  h+=lbl(34.28,'Water 34.3',B,fcol)+lbl(65.9,'Feed 65.9',B,fcol)+lbl(171.33,'Feed 171.3',B,fcol)+lbl(190.85,'Refreshment 190.9',B,fcol);
  [0,50,100,150,200].forEach(function(k){h+='<text x="'+X(k)+'" y="'+(base+70)+'" fill="#667286" font-size="11" text-anchor="middle">'+k+' km</text>';});
  h+='</svg>';
  $('#prof').innerHTML=h;
}
function renderClimbs(){
  var h='<table class="t" style="min-width:560px"><thead><tr><th>Climb</th><th>km</th><th>Length</th><th>Gain</th><th>Avg</th><th>Summit in</th><th>Note</th></tr></thead><tbody>';
  CLIMBS.forEach(function(c){
    var sec=S.sectors.filter(function(s){return c.b>(+s.a)&&c.b<=(+s.b)+0.001})[0];
    var len=c.hum.length>1?c.hum.reduce(function(a,q){return a+(q[1]-q[0])},0):(c.b-c.a);
    h+='<tr><td><b style="color:#ffffff">'+esc(cname(c))+'</b></td><td class="mono">'+c.a+' to '+c.b+'</td><td class="mono">'+k1(len)+' km</td><td class="mono">+'+c.gain+' m</td><td class="mono">'+c.avg+'%</td><td>'+(sec?lab(sec):'neutral')+'</td><td style="color:var(--mu);font-size:12px">'+esc(c.note)+'</td></tr>';
  });
  h+='</tbody></table>';
  $('#climbs').innerHTML=h;
}

/* ---------- board ---------- */
function chip(r,sid){return '<span class="chip" data-rider="'+r.id+'"><i class="dot t-'+(r.team||'none')+'"></i>'+esc(rname(r))+'</span>';}
var ICON={
  speed:'<svg width="18" height="14" viewBox="0 0 18 14"><path d="M1,1 Q5,-1 9,2 T17,2 L17,10 Q13,12 9,9 T1,9 Z" fill="#ff9a2e"/></svg>',
  easy:'<svg width="14" height="14" viewBox="0 0 14 14"><circle cx="7" cy="7" r="5.5" fill="#1f5b4c" stroke="#3ddbb0" stroke-width="1.5"/></svg>',
  lead:'<svg width="22" height="16" viewBox="0 0 22 16"><polygon points="0,8 6,0 22,0 22,16 6,16" fill="#ef4135"/></svg>',
  rest:'<svg width="18" height="20" viewBox="0 0 18 20"><rect x="1" y="4" width="16" height="12" fill="#3ddbb0"/><ellipse cx="9" cy="4" rx="8" ry="3" fill="#7af0d0"/><ellipse cx="9" cy="16" rx="8" ry="3" fill="#3ddbb0"/></svg>',
  brk:'<svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="#2e9e4f"/><path d="M5,5 L11,11 M11,5 L5,11" stroke="#0d1117" stroke-width="2"/></svg>'
};
function renderBoard(){
  var sel=ui.sel&&ui.sel.t==='sector'?ui.sel.id:null;
  var cols=colsList(),T=timesById();
  var tpl='124px '+cols.map(function(c){return c.k==='s'?'minmax(140px,1fr)':'58px'}).join(' ');
  var h='<div class="board" style="grid-template-columns:'+tpl+'">';
  h+='<div class="rl-cell" style="background:#10151d"></div>';
  groupHeads(cols).forEach(function(g){if(g.stop)h+='<div class="stopc"></div>';else h+='<div class="grph" style="grid-column:span '+g.span+'">SECTOR '+g.grp+' <span>timed · '+k1(g.km)+' km</span></div>';});
  function row(label,fn,xfn,extra){
    h+='<div class="rl-cell">'+label+'</div>';
    cols.forEach(function(c){
      if(c.k==='s')h+='<div class="cell '+(c.s.id===sel?'sel ':'')+(extra||'')+'" data-sector="'+c.s.id+'">'+fn(c.s)+'</div>';
      else h+='<div class="stopc">'+(xfn?xfn(c.x):'')+'</div>';
    });
  }
  h+='<div class="rl-cell hd" style="background:#10151d"></div>';
  cols.forEach(function(c){
    if(c.k==='s'){var s=c.s,fl='';if(s.speed)fl+=ICON.speed;if(s.easy)fl+=ICON.easy;
      h+='<div class="hd cell '+(s.id===sel?'sel':'')+'" data-sector="'+s.id+'"><div class="hdin"><div class="goal-top">'+goalText(s)+'</div><span class="num">'+lab(s)+'</span><b>'+esc(s.name)+'</b><small class="mono">'+k1(+s.a)+' to '+k1(+s.b)+' km</small>'+(fl?'<span class="ic"'+(s.id==='s2a'?' style="align-self:flex-end"':'')+'>'+fl+'</span>':'')+'</div></div>';
    }else h+='<div class="stopc hd"><div class="vt">NZ'+(S.stops.indexOf(c.x)+1)+' · '+esc(c.x.mins)+'′</div></div>';
  });
  
  ORDER.forEach(function(k){
    row('<span class="lab-'+k+'">'+STAT[k].n+'</span>',function(s){var g=groups(s.id)[k];if(k==='L'&&ui.compact&&g.length){var oth=S.riders.filter(function(r){return g.indexOf(r)<0});if(!oth.length)return '<div class="chips"><span class="chip" style="font-weight:700">Everyone</span></div>';if(oth.length<g.length)return '<div class="chips"><span class="chip" style="font-weight:700">All else</span></div>';}return g.length?'<div class="chips">'+g.map(function(r){return chip(r,s.id)}).join('')+'</div>':'<span style="color:#3d4757">-</span>';},function(x){return k==='R'?'<span title="Break">'+ICON.brk+'</span>':''});
  });
  row('Style',function(s){if(SHARE)return '<span class="mono">'+esc(s.style||'-')+'</span>';return '<select class="mini" data-bind="sector:'+s.id+':style"><option value="">-</option>'+STYLES.map(function(o){return '<option'+(s.style===o?' selected':'')+'>'+esc(o)+'</option>'}).join('')+'</select>';});
  row('Distance',function(s){if(SHARE)return '<b class="mono">'+k1(dist(s))+'</b> km';return '<input class="mini" type="number" step="0.1" inputmode="decimal" value="'+k1(dist(s))+'" data-bind="sector:'+s.id+':dist"> km';},function(x){return 'NZ<br>'+k1(Math.max(0,x.tsz-x.km))+' km'});
  row('Target kph',function(s){if(SHARE)return '<span class="mono">'+(s.kph!==''&&s.kph!=null?esc(s.kph):'-')+'</span>';return '<input class="mini" type="number" step="0.1" inputmode="decimal" placeholder="-" value="'+(s.kph!==''&&s.kph!=null?esc(s.kph):'')+'" data-bind="sector:'+s.id+':kph">';});
  row('W/kg F / B',function(s){if(SHARE)return '<span class="mono">'+(s.wf!==''&&s.wf!=null?esc(s.wf):'-')+' / '+(s.wb!==''&&s.wb!=null?esc(s.wb):'-')+'</span>';return '<span class="two2"><input class="mini" type="number" step="0.1" inputmode="decimal" placeholder="F" value="'+(s.wf!==''&&s.wf!=null?esc(s.wf):'')+'" data-bind="sector:'+s.id+':wf"><input class="mini" type="number" step="0.1" inputmode="decimal" placeholder="B" value="'+(s.wb!==''&&s.wb!=null?esc(s.wb):'')+'" data-bind="sector:'+s.id+':wb"></span>';});
  row('Sector time',function(s){return '<span class="mono">'+fm(T[s.id].t)+'</span>';});
  row('Race time',function(s){var i=S.sectors.indexOf(s);var allp=S.sectors.slice(0,i+1).every(function(q){return T[q.id].t!=null});return '<b class="mono">'+(allp?fm(T[s.id].cum):'-')+'</b>';},function(x){return '+'+esc(x.mins)+'′'});
  h+='</div>';
  var sc=$('#board'),l=sc.scrollLeft;sc.innerHTML=h;sc.scrollLeft=l;
}

/* ---------- allocation grid ---------- */
function renderTools(){
  var h='<button class="br '+(ui.brush==='inspect'?'on':'')+'" data-act="brush" data-v="inspect">Inspect</button>';
  ORDER.forEach(function(k){h+='<button class="br '+(ui.brush===k?'on':'')+'" data-act="brush" data-v="'+k+'"><i class="sw" style="background:'+STAT[k].c+'"></i>'+STAT[k].n+'</button>';});
  h+='<button class="br '+(ui.brush==='clear'?'on':'')+'" data-act="brush" data-v="clear">Clear</button>';
  $('#tools').innerHTML=h;
}
function renderGrid(){
  var sel=ui.sel&&ui.sel.t==='sector'?ui.sel.id:null,selr=ui.sel&&ui.sel.t==='rider'?ui.sel.id:null;
  var cols=colsList();
  var tpl='150px '+cols.map(function(c){return c.k==='s'?'minmax(78px,1fr)':'30px'}).join(' ');
  var h='<div class="grid" style="grid-template-columns:'+tpl+'"><div class="gh" style="position:sticky;left:0;z-index:2"></div>';
  groupHeads(cols).forEach(function(g){if(g.stop)h+='<div class="gstop"></div>';else h+='<div class="gh grph2" style="grid-column:span '+g.span+'">SECTOR '+g.grp+'</div>';});
  h+='<div class="gh" style="position:sticky;left:0;z-index:2"></div>';
  cols.forEach(function(c){if(c.k==='s')h+='<div class="gh" data-sector="'+c.s.id+'"><b>'+lab(c.s)+'</b><span>'+k1(dist(c.s))+' km</span></div>';else h+='<div class="gstop"></div>';});
  S.riders.forEach(function(r){
    h+='<div class="gl" data-rider="'+r.id+'" style="'+(selr===r.id?'box-shadow:inset 3px 0 0 var(--ac)':'')+'"><i class="dot t-'+(r.team||'none')+'"></i><span>'+esc(rname(r))+'</span></div>';
    cols.forEach(function(c){if(c.k==='s'){var v=st(r.id,c.s.id);h+='<div style="padding:0"><button class="pc '+(v?'s-'+v:'')+(c.s.id===sel?' sel':'')+'" data-cell="'+r.id+'|'+c.s.id+'">'+(v?STAT[v].s:'')+'</button></div>';}else h+='<div class="gstop"></div>';});
  });
  function sumrow(label,fn){h+='<div class="gl gsum" style="align-items:flex-start;justify-content:center;cursor:default">'+label+'</div>';cols.forEach(function(c){if(c.k==='s')h+='<div class="gsum">'+fn(c.s)+'</div>';else h+='<div class="gstop"></div>';});}
  var lastId=S.sectors[S.sectors.length-1].id;
  sumrow('In the group',function(s){var g=groups(s.id);var n=g.L.length+g.P.length+g.S.length+g.B.length;return n?'<b>'+n+'</b>':'-';});
  sumrow('At the line',function(s){var g=groups(s.id);var assigned=ORDER.some(function(k){return g[k].length});if(!assigned)return '-';var n=g.L.length+g.P.length+g.B.length;var gate=stopAfter(s.id)?6:(s.id===lastId?7:0);if(!gate)return '<b>'+n+'</b>';return n>=gate?'<b class="ok">'+n+' ✓</b>':'<b class="low">'+n+' / '+gate+'</b>';});
  h+='</div>';
  var sc=$('#grid'),l=sc.scrollLeft;sc.innerHTML=h;sc.scrollLeft=l;
}

/* ---------- riders + setup ---------- */
function renderRiders(){
  var h='<table class="t"><thead><tr><th>#</th><th>Name</th><th>Team</th><th>Note</th></tr></thead><tbody>';
  S.riders.forEach(function(r,i){
    h+='<tr><td class="mono" style="width:30px">'+(i+1)+'</td><td><input type="text" value="'+esc(r.name)+'" placeholder="Rider '+(i+1)+'" data-bind="rider:'+r.id+':name"></td><td style="width:130px"><select data-bind="rider:'+r.id+':team"><option value="">-</option>'+Object.keys(TEAMS).map(function(k){return '<option value="'+k+'"'+(r.team===k?' selected':'')+'>'+TEAMS[k]+'</option>'}).join('')+'</select></td><td><textarea class="rider-note" rows="3" data-bind="rider:'+r.id+':note">'+esc(r.note)+'</textarea></td></tr>';
  });
  h+='</tbody></table>';
  var el=$('#riders');if(!el.contains(document.activeElement))el.innerHTML=h;
}
function renderSetup(){
  var h='<table class="t"><thead><tr><th>Sub</th><th>Name</th><th>From km</th><th>To km</th><th>Km</th></tr></thead><tbody>';
  S.sectors.forEach(function(s){h+='<tr><td class="mono">'+lab(s)+'</td><td><input type="text" value="'+esc(s.name)+'" data-bind="sector:'+s.id+':name"></td><td style="width:100px"><input type="number" step="0.1" value="'+(+s.a)+'" data-bind="sector:'+s.id+':a"></td><td style="width:100px"><input type="number" step="0.1" value="'+(+s.b)+'" data-bind="sector:'+s.id+':b"></td><td class="mono">'+k1(dist(s))+'</td></tr>';});
  h+='</tbody></table><table class="t" style="margin-top:10px"><thead><tr><th>Neutral zone</th><th>After</th><th>Timed stop km</th><th>TSZ end km</th><th>Break min</th></tr></thead><tbody>';
  S.stops.forEach(function(x,i){h+='<tr><td><input type="text" value="'+esc(x.name)+'" data-bind="stop:'+i+':name"></td><td style="width:140px"><select data-bind="stop:'+i+':after">'+S.sectors.map(function(s){return '<option value="'+s.id+'"'+(x.after===s.id?' selected':'')+'>'+lab(s)+' '+esc(s.name)+'</option>'}).join('')+'</select></td><td style="width:100px"><input type="number" step="0.01" value="'+x.km+'" data-bind="stop:'+i+':km"></td><td style="width:100px"><input type="number" step="0.01" value="'+x.tsz+'" data-bind="stop:'+i+':tsz"></td><td style="width:100px"><input type="number" value="'+x.mins+'" data-bind="stop:'+i+':mins"></td></tr>';});
  h+='</tbody></table>';
  var el=$('#setup');if(!el.contains(document.activeElement))el.innerHTML=h;
}

/* ---------- sheet ---------- */
function seg(rid,sid){var v=st(rid,sid);return '<span class="seg">'+ORDER.map(function(k){return '<button class="'+k+(v===k?' on':'')+'" data-act="set" data-rider="'+rid+'" data-sector="'+sid+'" data-v="'+k+'" title="'+STAT[k].n+'">'+STAT[k].s+'</button>'}).join('')+'<button class="X'+(!v?' on':'')+'" data-act="set" data-rider="'+rid+'" data-sector="'+sid+'" data-v="" title="Not set">-</button></span>';}
function sectorSheet(s){
  var g=groups(s.id),T=timesById()[s.id],x=stopAfter(s.id);
  var h='<button class="close" data-act="close">×</button><span class="pill sstat" style="margin-right:8px"></span><div class="goal-line">'+goalText(s)+'</div><div class="cond" style="color:var(--ac);letter-spacing:.12em">SECTOR '+s.grp+' · '+lab(s)+'</div><h3>'+esc(s.name)+'</h3><div class="note mono">'+k1(+s.a)+' to '+k1(+s.b)+' km · '+k1(dist(s))+' km'+(T.t!=null?' · '+fm(T.t):'')+(x?' · ends at the timed stop, then '+esc(x.name)+' and a '+esc(x.mins)+'′ break':'')+'</div>';
  var climbs=CLIMBS.filter(function(c){return c.hum.some(function(q){return q[0]<(+s.b)&&q[1]>(+s.a)})});
  h+='<div class="two"><div class="box"><h4>Highlights</h4>';
  h+='<div class="kv"><span>Goal</span><span>'+(s.goal&&s.goal.trim()?esc(s.goal):'<i style="color:#5b6677">Not set</i>')+'</span><span>Style</span><span>'+esc(s.style||'-')+'</span><span>Target</span><span class="mono">'+(s.kph!==''?esc(s.kph)+' kph':'-')+' · W/kg '+(s.wf!==''?esc(s.wf):'-')+' front, '+(s.wb!==''?esc(s.wb):'-')+' behind</span>';
  h+='<span>Terrain</span><span>'+(climbs.length?climbs.map(function(c){return '<b style="color:#ffffff">'+esc(cname(c))+'</b>'}).join(', '):'No categorised climbs')+'</span></div></div>';
  h+='<div class="box"><h4>Who is doing what</h4>';
  ORDER.forEach(function(k){h+='<div style="margin:5px 0"><span class="lab-'+k+'" style="font:600 12px \'Barlow Condensed\';letter-spacing:.08em;text-transform:uppercase">'+STAT[k].n+' ('+g[k].length+')</span><div class="chips" style="margin-top:3px">'+(g[k].length?g[k].map(function(r){return chip(r,s.id)}).join(''):'<span style="color:#3d4757">-</span>')+'</div></div>';});
  h+='</div></div>';
  if(SHARE)return h;
  h+='<div class="two"><div class="box"><h4>Edit sector</h4><label class="f">Name</label><input type="text" value="'+esc(s.name)+'" data-bind="sector:'+s.id+':name"><label class="f">Goal</label><textarea data-bind="sector:'+s.id+':goal" placeholder="What this sector is for">'+esc(s.goal)+'</textarea>';
  h+='<label class="f">Style</label><select data-bind="sector:'+s.id+':style"><option value="">-</option>'+STYLES.map(function(o){return '<option'+(s.style===o?' selected':'')+'>'+o+'</option>'}).join('')+'</select>';
  h+='<div class="row" style="margin-top:6px"><div style="flex:1"><label class="f">Target kph</label><input type="number" step="0.5" value="'+esc(s.kph)+'" data-bind="sector:'+s.id+':kph"></div><div style="flex:1"><label class="f">W/kg front</label><input type="number" step="0.1" value="'+esc(s.wf)+'" data-bind="sector:'+s.id+':wf"></div><div style="flex:1"><label class="f">W/kg behind</label><input type="number" step="0.1" value="'+esc(s.wb)+'" data-bind="sector:'+s.id+':wb"></div></div>';
  h+='<div class="row" style="margin-top:10px"><label class="row"><input type="checkbox" data-bind="sector:'+s.id+':speed"'+(s.speed?' checked':'')+'> '+ICON.speed+' Speed sector</label><label class="row"><input type="checkbox" data-bind="sector:'+s.id+':easy"'+(s.easy?' checked':'')+'> '+ICON.easy+' Easy, stay out of the red</label></div></div>';
  h+='<div class="box"><h4>Allocate riders</h4><div class="alloc">';
  S.riders.forEach(function(r){h+='<div style="display:flex;align-items:center;gap:6px"><i class="dot t-'+(r.team||'none')+'"></i>'+esc(rname(r))+'</div>'+seg(r.id,s.id);});
  h+='</div></div></div>';
  return h;
}
function riderSheet(r){
  var rows=S.sectors.map(function(s){return {s:s,v:st(r.id,s.id),ro:role(r.id,s.id)}});
  var km={L:0,P:0,R:0,S:0,B:0},tot=0;rows.forEach(function(x){tot+=dist(x.s);if(km[x.v]!=null)km[x.v]+=dist(x.s);});
  var list=function(v){return rows.filter(function(x){return x.v===v}).map(function(x){return lab(x.s)}).join(', ')||'-'};
  var any=rows.some(function(x){return x.v});
  var last=rows[rows.length-1].v;
  var h='<button class="close" data-act="close">×</button><span class="pill sstat" style="margin-right:8px"></span><div class="cond" style="color:var(--ac);letter-spacing:.12em">RIDER '+r.id.slice(1)+'</div><h3><i class="dot t-'+(r.team||'none')+'" style="width:14px;height:14px"></i> '+esc(rname(r))+'</h3><div class="note">'+(r.team?TEAMS[r.team]+' team':'No team')+'</div>';
  h+='<div class="strip">'+rows.map(function(x){return '<div data-sector="'+x.s.id+'" style="flex-grow:'+Math.max(1,dist(x.s))+';'+(x.v?'background:'+STAT[x.v].c:'')+'" title="'+esc(x.s.name)+'">'+lab(x.s)+(x.v?' '+x.v:'')+'</div>'}).join('')+'</div>';
  h+='<div class="two"><div class="box"><h4>Summary</h4>'+(any?'<div class="kv"><span class="lab-L">Riding</span><span>'+list('L')+'</span><span class="lab-P">Easy (business class)</span><span>'+list('P')+'</span><span class="lab-R">Rested (off the back)</span><span>'+list('R')+'</span><span class="lab-S">Empty the tank</span><span>'+list('S')+'</span><span class="lab-B">Backup</span><span>'+list('B')+'</span><span>Finish</span><span>'+(last==='L'||last==='P'?'In the finish six':(last==='B'?'Finish backup':(last?'Not in the finish group':'-')))+'</span></div>':'<span style="color:var(--mu)">No sectors allocated yet.</span>')+'</div>';
  h+='<div class="box"><h4>Km by status</h4><div class="kv">'+ORDER.map(function(k){return '<span class="lab-'+k+'">'+STAT[k].n+'</span><span class="mono">'+k1(km[k])+' km'+(tot?' ('+Math.round(km[k]/tot*100)+'%)':'')+'</span>'}).join('')+'</div></div></div>';
  if(SHARE){h+='<div class="box"><h4>Sector by sector</h4><div class="alloc" style="grid-template-columns:auto 1fr">'+S.sectors.map(function(s){var v=st(r.id,s.id);return '<div class="mono" style="color:var(--mu)">'+lab(s)+'</div><div><b>'+esc(s.name)+'</b> <span class="lab-'+(v||'')+'" style="font-weight:600">'+(v?STAT[v].n:'-')+'</span><div class="task-p">'+(task(r.id,s.id)?esc(task(r.id,s.id)):'<i style="color:#5b6677">No task set yet</i>')+'</div></div>'}).join('')+'</div></div>';return h;}
  h+='<div class="two"><div class="box"><h4>Edit rider</h4><label class="f">Name</label><input type="text" value="'+esc(r.name)+'" data-bind="rider:'+r.id+':name"><label class="f">Team</label><select data-bind="rider:'+r.id+':team"><option value="">-</option>'+Object.keys(TEAMS).map(function(k){return '<option value="'+k+'"'+(r.team===k?' selected':'')+'>'+TEAMS[k]+'</option>'}).join('')+'</select><label class="f">Note</label><textarea data-bind="rider:'+r.id+':note">'+esc(r.note)+'</textarea></div>';
  h+='<div class="box"><h4>Allocate by sector</h4><div class="alloc" style="grid-template-columns:auto 1fr">'+S.sectors.map(function(s){return '<div style="color:var(--mu);line-height:1.2"><b class="mono">'+lab(s)+'</b><br><span style="font-size:12px">'+esc(s.name)+'</span></div><div>'+seg(r.id,s.id)+'</div>'}).join('')+'</div></div></div>';
  h+=taskBox(r);
  return h;
}
function taskBox(r){return '<div class="box" style="margin-top:10px"><h4>What to do in each sector</h4>'+S.sectors.map(function(s){return '<div class="task-row"><label class="f"><b class="mono">'+lab(s)+'</b> '+esc(s.name)+'</label><textarea data-bind="task:'+r.id+':'+s.id+'" placeholder="What this rider does in this sector">'+esc(task(r.id,s.id))+'</textarea></div>'}).join('')+'</div>';}
function renderBrief(){var el=document.getElementById('brief');if(!el)return;var b=window.MASTER_BRIEF||{title:'',paras:[]};el.innerHTML='<div class="cond" style="color:var(--ac);letter-spacing:.12em">THE BRIEF</div>'+(b.title?'<h3 class="brief-h">'+esc(b.title)+'</h3>':'')+(b.paras||[]).map(function(p){return '<p class="brief-p">'+esc(p)+'</p>'}).join('');}
function renderSheet(){
  var el=$('#sheet'),inn=$('#sheetin');
  if(!ui.sel){el.classList.remove('open');document.body.style.paddingBottom='';return;}
  var html='';
  if(ui.sel.t==='sector'){var s=sector(ui.sel.id);if(s)html=sectorSheet(s);}else{var r=rider(ui.sel.id);if(r)html=riderSheet(r);}
  if(!html){ui.sel=null;el.classList.remove('open');return;}
  var keep=inn.scrollTop;
  if(!inn.contains(document.activeElement)||document.activeElement===document.body){inn.innerHTML=html;inn.scrollTop=keep;}
  el.classList.add('open');document.body.style.paddingBottom='60vh';setStatus(saveStatus);
}

/* ---------- legend ---------- */
function renderLegend(){
  var pill=function(bg,fg,t,bd){return '<span style="display:inline-block;padding:2px 10px;border-radius:99px;background:'+bg+';color:'+fg+';font-size:12px;font-weight:600;'+(bd?'border:1px solid '+bd:'')+'">'+t+'</span>'};
  var p=function(x,y,c){return '<rect x="'+x+'" y="'+y+'" width="14" height="30" rx="7" fill="'+c+'"/>'};
  var red='#ef4135',blk='#0b0b0c',ye='#f5d03b',og='#ff8a2e';
  var wind='#2f6fd6',rot='#000000';
  var windArrow='<line x1="32" y1="6" x2="42" y2="44" stroke="'+wind+'" stroke-width="2.5"/><polygon points="44,50 46,43 39,45" fill="'+wind+'"/>';
  /* Rolling, through and off. Right line sits half a rider (18 units) ahead of the left line. */
  var roll='<svg width="150" height="250" viewBox="0 0 150 250">'
    +windArrow
    +[58,94,130].map(function(y){return p(34,y,red)}).join('')
    +[40,76,112].map(function(y){return p(56,y,red)}).join('')
    +'<path d="M60,38 C50,22 38,28 38,48" fill="none" stroke="'+rot+'" stroke-width="2"/><polygon points="38,54 32,44 44,44" fill="'+rot+'"/>'
    +'<path d="M41,164 C48,182 68,176 67,150" fill="none" stroke="'+rot+'" stroke-width="2"/><polygon points="67,146 61,156 73,156" fill="'+rot+'"/>'
    +p(40,186,blk)+p(34,218,ye)
    +'</svg>';
  /* Single line. */
  var one='<svg width="150" height="250" viewBox="0 0 150 250">'
    +windArrow
    +[12,48,84,120,156].map(function(y){return p(80,y,red)}).join('')
    +p(40,62,red)
    +'<path d="M80,16 C44,8 44,30 46,56" fill="none" stroke="'+rot+'" stroke-width="2"/><polygon points="46,60 40,48 52,48" fill="'+rot+'"/>'
    +'<path d="M46,96 C54,130 72,150 84,186" fill="none" stroke="'+rot+'" stroke-width="2"/><polygon points="86,194 78,182 90,184" fill="'+rot+'"/>'
    +p(78,214,blk)
    +'</svg>';
  /* Categorised climbs, names left off on purpose. Pills tightened, second sweeper directly behind the first. */
  var clim='<svg width="150" height="250" viewBox="0 0 150 250">'
    +p(44,10,og)+p(62,10,og)
    +p(16,46,ye)+p(44,46,blk)+p(62,46,blk)
    +p(16,82,ye)+p(44,82,blk)+p(62,82,blk)
    +p(44,118,blk)+p(62,118,blk)
    +p(44,154,red)+p(62,154,red)
    +'</svg>';
  var fig=function(title,svg){return '<div class="kfig"><div class="ktitle">'+title+'</div>'+svg+'</div>'};
  var h='<div class="legend"><div><h2 style="margin-bottom:6px">Status</h2>'
  +'<div class="lg">'+ICON.lead+'<div><b class="lab-L">Riding</b><small>On the front, driving the pace and taking turns</small></div></div>'
  +'<div class="lg"><span class="sw" style="background:var(--P);width:18px;height:18px;border-radius:5px"></span><div><b class="lab-P">Easy (business class)</b><small>In the line, shielded, saving kJ</small></div></div>'
  +'<div class="lg">'+ICON.rest+'<div><b class="lab-R">Rested (off the back)</b><small>Rolling in easy off the back to bank kJ for later sectors</small></div></div>'
  +'<div class="lg"><span class="sw" style="background:var(--S);width:18px;height:18px;border-radius:5px"></span><div><b class="lab-S">Empty the tank</b><small>Gives everything for the group, then drops</small></div></div>'
  +'<div class="lg"><span class="sw" style="background:var(--B);width:18px;height:18px;border-radius:5px"></span><div><b class="lab-B">Backup</b><small>Spare for punctures, kept until very late</small></div></div></div>'
  +'<div><h2 style="margin-bottom:6px">Markers</h2>'
  +'<div class="lg">'+ICON.speed+'<div><b>Speed</b><small>Time saving with the quick riders on the front</small></div></div>'
  +'<div class="lg">'+ICON.easy+'<div><b>Easy</b><small>Easy pedalling, time gained by hurting anyone is not worth riding in the red</small></div></div>'
  +'<div class="lg">'+ICON.brk+'<div><b>Timed stop</b><small>Sector ends and the clock stops when the 6th rider crosses. Neutral zone to the team support zone, then the break</small></div></div>'
  +'<div class="lg"><span style="width:18px;height:6px;background:#ef4135;display:inline-block"></span><div><b>Neutral zone</b><small>Between timed sectors, not racing</small></div></div>'
  +'<div class="lg"><span style="width:18px;height:6px;background:#ffffff;display:inline-block"></span><div><b>Climbs</b><small>Shaded white on the route and profile</small></div></div></div></div>'
  +'<div class="keyart">'
  +fig('Rolling, through and off',roll)
  +fig('Single line',one)
  +fig('Categorised climbs',clim)
  +'<div class="kform"><h2 style="margin-bottom:6px">Formation key</h2>'
  +'<div class="lg">'+pill('#0b0b0c','#fff','Business class','#667')+'<small>Protected, sitting in</small></div>'
  +'<div class="lg">'+pill('#ef4135','#fff','Engine')+'<small>Doing the work on the front</small></div>'
  +'<div class="lg">'+pill('#ff8a2e','#111','Pacer')+'<small>Sets the pace up the climbs</small></div>'
  +'<div class="lg">'+pill('#f5d03b','#111','Sweeper/pusher')+'<small>Last rider, closes gaps</small></div>'
  +'</div></div>';
  var lg=document.getElementById('legend');if(lg)lg.innerHTML=h;
}
function renderFacts(){
  var racing=S.sectors.reduce(function(a,s){return a+dist(s)},0),nz=S.stops.reduce(function(a,x){return a+Math.max(0,x.tsz-x.km)},0);
  var T=timesById(),all=S.sectors.every(function(s){return T[s.id].t!=null});
  var last=S.sectors[S.sectors.length-1];
  $('#facts').innerHTML='<div class="fact"><b>'+k1(KM_FIN)+' km</b><span>to the finish line ('+k1(KM_TOTAL)+' with the ride to venue)</span></div><div class="fact"><b>3 sectors</b><span>'+k1(racing)+' km timed, '+S.sectors.length+' subsectors</span></div><div class="fact"><b>2 neutral zones</b><span>'+k1(nz)+' km, with '+S.stops.map(function(x){return x.mins+"′"}).join(' + ')+' breaks</span></div><div class="fact"><b>6 + 1</b><span>finish six plus backup</span></div><div class="fact"><b>'+(all?fm(T[last.id].cum):'-')+'</b><span>race time at target pace</span></div>';
}

function renderAll(){
  var y=window.scrollY;cmpLabel();
  renderFacts();renderMap();renderProfile();renderClimbs();var _ae=document.activeElement;if(!(_ae&&_ae.closest&&_ae.closest('#board')&&/INPUT|SELECT/.test(_ae.tagName)))renderBoard();renderTools();renderGrid();var ae=document.activeElement;if(!(ae&&ae.closest&&ae.closest('#riders'))){renderRiders();}if(!(ae&&ae.closest&&ae.closest('#setup'))){renderSetup();}renderLegend();renderSheet();
  if(Math.abs(window.scrollY-y)>2)window.scrollTo(0,y);
}

/* ---------- events ---------- */
document.addEventListener('click',function(e){
  var t=e.target,el;if(t.closest&&t.closest('#board input,#board select'))return;
  if((el=t.closest('[data-act]'))){
    var a=el.dataset.act;
    if(a==='close'){ui.sel=null;renderAll();return;}
    if(a==='brush'){ui.brush=el.dataset.v;renderTools();return;}
    if(a==='set'){var sc=$('#sheetin').scrollTop;setSt(el.dataset.rider,el.dataset.sector,el.dataset.v);touch();$('#sheetin').innerHTML='';renderAll();$('#sheetin').scrollTop=sc;return;}
    return;
  }
  if((el=t.closest('[data-cell]'))){
    var p=el.dataset.cell.split('|');
    if(ui.brush==='inspect'){ui.sel={t:'sector',id:p[1]};$('#sheetin').innerHTML='';renderAll();return;}
    setSt(p[0],p[1],ui.brush==='clear'?'':ui.brush);touch();renderAll();return;
  }
  if((el=t.closest('[data-rider]'))){ui.sel={t:'rider',id:el.dataset.rider};$('#sheetin').innerHTML='';renderAll();return;}
  if((el=t.closest('[data-sector]'))){ui.sel={t:'sector',id:el.dataset.sector};$('#sheetin').innerHTML='';renderAll();return;}
});
function commit(el){
  var parts=el.dataset.bind.split(':'),kind=parts[0],id=parts[1],f=parts[2];
  var v=el.type==='checkbox'?el.checked:el.value;
  if(kind==='rider'){rider(id)[f]=v;}
  else if(kind==='sector'){var s=sector(id);if(f==='dist'){var dv=parseFloat(v);if(!isNaN(dv)&&dv>0)s.b=Math.round((+s.a+dv)*100)/100;}else if(f==='a'||f==='b')s[f]=parseFloat(v)||0;else if(f==='kph'||f==='wf'||f==='wb'){var n=parseFloat(v);s[f]=isNaN(n)?'':n;}else s[f]=v;}
  else if(kind==='task'){setTask(id,f,v);}
  else if(kind==='stop'){var x=S.stops[+id];if(f==='after'||f==='name')x[f]=v;else x[f]=parseFloat(v)||0;}
}
document.addEventListener('input',function(e){
  var el=e.target.closest('[data-bind]');if(!el)return;
  if(el.tagName==='SELECT'||el.type==='checkbox')return;
  commit(el);touch();renderAll();
});
document.addEventListener('change',function(e){
  var el=e.target.closest('[data-bind]');if(!el)return;
  commit(el);touch();
  var inn=$('#sheetin');inn.innerHTML='';
  renderAll();
});
document.addEventListener('focusout',function(e){if(e.target.closest&&e.target.closest('#board'))setTimeout(function(){var a=document.activeElement;if(!(a&&a.closest&&a.closest('#board')&&/INPUT|SELECT/.test(a.tagName)))renderBoard();},60);});
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){['sendpanel','resetpanel'].forEach(function(id){var m=document.getElementById(id);if(m&&!m.hidden)closeModal(id);});return;}
  if(e.key==='Enter'&&e.target.tagName==='INPUT'&&e.target.type!=='checkbox'&&!e.target.closest('#sendform'))e.target.blur();
});

if(MODE==='home'){renderLegend();return;}
var _l=SHARE?null:lsLoad();if(_l&&_l.riders){S=normalize(_l);}
if(SHARE){S=masterPlan();document.body.classList.add('share');['riders','setup'].forEach(function(i){var sc=document.getElementById(i).closest('section');if(sc)sc.style.display='none';});var tl=document.getElementById('tools');if(tl)tl.style.display='none';var rn=document.querySelector('#grid').closest('section').querySelector('.note');if(rn)rn.textContent='Tap a cell or a rider name for detail.';}
renderAll();renderBrief();if(!SHARE)setStatus('local');
document.addEventListener('click',function(e){
  var b=e.target.closest('[data-top]');
  if(b){var a=b.dataset.top;
    if(a==='compact'){ui.compact=!ui.compact;try{localStorage.setItem('dc26-compact',ui.compact?'1':'0');}catch(x){}renderBoard();cmpLabel();return;}
    if(a==='export'){exportPlan();return;}
    if(a==='import'){document.getElementById('importfile').click();return;}
    if(a==='reset'){openModal('resetpanel');return;}
    if(a==='send'){openModal('sendpanel');refreshSend();return;}
    return;
  }
  var c=e.target.closest('[data-modal-close]');
  if(c){closeModal(c.dataset.modalClose);}
});
on('importfile','change',function(e){var f=e.target.files&&e.target.files[0];importPlan(f);e.target.value='';});
on('resetconfirm','click',resetPlan);
on('sendform','submit',sendPlan);
on('fname','input',refreshSend);
on('fcomment','input',refreshSend);
on('fallbackbtn','click',downloadFallback);
on('copybtn','click',copyFallback);
refreshSend();
})();
