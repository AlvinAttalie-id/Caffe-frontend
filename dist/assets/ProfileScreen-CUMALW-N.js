import{c as o,u as m,a as u,j as e,B as a,m as n,U as f,I as i,R as y}from"./index-RqYW6GJx.js";import{u as b}from"./useToast-C6Ky3qQM.js";import{B as k}from"./bell-DBTmBVuS.js";import{C as N,M as g}from"./map-pin-lI4fzE6n.js";import{C as j}from"./credit-card-ClbhBDmy.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],d=o("chevron-right",w);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],v=o("circle-help",C);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],_=o("globe",I);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],M=o("lock",A);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]],E=o("log-out",B);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=[["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",key:"12rzf8"}]],S=o("palette",P);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]],R=o("shield",F),z="#F8F9FB",h="#ECECEC",c="#94A3B8",O="#6B7280";function T({item:l}){const t=l.showChevron!==!1;return e.jsxs(n.button,{type:"button",onClick:l.action,whileTap:l.action?{scale:.99}:void 0,className:"w-full h-14 flex items-center gap-3 px-[18px] bg-white text-left",children:[e.jsx(l.Icon,{className:"w-5 h-5 flex-shrink-0",style:{color:O},strokeWidth:1.75}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("p",{className:"text-base font-medium truncate",style:{color:a.primary},children:l.label}),l.subtitle&&e.jsx("p",{className:"text-sm font-normal truncate",style:{color:c},children:l.subtitle})]}),l.value&&e.jsx("span",{className:"text-[15px] flex-shrink-0",style:{color:c},children:l.value}),t&&e.jsx(d,{className:"w-3.5 h-3.5 flex-shrink-0",style:{color:"#CBD5E1"}})]})}function $({section:l}){return e.jsxs("div",{children:[e.jsx("p",{className:"text-xs font-semibold uppercase tracking-wide mb-3 px-1",style:{color:c},children:l.title}),e.jsx("div",{className:"bg-white rounded-2xl overflow-hidden",children:l.items.map((t,s)=>e.jsxs(y.Fragment,{children:[s>0&&e.jsx("div",{className:"h-px w-full",style:{backgroundColor:h}}),e.jsx(T,{item:t})]},t.label))})]})}function U(){const l=m(),{success:t}=b(),{user:s,logout:x}=u(),p=[{title:"Account",items:[{Icon:f,label:"Manage Profile",action:()=>t("Profile updated successfully")},{Icon:M,label:"Password & Security"},{Icon:k,label:"Notifications",action:()=>l("notifications")},{Icon:_,label:"Language",value:"English"}]},{title:"Orders",items:[{Icon:N,label:"Order History",action:()=>l("history")},{Icon:j,label:"Payment Methods"},{Icon:g,label:"Saved Addresses"}]},{title:"Support",items:[{Icon:v,label:"Help Center"},{Icon:R,label:"Privacy & Security"},{Icon:i,label:"About"}]},{title:"Application",items:[{Icon:S,label:"Theme"},{Icon:i,label:"App Version",value:"1.0.0",showChevron:!1}]}];return e.jsxs("div",{className:"w-full h-full flex flex-col",style:{background:z},children:[e.jsx("div",{className:"px-5 pt-12 pb-2 flex-shrink-0",children:e.jsx("h1",{className:"text-[28px] font-bold text-left",style:{color:a.primary},children:"Profile"})}),e.jsxs("div",{className:"flex-1 overflow-y-auto no-scrollbar pb-20",children:[e.jsxs(n.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.3},className:"px-5 pt-4 pb-2 flex items-center gap-3",children:[e.jsx("div",{className:"w-[60px] h-[60px] rounded-full overflow-hidden flex-shrink-0",children:e.jsx("img",{src:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop&auto=format",alt:"Avatar",className:"w-full h-full object-cover"})}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("h2",{className:"text-lg font-semibold truncate",style:{color:a.primary},children:(s==null?void 0:s.name)||"Guest"}),e.jsx("p",{className:"text-sm truncate",style:{color:c},children:(s==null?void 0:s.phone)||(s==null?void 0:s.email)||""})]}),e.jsxs(n.button,{type:"button",whileTap:{scale:.97},onClick:()=>t("Profile updated successfully"),className:"flex items-center gap-0.5 px-3 py-1.5 rounded-lg text-sm font-semibold border flex-shrink-0",style:{borderColor:h,color:a.primary},children:["Edit",e.jsx(d,{className:"w-3.5 h-3.5",style:{color:c}})]})]}),e.jsxs("div",{className:"px-5 pt-6 flex flex-col gap-6",children:[p.map(r=>e.jsx($,{section:r},r.title)),e.jsxs(n.button,{type:"button",whileTap:{scale:.97},onClick:()=>{x(),l("splash","fade")},className:"w-full h-14 flex items-center justify-center gap-2 rounded-[14px] border",style:{borderColor:"#FECACA",background:"#FFF1F2"},children:[e.jsx(E,{className:"w-4 h-4 text-red-400",strokeWidth:1.75}),e.jsx("span",{className:"text-base font-semibold text-red-400",children:"Sign Out"})]})]})]})]})}export{U as ProfileScreen};
