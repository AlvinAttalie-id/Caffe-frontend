import{c as T,u as F,a as E,r as o,j as e,B as n,A as L,m as i}from"./index-RqYW6GJx.js";import{P as S}from"./PrimaryBtn-CoInk3fw.js";import{u as A}from"./useToast-C6Ky3qQM.js";import{C as O}from"./chevron-left-DqExcu2N.js";import{P as B}from"./phone-BlZ5PlgV.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],I=T("circle-check-big",D);function _(){const m=F(),x=A(),{verifyOtp:j,tempPhone:b}=E(),[r,g]=o.useState(["","","","","",""]),[c,p]=o.useState(30),[w,u]=o.useState(!1),[N,v]=o.useState(!1),[f,h]=o.useState(null),d=o.useRef([]);o.useEffect(()=>{if(c>0){const t=setTimeout(()=>p(s=>s-1),1e3);return()=>clearTimeout(t)}},[c]);const k=(t,s)=>{var y;const a=s.replace(/\D/g,"").slice(-1),l=[...r];l[t]=a,g(l),a&&t<5&&((y=d.current[t+1])==null||y.focus())},C=(t,s)=>{var a;s.key==="Backspace"&&!r[t]&&t>0&&((a=d.current[t-1])==null||a.focus())},P=async()=>{var s,a;const t=r.join("");if(t.length<6){x.error("Please enter the 6-digit OTP code");return}u(!0);try{await j(t),v(!0),setTimeout(()=>m("home","fade"),1400)}catch(l){x.error(((a=(s=l.response)==null?void 0:s.data)==null?void 0:a.message)||"Invalid credentials or verification code")}finally{u(!1)}};return e.jsx("div",{className:"w-full h-full",style:{background:n.bg},children:e.jsx(L,{mode:"wait",children:N?e.jsxs(i.div,{initial:{opacity:0},animate:{opacity:1},className:"w-full h-full flex flex-col items-center justify-center px-8",children:[e.jsx(i.div,{initial:{scale:0,opacity:0},animate:{scale:1,opacity:1},transition:{type:"spring",stiffness:300,damping:20,delay:.05},children:e.jsx("div",{className:"w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-lg",style:{background:"#F0FDF4"},children:e.jsx(i.div,{initial:{scale:0},animate:{scale:1},transition:{type:"spring",stiffness:400,delay:.22},children:e.jsx(I,{className:"w-14 h-14 text-emerald-500"})})})}),e.jsx("h2",{className:"text-2xl font-extrabold text-center mb-2",style:{color:n.primary},children:"Verified!"}),e.jsx("p",{className:"text-slate-400 text-sm text-center",children:"Taking you to your dashboard..."}),e.jsx("div",{className:"mt-7 flex gap-2",children:[0,1,2].map(t=>e.jsx(i.div,{animate:{opacity:[.3,1,.3]},transition:{duration:.9,delay:t*.18,repeat:1/0},className:"w-2 h-2 rounded-full",style:{background:n.accent}},t))})]},"success"):e.jsxs(i.div,{initial:{opacity:0},animate:{opacity:1},className:"w-full h-full px-7 pt-14",children:[e.jsx(i.button,{whileTap:{scale:.92},onClick:()=>m("login","back"),className:"mb-7 p-2 -ml-2 rounded-xl",children:e.jsx(O,{className:"w-6 h-6",style:{color:n.primary}})}),e.jsx("div",{className:"w-14 h-14 rounded-2xl flex items-center justify-center mb-5",style:{background:n.accent},children:e.jsx(B,{className:"w-7 h-7 text-white"})}),e.jsx("h2",{className:"text-2xl font-extrabold mb-2",style:{color:n.primary},children:"Verify OTP"}),e.jsxs("p",{className:"text-slate-400 text-sm mb-8 text-left",children:["We sent a 6-digit code to",e.jsx("br",{}),e.jsx("span",{className:"font-bold text-slate-600",children:b||"+62 812 3456 7890"})]}),e.jsx("style",{children:`
              .otp-container {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                gap: 8px;
                margin-bottom: 32px;
              }
              .otp-input {
                width: 40px;
                height: 48px;
                border-radius: 10px;
                font-size: 20px;
                font-weight: 600;
                text-align: center;
                flex: 0 0 auto;
                outline: none;
                border: 2px solid #E2E8F0;
                transition: border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
              }
              @media (min-width: 768px) {
                .otp-input {
                  width: 44px;
                  height: 52px;
                }
              }
            `}),e.jsx("div",{className:"otp-container",children:r.map((t,s)=>e.jsx(i.input,{ref:a=>{d.current[s]=a},type:"text",inputMode:"numeric",maxLength:1,value:t,onChange:a=>k(s,a.target.value),onKeyDown:a=>C(s,a),onFocus:()=>h(s),onBlur:()=>h(null),animate:{borderColor:s===f?n.primary:t?n.primary:"#E2E8F0",background:t?"#F8FAFC":"white",boxShadow:s===f?"0 0 0 3px rgba(30, 41, 59, 0.12)":"none"},className:"otp-input",style:{color:n.primary}},s))}),e.jsx(S,{className:"w-full py-4 mb-5",loading:w,onClick:P,children:"Verify & Continue"}),e.jsxs("p",{className:"text-center text-sm text-slate-400",children:["Didn't receive the code? ",c>0?e.jsxs("span",{className:"font-bold text-slate-400",children:["Resend in ",c,"s"]}):e.jsx("button",{onClick:()=>p(30),className:"font-bold",style:{color:n.secondary},children:"Resend OTP"})]})]},"form")})})}export{_ as OTPScreen};
