import{b as x,u,j as e,m as r,B as l,R as t}from"./index-wpjw20pW.js";import{u as f}from"./useAppNav-EgXsvVOg.js";import{H as y}from"./house-DEGQ2u_f.js";import{C as b}from"./coffee-DAwV-4mv.js";import{c as i}from"./createLucideIcon-wfEB_Ef7.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=[["rect",{x:"3",y:"8",width:"18",height:"4",rx:"1",key:"bkv52"}],["path",{d:"M12 8v13",key:"1c76mn"}],["path",{d:"M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7",key:"6wjy6b"}],["path",{d:"M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5",key:"1ihvrl"}]],k=i("gift",v);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]],g=i("shopping-cart",N);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],A=i("user",j),w=[{path:t.DASHBOARD,screen:"home"},{path:t.MENU,screen:"menu"},{path:t.CART,screen:"cart"},{path:t.LOYALTY,screen:"loyalty"},{path:t.PROFILE,screen:"profile"}];function C(n){if(n.startsWith(`${t.MENU}/`))return"menu";const a=w.find(({path:s})=>n===s);return(a==null?void 0:a.screen)??"home"}function I(){const n=x(),a=f(),{cartCount:s}=u(),p=C(n.pathname),m=[{id:"home",Icon:y,label:"Home"},{id:"menu",Icon:b,label:"Menu"},{id:"cart",Icon:g,label:"Cart"},{id:"loyalty",Icon:k,label:"Rewards"},{id:"profile",Icon:A,label:"Profile"}];return e.jsx("div",{className:"border-t border-slate-100 bg-white px-2 pb-2 flex-shrink-0",children:e.jsx("div",{className:"flex",children:m.map(({id:o,Icon:d,label:h})=>{const c=p===o;return e.jsxs(r.button,{onClick:()=>a(o),whileTap:{scale:.88},className:"flex-1 flex flex-col items-center py-2 gap-0.5 relative",children:[o==="cart"&&s>0&&e.jsx(r.span,{initial:{scale:1.8,opacity:0},animate:{scale:1,opacity:1},transition:{type:"spring",stiffness:500,damping:18},className:"absolute top-1.5 right-3.5 min-w-[16px] h-4 rounded-full text-[9px] font-bold text-white flex items-center justify-center px-1",style:{background:l.error},children:s},s),e.jsx(r.div,{animate:{background:c?l.primary:"transparent"},transition:{duration:.2},className:"p-1.5 rounded-xl",children:e.jsx(d,{className:`w-5 h-5 ${c?"text-white":"text-slate-400"}`})}),e.jsx("span",{className:`text-[10px] font-semibold ${c?"text-[#1E293B]":"text-slate-400"}`,children:h})]},o)})})})}export{I as B,g as S};
