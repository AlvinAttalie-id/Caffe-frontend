import{c as k,u as C,r as o,j as e,B as n,A as F,m as i}from"./index-C2nQLILQ.js";import{P as T}from"./PrimaryBtn-DtMXGZzw.js";import{C as P}from"./chevron-left-CuB4KwyB.js";import{P as E}from"./phone-CFclO1Jw.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],S=k("circle-check-big",L);function I(){const d=C(),[c,y]=o.useState(["","","","","",""]),[l,m]=o.useState(30),[b,x]=o.useState(!1),[j,g]=o.useState(!1),[p,u]=o.useState(null),r=o.useRef([]);o.useEffect(()=>{if(l>0){const t=setTimeout(()=>m(s=>s-1),1e3);return()=>clearTimeout(t)}},[l]);const w=(t,s)=>{var h;const a=s.replace(/\D/g,"").slice(-1),f=[...c];f[t]=a,y(f),a&&t<5&&((h=r.current[t+1])==null||h.focus())},N=(t,s)=>{var a;s.key==="Backspace"&&!c[t]&&t>0&&((a=r.current[t-1])==null||a.focus())},v=()=>{x(!0),setTimeout(()=>{x(!1),g(!0),setTimeout(()=>d("home","fade"),1400)},1e3)};return e.jsx("div",{className:"w-full h-full",style:{background:n.bg},children:e.jsx(F,{mode:"wait",children:j?e.jsxs(i.div,{initial:{opacity:0},animate:{opacity:1},className:"w-full h-full flex flex-col items-center justify-center px-8",children:[e.jsx(i.div,{initial:{scale:0,opacity:0},animate:{scale:1,opacity:1},transition:{type:"spring",stiffness:300,damping:20,delay:.05},children:e.jsx("div",{className:"w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-lg",style:{background:"#F0FDF4"},children:e.jsx(i.div,{initial:{scale:0},animate:{scale:1},transition:{type:"spring",stiffness:400,delay:.22},children:e.jsx(S,{className:"w-14 h-14 text-emerald-500"})})})}),e.jsx("h2",{className:"text-2xl font-extrabold text-center mb-2",style:{color:n.primary},children:"Verified!"}),e.jsx("p",{className:"text-slate-400 text-sm text-center",children:"Taking you to your dashboard..."}),e.jsx("div",{className:"mt-7 flex gap-2",children:[0,1,2].map(t=>e.jsx(i.div,{animate:{opacity:[.3,1,.3]},transition:{duration:.9,delay:t*.18,repeat:1/0},className:"w-2 h-2 rounded-full",style:{background:n.accent}},t))})]},"success"):e.jsxs(i.div,{initial:{opacity:0},animate:{opacity:1},className:"w-full h-full px-7 pt-14",children:[e.jsx(i.button,{whileTap:{scale:.92},onClick:()=>d("login","back"),className:"mb-7 p-2 -ml-2 rounded-xl",children:e.jsx(P,{className:"w-6 h-6",style:{color:n.primary}})}),e.jsx("div",{className:"w-14 h-14 rounded-2xl flex items-center justify-center mb-5",style:{background:n.accent},children:e.jsx(E,{className:"w-7 h-7 text-white"})}),e.jsx("h2",{className:"text-2xl font-extrabold mb-2",style:{color:n.primary},children:"Verify OTP"}),e.jsxs("p",{className:"text-slate-400 text-sm mb-8 text-left",children:["We sent a 6-digit code to",e.jsx("br",{}),e.jsx("span",{className:"font-bold text-slate-600",children:"+62 812 3456 7890"})]}),e.jsx("style",{children:`
              .otp-container {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                overflow: hidden;
                gap: 8px;
                margin-bottom: 32px;
              }
              @media (min-width: 768px) {
                .otp-container {
                  gap: 12px;
                }
              }
              .otp-input {
                width: 48px;
                height: 56px;
                border-radius: 12px;
                font-size: 24px;
                font-weight: 600;
                text-align: center;
                flex: 0 0 auto;
                outline: none;
                border: 2px solid #E2E8F0;
                transition: border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
              }
              @media (max-width: 374px) {
                .otp-input {
                  width: 42px !important;
                }
              }
            `}),e.jsx("div",{className:"otp-container",children:c.map((t,s)=>e.jsx(i.input,{ref:a=>{r.current[s]=a},type:"text",inputMode:"numeric",maxLength:1,value:t,onChange:a=>w(s,a.target.value),onKeyDown:a=>N(s,a),onFocus:()=>u(s),onBlur:()=>u(null),animate:{borderColor:s===p?n.primary:t?n.accent:"#E2E8F0",background:t?"#FFF8F0":"white",boxShadow:s===p?"0 0 0 3px rgba(30, 41, 59, 0.15)":"none"},className:"otp-input",style:{color:n.primary}},s))}),e.jsx(T,{className:"w-full py-4 mb-5",loading:b,onClick:v,children:"Verify & Continue"}),e.jsxs("p",{className:"text-center text-sm text-slate-400",children:["Didn't receive the code? ",l>0?e.jsxs("span",{className:"font-bold text-slate-400",children:["Resend in ",l,"s"]}):e.jsx("button",{onClick:()=>m(30),className:"font-bold",style:{color:n.secondary},children:"Resend OTP"})]})]},"form")})})}export{I as OTPScreen};
