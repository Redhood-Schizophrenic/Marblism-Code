import{r as o,c as C,j as h}from"./index-DRMtkY8T.js";import{E as v,p as M,q as y,r as g,t as E}from"./index-BPgtOJpV.js";import{R as S}from"./index-D27-zpoI.js";import{i as b,d as F,c as P,s as D,g as k,a as z,b as H,u as L,R as O,e as T}from"./components-CU3aaf31.js";/**
 * @remix-run/react v2.15.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function j(u){if(!u)return null;let m=Object.entries(u),s={};for(let[a,e]of m)if(e&&e.__type==="RouteErrorResponse")s[a]=new v(e.status,e.statusText,e.data,e.internal===!0);else if(e&&e.__type==="Error"){if(e.__subType){let i=window[e.__subType];if(typeof i=="function")try{let r=new i(e.message);r.stack=e.stack,s[a]=r}catch{}}if(s[a]==null){let i=new Error(e.message);i.stack=e.stack,s[a]=i}}else s[a]=e;return s}/**
 * @remix-run/react v2.15.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let n,t,f=!1,c;new Promise(u=>{c=u}).catch(()=>{});function B(u){if(!t){if(window.__remixContext.future.v3_singleFetch){if(!n){let d=window.__remixContext.stream;b(d,"No stream found for single fetch decoding"),window.__remixContext.stream=void 0,n=F(d,window).then(l=>{window.__remixContext.state=l.value,n.value=!0}).catch(l=>{n.error=l})}if(n.error)throw n.error;if(!n.value)throw n}let i=P(window.__remixManifest.routes,window.__remixRouteModules,window.__remixContext.state,window.__remixContext.future,window.__remixContext.isSpaMode),r;if(!window.__remixContext.isSpaMode){r={...window.__remixContext.state,loaderData:{...window.__remixContext.state.loaderData}};let d=M(i,window.location,window.__remixContext.basename);if(d)for(let l of d){let _=l.route.id,x=window.__remixRouteModules[_],w=window.__remixManifest.routes[_];x&&D(w,x,window.__remixContext.isSpaMode)&&(x.HydrateFallback||!w.hasLoader)?r.loaderData[_]=void 0:w&&!w.hasLoader&&(r.loaderData[_]=null)}r&&r.errors&&(r.errors=j(r.errors))}t=y({routes:i,history:g(),basename:window.__remixContext.basename,future:{v7_normalizeFormMethod:!0,v7_fetcherPersist:window.__remixContext.future.v3_fetcherPersist,v7_partialHydration:!0,v7_prependBasename:!0,v7_relativeSplatPath:window.__remixContext.future.v3_relativeSplatPath,v7_skipActionErrorRevalidation:window.__remixContext.future.v3_singleFetch===!0},hydrationData:r,mapRouteProperties:E,dataStrategy:window.__remixContext.future.v3_singleFetch?k(window.__remixManifest,window.__remixRouteModules,()=>t):void 0,patchRoutesOnNavigation:z(window.__remixManifest,window.__remixRouteModules,window.__remixContext.future,window.__remixContext.isSpaMode,window.__remixContext.basename)}),t.state.initialized&&(f=!0,t.initialize()),t.createRoutesForHMR=H,window.__remixRouter=t,c&&c(t)}let[m,s]=o.useState(void 0),[a,e]=o.useState(t.state.location);return o.useLayoutEffect(()=>{f||(f=!0,t.initialize())},[]),o.useLayoutEffect(()=>t.subscribe(i=>{i.location!==a&&e(i.location)}),[a]),L(t,window.__remixManifest,window.__remixRouteModules,window.__remixContext.future,window.__remixContext.isSpaMode),o.createElement(o.Fragment,null,o.createElement(O.Provider,{value:{manifest:window.__remixManifest,routeModules:window.__remixRouteModules,future:window.__remixContext.future,criticalCss:m,isSpaMode:window.__remixContext.isSpaMode}},o.createElement(T,{location:a},o.createElement(S,{router:t,fallbackElement:null,future:{v7_startTransition:!0}}))),window.__remixContext.future.v3_singleFetch?o.createElement(o.Fragment,null):null)}var p,R=C;R.createRoot,p=R.hydrateRoot;o.startTransition(()=>{p(document,h.jsx(B,{}))});
