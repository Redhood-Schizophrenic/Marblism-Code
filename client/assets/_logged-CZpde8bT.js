import{r as c,j as u}from"./index-DRMtkY8T.js";import{u as oe}from"./useUserContext-CftYQF-E.js";import{S as $e,u as ne,T as _,M as we}from"./provider-D-iywQx-.js";import{C as G,c as H,t as He,G as Y,q as re,b as h,H as ze,J as Me,g as he,m as ee,L as se,r as Ce,T as te,M as Ee,N as ke,O as Ie,f as Ne,F as w}from"./index-Ch39FAg7.js";import{D as Pe,M as De,i as ce,u as Ae,S as Le,E as Re,R as We,a as _e}from"./EllipsisOutlined-DCEh8J-J.js";import{f as Fe,i as Xe,k as qe,u as Ve,l as Ge,m as Ye,n as Ue,o as Ke}from"./index-D1nLi7B9.js";import{g as Ze}from"./collapse-BbEVqHco.js";import{U as Se}from"./index-BzoxnAcz.js";import{L as ve}from"./index-BQLhnx2g.js";import{u as U,b as Je,a as Qe,O as et}from"./index-BPgtOJpV.js";import{A as ye}from"./index-CsjVlZJs.js";import{u as tt,p as de}from"./useClosable-CylV9FcI.js";import{W as ot}from"./button-LZ1wP-R8.js";import{R as xe}from"./MenuOutlined-C8hMCcGm.js";import"./index-XJOg0AuD.js";import"./index-D8jvKhh2.js";import"./index-Dh_9xLWU.js";import"./index-BqCDaMrI.js";import"./InfoCircleFilled-1rpgKD39.js";import"./pickAttrs-BwSQLAVK.js";import"./CloseOutlined-OJiPlgzE.js";import"./responsiveObserver-C9MLPLcO.js";const V=c.createContext({prefixCls:"",firstLevel:!0,inlineCollapsed:!1});var nt=function(e,o){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&o.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(e);n<r.length;n++)o.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(e,r[n])&&(t[r[n]]=e[r[n]]);return t};const Be=e=>{const{prefixCls:o,className:t,dashed:r}=e,n=nt(e,["prefixCls","className","dashed"]),{getPrefixCls:l}=c.useContext(G),i=l("menu",o),s=H({[`${i}-item-divider-dashed`]:!!r},t);return c.createElement(Pe,Object.assign({className:s},n))},je=e=>{var o;const{className:t,children:r,icon:n,title:l,danger:i}=e,{prefixCls:s,firstLevel:a,direction:m,disableMenuItemTitleTooltip:p,inlineCollapsed:g}=c.useContext(V),d=j=>{const x=r==null?void 0:r[0],B=c.createElement("span",{className:`${s}-title-content`},r);return(!n||c.isValidElement(r)&&r.type==="span")&&r&&j&&a&&typeof x=="string"?c.createElement("div",{className:`${s}-inline-collapsed-noicon`},x.charAt(0)):B},{siderCollapsed:$}=c.useContext($e);let f=l;typeof l>"u"?f=a?r:"":l===!1&&(f="");const b={title:f};!$&&!g&&(b.title=null,b.open=!1);const I=He(r).length;let C=c.createElement(De,Object.assign({},Y(e,["title","icon","danger"]),{className:H({[`${s}-item-danger`]:i,[`${s}-item-only-child`]:(n?I+1:I)===1},t),title:typeof l=="string"?l:void 0}),re(n,{className:H(c.isValidElement(n)?(o=n.props)===null||o===void 0?void 0:o.className:"",`${s}-item-icon`)}),d(g));return p||(C=c.createElement(Fe,Object.assign({},b,{placement:m==="rtl"?"left":"right",overlayClassName:`${s}-inline-collapsed-tooltip`}),C)),C},ue=c.createContext(null),rt=e=>{const{componentCls:o,motionDurationSlow:t,horizontalLineHeight:r,colorSplit:n,lineWidth:l,lineType:i,itemPaddingInline:s}=e;return{[`${o}-horizontal`]:{lineHeight:r,border:0,borderBottom:`${h(l)} ${i} ${n}`,boxShadow:"none","&::after":{display:"block",clear:"both",height:0,content:'"\\20"'},[`${o}-item, ${o}-submenu`]:{position:"relative",display:"inline-block",verticalAlign:"bottom",paddingInline:s},[`> ${o}-item:hover,
        > ${o}-item-active,
        > ${o}-submenu ${o}-submenu-title:hover`]:{backgroundColor:"transparent"},[`${o}-item, ${o}-submenu-title`]:{transition:[`border-color ${t}`,`background ${t}`].join(",")},[`${o}-submenu-arrow`]:{display:"none"}}}},it=e=>{let{componentCls:o,menuArrowOffset:t,calc:r}=e;return{[`${o}-rtl`]:{direction:"rtl"},[`${o}-submenu-rtl`]:{transformOrigin:"100% 0"},[`${o}-rtl${o}-vertical,
    ${o}-submenu-rtl ${o}-vertical`]:{[`${o}-submenu-arrow`]:{"&::before":{transform:`rotate(-45deg) translateY(${h(r(t).mul(-1).equal())})`},"&::after":{transform:`rotate(45deg) translateY(${h(t)})`}}}}},me=e=>Object.assign({},ze(e)),ge=(e,o)=>{const{componentCls:t,itemColor:r,itemSelectedColor:n,groupTitleColor:l,itemBg:i,subMenuItemBg:s,itemSelectedBg:a,activeBarHeight:m,activeBarWidth:p,activeBarBorderWidth:g,motionDurationSlow:d,motionEaseInOut:$,motionEaseOut:f,itemPaddingInline:b,motionDurationMid:I,itemHoverColor:C,lineType:j,colorSplit:x,itemDisabledColor:B,dangerItemColor:O,dangerItemHoverColor:z,dangerItemSelectedColor:v,dangerItemActiveBg:k,dangerItemSelectedBg:S,popupBg:M,itemHoverBg:N,itemActiveBg:T,menuSubMenuBg:D,horizontalItemSelectedColor:y,horizontalItemSelectedBg:A,horizontalItemBorderRadius:F,horizontalItemHoverBg:W}=e;return{[`${t}-${o}, ${t}-${o} > ${t}`]:{color:r,background:i,[`&${t}-root:focus-visible`]:Object.assign({},me(e)),[`${t}-item-group-title`]:{color:l},[`${t}-submenu-selected`]:{[`> ${t}-submenu-title`]:{color:n}},[`${t}-item, ${t}-submenu-title`]:{color:r,[`&:not(${t}-item-disabled):focus-visible`]:Object.assign({},me(e))},[`${t}-item-disabled, ${t}-submenu-disabled`]:{color:`${B} !important`},[`${t}-item:not(${t}-item-selected):not(${t}-submenu-selected)`]:{[`&:hover, > ${t}-submenu-title:hover`]:{color:C}},[`&:not(${t}-horizontal)`]:{[`${t}-item:not(${t}-item-selected)`]:{"&:hover":{backgroundColor:N},"&:active":{backgroundColor:T}},[`${t}-submenu-title`]:{"&:hover":{backgroundColor:N},"&:active":{backgroundColor:T}}},[`${t}-item-danger`]:{color:O,[`&${t}-item:hover`]:{[`&:not(${t}-item-selected):not(${t}-submenu-selected)`]:{color:z}},[`&${t}-item:active`]:{background:k}},[`${t}-item a`]:{"&, &:hover":{color:"inherit"}},[`${t}-item-selected`]:{color:n,[`&${t}-item-danger`]:{color:v},"a, a:hover":{color:"inherit"}},[`& ${t}-item-selected`]:{backgroundColor:a,[`&${t}-item-danger`]:{backgroundColor:S}},[`&${t}-submenu > ${t}`]:{backgroundColor:D},[`&${t}-popup > ${t}`]:{backgroundColor:M},[`&${t}-submenu-popup > ${t}`]:{backgroundColor:M},[`&${t}-horizontal`]:Object.assign(Object.assign({},o==="dark"?{borderBottom:0}:{}),{[`> ${t}-item, > ${t}-submenu`]:{top:g,marginTop:e.calc(g).mul(-1).equal(),marginBottom:0,borderRadius:F,"&::after":{position:"absolute",insetInline:b,bottom:0,borderBottom:`${h(m)} solid transparent`,transition:`border-color ${d} ${$}`,content:'""'},"&:hover, &-active, &-open":{background:W,"&::after":{borderBottomWidth:m,borderBottomColor:y}},"&-selected":{color:y,backgroundColor:A,"&:hover":{backgroundColor:A},"&::after":{borderBottomWidth:m,borderBottomColor:y}}}}),[`&${t}-root`]:{[`&${t}-inline, &${t}-vertical`]:{borderInlineEnd:`${h(g)} ${j} ${x}`}},[`&${t}-inline`]:{[`${t}-sub${t}-inline`]:{background:s},[`${t}-item`]:{position:"relative","&::after":{position:"absolute",insetBlock:0,insetInlineEnd:0,borderInlineEnd:`${h(p)} solid ${n}`,transform:"scaleY(0.0001)",opacity:0,transition:[`transform ${I} ${f}`,`opacity ${I} ${f}`].join(","),content:'""'},[`&${t}-item-danger`]:{"&::after":{borderInlineEndColor:v}}},[`${t}-selected, ${t}-item-selected`]:{"&::after":{transform:"scaleY(1)",opacity:1,transition:[`transform ${I} ${$}`,`opacity ${I} ${$}`].join(",")}}}}}},pe=e=>{const{componentCls:o,itemHeight:t,itemMarginInline:r,padding:n,menuArrowSize:l,marginXS:i,itemMarginBlock:s,itemWidth:a,itemPaddingInline:m}=e,p=e.calc(l).add(n).add(i).equal();return{[`${o}-item`]:{position:"relative",overflow:"hidden"},[`${o}-item, ${o}-submenu-title`]:{height:t,lineHeight:h(t),paddingInline:m,overflow:"hidden",textOverflow:"ellipsis",marginInline:r,marginBlock:s,width:a},[`> ${o}-item,
            > ${o}-submenu > ${o}-submenu-title`]:{height:t,lineHeight:h(t)},[`${o}-item-group-list ${o}-submenu-title,
            ${o}-submenu-title`]:{paddingInlineEnd:p}}},lt=e=>{const{componentCls:o,iconCls:t,itemHeight:r,colorTextLightSolid:n,dropdownWidth:l,controlHeightLG:i,motionEaseOut:s,paddingXL:a,itemMarginInline:m,fontSizeLG:p,motionDurationFast:g,motionDurationSlow:d,paddingXS:$,boxShadowSecondary:f,collapsedWidth:b,collapsedIconSize:I}=e,C={height:r,lineHeight:h(r),listStylePosition:"inside",listStyleType:"disc"};return[{[o]:{"&-inline, &-vertical":Object.assign({[`&${o}-root`]:{boxShadow:"none"}},pe(e))},[`${o}-submenu-popup`]:{[`${o}-vertical`]:Object.assign(Object.assign({},pe(e)),{boxShadow:f})}},{[`${o}-submenu-popup ${o}-vertical${o}-sub`]:{minWidth:l,maxHeight:`calc(100vh - ${h(e.calc(i).mul(2.5).equal())})`,padding:"0",overflow:"hidden",borderInlineEnd:0,"&:not([class*='-active'])":{overflowX:"hidden",overflowY:"auto"}}},{[`${o}-inline`]:{width:"100%",[`&${o}-root`]:{[`${o}-item, ${o}-submenu-title`]:{display:"flex",alignItems:"center",transition:[`border-color ${d}`,`background ${d}`,`padding ${g} ${s}`].join(","),[`> ${o}-title-content`]:{flex:"auto",minWidth:0,overflow:"hidden",textOverflow:"ellipsis"},"> *":{flex:"none"}}},[`${o}-sub${o}-inline`]:{padding:0,border:0,borderRadius:0,boxShadow:"none",[`& > ${o}-submenu > ${o}-submenu-title`]:C,[`& ${o}-item-group-title`]:{paddingInlineStart:a}},[`${o}-item`]:C}},{[`${o}-inline-collapsed`]:{width:b,[`&${o}-root`]:{[`${o}-item, ${o}-submenu ${o}-submenu-title`]:{[`> ${o}-inline-collapsed-noicon`]:{fontSize:p,textAlign:"center"}}},[`> ${o}-item,
          > ${o}-item-group > ${o}-item-group-list > ${o}-item,
          > ${o}-item-group > ${o}-item-group-list > ${o}-submenu > ${o}-submenu-title,
          > ${o}-submenu > ${o}-submenu-title`]:{insetInlineStart:0,paddingInline:`calc(50% - ${h(e.calc(p).div(2).equal())} - ${h(m)})`,textOverflow:"clip",[`
            ${o}-submenu-arrow,
            ${o}-submenu-expand-icon
          `]:{opacity:0},[`${o}-item-icon, ${t}`]:{margin:0,fontSize:I,lineHeight:h(r),"+ span":{display:"inline-block",opacity:0}}},[`${o}-item-icon, ${t}`]:{display:"inline-block"},"&-tooltip":{pointerEvents:"none",[`${o}-item-icon, ${t}`]:{display:"none"},"a, a:hover":{color:n}},[`${o}-item-group-title`]:Object.assign(Object.assign({},Me),{paddingInline:$})}}]},be=e=>{const{componentCls:o,motionDurationSlow:t,motionDurationMid:r,motionEaseInOut:n,motionEaseOut:l,iconCls:i,iconSize:s,iconMarginInlineEnd:a}=e;return{[`${o}-item, ${o}-submenu-title`]:{position:"relative",display:"block",margin:0,whiteSpace:"nowrap",cursor:"pointer",transition:[`border-color ${t}`,`background ${t}`,`padding calc(${t} + 0.1s) ${n}`].join(","),[`${o}-item-icon, ${i}`]:{minWidth:s,fontSize:s,transition:[`font-size ${r} ${l}`,`margin ${t} ${n}`,`color ${t}`].join(","),"+ span":{marginInlineStart:a,opacity:1,transition:[`opacity ${t} ${n}`,`margin ${t}`,`color ${t}`].join(",")}},[`${o}-item-icon`]:Object.assign({},Ee()),[`&${o}-item-only-child`]:{[`> ${i}, > ${o}-item-icon`]:{marginInlineEnd:0}}},[`${o}-item-disabled, ${o}-submenu-disabled`]:{background:"none !important",cursor:"not-allowed","&::after":{borderColor:"transparent !important"},a:{color:"inherit !important"},[`> ${o}-submenu-title`]:{color:"inherit !important",cursor:"not-allowed"}}}},fe=e=>{const{componentCls:o,motionDurationSlow:t,motionEaseInOut:r,borderRadius:n,menuArrowSize:l,menuArrowOffset:i}=e;return{[`${o}-submenu`]:{"&-expand-icon, &-arrow":{position:"absolute",top:"50%",insetInlineEnd:e.margin,width:l,color:"currentcolor",transform:"translateY(-50%)",transition:`transform ${t} ${r}, opacity ${t}`},"&-arrow":{"&::before, &::after":{position:"absolute",width:e.calc(l).mul(.6).equal(),height:e.calc(l).mul(.15).equal(),backgroundColor:"currentcolor",borderRadius:n,transition:[`background ${t} ${r}`,`transform ${t} ${r}`,`top ${t} ${r}`,`color ${t} ${r}`].join(","),content:'""'},"&::before":{transform:`rotate(45deg) translateY(${h(e.calc(i).mul(-1).equal())})`},"&::after":{transform:`rotate(-45deg) translateY(${h(i)})`}}}}},at=e=>{const{antCls:o,componentCls:t,fontSize:r,motionDurationSlow:n,motionDurationMid:l,motionEaseInOut:i,paddingXS:s,padding:a,colorSplit:m,lineWidth:p,zIndexPopup:g,borderRadiusLG:d,subMenuItemBorderRadius:$,menuArrowSize:f,menuArrowOffset:b,lineType:I,groupTitleLineHeight:C,groupTitleFontSize:j}=e;return[{"":{[t]:Object.assign(Object.assign({},se()),{"&-hidden":{display:"none"}})},[`${t}-submenu-hidden`]:{display:"none"}},{[t]:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},Ce(e)),se()),{marginBottom:0,paddingInlineStart:0,fontSize:r,lineHeight:0,listStyle:"none",outline:"none",transition:`width ${n} cubic-bezier(0.2, 0, 0, 1) 0s`,"ul, ol":{margin:0,padding:0,listStyle:"none"},"&-overflow":{display:"flex",[`${t}-item`]:{flex:"none"}},[`${t}-item, ${t}-submenu, ${t}-submenu-title`]:{borderRadius:e.itemBorderRadius},[`${t}-item-group-title`]:{padding:`${h(s)} ${h(a)}`,fontSize:j,lineHeight:C,transition:`all ${n}`},[`&-horizontal ${t}-submenu`]:{transition:[`border-color ${n} ${i}`,`background ${n} ${i}`].join(",")},[`${t}-submenu, ${t}-submenu-inline`]:{transition:[`border-color ${n} ${i}`,`background ${n} ${i}`,`padding ${l} ${i}`].join(",")},[`${t}-submenu ${t}-sub`]:{cursor:"initial",transition:[`background ${n} ${i}`,`padding ${n} ${i}`].join(",")},[`${t}-title-content`]:{display:"inline-flex",alignItems:"center",transition:`color ${n}`,"> a:first-child":{flexGrow:1},[`> ${o}-typography-ellipsis-single-line`]:{display:"inline",verticalAlign:"unset"},[`${t}-item-extra`]:{marginInlineStart:"auto",paddingInlineStart:e.padding,fontSize:e.fontSizeSM,color:e.colorTextDescription}},[`${t}-item a`]:{"&::before":{position:"absolute",inset:0,backgroundColor:"transparent",content:'""'}},[`${t}-item-divider`]:{overflow:"hidden",lineHeight:0,borderColor:m,borderStyle:I,borderWidth:0,borderTopWidth:p,marginBlock:p,padding:0,"&-dashed":{borderStyle:"dashed"}}}),be(e)),{[`${t}-item-group`]:{[`${t}-item-group-list`]:{margin:0,padding:0,[`${t}-item, ${t}-submenu-title`]:{paddingInline:`${h(e.calc(r).mul(2).equal())} ${h(a)}`}}},"&-submenu":{"&-popup":{position:"absolute",zIndex:g,borderRadius:d,boxShadow:"none",transformOrigin:"0 0",[`&${t}-submenu`]:{background:"transparent"},"&::before":{position:"absolute",inset:0,zIndex:-1,width:"100%",height:"100%",opacity:0,content:'""'},[`> ${t}`]:Object.assign(Object.assign(Object.assign({borderRadius:d},be(e)),fe(e)),{[`${t}-item, ${t}-submenu > ${t}-submenu-title`]:{borderRadius:$},[`${t}-submenu-title::after`]:{transition:`transform ${n} ${i}`}})},"\n          &-placement-leftTop,\n          &-placement-bottomRight,\n          ":{transformOrigin:"100% 0"},"\n          &-placement-leftBottom,\n          &-placement-topRight,\n          ":{transformOrigin:"100% 100%"},"\n          &-placement-rightBottom,\n          &-placement-topLeft,\n          ":{transformOrigin:"0 100%"},"\n          &-placement-bottomLeft,\n          &-placement-rightTop,\n          ":{transformOrigin:"0 0"},"\n          &-placement-leftTop,\n          &-placement-leftBottom\n          ":{paddingInlineEnd:e.paddingXS},"\n          &-placement-rightTop,\n          &-placement-rightBottom\n          ":{paddingInlineStart:e.paddingXS},"\n          &-placement-topRight,\n          &-placement-topLeft\n          ":{paddingBottom:e.paddingXS},"\n          &-placement-bottomRight,\n          &-placement-bottomLeft\n          ":{paddingTop:e.paddingXS}}}),fe(e)),{[`&-inline-collapsed ${t}-submenu-arrow,
        &-inline ${t}-submenu-arrow`]:{"&::before":{transform:`rotate(-45deg) translateX(${h(b)})`},"&::after":{transform:`rotate(45deg) translateX(${h(e.calc(b).mul(-1).equal())})`}},[`${t}-submenu-open${t}-submenu-inline > ${t}-submenu-title > ${t}-submenu-arrow`]:{transform:`translateY(${h(e.calc(f).mul(.2).mul(-1).equal())})`,"&::after":{transform:`rotate(-45deg) translateX(${h(e.calc(b).mul(-1).equal())})`},"&::before":{transform:`rotate(45deg) translateX(${h(b)})`}}})},{[`${o}-layout-header`]:{[t]:{lineHeight:"inherit"}}}]},st=e=>{var o,t,r;const{colorPrimary:n,colorError:l,colorTextDisabled:i,colorErrorBg:s,colorText:a,colorTextDescription:m,colorBgContainer:p,colorFillAlter:g,colorFillContent:d,lineWidth:$,lineWidthBold:f,controlItemBgActive:b,colorBgTextHover:I,controlHeightLG:C,lineHeight:j,colorBgElevated:x,marginXXS:B,padding:O,fontSize:z,controlHeightSM:v,fontSizeLG:k,colorTextLightSolid:S,colorErrorHover:M}=e,N=(o=e.activeBarWidth)!==null&&o!==void 0?o:0,T=(t=e.activeBarBorderWidth)!==null&&t!==void 0?t:$,D=(r=e.itemMarginInline)!==null&&r!==void 0?r:e.marginXXS,y=new te(S).setAlpha(.65).toRgbString();return{dropdownWidth:160,zIndexPopup:e.zIndexPopupBase+50,radiusItem:e.borderRadiusLG,itemBorderRadius:e.borderRadiusLG,radiusSubMenuItem:e.borderRadiusSM,subMenuItemBorderRadius:e.borderRadiusSM,colorItemText:a,itemColor:a,colorItemTextHover:a,itemHoverColor:a,colorItemTextHoverHorizontal:n,horizontalItemHoverColor:n,colorGroupTitle:m,groupTitleColor:m,colorItemTextSelected:n,itemSelectedColor:n,colorItemTextSelectedHorizontal:n,horizontalItemSelectedColor:n,colorItemBg:p,itemBg:p,colorItemBgHover:I,itemHoverBg:I,colorItemBgActive:d,itemActiveBg:b,colorSubItemBg:g,subMenuItemBg:g,colorItemBgSelected:b,itemSelectedBg:b,colorItemBgSelectedHorizontal:"transparent",horizontalItemSelectedBg:"transparent",colorActiveBarWidth:0,activeBarWidth:N,colorActiveBarHeight:f,activeBarHeight:f,colorActiveBarBorderSize:$,activeBarBorderWidth:T,colorItemTextDisabled:i,itemDisabledColor:i,colorDangerItemText:l,dangerItemColor:l,colorDangerItemTextHover:l,dangerItemHoverColor:l,colorDangerItemTextSelected:l,dangerItemSelectedColor:l,colorDangerItemBgActive:s,dangerItemActiveBg:s,colorDangerItemBgSelected:s,dangerItemSelectedBg:s,itemMarginInline:D,horizontalItemBorderRadius:0,horizontalItemHoverBg:"transparent",itemHeight:C,groupTitleLineHeight:j,collapsedWidth:C*2,popupBg:x,itemMarginBlock:B,itemPaddingInline:O,horizontalLineHeight:`${C*1.15}px`,iconSize:z,iconMarginInlineEnd:v-z,collapsedIconSize:k,groupTitleFontSize:z,darkItemDisabledColor:new te(S).setAlpha(.25).toRgbString(),darkItemColor:y,darkDangerItemColor:l,darkItemBg:"#001529",darkPopupBg:"#001529",darkSubMenuItemBg:"#000c17",darkItemSelectedColor:S,darkItemSelectedBg:n,darkDangerItemSelectedBg:l,darkItemHoverBg:"transparent",darkGroupTitleColor:y,darkItemHoverColor:S,darkDangerItemHoverColor:M,darkDangerItemSelectedColor:S,darkDangerItemActiveBg:l,itemWidth:N?`calc(100% + ${T}px)`:`calc(100% - ${D*2}px)`}},ct=function(e){let o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e,t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0;return he("Menu",n=>{const{colorBgElevated:l,controlHeightLG:i,fontSize:s,darkItemColor:a,darkDangerItemColor:m,darkItemBg:p,darkSubMenuItemBg:g,darkItemSelectedColor:d,darkItemSelectedBg:$,darkDangerItemSelectedBg:f,darkItemHoverBg:b,darkGroupTitleColor:I,darkItemHoverColor:C,darkItemDisabledColor:j,darkDangerItemHoverColor:x,darkDangerItemSelectedColor:B,darkDangerItemActiveBg:O,popupBg:z,darkPopupBg:v}=n,k=n.calc(s).div(7).mul(5).equal(),S=ee(n,{menuArrowSize:k,menuHorizontalHeight:n.calc(i).mul(1.15).equal(),menuArrowOffset:n.calc(k).mul(.25).equal(),menuSubMenuBg:l,calc:n.calc,popupBg:z}),M=ee(S,{itemColor:a,itemHoverColor:C,groupTitleColor:I,itemSelectedColor:d,itemBg:p,popupBg:v,subMenuItemBg:g,itemActiveBg:"transparent",itemSelectedBg:$,activeBarHeight:0,activeBarBorderWidth:0,itemHoverBg:b,itemDisabledColor:j,dangerItemColor:m,dangerItemHoverColor:x,dangerItemSelectedColor:B,dangerItemActiveBg:O,dangerItemSelectedBg:f,menuSubMenuBg:g,horizontalItemSelectedColor:d,horizontalItemSelectedBg:$});return[at(S),rt(S),lt(S),ge(S,"light"),ge(M,"dark"),it(S),Ze(S),ce(S,"slide-up"),ce(S,"slide-down"),Xe(S,"zoom-big")]},st,{deprecatedTokens:[["colorGroupTitle","groupTitleColor"],["radiusItem","itemBorderRadius"],["radiusSubMenuItem","subMenuItemBorderRadius"],["colorItemText","itemColor"],["colorItemTextHover","itemHoverColor"],["colorItemTextHoverHorizontal","horizontalItemHoverColor"],["colorItemTextSelected","itemSelectedColor"],["colorItemTextSelectedHorizontal","horizontalItemSelectedColor"],["colorItemTextDisabled","itemDisabledColor"],["colorDangerItemText","dangerItemColor"],["colorDangerItemTextHover","dangerItemHoverColor"],["colorDangerItemTextSelected","dangerItemSelectedColor"],["colorDangerItemBgActive","dangerItemActiveBg"],["colorDangerItemBgSelected","dangerItemSelectedBg"],["colorItemBg","itemBg"],["colorItemBgHover","itemHoverBg"],["colorSubItemBg","subMenuItemBg"],["colorItemBgActive","itemActiveBg"],["colorItemBgSelectedHorizontal","horizontalItemSelectedBg"],["colorActiveBarWidth","activeBarWidth"],["colorActiveBarHeight","activeBarHeight"],["colorActiveBarBorderSize","activeBarBorderWidth"],["colorItemBgSelected","itemSelectedBg"]],injectStyle:t,unitless:{groupTitleLineHeight:!0}})(e,o)},Oe=e=>{var o;const{popupClassName:t,icon:r,title:n,theme:l}=e,i=c.useContext(V),{prefixCls:s,inlineCollapsed:a,theme:m}=i,p=Ae();let g;if(!r)g=a&&!p.length&&n&&typeof n=="string"?c.createElement("div",{className:`${s}-inline-collapsed-noicon`},n.charAt(0)):c.createElement("span",{className:`${s}-title-content`},n);else{const f=c.isValidElement(n)&&n.type==="span";g=c.createElement(c.Fragment,null,re(r,{className:H(c.isValidElement(r)?(o=r.props)===null||o===void 0?void 0:o.className:"",`${s}-item-icon`)}),f?n:c.createElement("span",{className:`${s}-title-content`},n))}const d=c.useMemo(()=>Object.assign(Object.assign({},i),{firstLevel:!1}),[i]),[$]=qe("Menu");return c.createElement(V.Provider,{value:d},c.createElement(Le,Object.assign({},Y(e,["icon"]),{title:g,popupClassName:H(s,t,`${s}-${l||m}`),popupStyle:Object.assign({zIndex:$},e.popupStyle)})))};var dt=function(e,o){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&o.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(e);n<r.length;n++)o.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(e,r[n])&&(t[r[n]]=e[r[n]]);return t};function Q(e){return e===null||e===!1}const ut={item:je,submenu:Oe,divider:Be},mt=c.forwardRef((e,o)=>{var t;const r=c.useContext(ue),n=r||{},{getPrefixCls:l,getPopupContainer:i,direction:s,menu:a}=c.useContext(G),m=l(),{prefixCls:p,className:g,style:d,theme:$="light",expandIcon:f,_internalDisableMenuItemTitleTooltip:b,inlineCollapsed:I,siderCollapsed:C,rootClassName:j,mode:x,selectable:B,onClick:O,overflowedIndicatorPopupClassName:z}=e,v=dt(e,["prefixCls","className","style","theme","expandIcon","_internalDisableMenuItemTitleTooltip","inlineCollapsed","siderCollapsed","rootClassName","mode","selectable","onClick","overflowedIndicatorPopupClassName"]),k=Y(v,["collapsedWidth"]);(t=n.validator)===null||t===void 0||t.call(n,{mode:x});const S=ke(function(){var E;O==null||O.apply(void 0,arguments),(E=n.onClick)===null||E===void 0||E.call(n)}),M=n.mode||x,N=B??n.selectable,T=c.useMemo(()=>C!==void 0?C:I,[I,C]),D={horizontal:{motionName:`${m}-slide-up`},inline:Ge(m),other:{motionName:`${m}-zoom-big`}},y=l("menu",p||n.prefixCls),A=Ve(y),[F,W,L]=ct(y,A,!r),K=H(`${y}-${$}`,a==null?void 0:a.className,g),P=c.useMemo(()=>{var E,Z;if(typeof f=="function"||Q(f))return f||null;if(typeof n.expandIcon=="function"||Q(n.expandIcon))return n.expandIcon||null;if(typeof(a==null?void 0:a.expandIcon)=="function"||Q(a==null?void 0:a.expandIcon))return(a==null?void 0:a.expandIcon)||null;const J=(E=f??(n==null?void 0:n.expandIcon))!==null&&E!==void 0?E:a==null?void 0:a.expandIcon;return re(J,{className:H(`${y}-submenu-expand-icon`,c.isValidElement(J)?(Z=J.props)===null||Z===void 0?void 0:Z.className:void 0)})},[f,n==null?void 0:n.expandIcon,a==null?void 0:a.expandIcon,y]),X=c.useMemo(()=>({prefixCls:y,inlineCollapsed:T||!1,direction:s,firstLevel:!0,theme:$,mode:M,disableMenuItemTitleTooltip:b}),[y,T,s,b,$]);return F(c.createElement(ue.Provider,{value:null},c.createElement(V.Provider,{value:X},c.createElement(Re,Object.assign({getPopupContainer:i,overflowedIndicator:c.createElement(We,null),overflowedIndicatorPopupClassName:H(y,`${y}-${$}`,z),mode:M,selectable:N,onClick:S},k,{inlineCollapsed:T,style:Object.assign(Object.assign({},a==null?void 0:a.style),d),className:K,prefixCls:y,direction:s,defaultMotions:D,expandIcon:P,ref:o,rootClassName:H(j,W,n.rootClassName,L,A),_internalComponents:ut})))))}),R=c.forwardRef((e,o)=>{const t=c.useRef(null),r=c.useContext($e);return c.useImperativeHandle(o,()=>({menu:t.current,focus:n=>{var l;(l=t.current)===null||l===void 0||l.focus(n)}})),c.createElement(mt,Object.assign({ref:t},e,r))});R.Item=je;R.SubMenu=Oe;R.Divider=Be;R.ItemGroup=_e;const gt=e=>{const{paddingXXS:o,lineWidth:t,tagPaddingHorizontal:r,componentCls:n,calc:l}=e,i=l(r).sub(t).equal(),s=l(o).sub(t).equal();return{[n]:Object.assign(Object.assign({},Ce(e)),{display:"inline-block",height:"auto",marginInlineEnd:e.marginXS,paddingInline:i,fontSize:e.tagFontSize,lineHeight:e.tagLineHeight,whiteSpace:"nowrap",background:e.defaultBg,border:`${h(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,borderRadius:e.borderRadiusSM,opacity:1,transition:`all ${e.motionDurationMid}`,textAlign:"start",position:"relative",[`&${n}-rtl`]:{direction:"rtl"},"&, a, a:hover":{color:e.defaultColor},[`${n}-close-icon`]:{marginInlineStart:s,fontSize:e.tagIconSize,color:e.colorTextDescription,cursor:"pointer",transition:`all ${e.motionDurationMid}`,"&:hover":{color:e.colorTextHeading}},[`&${n}-has-color`]:{borderColor:"transparent",[`&, a, a:hover, ${e.iconCls}-close, ${e.iconCls}-close:hover`]:{color:e.colorTextLightSolid}},"&-checkable":{backgroundColor:"transparent",borderColor:"transparent",cursor:"pointer",[`&:not(${n}-checkable-checked):hover`]:{color:e.colorPrimary,backgroundColor:e.colorFillSecondary},"&:active, &-checked":{color:e.colorTextLightSolid},"&-checked":{backgroundColor:e.colorPrimary,"&:hover":{backgroundColor:e.colorPrimaryHover}},"&:active":{backgroundColor:e.colorPrimaryActive}},"&-hidden":{display:"none"},[`> ${e.iconCls} + span, > span + ${e.iconCls}`]:{marginInlineStart:i}}),[`${n}-borderless`]:{borderColor:"transparent",background:e.tagBorderlessBg}}},ie=e=>{const{lineWidth:o,fontSizeIcon:t,calc:r}=e,n=e.fontSizeSM;return ee(e,{tagFontSize:n,tagLineHeight:h(r(e.lineHeightSM).mul(n).equal()),tagIconSize:r(t).sub(r(o).mul(2)).equal(),tagPaddingHorizontal:8,tagBorderlessBg:e.defaultBg})},le=e=>({defaultBg:new te(e.colorFillQuaternary).onBackground(e.colorBgContainer).toHexString(),defaultColor:e.colorText}),Te=he("Tag",e=>{const o=ie(e);return gt(o)},le);var pt=function(e,o){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&o.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(e);n<r.length;n++)o.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(e,r[n])&&(t[r[n]]=e[r[n]]);return t};const bt=c.forwardRef((e,o)=>{const{prefixCls:t,style:r,className:n,checked:l,onChange:i,onClick:s}=e,a=pt(e,["prefixCls","style","className","checked","onChange","onClick"]),{getPrefixCls:m,tag:p}=c.useContext(G),g=C=>{i==null||i(!l),s==null||s(C)},d=m("tag",t),[$,f,b]=Te(d),I=H(d,`${d}-checkable`,{[`${d}-checkable-checked`]:l},p==null?void 0:p.className,n,f,b);return $(c.createElement("span",Object.assign({},a,{ref:o,style:Object.assign(Object.assign({},r),p==null?void 0:p.style),className:I,onClick:g})))}),ft=e=>Ye(e,(o,t)=>{let{textColor:r,lightBorderColor:n,lightColor:l,darkColor:i}=t;return{[`${e.componentCls}${e.componentCls}-${o}`]:{color:r,background:l,borderColor:n,"&-inverse":{color:e.colorTextLightSolid,background:i,borderColor:i},[`&${e.componentCls}-borderless`]:{borderColor:"transparent"}}}}),$t=Ie(["Tag","preset"],e=>{const o=ie(e);return ft(o)},le);function ht(e){return typeof e!="string"?e:e.charAt(0).toUpperCase()+e.slice(1)}const q=(e,o,t)=>{const r=ht(t);return{[`${e.componentCls}${e.componentCls}-${o}`]:{color:e[`color${t}`],background:e[`color${r}Bg`],borderColor:e[`color${r}Border`],[`&${e.componentCls}-borderless`]:{borderColor:"transparent"}}}},Ct=Ie(["Tag","status"],e=>{const o=ie(e);return[q(o,"success","Success"),q(o,"processing","Info"),q(o,"error","Error"),q(o,"warning","Warning")]},le);var It=function(e,o){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&o.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(e);n<r.length;n++)o.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(e,r[n])&&(t[r[n]]=e[r[n]]);return t};const St=c.forwardRef((e,o)=>{const{prefixCls:t,className:r,rootClassName:n,style:l,children:i,icon:s,color:a,onClose:m,bordered:p=!0,visible:g}=e,d=It(e,["prefixCls","className","rootClassName","style","children","icon","color","onClose","bordered","visible"]),{getPrefixCls:$,direction:f,tag:b}=c.useContext(G),[I,C]=c.useState(!0),j=Y(d,["closeIcon","closable"]);c.useEffect(()=>{g!==void 0&&C(g)},[g]);const x=Ue(a),B=Ke(a),O=x||B,z=Object.assign(Object.assign({backgroundColor:a&&!O?a:void 0},b==null?void 0:b.style),l),v=$("tag",t),[k,S,M]=Te(v),N=H(v,b==null?void 0:b.className,{[`${v}-${a}`]:O,[`${v}-has-color`]:a&&!O,[`${v}-hidden`]:!I,[`${v}-rtl`]:f==="rtl",[`${v}-borderless`]:!p},r,n,S,M),T=L=>{L.stopPropagation(),m==null||m(L),!L.defaultPrevented&&C(!1)},[,D]=tt(de(e),de(b),{closable:!1,closeIconRender:L=>{const K=c.createElement("span",{className:`${v}-close-icon`,onClick:T},L);return Ne(L,K,P=>({onClick:X=>{var E;(E=P==null?void 0:P.onClick)===null||E===void 0||E.call(P,X),T(X)},className:H(P==null?void 0:P.className,`${v}-close-icon`)}))}}),y=typeof d.onClick=="function"||i&&i.type==="a",A=s||null,F=A?c.createElement(c.Fragment,null,A,i&&c.createElement("span",null,i)):i,W=c.createElement("span",Object.assign({},j,{ref:o,className:N,style:z}),F,D,x&&c.createElement($t,{key:"preset",prefixCls:v}),B&&c.createElement(Ct,{key:"status",prefixCls:v}));return k(y?c.createElement(ot,{component:"Tag"},W):W)}),ae=St;ae.CheckableTag=bt;const vt=({keySelected:e,items:o,itemsBottom:t})=>{var n,l,i,s;const{isMobile:r}=ne();return r||o.length===0?u.jsx(u.Fragment,{}):u.jsxs(w,{vertical:!0,justify:"space-between",className:"py-4",style:{width:"250px",backgroundColor:(l=(n=_.components)==null?void 0:n.Layout)==null?void 0:l.siderBg,borderRight:(s=(i=_.components)==null?void 0:i.Layout)==null?void 0:s.siderBorderRight},children:[u.jsx(R,{mode:"inline",inlineIndent:16,items:o,selectedKeys:[e],style:{width:"100%"}}),u.jsx(R,{mode:"inline",inlineIndent:16,items:t,selectedKeys:[e],style:{width:"100%"}})]})},yt=({keySelected:e,items:o})=>{var i,s,a,m;const t=U(),{user:r,checkRole:n}=oe(),{isMobile:l}=ne();return l?u.jsx(u.Fragment,{children:u.jsxs(w,{align:"center",justify:"space-between",className:"px-2",style:{position:"relative",backgroundColor:(s=(i=_.components)==null?void 0:i.Layout)==null?void 0:s.headerBg,borderBottom:(m=(a=_.components)==null?void 0:a.Layout)==null?void 0:m.headerBorderBottom},children:[u.jsxs(w,{align:"center",children:[r&&u.jsx(w,{children:u.jsx(ye,{src:r.pictureUrl,alt:r.name,size:"small",onClick:()=>t("/profile"),style:{cursor:"pointer"},children:Se.stringToInitials(r.name)})}),u.jsx(w,{align:"center",justify:"center",style:{position:"absolute",left:0,right:0,top:0,bottom:0},children:u.jsx(ve,{height:40})})]}),u.jsxs(w,{align:"center",children:[n("ADMIN")&&u.jsx(ae,{color:"red",bordered:!1,children:"Admin"}),u.jsx(R,{mode:"horizontal",items:o,selectedKeys:[e],style:{width:46},overflowedIndicator:u.jsx(xe,{})})]})]})}):u.jsx(u.Fragment,{})},xt=({keySelected:e,items:o})=>{var i,s,a,m;const t=U(),{user:r,checkRole:n}=oe(),{isMobile:l}=ne();return l?u.jsx(u.Fragment,{}):u.jsx(u.Fragment,{children:u.jsxs(w,{align:"center",className:"px-4 py-2",style:{backgroundColor:(s=(i=_.components)==null?void 0:i.Layout)==null?void 0:s.headerBg,borderBottom:(m=(a=_.components)==null?void 0:a.Layout)==null?void 0:m.headerBorderBottom},children:[u.jsx(w,{children:u.jsx(ve,{height:40})}),u.jsx(w,{vertical:!0,flex:1,style:{overflowX:"hidden"},children:u.jsx(R,{mode:"horizontal",items:o,selectedKeys:[e],overflowedIndicator:u.jsx(xe,{}),style:{flex:1}})}),u.jsxs(w,{align:"center",gap:"middle",children:[n("ADMIN")&&u.jsx(ae,{color:"red",bordered:!1,children:"Admin"}),r&&u.jsx(ye,{src:r.pictureUrl,alt:r.name,size:"default",onClick:()=>t("/profile"),style:{cursor:"pointer"},children:Se.stringToInitials(r.name)})]})]})})},Bt=({children:e})=>{const o=U(),t=Je().pathname,r=Qe(),n=d=>{o(d)},i=[{key:"/home",label:"Home Page",position:"topbar",onClick:()=>n("/home")},{key:"/about",label:"About Us",position:"topbar",onClick:()=>n("/about")},{key:"/products",label:"Products",position:"topbar",onClick:()=>n("/products")},{key:"/services",label:"Services",position:"topbar",onClick:()=>n("/services")},{key:"/contact",label:"Contact Us",position:"topbar",onClick:()=>n("/contact")}].filter(d=>d.isVisible!==!1).map(d=>({key:d.key,label:d.label,icon:d.icon,position:d.position,onClick:d.onClick})),s=i.filter(d=>d.position==="topbar"),a=i.filter(d=>d.position==="leftbar"),m=i.filter(d=>d.position==="leftbar-bottom"),p=i;let g=t;return Object.entries(r).forEach(([d,$])=>{g=g.replace(`/${$}`,`/:${d}`)}),u.jsxs(u.Fragment,{children:[u.jsx(xt,{keySelected:g,items:s}),u.jsx(yt,{keySelected:g,items:p}),u.jsxs(w,{flex:1,style:{overflowY:"hidden"},children:[u.jsx(vt,{keySelected:g,items:a,itemsBottom:m}),u.jsx(w,{flex:1,vertical:!0,style:{overflowY:"hidden"},children:e})]})]})};function Yt(){const{isLoggedIn:e,isLoading:o}=oe(),t=U();if(c.useEffect(()=>{!o&&!e&&t("/login")},[o,e]),o)return u.jsx(we,{});if(e)return u.jsx(Bt,{children:u.jsx(et,{})})}export{Yt as default};
