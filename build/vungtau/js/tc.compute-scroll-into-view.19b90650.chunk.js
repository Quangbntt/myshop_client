(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"1ecda9206e2e95262f02":function(t,e){function n(t){return null!=t&&"object"==typeof t&&1===t.nodeType}function r(t,e){return(!e||"hidden"!==t)&&"visible"!==t&&"clip"!==t}function i(t,e){if(t.clientHeight<t.scrollHeight||t.clientWidth<t.scrollWidth){var n=getComputedStyle(t,null);return r(n.overflowY,e)||r(n.overflowX,e)||function(t){var e=function(t){if(!t.ownerDocument||!t.ownerDocument.defaultView)return null;try{return t.ownerDocument.defaultView.frameElement}catch(t){return null}}(t);return!!e&&(e.clientHeight<t.scrollHeight||e.clientWidth<t.scrollWidth)}(t)}return!1}function o(t,e,n,r,i,o,l,d){return o<t&&l>e||o>t&&l<e?0:o<=t&&d<=n||l>=e&&d>=n?o-t-r:l>e&&d<n||o<t&&d>n?l-e+i:0}t.exports=function(t,e){var r=window,l=e.scrollMode,d=e.block,c=e.inline,u=e.boundary,a=e.skipOverflowHiddenElements,h="function"==typeof u?u:function(t){return t!==u};if(!n(t))throw new TypeError("Invalid target");for(var f=document.scrollingElement||document.documentElement,s=[],p=t;n(p)&&h(p);){if((p=p.parentNode)===f){s.push(p);break}p===document.body&&i(p)&&!i(document.documentElement)||i(p,a)&&s.push(p)}for(var w=r.visualViewport?r.visualViewport.width:innerWidth,g=r.visualViewport?r.visualViewport.height:innerHeight,m=window.scrollX||pageXOffset,v=window.scrollY||pageYOffset,b=t.getBoundingClientRect(),W=b.height,H=b.width,y=b.top,M=b.right,E=b.bottom,V=b.left,k="start"===d||"nearest"===d?y:"end"===d?E:y+W/2,x="center"===c?V+H/2:"end"===c?M:V,I=[],C=0;C<s.length;C++){var T=s[C],B=T.getBoundingClientRect(),D=B.height,O=B.width,R=B.top,X=B.right,Y=B.bottom,J=B.left;if("if-needed"===l&&y>=0&&V>=0&&E<=g&&M<=w&&y>=R&&E<=Y&&V>=J&&M<=X)return I;var L=getComputedStyle(T),S=parseInt(L.borderLeftWidth,10),j=parseInt(L.borderTopWidth,10),N=parseInt(L.borderRightWidth,10),q=parseInt(L.borderBottomWidth,10),z=0,A=0,F="offsetWidth"in T?T.offsetWidth-T.clientWidth-S-N:0,G="offsetHeight"in T?T.offsetHeight-T.clientHeight-j-q:0;if(f===T)z="start"===d?k:"end"===d?k-g:"nearest"===d?o(v,v+g,g,j,q,v+k,v+k+W,W):k-g/2,A="start"===c?x:"center"===c?x-w/2:"end"===c?x-w:o(m,m+w,w,S,N,m+x,m+x+H,H),z=Math.max(0,z+v),A=Math.max(0,A+m);else{z="start"===d?k-R-j:"end"===d?k-Y+q+G:"nearest"===d?o(R,Y,D,j,q+G,k,k+W,W):k-(R+D/2)+G/2,A="start"===c?x-J-S:"center"===c?x-(J+O/2)+F/2:"end"===c?x-X+N+F:o(J,X,O,S,N+F,x,x+H,H);var K=T.scrollLeft,P=T.scrollTop;k+=P-(z=Math.max(0,Math.min(P+z,T.scrollHeight-D+G))),x+=K-(A=Math.max(0,Math.min(K+A,T.scrollWidth-O+F)))}I.push({el:T,top:z,left:A})}return I}}}]);