import{r as u,j as f}from"./index-DRMtkY8T.js";import{A as h}from"./index-D1nLi7B9.js";const a=u.createContext(void 0),m=({children:e})=>{const{data:t,refetch:i,...c}=h.authentication.session.useQuery(),r=t==null?void 0:t.user,d=x=>(r==null?void 0:r.globalRole)===x,o=c.isLoading,s=!!(t!=null&&t.user);let n="unauthenticated";return o?n="loading":s&&(n="authenticated"),f.jsx(a.Provider,{value:{user:t==null?void 0:t.user,checkRole:d,refetch:i,authenticationStatus:n,isLoggedIn:s,isLoading:o},children:e})},p=()=>{const e=u.useContext(a);if(e===void 0)throw new Error("useUserContext must be used within a UserProvider");return e};export{m as U,p as u};
