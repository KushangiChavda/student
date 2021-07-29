(this["webpackJsonpreadyforwork-admin"]=this["webpackJsonpreadyforwork-admin"]||[]).push([[0],{168:function(e,t,c){"use strict";c.r(t);var a=c(1),n=c.n(a),s=c(17),r=c.n(s),o=c(10),i=c(23),l=c(9),d=c(14),j=c(3),b=c(6),m=c(106),u=c.n(m),h="authtoken-client-dev",O=function(e){return Promise.resolve().then((function(){localStorage.setItem(h,JSON.stringify(e))}))},p=function(){return!!localStorage.getItem(h)},x=function(){var e=localStorage.getItem(h);return e?JSON.parse(e):{}},f=c(107),g={className:"text-danger"},v=c.n(f).a,N=function(){return new URLSearchParams(Object(i.h)().search)},w=c(56),y=c.n(w),k=c(70);var S=u.a.create({baseURL:"http://18.116.140.121:8080/auth/v1",headers:{"Content-Type":"application/json"}});S.interceptors.request.use((function(e){var t=x().authtoken;return e.headers.authtoken=t||null,e.headers["auth-service"]=Date.now(),e}));var C=S,B=c(21),R=c(0),M=["label"],P=function(e){var t=e.label,c=Object(B.a)(e,M),n=Object(a.useState)(!1),s=Object(b.a)(n,2),r=s[0],o=s[1];return Object(R.jsxs)(R.Fragment,{children:[Object(R.jsx)("label",{htmlFor:"password",className:"form-label",children:t||"Password"}),Object(R.jsxs)("div",{className:"input-group auth-pass-inputgroup",children:[Object(R.jsx)("input",Object(j.a)(Object(j.a)({},c),{},{type:"".concat(r?"text":"password"),className:"form-control","aria-label":"Password","aria-describedby":"password-addon"})),Object(R.jsx)("button",{className:"btn btn-light",style:{border:"1px solid #ced4da",boxShadow:"none"},type:"button",id:"password-addon",onClick:function(){o((function(e){return!e}))},children:Object(R.jsx)("i",{className:"mdi ".concat(r?"mdi-eye-off-outline":"mdi-eye-outline")})})]})]})},F="SUCCESS_SNACKBAR",A="ERROR_SNACKBAR",E="WARNING_SNACKBAR",I="CLEAR_SNACKBAR",q="CONFIRMATION_SNACKBAR";function T(e){return{type:F,payload:e}}function z(e){return{type:A,payload:e}}function L(e){return{type:I,payload:e}}var D="LOGIN",_="LOGOUT",W="SET_COUNT";function G(e){return{type:D,payload:e}}var V={email:"",password:""},U=function(e){var t=Object(a.useRef)(new v(g)),c=Object(a.useState)(1),n=Object(b.a)(c,2),s=n[0],r=n[1],i=Object(a.useState)(V),m=Object(b.a)(i,2),u=m[0],h=m[1],p=function(e){var t=e.target,c=t.id,a=t.value;h((function(e){return Object(j.a)(Object(j.a)({},e),{},Object(d.a)({},c,a))}))},x=Object(o.b)(),f=function(){e.history.push("/")};return t.current.purgeFields(),Object(R.jsx)("div",{className:"account-pages my-5 pt-sm-5",children:Object(R.jsx)("div",{className:"container",children:Object(R.jsx)("div",{className:"row justify-content-center",children:Object(R.jsxs)("div",{className:"col-md-8 col-lg-6 col-xl-5",children:[Object(R.jsx)("div",{className:"card overflow-hidden",children:Object(R.jsxs)("div",{className:"card-body pt-0",children:[Object(R.jsx)("div",{className:"auth-logo text-center",children:Object(R.jsx)("img",{src:"".concat("/learner","/assets/images/readyforwork-logo.png"),alt:"Logo",style:{width:"10rem"}})}),Object(R.jsx)("div",{className:"p-2",children:Object(R.jsxs)("form",{className:"form-horizontal",action:"index.html",onSubmit:function(e){if(e.preventDefault(),!t.current.allValid())return t.current.showMessages(),r(s+1);var c={email:u.email,password:u.password};C.post("/login",c).then((function(e){var t={authtoken:e.data.authtoken,role:e.data.role};return"admin"===e.data.role?O(t).then((function(){return window.location.href="/admin"})):(x(G({email:e.data.email,role:e.data.role})),O(t).then((function(){f()})),x(T(e.data.message)))})).catch((function(e){var t,c;if(console.log("Warning in login",e),null===e||void 0===e||null===(t=e.response)||void 0===t||null===(c=t.data)||void 0===c?void 0:c.message)return x(z(e.response.data.message))}))},children:[Object(R.jsxs)("div",{className:"mb-3",children:[Object(R.jsx)("label",{htmlFor:"email",className:"form-label",children:"Email"}),Object(R.jsx)("input",{type:"email",className:"form-control",id:"email",placeholder:"Enter email",onBlur:function(){t.current.showMessageFor("email"),r(s+1)},value:u.email,onChange:p}),t.current.message("email",u.email,"required|email")]}),Object(R.jsxs)("div",{className:"mb-3",children:[Object(R.jsx)(P,{label:"Password",id:"password",placeholder:"Enter password",onBlur:function(){t.current.showMessageFor("password"),r(s+1)},value:u.password,onChange:p}),t.current.message("password",u.password,"required|min:4")]}),Object(R.jsxs)("div",{className:"form-check",children:[Object(R.jsx)("input",{className:"form-check-input",type:"checkbox",id:"remember-check"}),Object(R.jsx)("label",{className:"form-check-label",htmlFor:"remember-check",children:"Remember me"})]}),Object(R.jsx)("div",{className:"mt-3 d-grid",children:Object(R.jsx)("button",{className:"btn  waves-effect waves-light",style:{backgroundColor:"#81BFA2"},type:"submit",children:"Log In"})}),Object(R.jsx)("div",{className:"mt-4 text-center",children:Object(R.jsxs)(l.b,{to:"/forgotPassword",className:"text-muted",children:[Object(R.jsx)("i",{className:"mdi mdi-lock me-1"})," Forgot your password?"]})})]})})]})}),Object(R.jsx)("div",{className:"mt-5 text-center",children:Object(R.jsx)("div",{children:Object(R.jsx)("p",{children:"\xa9 2019-2021 Readyforwork | All Rights Reserved"})})})]})})})})},H={email:"",password:"",confirmPassword:""},J=function(e){var t=Object(a.useRef)(new v(g)),c=Object(a.useState)(1),n=Object(b.a)(c,2),s=n[0],r=n[1],i=Object(a.useState)(H),m=Object(b.a)(i,2),u=m[0],h=m[1],O=Object(o.b)();return t.current.purgeFields(),Object(R.jsx)("div",{className:"account-pages my-5 pt-sm-5",children:Object(R.jsx)("div",{className:"container",children:Object(R.jsx)("div",{className:"row justify-content-center",children:Object(R.jsxs)("div",{className:"col-md-8 col-lg-6 col-xl-5",children:[Object(R.jsx)("div",{className:"card overflow-hidden",children:Object(R.jsxs)("div",{className:"card-body pt-0",children:[Object(R.jsx)("div",{children:Object(R.jsx)("div",{className:"text-center ",children:Object(R.jsx)("span",{children:Object(R.jsx)("img",{src:"assets/images/readyforwork-logo.png",alt:"Logo",style:{width:"10rem"}})})})}),Object(R.jsxs)("div",{className:"p-2",children:[Object(R.jsx)("div",{className:"alert alert-success text-center mb-4",role:"alert",children:"Enter your Email and instructions will be sent to you!"}),Object(R.jsxs)("form",{className:"form-horizontal",action:"index.html",onSubmit:function(c){if(c.preventDefault(),!t.current.allValid())return t.current.showMessages(),r(s+1);var a={email:u.email,clientURL:"http://18.116.140.121/learner/passwordReset"};C.post("/forgotPassword",a).then((function(t){O(T(t.data.message)),e.history.push("/login")})).catch((function(e){O(z(e.response.data.message)),console.log(e)}))},children:[Object(R.jsxs)("div",{className:"mb-3",children:[Object(R.jsx)("label",{htmlFor:"email",className:"form-label",children:"Email"}),Object(R.jsx)("input",{type:"email",className:"form-control",id:"email",placeholder:"Enter email",onBlur:function(){t.current.showMessageFor("email"),r(s+1)},value:u.email,onChange:function(e){var t=e.target,c=t.id,a=t.value;h((function(e){return Object(j.a)(Object(j.a)({},e),{},Object(d.a)({},c,a))}))}}),t.current.message("email",u.email,"required|email")]}),Object(R.jsx)("div",{className:"text-center",children:Object(R.jsx)("button",{className:"btn w-md waves-effect waves-light m-1",style:{backgroundColor:"#81BFA2"},type:"submit",children:"Submit"})}),Object(R.jsxs)("div",{className:"mt-4 text-center",children:["Remember It ?"," ",Object(R.jsx)(l.b,{to:"/login",className:"fw-medium text-muted",children:"Sign In here"})]})]})]})]})}),Object(R.jsx)("div",{className:"mt-5 text-center",children:Object(R.jsx)("p",{children:"\xa9 2019-2021 Readyforwork | All Rights Reserved"})})]})})})})},K=c(208),X=c(210),Y=c(205),Q=Object(Y.a)((function(e){return{backdrop:{zIndex:e.zIndex.drawer+1,backgroundColor:"#000000c4",color:"#fff"}}})),Z=function(e){var t=e.open,c=void 0===t||t,a=Q();return Object(R.jsx)(K.a,{className:a.backdrop,open:c,children:Object(R.jsx)(X.a,{color:"inherit"})})},$=function(){return Object(R.jsx)("div",{className:"account-pages my-5 pt-5",children:Object(R.jsxs)("div",{className:"container",children:[Object(R.jsx)("div",{className:"row",children:Object(R.jsx)("div",{className:"col-lg-12",children:Object(R.jsxs)("div",{className:"text-center mb-5",children:[Object(R.jsxs)("h1",{className:"display-2 fw-medium",children:["4",Object(R.jsx)("i",{className:"bx bx-buoy bx-spin text-primary display-3"}),"4"]}),Object(R.jsx)("h4",{className:"text-uppercase",children:"Sorry, page not found"}),Object(R.jsx)("div",{className:"mt-5 text-center",children:Object(R.jsx)(l.b,{className:"btn btn-primary waves-effect waves-light",to:"/",children:"Back to Home"})})]})})}),Object(R.jsx)("div",{className:"row justify-content-center",children:Object(R.jsx)("div",{className:"col-md-8 col-xl-6",children:Object(R.jsx)("div",{children:Object(R.jsx)("img",{src:"".concat("/learner","/assets/images/error-img.png"),alt:"fluid",className:"img-fluid"})})})})]})})},ee={password:"",confirmPassword:""},te=function(e){var t=N(),c=Object(a.useRef)(new v(g)),n=Object(a.useState)(1),s=Object(b.a)(n,2),r=s[0],i=s[1],m=Object(a.useState)(ee),u=Object(b.a)(m,2),h=u[0],O=u[1],p=Object(a.useState)(!0),x=Object(b.a)(p,2),f=x[0],w=x[1],y=Object(a.useState)(!1),k=Object(b.a)(y,2),S=k[0],B=k[1];Object(a.useEffect)((function(){C.get("/verifyToken/".concat(t.get("id"))).then((function(e){B(200===e.status),w(!1)})).catch((function(e){B(!1),w(!1)}))}),[t]);var M=function(e){var t=e.target,c=t.id,a=t.value;O((function(e){return Object(j.a)(Object(j.a)({},e),{},Object(d.a)({},c,a))}))},F=Object(o.b)();return f?Object(R.jsx)(Z,{}):f||!1!==S?(c.current.purgeFields(),Object(R.jsx)("div",{className:"account-pages my-5 pt-sm-5",children:Object(R.jsx)("div",{className:"container",children:Object(R.jsx)("div",{className:"row justify-content-center",children:Object(R.jsxs)("div",{className:"col-md-8 col-lg-6 col-xl-5",children:[Object(R.jsx)("div",{className:"card overflow-hidden",children:Object(R.jsxs)("div",{className:"card-body pt-0",children:[Object(R.jsx)("div",{children:Object(R.jsx)("div",{className:"text-center",children:Object(R.jsx)("span",{children:Object(R.jsx)("img",{src:"assets/images/readyforwork-logo.png",alt:"Logo",style:{width:"10rem"}})})})}),Object(R.jsxs)("div",{className:"p-2",children:[Object(R.jsx)("div",{className:"alert alert-success text-center mb-4",role:"alert",children:"Insert your new password."}),Object(R.jsxs)("form",{className:"form-horizontal",action:"index.html",onSubmit:function(a){if(a.preventDefault(),!c.current.allValid())return c.current.showMessages(),i(r+1);var n={userId:t.get("id"),token:t.get("token"),password:h.password};C.post("/resetPassword",n).then((function(t){F(T(t.data.message)),e.history.push("/")})).catch((function(e){F(z(e.response.data.message)),console.log(e)}))},children:[Object(R.jsxs)("div",{className:"mb-3",children:[Object(R.jsx)(P,{label:"New Password",className:"form-control",id:"password",placeholder:"Enter New password",onBlur:function(){c.current.showMessageFor("password"),i(r+1)},value:h.email,onChange:M}),c.current.message("password",h.password,"required|min:4")]}),Object(R.jsxs)("div",{className:"mb-3",children:[Object(R.jsx)(P,{label:"Confirm New Password",className:"form-control",id:"confirmPassword",placeholder:"Confirm New password",onBlur:function(){c.current.showMessageFor("confirmPassword"),i(r+1)},value:h.email,onChange:M}),c.current.message("confirmPassword",h.confirmPassword,"required|min:4|in:".concat(h.password),{messages:{in:"Passwords need to match!"}})]}),Object(R.jsx)("div",{className:"text-end",children:Object(R.jsx)("button",{className:"btn  w-md waves-effect waves-light",style:{backgroundColor:"#81BFA2"},type:"submit",children:"Reset"})})]})]})]})}),Object(R.jsxs)("div",{className:"mt-5 text-center",children:[Object(R.jsxs)("p",{children:["Remember It ?"," ",Object(R.jsxs)(l.b,{to:"/login",className:"fw-medium text-muted",children:[" ","Sign In here"]})," "]}),Object(R.jsxs)("p",{children:["\xa9 2021 Ready for work."," ",Object(R.jsx)("i",{className:"mdi mdi-heart text-danger"})]})]})]})})})})):Object(R.jsx)($,{})},ce=c(42);var ae=["component","restricted","NotFoundPage","redirect"],ne=function(e){var t=e.component,c=e.restricted,a=void 0===c?p:c,n=e.NotFoundPage,s=void 0===n?null:n,r=e.redirect,o=void 0===r?"/login":r,l=Object(B.a)(e,ae);return a()?Object(R.jsx)(i.b,Object(j.a)(Object(j.a)({},l),{},{component:t})):s?Object(R.jsx)(s,{}):Object(R.jsx)(i.a,{to:o})},se=["component","restricted","NotFoundPage","redirect"],re=function(e){var t=e.component,c=e.restricted,a=void 0===c?function(){return!1}:c,n=(e.NotFoundPage,e.redirect),s=void 0===n?"/login":n,r=Object(B.a)(e,se);return a()?Object(R.jsx)(i.a,{to:s}):Object(R.jsx)(i.b,Object(j.a)(Object(j.a)({},r),{},{component:t}))},oe=c(8),ie=c(115),le=c(214),de=c(229),je=function(e){var t=e.children,c=Object(i.h)().state,s=Object(i.g)(),r=Object(o.c)((function(e){return e.userProviderReducer})).user,d=Object(o.b)(),m=n.a.useState(null),u=Object(b.a)(m,2),O=u[0],p=u[1],x=n.a.useState(null),f=Object(b.a)(x,2),g=f[0],v=f[1];if(Object(a.useEffect)((function(){r||c||C.get("/profile").then((function(e){if(200===e.status)return d(G(e.data.user))})).catch((function(e){console.log(e)}))}),[]),"404"===c)return Object(R.jsx)($,{});var N=function(e){return document.body.classList.toggle("sidebar-enable"),!0},w=Object(oe.a)({paper:{border:"1px solid #d3d4d5",width:"230px"}})((function(e){return Object(R.jsx)(ie.a,Object(j.a)({elevation:0,getContentAnchorEl:null,anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"center"}},e))})),y=Object(oe.a)((function(e){return{root:{"&:focus":{backgroundColor:e.palette.primary.main,"& .MuiListItemIcon-root, & .MuiListItemText-primary":{color:e.palette.common.white}}}}}))(le.a);return Object(R.jsx)(R.Fragment,{children:Object(R.jsxs)("div",{id:"layout-wrapper",children:[Object(R.jsx)("header",{id:"page-topbar",children:Object(R.jsxs)("div",{className:"navbar-header",children:[Object(R.jsxs)("div",{className:"d-flex",children:[Object(R.jsxs)("div",{className:"navbar-brand-box",children:[Object(R.jsxs)(l.b,{to:"/",className:"logo logo-dark",children:[Object(R.jsx)("span",{className:"logo-sm",children:Object(R.jsx)("img",{src:"".concat("/learner","/assets/images/readyforwork-logo.png"),alt:"logo light",height:22,style:{transform:"translateX(-25%)"}})}),Object(R.jsx)("span",{className:"logo-lg",children:Object(R.jsx)("img",{src:"".concat("/learner","/assets/images/readyforwork-logo.png"),alt:"logo light",height:70})})]}),Object(R.jsxs)(l.b,{to:"/",className:"logo logo-light",children:[Object(R.jsx)("span",{className:"logo-sm",children:Object(R.jsx)("img",{src:"".concat("/learner","/assets/images/readyforwork-logo.png"),alt:"logo light",height:22,style:{transform:"translateX(-25%)"}})}),Object(R.jsx)("span",{className:"logo-lg",children:Object(R.jsx)("img",{src:"".concat("/learner","/assets/images/readyforwork-logo.png"),alt:"logo light",height:70})})]})]}),Object(R.jsx)("button",{onClick:N,type:"button",className:"btn btn-sm px-3 font-size-16 header-item waves-effect",id:"vertical-menu-btn",children:Object(R.jsx)("i",{className:"fa fa-fw fa-bars"})}),Object(R.jsx)("button",{onClick:function(){s.goBack()},type:"button",className:"btn btn-sm px-3 font-size-16 header-item waves-effect",id:"vertical-menu-btn",children:"Go Back"})]}),Object(R.jsxs)("div",{className:"d-flex",children:[Object(R.jsx)("div",{className:"dropdown d-inline-block d-lg-none ms-2",children:Object(R.jsx)("div",{className:"dropdown-menu dropdown-menu-lg dropdown-menu-end p-0","aria-labelledby":"page-header-search-dropdown",children:Object(R.jsx)("form",{className:"p-3",children:Object(R.jsx)("div",{className:"form-group m-0",children:Object(R.jsxs)("div",{className:"input-group",children:[Object(R.jsx)("input",{type:"text",className:"form-control",placeholder:"Search ...","aria-label":"Recipient's username"}),Object(R.jsx)("div",{className:"input-group-append",children:Object(R.jsx)("button",{className:"btn btn-primary",type:"submit",children:Object(R.jsx)("i",{className:"mdi mdi-magnify"})})})]})})})})}),Object(R.jsxs)("div",{className:"d-flex",children:[Object(R.jsx)("div",{style:{color:"black"},className:"d-flex",onClick:function(e){v(e.currentTarget)},children:Object(R.jsx)("button",{className:"btn header-item waves-effect",children:Object(R.jsx)("i",{className:"bx bxs-bell font-size-20"})})}),Object(R.jsxs)("div",{onClick:function(e){p(e.currentTarget)},children:[Object(R.jsxs)("span",{className:"d-xl-inline-block ms-1",style:{cursor:"pointer"},children:[r?"".concat(r.firstName):"Guest"," \xa0",r?"".concat(r.lastName):"Guest",Object(R.jsx)("i",{className:"mdi mdi-chevron-down d-none d-xl-inline-block"})]},"t-henry"),Object(R.jsx)("button",{type:"button",className:"btn header-item waves-effect",children:(null===r||void 0===r?void 0:r.profile)&&Object(R.jsx)(de.a,{src:"".concat("http://18.116.140.121:8080/public/").concat(null===r||void 0===r?void 0:r.profile)})})]})]}),Object(R.jsxs)(w,{id:"customized-menu",anchorEl:O,keepMounted:!0,open:Boolean(O),onClose:function(){p(null)},children:[Object(R.jsx)(l.b,{to:"/create-profile",children:Object(R.jsxs)(y,{children:[" ",Object(R.jsx)("i",{className:"bx bx-user font-size-18 align-middle me-3"}),"Create Profile"]})}),Object(R.jsxs)(y,{onClick:function(){var e;d({type:_,payload:e}),Promise.resolve().then((function(){localStorage.removeItem(h)})).then((function(){s.push("/login")}))},children:[" ",Object(R.jsx)("i",{className:"bx bx-power-off font-size-20 text-danger me-3"}),"Logout"]})]}),Object(R.jsx)(w,{id:"customized-menu",anchorEl:g,keepMounted:!0,open:Boolean(g),onClose:function(){v(null)},children:Object(R.jsx)(y,{children:"Announcements"})})]})]})}),Object(R.jsx)("div",{style:{overflowY:"auto"},className:"vertical-menu",children:Object(R.jsx)("div",{"data-simplebar":!0,className:"h-100",children:Object(R.jsx)("div",{id:"sidebar-menu",children:Object(R.jsx)(Ce,{onChange:N})})})}),Object(R.jsxs)("div",{className:"main-content",children:[Object(R.jsx)("div",{className:"page-content",children:t&&t}),Object(R.jsx)(be,{})]})]})})},be=function(){return Object(R.jsx)("footer",{className:"footer",children:Object(R.jsx)("div",{className:"container-fluid",children:Object(R.jsxs)("div",{className:"row",children:[Object(R.jsx)("div",{className:"col-sm-6",children:"\xa9 2019-2021 Readyforwork | All Rights Reserved"}),Object(R.jsx)("div",{className:"col-sm-6",children:Object(R.jsx)("div",{className:"text-sm-end d-none d-sm-block",children:"Terms & Conditions"})})]})})})},me=c(172),ue=c(215),he=c(216),Oe=c(217),pe=c(218),xe=c(213),fe=c(111),ge=c.n(fe),ve=c(112),Ne=c.n(ve),we=Object(Y.a)((function(e){return{root:{width:"100%"},icon:{display:"inline-block",minWidth:"1.75rem",paddingBottom:".125em",fontSize:"1.25rem",lineHeight:"1.40625rem",verticalAlign:"middle",color:"#7f8387",transition:"all .4s"},heading:{fontSize:e.typography.pxToRem(15),fontWeight:e.typography.fontWeightRegular}}})),ye=[{path:"/",icon:"bx bxs-edit",name:"Dashboard"},{path:"/join-community",icon:"bx bx-group",name:"Join Community"},{path:"/request-mentor",icon:"bx bxs-user-voice",name:"Request Mentor"},{path:"/announcements",icon:"bx bxs-megaphone",name:"Announcements"},{path:"/feedback",icon:"bx bx-message-alt-dots",name:"Feedback"},{path:"/classroom",icon:"bx bx-id-card",name:"Enter Classroom"},{name:"Workstation",icon:"bx bx-folder-plus",routes:[{path:"/my-projects",icon:"bx bx-spreadsheet",name:"My Projects"},{path:"/my-assessments",icon:"bx bx-clipboard",name:"My Assessments"}]}],ke=function(e){var t,c=e.icon,a=e.primary,s=e.to,r=(e.isNested,e.onChange),o=Object(i.h)().pathname,d=o.trim().length>1&&o.endsWith("/")?o.slice(0,-1):o,b=n.a.useMemo((function(){return n.a.forwardRef((function(e,t){return Object(R.jsx)(l.b,Object(j.a)({ref:t,to:s},e))}))}),[s]);return Object(R.jsxs)(me.a,{selected:(t=s,d===t),onClick:r,style:Object(j.a)(Object(j.a)({},{}),{},{color:"inherit !important"}),button:!0,component:b,children:[c&&Object(R.jsx)(ue.a,{style:{minWidth:"auto"},children:c}),Object(R.jsx)(he.a,{primary:a})]})},Se=function e(t){var c=t.routes,a=t.name,s=t.icon,r=t.onChange,o=we(),l=n.a.useState(!1),d=Object(b.a)(l,2),j=d[0],m=d[1],u=Object(i.h)().pathname,h=u.endsWith("/")?u.slice(0,-1):u;return n.a.useEffect((function(){return m(!!((e=c)&&e.length>0)&&e.some((function(e){var t=e.path;return h===t})));var e}),[c]),Object(R.jsxs)(R.Fragment,{children:[Object(R.jsxs)(me.a,{button:!0,onClick:function(){m((function(e){return!e}))},className:o.menuItem,children:[Object(R.jsx)(ue.a,{className:o.menuItemIcon,style:{minWidth:"auto"},children:s}),Object(R.jsx)(he.a,{primary:a}),j?Object(R.jsx)(ge.a,{}):Object(R.jsx)(Ne.a,{})]}),Object(R.jsxs)(Oe.a,{in:j,timeout:"auto",unmountOnExit:!0,children:[Object(R.jsx)(pe.a,{}),Object(R.jsx)(xe.a,{component:"div",disablePadding:!0,style:{paddingLeft:"30px"},children:c&&c.map((function(t,c){var a=t.path,n=t.icon,s=void 0===n?null:n,i=t.name,l=t.routes,d=void 0===l?null:l;return d&&d.length>0?Object(R.jsx)(e,{name:i,routes:d,icon:s?Object(R.jsx)("i",{className:"".concat(o.icon," ").concat(s)}):null,onChange:r},c):Object(R.jsx)(ke,{onChange:r,isNested:!0,to:a,primary:i,icon:s?Object(R.jsx)("i",{className:"".concat(o.icon," ").concat(s)}):null},c)}))})]})]})},Ce=function(e){var t=e.onChange,c=we(),a=n.a.useState([].concat(ye)),s=Object(b.a)(a,2),r=s[0],o=s[1];return n.a.useEffect((function(){C.get("/cms/namespaces").then((function(e){var t,c=e.data,a=void 0===c?null:c,n=ye.find((function(e){return"CMS"===e.name})),s=Object(ce.a)(n.routes);return null===a||void 0===a||null===(t=a.cms)||void 0===t||t.forEach((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return""!==e.trim()&&(null===s||void 0===s?void 0:s.push({path:"/cms/".concat(e),name:e}))})),o([].concat(Object(ce.a)(ye.filter((function(e){return"CMS"!==e.name}))),[Object(j.a)(Object(j.a)({},n),{},{routes:s})]))})).catch((function(e){console.log("err",e)}))}),[]),Object(R.jsx)("div",{className:c.root,children:r&&r.map((function(e,a){var n=e.path,s=e.icon,r=void 0===s?null:s,o=e.name,i=e.routes,l=void 0===i?null:i;return!l||l.length<0?Object(R.jsx)(ke,{to:n,primary:o,icon:Object(R.jsx)("i",{className:"".concat(c.icon," ").concat(r)}),onChange:t},a):Object(R.jsx)(Se,{name:o,routes:l,icon:r?Object(R.jsx)("i",{className:"".concat(c.icon," ").concat(r)}):null,onChange:t},a)}))})},Be=(c(225),c(174),Object(Y.a)((function(e){return{modal:{display:"flex",alignItems:"center",justifyContent:"center"},img:{},paper:{backgroundColor:e.palette.background.paper,border:"2px solid #000",boxShadow:e.shadows[5],padding:e.spacing(2,4,3)}}})),["content","contents","contenttitle"]),Re=function(e){var t=e.content,c=e.contents,a=e.contenttitle,n=(Object(B.a)(e,Be),Object(i.h)().pathname.split("/")[1]);return Object(R.jsx)("div",{className:"row",children:Object(R.jsx)("div",{className:"col-12",children:Object(R.jsxs)("div",{className:"page-title-box d-sm-flex align-items-center justify-content-between",children:[Object(R.jsx)("h4",{className:"mb-sm-0 font-size-18",children:a}),Object(R.jsx)("div",{className:"page-title-right",children:Object(R.jsxs)("ol",{className:"breadcrumb m-0",children:[Object(R.jsx)("li",{className:"breadcrumb-item",children:Object(R.jsx)(l.b,{to:"/".concat(n),children:t.toString().toLowerCase()})}),Object(R.jsx)("li",{className:"breadcrumb-item active",children:c.toString().toLowerCase()})]})})]})})})},Me=c(224),Pe=c(223),Fe=Object(Y.a)((function(e){return{inputRoot:{"&.Mui-focused .MuiOutlinedInput-notchedOutline":{borderColor:"grey"}}}})),Ae={qualifications:[{no:"",school:"",passingYear:"",grade:""}],projects:[{no:"",projectTitle:"",description:"",technologies:""}]},Ee=function(e){var t,c,n=e.history,s=e.location.pathname,r=Object(a.useRef)(new v(g)),i=Object(a.useState)(1),m=Object(b.a)(i,2),u=m[0],h=m[1],O=Object(a.useState)(Ae),p=Object(b.a)(O,2),x=p[0],f=p[1],N=Fe(),w=Object(o.b)(),y=function(e){var t=e.target,c=t.id,a=t.value,n={"user-status":"status","user-password":"password","user-email":"email"},s=n[c]?n[c]:c;f((function(e){return Object(j.a)(Object(j.a)({},e),{},Object(d.a)({},s,a))}))},k=function(e,t,c){var a=e.target,n=a.name,s=a.value,r=Object(j.a)({},x);r[c][t][n]=s,f(r)};return Object(a.useEffect)((function(){C.get("/profile").then((function(e){return f(Object(j.a)(Object(j.a)({},Ae),e.data.user))})).catch((function(e){if(404===e.response.status)return n.push({pathname:s,state:"404"});console.log(e),w(z(e.response.data.message))}))}),[]),Object(R.jsxs)("div",{className:"container-fluid",children:[Object(R.jsx)(Re,{contenttitle:"Create Profile",content:"Users",contents:"profile"}),Object(R.jsx)("div",{className:"row",children:Object(R.jsx)("div",{className:"col-md-8",children:Object(R.jsx)("div",{className:"card",children:Object(R.jsxs)("div",{className:"card-body",children:[!x&&Object(R.jsx)("h4",{className:"card-title mb-4",children:"Loading..."}),x&&Object(R.jsxs)("form",{onSubmit:function(e){if(e.preventDefault(),!r.current.allValid())return r.current.showMessages(),h(u+1);var t={_id:x._id,firstName:x.firstName,lastName:x.lastName,email:x.email,status:x.status,role:x.role,projects:x.projects,qualifications:x.qualifications};""!==x.password&&(t.password=x.password),C.put("/profile",t).then((function(e){w(T(e.data.message))})).catch((function(e){console.log(e),w(z(e.response.data.message))}))},children:[Object(R.jsxs)("div",{className:"row",children:[Object(R.jsx)("div",{className:"col-md-4",children:Object(R.jsxs)("div",{className:"mb-3",children:[Object(R.jsx)("label",{htmlFor:"firstName",className:"form-label",children:"First name"}),Object(R.jsx)("input",{type:"text",className:"form-control",id:"firstName",defaultValue:x.firstName,onChange:y,onBlur:function(){r.current.showMessageFor("firstName"),h(u+1)}}),r.current.message("firstName",x.firstName,"required|min:4")]})}),Object(R.jsx)("div",{className:"col-md-4",children:Object(R.jsxs)("div",{className:"mb-3",children:[Object(R.jsx)("label",{htmlFor:"lastName",className:"form-label",children:"Last Name"}),Object(R.jsx)("input",{type:"text",className:"form-control",id:"lastName",defaultValue:x.lastName,onChange:y,onBlur:function(){r.current.showMessageFor("lastName"),h(u+1)}}),r.current.message("lastName",x.lastName,"required|min:4")]})}),Object(R.jsx)("div",{className:"col-md-4",children:Object(R.jsxs)("div",{className:"mb-3",children:[Object(R.jsx)("label",{htmlFor:"user-email",className:"form-label",children:"Middle Name"}),Object(R.jsx)("input",{type:"text",className:"form-control"})]})})]}),Object(R.jsxs)("div",{className:"mb-3",children:[Object(R.jsx)("label",{htmlFor:"user-email",className:"form-label",children:"Email"}),Object(R.jsx)("input",{disabled:!0,type:"email",className:"form-control",id:"user-email",defaultValue:x.email,onChange:y,onBlur:function(){r.current.showMessageFor("email"),h(u+1)}}),r.current.message("email",x.email,"required|email")]}),Object(R.jsxs)("div",{className:"mb-3",children:[Object(R.jsx)("label",{className:"form-label",children:"Gender"}),Object(R.jsx)("input",{type:"text",className:"form-control"})]}),Object(R.jsxs)("div",{className:"mb-3",children:[Object(R.jsx)("label",{className:"form-label",children:"Qualification: "}),Object(R.jsx)("i",{className:"bx bx-add-to-queue font-size-20 float-end",onClick:function(){f(Object(j.a)(Object(j.a)({},x),{},{qualifications:[].concat(Object(ce.a)(x.qualifications),[{no:"",projectTitle:"",description:"",technologies:""}])}))}}),(null===x||void 0===x?void 0:x.qualifications)&&(null===x||void 0===x||null===(t=x.qualifications)||void 0===t?void 0:t.map((function(e,t){return Object(R.jsx)("div",{children:Object(R.jsxs)("div",{className:"row",children:[Object(R.jsxs)("div",{className:"col-md-2",children:[Object(R.jsx)("label",{className:"form-label",children:"Sr No. "}),Object(R.jsx)("input",{type:"number",name:"no",className:"form-control",value:null===e||void 0===e?void 0:e.no,onChange:function(e){return k(e,t,"qualifications")}})]}),Object(R.jsxs)("div",{className:"col-md-3",children:[Object(R.jsx)("label",{className:"form-label",children:"School / Degree"}),Object(R.jsx)("input",{type:"text",className:"form-control",name:"school",value:null===e||void 0===e?void 0:e.school,onChange:function(e){return k(e,t,"qualifications")}})]}),Object(R.jsxs)("div",{className:"col-md-3",children:[Object(R.jsx)("label",{className:"form-label",children:"Passing year"}),Object(R.jsx)("input",{type:"text",name:"passingYear",className:"form-control",value:null===e||void 0===e?void 0:e.passingYear,onChange:function(e){return k(e,t,"qualifications")}})]}),Object(R.jsxs)("div",{className:"col-md-4",children:[Object(R.jsx)("label",{className:"form-label",children:"Grade / percentage"}),Object(R.jsx)("input",{type:"text",name:"grade",className:"form-control",value:e.grade,onChange:function(e){return k(e,t,"qualifications")}})]})]})},t)})))]}),Object(R.jsxs)("div",{className:"mb-3",children:[Object(R.jsx)("label",{className:"form-label",children:"Skills"}),Object(R.jsx)(Me.a,{multiple:!0,size:"small",classes:N,options:[{title:"The Shawshank Redemption",year:1994},{title:"The Godfather",year:1972},{title:"The Godfather: Part II",year:1974}],getOptionLabel:function(e){return e.title},renderInput:function(e){return Object(R.jsx)(Pe.a,Object(j.a)(Object(j.a)({},e),{},{variant:"outlined",placeholder:"Skills",fullWidth:!0}))}})]}),Object(R.jsxs)("div",{className:"mb-3",children:[Object(R.jsx)("label",{className:"form-label",children:"My projects: "}),Object(R.jsx)("i",{className:"bx bx-add-to-queue font-size-20 float-end",onClick:function(){f(Object(j.a)(Object(j.a)({},x),{},{projects:[].concat(Object(ce.a)(x.projects),[{no:"",projectTitle:"",description:"",technologies:""}])}))}}),null===x||void 0===x||null===(c=x.projects)||void 0===c?void 0:c.map((function(e,t){return Object(R.jsx)("div",{children:Object(R.jsxs)("div",{className:"row",children:[Object(R.jsxs)("div",{className:"col-md-2",children:[Object(R.jsx)("label",{className:"form-label",children:"Sr No. "}),Object(R.jsx)("input",{type:"number",className:"form-control",name:"no",value:e.no,onChange:function(e){return k(e,t,"projects")}})]}),Object(R.jsxs)("div",{className:"col-md-3",children:[Object(R.jsx)("label",{className:"form-label",children:"Project Title"}),Object(R.jsx)("input",{type:"text",name:"projectTitle",className:"form-control",value:null===e||void 0===e?void 0:e.projectTitle,onChange:function(e){return k(e,t,"projects")}})]}),Object(R.jsxs)("div",{className:"col-md-4",children:[Object(R.jsx)("label",{className:"form-label",children:"Description"}),Object(R.jsx)("input",{type:"text",name:"description",className:"form-control",value:null===e||void 0===e?void 0:e.description,onChange:function(e){return k(e,t,"projects")}})]}),Object(R.jsxs)("div",{className:"col-md-3",children:[Object(R.jsx)("label",{className:"form-label",children:"Technologies"}),Object(R.jsx)("input",{type:"text",name:"technologies",className:"form-control",value:null===e||void 0===e?void 0:e.technologies,onChange:function(e){return k(e,t,"projects")}})]})]})},t)}))]}),Object(R.jsxs)("div",{className:"mb-3",children:[Object(R.jsx)("label",{className:"form-label",children:"My current CV "}),Object(R.jsx)("input",{type:"file",className:"form-control"})]}),Object(R.jsxs)("div",{children:[Object(R.jsx)("button",{type:"submit",className:"btn btn-primary w-md",children:"Submit"}),Object(R.jsxs)(l.b,{to:"/users",className:"btn btn-primary w-md m-2",children:[" ","Cancel"]})]})]})]})})})})]})},Ie=function(){return Object(R.jsx)("div",{children:"RequestMentor"})},qe=(c(114),c(28),c(222),c(226),c(220),c(221),function(){return Object(R.jsx)("div",{children:"JoinCommunity"})}),Te=function(){return Object(R.jsx)("div",{children:"Announcements"})},ze=function(){return Object(R.jsx)("div",{children:"feedback"})},Le=function(){return Object(R.jsx)("div",{children:"ClassRoom"})},De=c(84),_e=c.n(De);function We(){var e=Object(o.c)((function(e){var t,c;return null===e||void 0===e||null===(t=e.userProviderReducer)||void 0===t||null===(c=t.user)||void 0===c?void 0:c.track}));console.log("datatrack",e);var t={options:{chart:{height:350,type:"radialBar"},labels:["Percentage"],stroke:{lineCap:"round"},fill:{colors:["#2951D5","#F45B35"],type:"gradient",gradient:{shade:"light",shadeIntensity:100,type:"horizontal",opacityFrom:1,gradientToColors:["#65AB9A","#F6B154"],opacityTo:1,stops:[0,100]}}},series:[44]},c={options:{chart:{id:"basic-bar"},xaxis:{categories:[1991,1992,1993,1994,1995,1996,1997,1998]}},series:[{name:"series-1",data:[30,40,45,50,49,60,70,91]}]};return Object(R.jsxs)("div",{children:[Object(R.jsx)("div",{className:"card",children:Object(R.jsx)("h1",{children:null===e||void 0===e?void 0:e.name})}),Object(R.jsxs)("div",{style:{display:"flex"},children:[Object(R.jsx)(_e.a,{options:c.options,series:c.series,type:"bar",width:"500"}),Object(R.jsx)(_e.a,{className:"chart-con",options:t.options,series:t.series,type:"radialBar",width:"300px"})]})]})}var Ge=c(228),Ve=c(227);function Ue(){var e=Object(o.b)(),t=Object(o.c)((function(e){return e.alertProviderReducer})),c=t.successSnackBarMessage,a=t.successSnackBarOpen;function n(){e(L("success"))}return Object(R.jsx)(Ge.a,{anchorOrigin:{vertical:"top",horizontal:"center"},open:a,autoHideDuration:6e3,onClose:n,"aria-describedby":"client-success-snackbar",children:Object(R.jsx)(Ve.a,{onClose:n,severity:"success",children:c})})}function He(){var e=Object(o.b)(),t=Object(o.c)((function(e){return e.alertProviderReducer})),c=t.errorSnackBarMessage,a=t.errorSnackBarOpen;function n(){e(L("error"))}return Object(R.jsx)(Ge.a,{anchorOrigin:{vertical:"top",horizontal:"center"},open:a,autoHideDuration:6e3,onClose:n,"aria-describedby":"client-error-snackbar",children:Object(R.jsx)(Ve.a,{onClose:n,severity:"error",children:c})})}function Je(){var e=Object(o.b)(),t=Object(o.c)((function(e){return e.alertProviderReducer})),c=t.warningSnackBarMessage,a=t.warningSnackBarOpen;function n(){e(L("warning"))}return Object(R.jsx)(Ge.a,{anchorOrigin:{vertical:"top",horizontal:"center"},open:a,autoHideDuration:6e3,onClose:n,"aria-describedby":"client-warning-snackbar",children:Object(R.jsx)(Ve.a,{onClose:n,severity:"warning",children:c})})}function Ke(){var e=Object(o.b)(),t=Object(o.c)((function(e){return e.alertProviderReducer})),c=t.confirmSnackBarMessage,a=t.confirmSnackBarOpen,n=t.confirmOnAllow,s=t.confirmOnReject;function r(){e(L("confirmation"))}function i(){return(i=Object(k.a)(y.a.mark((function e(){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("function"!==typeof n){e.next=3;break}return n(),e.abrupt("return",r());case 3:r();case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(R.jsx)(Ge.a,{anchorOrigin:{vertical:"top",horizontal:"center"},open:a,autoHideDuration:6e3,onClose:r,"aria-describedby":"client-warning-snackbar",children:Object(R.jsxs)(Ve.a,{onClose:r,severity:"warning",children:[c,Object(R.jsxs)("div",{style:{marginTop:"10px"},children:[Object(R.jsx)("button",{className:"btn btn-sm btn-success",onClick:function(){return"function"===typeof s?(s(),r()):r()},children:"Cancel"}),Object(R.jsx)("button",{className:"btn btn-sm btn-danger",onClick:function(){return i.apply(this,arguments)},children:"Ok"})]})]})})}var Xe=function(e){var t=e.children;return Object(R.jsxs)(R.Fragment,{children:[Object(R.jsx)(Ue,{}),Object(R.jsx)(He,{}),Object(R.jsx)(Je,{}),Object(R.jsx)(Ke,{}),t]})},Ye=function(){var e=Object(i.g)(),t=Object(i.h)(),c=t.pathname,a=t.search;console.log("path and search",c,a);var s=N();return n.a.useEffect((function(){var t=s.get("authtoken")||null,c=s.get("role")||null;t&&c&&O({authtoken:t,role:c}).then((function(){return e.push("/")}))}),[e,s]),Object(R.jsx)(je,{children:Object(R.jsxs)(i.d,{children:[Object(R.jsx)(ne,{path:"/join-community",component:qe}),Object(R.jsx)(ne,{path:"/create-profile",component:Ee}),Object(R.jsx)(ne,{path:"/request-mentor",component:Ie}),Object(R.jsx)(ne,{path:"/announcements",component:Te}),Object(R.jsx)(ne,{path:"/feedback",component:ze}),Object(R.jsx)(ne,{path:"/classroom",component:Le}),Object(R.jsx)(ne,{path:"/my-projects"}),Object(R.jsx)(ne,{path:"/my-assessments"}),Object(R.jsx)(ne,{exact:!0,path:"/",component:We}),Object(R.jsx)(i.a,{to:{pathname:c,state:"404"}})]})})},Qe=function(){return Object(R.jsxs)(l.a,{children:[Object(R.jsx)(Xe,{}),Object(R.jsx)(l.a,{basename:"/learner",children:Object(R.jsxs)(i.d,{children:[Object(R.jsx)(re,{exact:!0,path:"/forgotPassword",component:J}),Object(R.jsx)(re,{exact:!0,path:"/passwordReset",component:te}),Object(R.jsx)(re,{exact:!0,path:"/login",component:U,redirect:"/"}),Object(R.jsx)(re,{exact:!0,path:"/404",component:$}),Object(R.jsx)(i.b,{path:"/",component:Ye})]})})]})},Ze=c(58),$e={successSnackBarOpen:!1,errorSnackBarOpen:!1,warningSnackBarOpen:!1,successSnackBarMessage:"",errorSnackBarMessage:"",warningSnackBarMessage:""};var et={user:null,usersCount:null};var tt=Object(Ze.b)({userProviderReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:et,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case D:return Object(j.a)(Object(j.a)({},e),{},{user:t.payload});case _:return Object(j.a)(Object(j.a)({},e),{},{user:null});case W:return Object(j.a)(Object(j.a)({},e),{},{usersCount:t.payload});default:return e}},alertProviderReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:$e,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case F:return Object(j.a)(Object(j.a)({},e),{},{successSnackBarOpen:!0,successSnackBarMessage:t.payload});case A:return Object(j.a)(Object(j.a)({},e),{},{errorSnackBarOpen:!0,errorSnackBarMessage:t.payload});case E:return Object(j.a)(Object(j.a)({},e),{},{warningSnackBarOpen:!0,warningSnackBarMessage:t.payload});case q:return Object(j.a)(Object(j.a)({},e),{},{confirmSnackBarOpen:!0,confirmSnackBarMessage:t.payload,confirmOnAllow:t.onAllow||null,confirmOnReject:t.onReject||null});case I:if("success"===t.payload)return Object(j.a)(Object(j.a)({},e),{},{successSnackBarOpen:!1,successSnackBarMessage:""});if("warning"===t.payload)return Object(j.a)(Object(j.a)({},e),{},{warningSnackBarOpen:!1,warningSnackBarMessage:""});if("error"===t.payload)return Object(j.a)(Object(j.a)({},e),{},{errorSnackBarOpen:!1,errorSnackBarMessage:""});if("confirmation"===t.payload)return Object(j.a)(Object(j.a)({},e),{},{confirmSnackBarOpen:!1,confirmSnackBarMessage:"",confirmOnAllow:null,confirmOnReject:null});default:return e}}}),ct="undefined"!==typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||Ze.c,at=Object(Ze.d)(tt,ct(Object(Ze.a)()));r.a.render(Object(R.jsx)(o.a,{store:at,children:Object(R.jsx)(Qe,{})}),document.getElementById("root"))}},[[168,1,2]]]);
//# sourceMappingURL=main.3c1d4f25.chunk.js.map