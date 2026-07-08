import{c as t,u as x,j as e,B as c,m as a,U as p,I as i,R as u}from"./index-D771Tu8J.js";import{u as f}from"./useToast-gJMbe6gI.js";import{B as m}from"./bell-ByQOBgha.js";import{C as y,M as b}from"./map-pin-rxPPtmCS.js";import{C as k}from"./credit-card-BBqJaHMs.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],d=t("chevron-right",N);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],g=t("circle-help",j);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],C=t("globe",w);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],I=t("lock",v);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]],A=t("log-out",_);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=[["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",key:"12rzf8"}]],P=t("palette",M);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]],E=t("shield",B),S="#F8F9FB",h="#ECECEC",o="#94A3B8",F="#6B7280";function R({item:l}){const s=l.showChevron!==!1;return e.jsxs(a.button,{type:"button",onClick:l.action,whileTap:l.action?{scale:.99}:void 0,className:"w-full h-14 flex items-center gap-3 px-[18px] bg-white text-left",children:[e.jsx(l.Icon,{className:"w-5 h-5 flex-shrink-0",style:{color:F},strokeWidth:1.75}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("p",{className:"text-base font-medium truncate",style:{color:c.primary},children:l.label}),l.subtitle&&e.jsx("p",{className:"text-sm font-normal truncate",style:{color:o},children:l.subtitle})]}),l.value&&e.jsx("span",{className:"text-[15px] flex-shrink-0",style:{color:o},children:l.value}),s&&e.jsx(d,{className:"w-3.5 h-3.5 flex-shrink-0",style:{color:"#CBD5E1"}})]})}function z({section:l}){return e.jsxs("div",{children:[e.jsx("p",{className:"text-xs font-semibold uppercase tracking-wide mb-3 px-1",style:{color:o},children:l.title}),e.jsx("div",{className:"bg-white rounded-2xl overflow-hidden",children:l.items.map((s,r)=>e.jsxs(u.Fragment,{children:[r>0&&e.jsx("div",{className:"h-px w-full",style:{backgroundColor:h}}),e.jsx(R,{item:s})]},s.label))})]})}function H(){const l=x(),{success:s}=f(),r=[{title:"Account",items:[{Icon:p,label:"Manage Profile",action:()=>s("Profile updated successfully")},{Icon:I,label:"Password & Security"},{Icon:m,label:"Notifications",action:()=>l("notifications")},{Icon:C,label:"Language",value:"English"}]},{title:"Orders",items:[{Icon:y,label:"Order History",action:()=>l("history")},{Icon:k,label:"Payment Methods"},{Icon:b,label:"Saved Addresses"}]},{title:"Support",items:[{Icon:g,label:"Help Center"},{Icon:E,label:"Privacy & Security"},{Icon:i,label:"About"}]},{title:"Application",items:[{Icon:P,label:"Theme"},{Icon:i,label:"App Version",value:"1.0.0",showChevron:!1}]}];return e.jsxs("div",{className:"w-full h-full flex flex-col",style:{background:S},children:[e.jsx("div",{className:"px-5 pt-12 pb-2 flex-shrink-0",children:e.jsx("h1",{className:"text-[28px] font-bold text-left",style:{color:c.primary},children:"Profile"})}),e.jsxs("div",{className:"flex-1 overflow-y-auto no-scrollbar pb-20",children:[e.jsxs(a.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.3},className:"px-5 pt-4 pb-2 flex items-center gap-3",children:[e.jsx("div",{className:"w-[60px] h-[60px] rounded-full overflow-hidden flex-shrink-0",children:e.jsx("img",{src:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop&auto=format",alt:"Avatar",className:"w-full h-full object-cover"})}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("h2",{className:"text-lg font-semibold truncate",style:{color:c.primary},children:"Arjun Pratama"}),e.jsx("p",{className:"text-sm truncate",style:{color:o},children:"+62 812 3456 7890"})]}),e.jsxs(a.button,{type:"button",whileTap:{scale:.97},onClick:()=>s("Profile updated successfully"),className:"flex items-center gap-0.5 px-3 py-1.5 rounded-lg text-sm font-semibold border flex-shrink-0",style:{borderColor:h,color:c.primary},children:["Edit",e.jsx(d,{className:"w-3.5 h-3.5",style:{color:o}})]})]}),e.jsxs("div",{className:"px-5 pt-6 flex flex-col gap-6",children:[r.map(n=>e.jsx(z,{section:n},n.title)),e.jsxs(a.button,{type:"button",whileTap:{scale:.97},onClick:()=>l("splash","fade"),className:"w-full h-14 flex items-center justify-center gap-2 rounded-[14px] border",style:{borderColor:"#FECACA",background:"#FFF1F2"},children:[e.jsx(A,{className:"w-4 h-4 text-red-400",strokeWidth:1.75}),e.jsx("span",{className:"text-base font-semibold text-red-400",children:"Sign Out"})]})]})]})]})}export{H as ProfileScreen};
