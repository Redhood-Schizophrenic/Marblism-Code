import{r as h,j as e}from"./index-DRMtkY8T.js";import{A as j,T as g}from"./index-D1nLi7B9.js";import{A as y}from"./index-COcNz6bj.js";import{u as f}from"./index-BPgtOJpV.js";import{F as r,I as w}from"./index-C6iAlcE4.js";import{F as t}from"./index-Ch39FAg7.js";import{A}from"./index-BvU7tRN0.js";import{B as s}from"./button-LZ1wP-R8.js";import{s as F}from"./index-BqCDaMrI.js";import"./index-BQLhnx2g.js";import"./pickAttrs-BwSQLAVK.js";import"./collapse-BbEVqHco.js";import"./row--sIJDtdh.js";import"./responsiveObserver-C9MLPLcO.js";import"./CloseOutlined-OJiPlgzE.js";import"./InfoCircleFilled-1rpgKD39.js";const{Text:i}=g;function L(){const o=f(),[l,m]=h.useState(),[c]=r.useForm(),{mutateAsync:p,isLoading:d,isSuccess:a}=j.authentication.sendResetPasswordEmail.useMutation(),u=async n=>{try{m(n.email),await p({email:n.email})}catch(x){F.error(`Could not reset password: ${x}`)}};return e.jsx(t,{align:"center",justify:"center",vertical:!0,flex:1,children:e.jsxs(t,{vertical:!0,style:{width:"340px",paddingBottom:"100px",paddingTop:"100px"},gap:"middle",children:[e.jsx(y,{description:"You will receive a link"}),a&&e.jsx(A,{style:{textAlign:"center"},message:`We sent an email to ${l} with a link to reset your password`,type:"success"}),!a&&e.jsx(e.Fragment,{children:e.jsxs(r,{form:c,onFinish:u,layout:"vertical",requiredMark:!1,children:[e.jsx(r.Item,{label:"Email",name:"email",rules:[{required:!0,message:"Email is required"}],children:e.jsx(w,{type:"email",placeholder:"Your email",autoComplete:"email"})}),e.jsx(r.Item,{children:e.jsx(s,{type:"primary",htmlType:"submit",loading:d,block:!0,children:"Reset Password"})})]})}),e.jsxs(t,{justify:"center",align:"center",children:[e.jsx(s,{ghost:!0,style:{border:"none"},onClick:()=>o("/login"),children:e.jsx(t,{gap:"small",justify:"center",children:e.jsx(i,{children:"Sign in"})})}),e.jsx(i,{type:"secondary",children:"or"}),e.jsx(s,{ghost:!0,style:{border:"none"},onClick:()=>o("/register"),children:e.jsx(t,{gap:"small",justify:"center",children:e.jsx(i,{children:"Sign up"})})})]})]})})}export{L as default};
