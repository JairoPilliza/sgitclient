(this.webpackJsonpsgpclient=this.webpackJsonpsgpclient||[]).push([[18],{224:function(e,t,a){"use strict";var c=a(33);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=c(a(38)),n=a(1),l=(0,i.default)((0,n.jsx)("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"}),"Search");t.default=l},226:function(e,t,a){"use strict";var c=a(33);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=c(a(38)),n=a(1),l=(0,i.default)((0,n.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"Add");t.default=l},318:function(e,t,a){"use strict";var c=a(33);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=c(a(38)),n=a(1),l=(0,i.default)((0,n.jsx)("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),"Edit");t.default=l},325:function(e,t,a){"use strict";var c=a(7),i=a(13),n=a(0),l=a.n(n),s=a(158),r=a(285),d=a(600),j=a(603),o=a(69),b=a(604),x=a(128),h=(a(92),a(300)),m=a(279),O=a(284),u=a(357),p=a(303),g=a(295),v=a(306),f=a(310),y=a(308),w=a(309),C=a(307),S=a(331),z=a.n(S),I=a(1);t.a=function(e){var t=Object(x.a)(),a=t.register,n=(t.formState.errors,t.handleSubmit),S=(t.setValue,t.reset,l.a.useState(!1)),M=Object(i.a)(S,2),P=M[0],T=(M[1],l.a.useState("paper")),k=Object(i.a)(T,2),q=k[0],E=(k[1],l.a.useRef(null));l.a.useEffect((function(){if(P){var e=E.current;null!==e&&e.focus()}}),[P]);function A(e,t,a){var c=function(e,t){return e*t}(t,a);return{desc:e,qty:t,unit:a,price:c}}var R=[A("Paperclips (Box)",100,1.15),A("Paper (Case)",10,45.99),A("Waste Basket",2,17.99)];R.map((function(e){return e.price})).reduce((function(e,t){return e+t}),0);return Object(I.jsx)("div",{children:Object(I.jsx)(v.a,{open:e.open,onClose:e.onClose,scroll:q,"aria-labelledby":"scroll-dialog-title","aria-describedby":"scroll-dialog-description",fullWidth:!0,maxWidth:"md",children:Object(I.jsxs)("form",{onSubmit:n((function(e,t){alert(),console.log(e)})),children:[Object(I.jsx)(C.a,{id:"scroll-dialog-title",children:"Registrar Proveedor"}),Object(I.jsx)(y.a,{dividers:"paper"===q,children:Object(I.jsx)(w.a,{id:"scroll-dialog-description",ref:E,tabIndex:-1,children:Object(I.jsxs)(s.a,{container:!0,style:{textAlign:"center"},children:[Object(I.jsx)("br",{}),Object(I.jsxs)(r.a,{container:!0,spacing:2,children:[Object(I.jsxs)(r.a,{container:!0,item:!0,spacing:2,children:[Object(I.jsx)(r.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(I.jsxs)(p.a,{sx:{minWidth:"100%"},children:[Object(I.jsx)(O.a,{id:"demo-simple-select-helper-label",children:"Tipo Contribuyente"}),Object(I.jsxs)(m.a,Object(c.a)(Object(c.a)({labelId:"demo-simple-select-helper-label",id:"tipoContribuyente",name:"tipoContribuyente",style:{width:"100%"},required:!0,placeholder:"N\xfamero de secuencia inicial (1)",label:"Tipo Contribuyente"},a("tipoContribuyente")),{},{children:[Object(I.jsx)(u.a,{value:10,children:"Ten"}),Object(I.jsx)(u.a,{value:20,children:"Twenty"})]}))]})}),Object(I.jsx)(r.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(I.jsx)(h.a,Object(c.a)({id:"ruc",name:"ruc",label:"RUC:",placeholder:"13 d\xedgitos",helperText:'Clickee fuera para validar el "RUC"',style:{width:"100%"},required:!0},a("ruc")))})]}),Object(I.jsxs)(r.a,{container:!0,item:!0,spacing:2,children:[Object(I.jsx)(r.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(I.jsx)(h.a,Object(c.a)({id:"razonSocial",name:"razonSocial",label:"Raz\xf3n Social:",style:{width:"100%"},required:!0},a("razonSocial")))}),Object(I.jsx)(r.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(I.jsx)(h.a,Object(c.a)({id:"nombre",name:"nombre",label:"Nombre:",style:{width:"100%"},required:!0},a("nombre")))})]}),Object(I.jsxs)(r.a,{container:!0,item:!0,spacing:2,children:[Object(I.jsx)(r.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(I.jsx)(h.a,Object(c.a)({id:"direccionDomiciliaria",name:"direccionDomiciliaria",label:"Direcci\xf3n:",style:{width:"100%"},required:!0},a("direccionDomiciliaria")))}),Object(I.jsx)(r.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(I.jsx)(h.a,Object(c.a)({id:"telefono",name:"telefono",label:"Tel\xe9fono:",style:{width:"100%"},required:!0},a("telefono")))})]}),Object(I.jsxs)(r.a,{container:!0,item:!0,spacing:2,children:[Object(I.jsx)(r.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(I.jsxs)(p.a,{sx:{minWidth:"100%"},children:[Object(I.jsx)(O.a,{id:"demo-simple-select-helper-label",children:"Pa\xeds"}),Object(I.jsxs)(m.a,Object(c.a)(Object(c.a)({labelId:"demo-simple-select-helper-label",id:"pais",name:"pais",style:{width:"100%"},required:!0,label:"Pa\xeds"},a("pais")),{},{children:[Object(I.jsx)(u.a,{value:10,children:"Ecuador"}),Object(I.jsx)(u.a,{value:20,children:"Peru"})]}))]})}),Object(I.jsx)(r.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(I.jsx)(h.a,Object(c.a)({id:"celular",name:"celular",label:"Celular:",style:{width:"100%"}},a("celular")))})]}),Object(I.jsxs)(r.a,{container:!0,item:!0,spacing:2,children:[Object(I.jsx)(r.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(I.jsxs)(p.a,{sx:{minWidth:"100%"},children:[Object(I.jsx)(O.a,{id:"demo-simple-select-helper-label",children:"Ciudad"}),Object(I.jsxs)(m.a,Object(c.a)(Object(c.a)({labelId:"demo-simple-select-helper-label",id:"ciudad",name:"ciudad",style:{width:"100%"},required:!0,label:"Ciudad"},a("ciudad")),{},{children:[Object(I.jsx)(u.a,{value:10,children:"Pujili"}),Object(I.jsx)(u.a,{value:20,children:"Quito"})]}))]})}),Object(I.jsx)(r.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(I.jsx)(h.a,Object(c.a)({id:"correo",name:"correo",label:"Email:",style:{width:"100%"},required:!0},a("correo")))})]}),Object(I.jsx)(r.a,{container:!0,item:!0,spacing:2,children:Object(I.jsx)(r.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(I.jsx)(h.a,Object(c.a)({id:"observacion",name:"observacion",label:"Observaci\xf3n:",multiline:!0,style:{width:"100%"},required:!0},a("observacion")))})})]}),Object(I.jsx)("br",{}),Object(I.jsx)("div",{children:Object(I.jsxs)(d.a,{children:[Object(I.jsx)(j.a,{expandIcon:Object(I.jsx)(z.a,{}),"aria-controls":"panel1a-content",id:"panel1a-header",style:{backgroundColor:"gray"},children:Object(I.jsxs)(o.a,{color:"white",children:["Talonarios ",Object(I.jsx)("small",{children:"establecimientos"})]})}),Object(I.jsxs)(b.a,{children:[Object(I.jsx)("br",{}),Object(I.jsxs)(r.a,{container:!0,spacing:2,children:[Object(I.jsxs)(r.a,{container:!0,item:!0,spacing:2,children:[Object(I.jsx)(r.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(I.jsx)(h.a,Object(c.a)({id:"fechaCaducidad",name:"fechaCaducidad",label:"Fecha Caducidad:",type:"date",style:{width:"100%"},InputLabelProps:{shrink:!0}},a("fechaCaducidad")))}),Object(I.jsx)(r.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(I.jsx)(h.a,Object(c.a)({id:"numeroAutorizacion",name:"numeroAutorizacion",label:"N\xb0 Autorizaci\xf3n:",style:{width:"100%"}},a("numeroAutorizacion")))})]}),Object(I.jsxs)(r.a,{container:!0,item:!0,spacing:2,children:[Object(I.jsx)(r.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(I.jsx)(h.a,Object(c.a)({id:"establecimiento",name:"establecimiento",label:"Establecimiento:",style:{width:"100%"},required:!0},a("establecimiento")))}),Object(I.jsx)(r.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(I.jsx)(h.a,Object(c.a)({id:"puntoEmision",name:"puntoEmision",label:"Punto emisi\xf3n:",style:{width:"100%"},required:!0},a("puntoEmision")))})]}),Object(I.jsxs)(r.a,{container:!0,item:!0,spacing:2,children:[Object(I.jsx)(r.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(I.jsx)(h.a,Object(c.a)({id:"secuencialMin",name:"secuencialMin",label:"Secuencial Min:",style:{width:"100%"},required:!0},a("secuencialMin")))}),Object(I.jsx)(r.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(I.jsx)(h.a,Object(c.a)({id:"secuencialMax",name:"secuencialMax",label:"Secuencial Max:",style:{width:"100%"},required:!0},a("secuencialMax")))})]})]})]})]})})]})})}),Object(I.jsxs)(f.a,{children:[Object(I.jsx)(g.a,{onClick:e.onClose,children:"Cancelar"}),Object(I.jsx)(g.a,{type:"submit",children:"Registar Proveedor"})]})]})})})}},336:function(e,t,a){"use strict";var c=a(33);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=c(a(38)),n=a(1),l=(0,i.default)((0,n.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"}),"AddCircle");t.default=l},341:function(e,t,a){"use strict";var c=a(33);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=c(a(38)),n=a(1),l=(0,i.default)((0,n.jsx)("path",{d:"M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"}),"FileUpload");t.default=l},354:function(e,t,a){"use strict";var c=a(13),i=a(0),n=a.n(i),l=a(158),s=a(267),r=a(343),d=a(344),j=a(345),o=a(346),b=a(347),x=a(348),h=a(275),m=a(314),O=a(280),u=a(128),p=a(295),g=a(306),v=a(310),f=a(308),y=a(309),w=a(307),C=(a(339),a(292)),S=a(355),z=a.n(S),I=a(1);t.a=function(e){var t=Object(u.a)(),a=(t.register,t.formState.errors,t.handleSubmit),S=(t.setValue,t.reset,Object(i.useState)(!1)),M=Object(c.a)(S,2),P=(M[0],M[1]),T=n.a.useState(!1),k=Object(c.a)(T,2),q=(k[0],k[1],n.a.useState("paper")),E=Object(c.a)(q,2),A=E[0];E[1];function R(e,t,a,c,i){return{name:e,calories:t,fat:a,carbs:c,protein:i}}var W=[R("Frozen yoghurt","hola",6,24,4),R("Ice cream sandwich","chao",9,37,4.3)],D=n.a.useState(!1),L=Object(c.a)(D,2);L[0],L[1];return Object(I.jsx)("div",{children:Object(I.jsx)("form",{onSubmit:a((function(e,t){alert(),console.log(e)})),children:Object(I.jsxs)(g.a,{open:e.open,onClose:e.onClose,scroll:A,"aria-labelledby":"scroll-dialog-title","aria-describedby":"scroll-dialog-description",fullWidth:!0,maxWidth:"md",children:[Object(I.jsx)(w.a,{id:"scroll-dialog-title",children:"Detalle de factura XML temporal"}),Object(I.jsx)(f.a,{dividers:"paper"===A,children:Object(I.jsx)(y.a,{id:"scroll-dialog-description",tabIndex:-1,children:Object(I.jsxs)(l.a,{className:"col-12",container:!0,style:{textAlign:"center"},children:[Object(I.jsx)("div",{children:Object(I.jsxs)(s.a,{direction:"row",spacing:2,children:[Object(I.jsx)(p.a,{variant:"contained",value:"bien",startIcon:Object(I.jsx)(z.a,{}),children:"Bienes"}),Object(I.jsx)(p.a,{variant:"contained",startIcon:Object(I.jsx)(z.a,{}),children:"Servicios"})]})}),Object(I.jsx)(r.a,{component:C.a,children:Object(I.jsxs)(d.a,{sx:{minWidth:650},"aria-label":"simple table",children:[Object(I.jsx)(j.a,{children:Object(I.jsxs)(o.a,{children:[Object(I.jsx)(b.a,{align:"center",children:"#"}),Object(I.jsx)(b.a,{align:"left",children:"Bien / Servicio"}),Object(I.jsx)(b.a,{align:"center",children:"Gr.Iva"}),Object(I.jsx)(b.a,{align:"center",children:"Cant."}),Object(I.jsx)(b.a,{align:"center",children:"Detalle"}),Object(I.jsx)(b.a,{align:"center",children:"P.Unit"}),Object(I.jsx)(b.a,{align:"center",children:"Total"})]})}),Object(I.jsx)(x.a,{children:W.map((function(e){return Object(I.jsxs)(o.a,{hover:!0,sx:{"&:last-child td, &:last-child th":{border:0}},onClick:function(e){return P(!1)},children:[Object(I.jsx)(b.a,{align:"center",children:e.name}),Object(I.jsx)(b.a,{align:"center",colSpan:1,children:Object(I.jsxs)(h.a,{row:!0,"aria-labelledby":"demo-row-radio-buttons-group-label",name:"row-radio-buttons-group",children:[Object(I.jsx)(m.a,{value:"bien",control:Object(I.jsx)(O.a,{}),label:""}),Object(I.jsx)(m.a,{value:"servicio",control:Object(I.jsx)(O.a,{}),label:""})]})}),Object(I.jsx)(b.a,{align:"center",children:e.fat}),Object(I.jsx)(b.a,{align:"center",children:e.fat}),Object(I.jsx)(b.a,{align:"center",children:"ddddddddddddddd"}),Object(I.jsx)(b.a,{align:"center",children:e.fat}),Object(I.jsx)(b.a,{align:"center",children:e.fat})]},e.name)}))})]})})]})})}),Object(I.jsxs)(v.a,{children:[Object(I.jsx)(p.a,{onClick:e.onClose,children:"Cancelar"}),Object(I.jsx)(p.a,{type:"submit",children:"Guardar"})]})]})})})}},355:function(e,t,a){"use strict";var c=a(33);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=c(a(38)),n=a(1),l=(0,i.default)((0,n.jsx)("path",{d:"M16.59 7.58 10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"CheckCircleOutline");t.default=l},359:function(e,t,a){"use strict";var c=a(7),i=a(13),n=a(0),l=a.n(n),s=a(285),r=a(157),d=a(128),j=a(92),o=a(39),b=a(295),x=a(300),h=a(224),m=a.n(h),O=a(336),u=a.n(O),p=a(325),g=a(344),v=a(348),f=a(347),y=a(343),w=a(346),C=a(292),S=a(354),z=a(341),I=a.n(z),M=a(1);t.a=function(){var e=Object(d.a)(),t=e.register,a=(e.formState.errors,e.handleSubmit,e.setValue,e.reset,Object(n.useState)(!1)),h=Object(i.a)(a,2),O=h[0],z=h[1],P=l.a.useState(!1),T=Object(i.a)(P,2),k=T[0],q=T[1],E=l.a.useState("paper"),A=Object(i.a)(E,2),R=(A[0],A[1]),W=Object(n.useState)(!1),D=Object(i.a)(W,2),L=D[0];D[1];function N(e,t,a,c,i){return{name:e,calories:t,fat:a,carbs:c,protein:i}}var V,_,U=[N("Frozen yoghurt",159,6,24,4),N("Ice cream sandwich",237,9,37,4.3)],B=l.a.useState(!1),F=Object(i.a)(B,2),G=F[0],H=F[1];return L&&Object(M.jsx)(b.a,{onClick:(V="paper",function(){H(!0),R(V)}),variant:"outlined",startIcon:Object(M.jsx)(I.a,{}),children:"XML"}),O&&(_=Object(M.jsx)(y.a,{component:C.a,children:Object(M.jsx)(g.a,{sx:{minWidth:650},"aria-label":"simple table",children:Object(M.jsx)(v.a,{children:U.map((function(e){return Object(M.jsxs)(w.a,{hover:!0,sx:{"&:last-child td, &:last-child th":{border:0}},onClick:function(e){return z(!1)},children:[Object(M.jsx)(f.a,{component:"th",scope:"row",children:e.calories}),Object(M.jsx)(f.a,{component:"th",scope:"row",children:e.name})]},e.name)}))})})})),Object(M.jsxs)(s.a,{container:!0,spacing:o.b,children:[Object(M.jsx)(s.a,{item:!0,xs:12,sm:12,lg:12,md:12,children:Object(M.jsxs)(j.a,{className:"col-12",title:"Busqueda del proveedor",style:{textAlign:"center"},children:[Object(M.jsxs)(s.a,{container:!0,spacing:2,children:[Object(M.jsx)(s.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(M.jsx)(x.a,Object(c.a)({required:!0,id:"outlined-basic",label:"Raz\xf3n Social / Ruc:",placeholder:"Ingrese RUC o Razon Social",style:{width:"100%"}},t("razonSocial")))}),Object(M.jsx)(s.a,{item:!0,xs:12,md:2,sm:12,lg:3,children:Object(M.jsx)(b.a,{variant:"outlined",startIcon:Object(M.jsx)(m.a,{}),onClick:function(e){return z(!0)},children:"Buscar"})}),Object(M.jsx)(s.a,{item:!0,xs:12,md:2,sm:12,lg:3,children:Object(M.jsx)(b.a,{onClick:function(){return q(!0)},variant:"outlined",startIcon:Object(M.jsx)(u.a,{}),children:"Nuevo"})})]}),Object(M.jsx)("br",{}),Object(M.jsx)(r.a,{}),_]})}),Object(M.jsx)(p.a,{open:k,onClose:function(){return q(!1)}}),Object(M.jsx)(S.a,{open:G,onClose:function(){H(!1)}})]})}},584:function(e,t,a){"use strict";a.r(t);var c=a(7),i=a(13),n=a(0),l=a.n(n),s=a(285),r=a(157),d=a(128),j=a(92),o=a(91),b=a(39),x=a(295),h=a(300),m=a(279),O=a(284),u=a(357),p=a(303),g=a(344),v=a(348),f=a(347),y=a(343),w=a(345),C=a(346),S=a(226),z=a.n(S),I=a(305),M=a(359),P=a(318),T=a.n(P),k=a(325),q=a(1);t.default=function(e){var t=Object(d.a)(),a=t.register,n=(t.formState.errors,t.handleSubmit,t.setValue,t.reset,l.a.useState(!1)),S=Object(i.a)(n,2),P=S[0],E=S[1];return Object(q.jsxs)(o.a,{title:"Nota Venta",children:[Object(q.jsxs)(s.a,{container:!0,spacing:b.b,children:[Object(q.jsx)(s.a,{item:!0,xs:12,sm:12,children:Object(q.jsx)(M.a,{})}),Object(q.jsx)(s.a,{item:!0,xs:12,sm:12,children:Object(q.jsx)("form",{children:Object(q.jsx)(j.a,{className:"col-12",container:!0,title:"Datos de la nota de venta",style:{textAlign:"center"},children:Object(q.jsxs)(s.a,{container:!0,spacing:2,rowSpacing:2,columnSpacing:{xs:1,sm:2,md:3},children:[Object(q.jsx)(s.a,{container:!0,item:!0,xs:12,md:12,sm:12,lg:12,children:Object(q.jsx)(s.a,{item:!0,xs:12,md:12,sm:12,lg:12,children:Object(q.jsxs)(s.a,{container:!0,spacing:2,children:[Object(q.jsx)(s.a,{item:!0,xs:12,md:6,sm:12,lg:6,children:Object(q.jsx)(x.a,{"aria-label":"settings",style:{width:"100%"},variant:"outlined",startIcon:Object(q.jsx)(T.a,{}),onClick:function(){return E(!0)},children:"Editar Proveedor"})}),Object(q.jsx)(s.a,{item:!0,xs:12,md:6,sm:12,lg:6})]})})}),Object(q.jsxs)(s.a,{container:!0,item:!0,spacing:2,rowSpacing:2,xs:12,md:6,sm:12,lg:6,children:[Object(q.jsx)(s.a,{item:!0,xs:12,md:12,sm:12,lg:12,children:Object(q.jsxs)(p.a,{sx:{minWidth:120},style:{width:"100%"},children:[Object(q.jsx)(O.a,{id:"demo-simple-select-helper-label",children:"Sustento Tributario:"}),Object(q.jsxs)(m.a,Object(c.a)(Object(c.a)({labelId:"demo-simple-select-helper-label",id:"sustentoTributario",name:"sustentoTributario",label:"Sustento Tributario:"},a("sustentoTributario")),{},{children:[Object(q.jsx)(u.a,{value:10,children:"Ten"}),Object(q.jsx)(u.a,{value:20,children:"Twenty"}),Object(q.jsx)(u.a,{value:30,children:"Thirty"})]}))]})}),Object(q.jsx)(s.a,{item:!0,xs:12,md:12,sm:12,lg:12,children:Object(q.jsx)(h.a,Object(c.a)({id:"ruc",name:"ruc",label:"RUC:",variant:"outlined",style:{width:"100%"}},a("ruc")))}),Object(q.jsx)(s.a,{item:!0,xs:12,md:12,sm:12,lg:12,children:Object(q.jsx)(h.a,Object(c.a)({id:"telefono",name:"telefono",label:"Telefono:",variant:"outlined",style:{width:"100%"}},a("telefono")))}),Object(q.jsx)(s.a,{item:!0,xs:12,md:12,sm:12,lg:12,children:Object(q.jsx)(h.a,Object(c.a)({id:"numeroAutorizacion",name:"numeroAutorizacion",label:"N\xb0 Autorizaci\xf3n:",variant:"outlined",style:{width:"100%"}},a("numeroAutorizacion")))})]}),Object(q.jsx)(s.a,{container:!0,item:!0,xs:12,sm:12,md:6,lg:6,children:Object(q.jsx)(s.a,{item:!0,xs:12,md:12,sm:12,lg:12,children:Object(q.jsxs)(s.a,{container:!0,spacing:2,children:[Object(q.jsx)(s.a,{item:!0,xs:12,md:3,sm:12,lg:3,children:Object(q.jsx)("small",{style:{width:"100%"},children:Object(q.jsx)("b",{children:"N\xb0 Nota de Venta:"})})}),Object(q.jsx)(s.a,{item:!0,xs:12,md:3,sm:12,lg:3,children:Object(q.jsx)(h.a,Object(c.a)({id:"emision",name:"emision",label:"000",style:{width:"100%"}},a("emision")))}),Object(q.jsx)(s.a,{item:!0,xs:12,md:3,sm:12,lg:3,children:Object(q.jsx)(h.a,Object(c.a)({id:"puntoEmision",name:"puntoEmision",label:"000 ",style:{width:"100%"}},a("puntoEmision")))}),Object(q.jsx)(s.a,{item:!0,xs:12,md:3,sm:12,lg:3,children:Object(q.jsx)(h.a,Object(c.a)({id:"secuencial",name:"secuencial",label:"000000000",multiline:!0,style:{width:"100%"}},a("secuencial")))}),Object(q.jsx)(s.a,{item:!0,xs:12,md:12,sm:12,lg:12,children:Object(q.jsx)(h.a,Object(c.a)({id:"fechaEmision",name:"fechaEmision",label:"F. Emisi\xf3n:",type:"date",style:{width:"100%",float:"right"},InputLabelProps:{shrink:!0}},a("fechaEmision")))}),Object(q.jsx)(s.a,{item:!0,xs:12,md:12,sm:12,lg:12,children:Object(q.jsx)(h.a,Object(c.a)({id:"fechaRegistro",name:"fechaRegistro",label:"F. Registro:",type:"date",style:{width:"100%",float:"right"},InputLabelProps:{shrink:!0}},a("fechaRegistro")))})]})})})]})})})}),Object(q.jsx)(s.a,{item:!0,xs:12,sm:12,children:Object(q.jsxs)(j.a,{className:"col-12",container:!0,title:"Detalle de nota de venta",style:{textAlign:"center"},children:[Object(q.jsx)("div",{children:Object(q.jsx)("form",{children:Object(q.jsx)(y.a,{children:Object(q.jsxs)(g.a,{sx:{minWidth:650},"aria-label":"simple table",children:[Object(q.jsx)(w.a,{children:Object(q.jsxs)(C.a,{children:[Object(q.jsx)(f.a,{align:"center",children:"Cant."}),Object(q.jsx)(f.a,{align:"center",children:"Descripci\xf3n"}),Object(q.jsx)(f.a,{align:"center",children:"V. Unit."}),Object(q.jsx)(f.a,{align:"center",children:"Total"}),Object(q.jsx)(f.a,{align:"center"})]})}),Object(q.jsxs)(v.a,{children:[Object(q.jsx)(f.a,{children:Object(q.jsx)(h.a,Object(c.a)({id:"cantidad",name:"cantidad",type:"number",style:{width:"50px"},InputLabelProps:{shrink:!0},variant:"standard"},a("cantidad")))}),Object(q.jsx)(f.a,{children:Object(q.jsx)(h.a,Object(c.a)({id:"descripcion",name:"descripcion",style:{width:"300px"},InputLabelProps:{shrink:!0},variant:"standard"},a("descripcion")))}),Object(q.jsx)(f.a,{children:Object(q.jsx)(h.a,Object(c.a)({id:"valorUnit",name:"valorUnit",type:"number",style:{width:"70px"},InputLabelProps:{shrink:!0},variant:"standard"},a("valorUnit")))}),Object(q.jsx)(f.a,{children:Object(q.jsx)(h.a,Object(c.a)({id:"total",name:"total",style:{width:"70px"},InputProps:{readOnly:!0},variant:"standard"},a("total")))}),Object(q.jsx)(f.a,{align:"center",children:Object(q.jsx)(x.a,{variant:"contained",children:Object(q.jsx)(z.a,{})})})]})]})})})}),Object(q.jsx)("div",{children:Object(q.jsx)(y.a,{children:Object(q.jsxs)(g.a,{sx:{minWidth:650},"aria-label":"simple table",children:[Object(q.jsx)(w.a,{children:Object(q.jsxs)(C.a,{children:[Object(q.jsx)(f.a,{align:"center",children:"Cant."}),Object(q.jsx)(f.a,{align:"center",children:"Descripci\xf3n"}),Object(q.jsx)(f.a,{align:"center",children:"V. Unit."}),Object(q.jsx)(f.a,{align:"center",children:"Total"}),Object(q.jsx)(f.a,{align:"center"})]})}),Object(q.jsx)(v.a,{})]})})}),Object(q.jsx)("br",{}),Object(q.jsxs)("from",{children:[Object(q.jsxs)(s.a,{container:!0,rowSpacing:2,columnSpacing:{xs:1,sm:2,md:3},children:[Object(q.jsx)(s.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(q.jsxs)(p.a,{sx:{minWidth:"100%",float:"left"},children:[Object(q.jsx)(O.a,{id:"demo-simple-select-helper-label",children:"Departamento"}),Object(q.jsxs)(m.a,Object(c.a)(Object(c.a)({labelId:"demo-simple-select-helper-label",id:"departamento",name:"departamento",style:{width:"100%"},required:!0,label:"Departamento"},a("departamento")),{},{children:[Object(q.jsx)(u.a,{value:"Huaquillas",children:"Huaquillas"}),Object(q.jsx)(u.a,{value:"Santo Domingo",children:"Santo Domingo"}),Object(q.jsx)(u.a,{value:"Esmeraldas",children:"Esmeraldas"})]}))]})}),Object(q.jsx)(s.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(q.jsxs)(p.a,{sx:{minWidth:"100%",float:"left"},children:[Object(q.jsx)(O.a,{id:"demo-simple-select-helper-label",children:"Subcuenta"}),Object(q.jsxs)(m.a,Object(c.a)(Object(c.a)({labelId:"demo-simple-select-helper-label",id:"subcuenta",name:"subcuenta",style:{width:"100%"},required:!0,label:"Subcuenta"},a("subcuenta")),{},{children:[Object(q.jsx)(u.a,{value:"Insumos Medicos",children:"Insumos Medicos"}),Object(q.jsx)(u.a,{value:"Tecnologico",children:"Tecnologico"}),Object(q.jsx)(u.a,{value:"Gastos",children:"Gastos"})]}))]})}),Object(q.jsx)(s.a,{item:!0,xs:12,md:6,sm:12,lg:6}),Object(q.jsx)(s.a,{item:!0,xs:12,md:6,sm:12,lg:6,children:Object(q.jsx)(h.a,Object(c.a)({id:"valorTotal",name:"valorTotal",label:"Valor Total:",variant:"outlined",InputProps:{readOnly:!0},style:{width:"100%",float:"right"}},a("valorTotal")))})]}),Object(q.jsx)("br",{}),Object(q.jsx)(r.a,{}),Object(q.jsx)(I.a,{children:Object(q.jsxs)(s.a,{container:!0,spacing:2,children:[Object(q.jsx)(s.a,{item:!0,xs:12,md:6,sm:12,lg:6,children:Object(q.jsx)(x.a,{variant:"contained",style:{width:"100%",backgroundColor:"#536dfe"},children:"Guardar"})}),Object(q.jsx)(s.a,{item:!0,xs:12,md:6,sm:12,lg:6,children:Object(q.jsx)(x.a,{variant:"contained",style:{width:"100%",backgroundColor:"#f57f17"},children:"Cancelar"})})]})})]})]})})]}),Object(q.jsx)(k.a,{open:P,onClose:function(){return E(!1)}})]})}}}]);
//# sourceMappingURL=18.b33dd5e8.chunk.js.map