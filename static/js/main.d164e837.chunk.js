(this["webpackJsonpdemo-gdxjs"]=this["webpackJsonpdemo-gdxjs"]||[]).push([[0],{26:function(o,r,c){},49:function(o,r,c){"use strict";c.r(r);var e=c(3),n=c.n(e),a=c(1),t=c(4),u=(c(26),c(2)),d=(c(0),Object(u.e)()),l=d.getCanvas(),i=Object(u.f)(l,55,100),v=i.getContext(),Y=Object(u.g)(l,i),f=i.getCamera(),X=Object(u.c)(v),s=Object(u.h)(v),w=[1,2,3,4,5,6,1,2,3,4,5,6];w=w.sort((function(){return Math.random()-.5}));var g=1e3;(function(){var o=Object(t.a)(n.a.mark((function o(){var r,c,e,t,d,l,i,w,h,b,j,x,O,p,C,m,y,I,M,T,W,k,E,L;return n.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return y=function(){p=O.sort((function(){return Math.random()-.5}));for(var o=0;o<p.length-1;o++)for(var r=o+1;r<p.length;r++)p[o]>p[r]&&100!=p[o]&&c++;if(c%2==0){var e=p[0];p[0]=p[1],p[1]=e}x[0].coorY=19,x[I].coorX=4.5,x[I].coorY=33;for(var n=1;n<x.length;n++)x[n].value=p[n-1];c=0},m=function(){C(O),console.log(O);for(var o=0;o<O.length-1;o++)for(var c=o+1;c<O.length;c++)O[o]>O[c]&&100!=O[o]&&r++;if(console.log("first:"+r),r%2==0)if(100!=O[0]&&100!=O[1]){var e=O[0];O[0]=O[1],O[1]=e}else{e=O[O.length-1];O[O.length-1]=O[O.length-2],O[O.length-2]=e}for(var n=1;n<x.length;n++)x[n].value=O[n-1];console.log("second:"+r),r=0},C=function(o){for(var r,c,e=o.length;e;)c=Math.floor(Math.random()*e--),r=o[e],o[e]=o[c],o[c]=r;return o},r=0,c=0,e=0,t=!1,l=0,b=13,j=13,x=[{value:0,coorX:4.5,coorY:19},{value:100,coorX:4.5,coorY:33},{value:3,coorX:18.5,coorY:33},{value:6,coorX:32.5,coorY:33},{value:1,coorX:4.5,coorY:47},{value:4,coorX:18.5,coorY:47},{value:7,coorX:32.5,coorY:47},{value:2,coorX:4.5,coorY:61},{value:5,coorX:18.5,coorY:61},{value:8,coorX:32.5,coorY:61}],O=[1,2,3,4,5,6,7,8,100],p=[1,2,3,4,5,6,7,8,100],m(),o.next=16,Object(u.i)(v,"./dating-bg.jpg");case 16:return T=o.sent,o.next=19,Object(u.i)(v,"./tingme.jpg");case 19:return W=o.sent,o.next=22,Object(u.i)(v,"./doc.png");case 22:return k=o.sent,o.next=25,Object(u.i)(v,"./ngang.png");case 25:E=o.sent,L=u.a.splitTexture(W,3,3),v.clearColor(1,.6,.6,1),Object(u.d)((function(o){v.clear(v.COLOR_BUFFER_BIT),X.setProjection(f.combined),X.begin(),X.draw(s,0,0,50,100),X.draw(T,0,0,50,100),I=x.findIndex((function(o){return 100===o.value})),i=x.findIndex((function(o){return 0===o.value})),w=x.findIndex((function(o){return 3===o.value})),h=x.findIndex((function(o){return 6===o.value})),d=x.filter((function(o){return 100!=o.value&&o.coorY==x[I].coorY&&14==Math.abs(o.coorX-x[I].coorX)||100!=o.value&&o.coorX==x[I].coorX&&14==Math.abs(Math.round(o.coorY)-x[I].coorY)})),window.addEventListener("mousedown",(function(){var o,r=Y.getTouchedWorldCoord().x,c=Y.getTouchedWorldCoord().y,e=Object(a.a)(d);try{for(e.s();!(o=e.n()).done;){var n=o.value;r>n.coorX&&r<n.coorX+13&&c>n.coorY&&c<n.coorY+13&&100!=n.value&&(g=n.value,M=x.findIndex((function(o){return o.value===g})),l=1)}}catch(t){e.e(t)}finally{e.f()}})),window.addEventListener("touchstart",(function(){var o,r=Y.getTouchedWorldCoord().x,c=Y.getTouchedWorldCoord().y,e=Object(a.a)(d);try{for(e.s();!(o=e.n()).done;){var n=o.value;r>n.coorX&&r<n.coorX+13&&c>n.coorY&&c<n.coorY+13&&100!=n.value&&(g=n.value,M=x.findIndex((function(o){return o.value===g})),l=1)}}catch(t){e.e(t)}finally{e.f()}}));var r,c=Object(a.a)(x);try{for(c.s();!(r=c.n()).done;){var n=r.value;100!=n.value&&0==l?L[n.value].draw(X,n.coorX,n.coorY,13,13):100!=n.value&&1==l&&(L[n.value].draw(X,n.coorX,n.coorY,13,13),x[I].coorY==x[M].coorY&&(x[I].coorX>x[M].coorX&&0==t&&(L[g].draw(X,x[M].coorX+=20*o,x[M].coorY,13,13),x[I].coorX<x[M].coorX&&(L[g].draw(X,x[I].coorX,x[M].coorY,13,13),x[M].coorX=x[I].coorX,x[I].coorX=x[I].coorX-14,t=!0)),x[I].coorX<x[M].coorX&&0==t&&(L[g].draw(X,x[M].coorX-=20*o,x[M].coorY,13,13),x[I].coorX>x[M].coorX&&(L[g].draw(X,x[I].coorX,x[M].coorY,13,13),x[M].coorX=x[I].coorX,x[I].coorX=x[I].coorX+14,t=!0))),x[I].coorX==x[M].coorX&&(x[I].coorY>x[M].coorY&&0==t&&(L[g].draw(X,x[M].coorX,x[M].coorY+=20*o,13,13),x[I].coorY<x[M].coorY&&(L[g].draw(X,x[M].coorX,x[I].coorY,13,13),x[M].coorY=x[I].coorY,x[I].coorY=x[I].coorY-14,t=!0)),x[I].coorY<x[M].coorY&&0==t&&(L[g].draw(X,x[M].coorX,x[M].coorY-=20*o,13,13),x[I].coorY>x[M].coorY&&(L[g].draw(X,x[M].coorX,x[I].coorY,13,13),x[M].coorY=x[I].coorY,x[I].coorY=x[I].coorY+14,t=!0))))}}catch(u){c.e(u)}finally{c.f()}19==x[I].coorY&&4.5==x[i].coorX&&33==x[i].coorY&&18.5==x[w].coorX&&33==x[w].coorY&&32.5==x[h].coorX&&33==x[h].coorY&&j<14&&b<14&&(L[0].draw(X,4.5,33,j+=.05*o,b+=.05*o),L[3].draw(X,18.5,33,j+=.05*o,b+=.05*o),L[6].draw(X,32.5,33,j+=.05*o,b+=.05*o),L[1].draw(X,4.5,47,j+=.05*o,b+=.05*o),L[4].draw(X,18.5,47,j+=.05*o,b+=.05*o),L[7].draw(X,32.5,47,j+=.05*o,b+=.05*o),L[2].draw(X,4.5,61,j+=.05*o,b+=.05*o),L[8].draw(X,32.5,61,j+=.05*o,b+=.05*o),L[5].draw(X,18.5,61,j+=.05*o,b+=.05*o)),j>=14&&b>=14&&(e=1),1==e&&(y(),j=13,b=13,e=0),X.draw(k,1.5,18.5,5,56.5),X.draw(k,44.5,32.5,3,42.5),X.draw(k,16.5,18.5,3,14),X.draw(E,4,17,14,3),X.draw(E,4,73.5,42,3),X.draw(E,18,31,28,3),1==t&&(t=!1,l=0),X.setColor(.4,.4,.4,1),X.setColor(1,1,1,1),X.end()}));case 29:case"end":return o.stop()}}),o)})));return function(){return o.apply(this,arguments)}})()()}},[[49,1,2]]]);
//# sourceMappingURL=main.d164e837.chunk.js.map