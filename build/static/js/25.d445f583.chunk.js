(this.webpackJsonpsgpclient=this.webpackJsonpsgpclient||[]).push([[25],{224:function(e,t,a){"use strict";var c=a(33);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=c(a(38)),l=a(1),s=(0,i.default)((0,l.jsx)("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"}),"Search");t.default=s},325:function(e,t,a){"use strict";var c=a(7),i=a(13),l=a(0),s=a.n(l),n=a(158),r=a(285),d=a(600),j=a(603),o=a(69),b=a(604),m=a(128),x=(a(92),a(300)),h=a(279),O=a(284),u=a(357),p=a(303),g=a(295),v=a(306),f=a(310),y=a(308),w=a(309),C=a(307),S=a(331),z=a.n(S),k=a(1);t.a=function(e){var t=Object(m.a)(),a=t.register,l=(t.formState.errors,t.handleSubmit),S=(t.setValue,t.reset,s.a.useState(!1)),E=Object(i.a)(S,2),I=E[0],M=(E[1],s.a.useState("paper")),T=Object(i.a)(M,2),P=T[0],A=(T[1],s.a.useRef(null));s.a.useEffect((function(){if(I){var e=A.current;null!==e&&e.focus()}}),[I]);function R(e,t,a){var c=function(e,t){return e*t}(t,a);return{desc:e,qty:t,unit:a,price:c}}var q=[R("Paperclips (Box)",100,1.15),R("Paper (Case)",10,45.99),R("Waste Basket",2,17.99)];q.map((function(e){return e.price})).reduce((function(e,t){return e+t}),0);return Object(k.jsx)("div",{children:Object(k.jsx)(v.a,{open:e.open,onClose:e.onClose,scroll:P,"aria-labelledby":"scroll-dialog-title","aria-describedby":"scroll-dialog-description",fullWidth:!0,maxWidth:"md",children:Object(k.jsxs)("form",{onSubmit:l((function(e,t){alert(),console.log(e)})),children:[Object(k.jsx)(C.a,{id:"scroll-dialog-title",children:"Registrar Proveedor"}),Object(k.jsx)(y.a,{dividers:"paper"===P,children:Object(k.jsx)(w.a,{id:"scroll-dialog-description",ref:A,tabIndex:-1,children:Object(k.jsxs)(n.a,{container:!0,style:{textAlign:"center"},children:[Object(k.jsx)("br",{}),Object(k.jsxs)(r.a,{container:!0,spacing:2,children:[Object(k.jsxs)(r.a,{container:!0,item:!0,spacing:2,children:[Object(k.jsx)(r.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(k.jsxs)(p.a,{sx:{minWidth:"100%"},children:[Object(k.jsx)(O.a,{id:"demo-simple-select-helper-label",children:"Tipo Contribuyente"}),Object(k.jsxs)(h.a,Object(c.a)(Object(c.a)({labelId:"demo-simple-select-helper-label",id:"tipoContribuyente",name:"tipoContribuyente",style:{width:"100%"},required:!0,placeholder:"N\xfamero de secuencia inicial (1)",label:"Tipo Contribuyente"},a("tipoContribuyente")),{},{children:[Object(k.jsx)(u.a,{value:10,children:"Ten"}),Object(k.jsx)(u.a,{value:20,children:"Twenty"})]}))]})}),Object(k.jsx)(r.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(k.jsx)(x.a,Object(c.a)({id:"ruc",name:"ruc",label:"RUC:",placeholder:"13 d\xedgitos",helperText:'Clickee fuera para validar el "RUC"',style:{width:"100%"},required:!0},a("ruc")))})]}),Object(k.jsxs)(r.a,{container:!0,item:!0,spacing:2,children:[Object(k.jsx)(r.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(k.jsx)(x.a,Object(c.a)({id:"razonSocial",name:"razonSocial",label:"Raz\xf3n Social:",style:{width:"100%"},required:!0},a("razonSocial")))}),Object(k.jsx)(r.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(k.jsx)(x.a,Object(c.a)({id:"nombre",name:"nombre",label:"Nombre:",style:{width:"100%"},required:!0},a("nombre")))})]}),Object(k.jsxs)(r.a,{container:!0,item:!0,spacing:2,children:[Object(k.jsx)(r.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(k.jsx)(x.a,Object(c.a)({id:"direccionDomiciliaria",name:"direccionDomiciliaria",label:"Direcci\xf3n:",style:{width:"100%"},required:!0},a("direccionDomiciliaria")))}),Object(k.jsx)(r.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(k.jsx)(x.a,Object(c.a)({id:"telefono",name:"telefono",label:"Tel\xe9fono:",style:{width:"100%"},required:!0},a("telefono")))})]}),Object(k.jsxs)(r.a,{container:!0,item:!0,spacing:2,children:[Object(k.jsx)(r.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(k.jsxs)(p.a,{sx:{minWidth:"100%"},children:[Object(k.jsx)(O.a,{id:"demo-simple-select-helper-label",children:"Pa\xeds"}),Object(k.jsxs)(h.a,Object(c.a)(Object(c.a)({labelId:"demo-simple-select-helper-label",id:"pais",name:"pais",style:{width:"100%"},required:!0,label:"Pa\xeds"},a("pais")),{},{children:[Object(k.jsx)(u.a,{value:10,children:"Ecuador"}),Object(k.jsx)(u.a,{value:20,children:"Peru"})]}))]})}),Object(k.jsx)(r.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(k.jsx)(x.a,Object(c.a)({id:"celular",name:"celular",label:"Celular:",style:{width:"100%"}},a("celular")))})]}),Object(k.jsxs)(r.a,{container:!0,item:!0,spacing:2,children:[Object(k.jsx)(r.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(k.jsxs)(p.a,{sx:{minWidth:"100%"},children:[Object(k.jsx)(O.a,{id:"demo-simple-select-helper-label",children:"Ciudad"}),Object(k.jsxs)(h.a,Object(c.a)(Object(c.a)({labelId:"demo-simple-select-helper-label",id:"ciudad",name:"ciudad",style:{width:"100%"},required:!0,label:"Ciudad"},a("ciudad")),{},{children:[Object(k.jsx)(u.a,{value:10,children:"Pujili"}),Object(k.jsx)(u.a,{value:20,children:"Quito"})]}))]})}),Object(k.jsx)(r.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(k.jsx)(x.a,Object(c.a)({id:"correo",name:"correo",label:"Email:",style:{width:"100%"},required:!0},a("correo")))})]}),Object(k.jsx)(r.a,{container:!0,item:!0,spacing:2,children:Object(k.jsx)(r.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(k.jsx)(x.a,Object(c.a)({id:"observacion",name:"observacion",label:"Observaci\xf3n:",multiline:!0,style:{width:"100%"},required:!0},a("observacion")))})})]}),Object(k.jsx)("br",{}),Object(k.jsx)("div",{children:Object(k.jsxs)(d.a,{children:[Object(k.jsx)(j.a,{expandIcon:Object(k.jsx)(z.a,{}),"aria-controls":"panel1a-content",id:"panel1a-header",style:{backgroundColor:"gray"},children:Object(k.jsxs)(o.a,{color:"white",children:["Talonarios ",Object(k.jsx)("small",{children:"establecimientos"})]})}),Object(k.jsxs)(b.a,{children:[Object(k.jsx)("br",{}),Object(k.jsxs)(r.a,{container:!0,spacing:2,children:[Object(k.jsxs)(r.a,{container:!0,item:!0,spacing:2,children:[Object(k.jsx)(r.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(k.jsx)(x.a,Object(c.a)({id:"fechaCaducidad",name:"fechaCaducidad",label:"Fecha Caducidad:",type:"date",style:{width:"100%"},InputLabelProps:{shrink:!0}},a("fechaCaducidad")))}),Object(k.jsx)(r.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(k.jsx)(x.a,Object(c.a)({id:"numeroAutorizacion",name:"numeroAutorizacion",label:"N\xb0 Autorizaci\xf3n:",style:{width:"100%"}},a("numeroAutorizacion")))})]}),Object(k.jsxs)(r.a,{container:!0,item:!0,spacing:2,children:[Object(k.jsx)(r.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(k.jsx)(x.a,Object(c.a)({id:"establecimiento",name:"establecimiento",label:"Establecimiento:",style:{width:"100%"},required:!0},a("establecimiento")))}),Object(k.jsx)(r.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(k.jsx)(x.a,Object(c.a)({id:"puntoEmision",name:"puntoEmision",label:"Punto emisi\xf3n:",style:{width:"100%"},required:!0},a("puntoEmision")))})]}),Object(k.jsxs)(r.a,{container:!0,item:!0,spacing:2,children:[Object(k.jsx)(r.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(k.jsx)(x.a,Object(c.a)({id:"secuencialMin",name:"secuencialMin",label:"Secuencial Min:",style:{width:"100%"},required:!0},a("secuencialMin")))}),Object(k.jsx)(r.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(k.jsx)(x.a,Object(c.a)({id:"secuencialMax",name:"secuencialMax",label:"Secuencial Max:",style:{width:"100%"},required:!0},a("secuencialMax")))})]})]})]})]})})]})})}),Object(k.jsxs)(f.a,{children:[Object(k.jsx)(g.a,{onClick:e.onClose,children:"Cancelar"}),Object(k.jsx)(g.a,{type:"submit",children:"Registar Proveedor"})]})]})})})}},355:function(e,t,a){"use strict";var c=a(33);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=c(a(38)),l=a(1),s=(0,i.default)((0,l.jsx)("path",{d:"M16.59 7.58 10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"CheckCircleOutline");t.default=s},398:function(e,t,a){"use strict";var c=a(3),i=a(5),l=a(2),s=a(0),n=(a(9),a(89)),r=a(68),d=a(132),j=a(40),o=a(1),b=Object(j.a)(Object(o.jsx)("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),m=Object(j.a)(Object(o.jsx)("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),x=Object(j.a)(Object(o.jsx)("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox"),h=a(10),O=a(11),u=a(4),p=a(79),g=a(90);function v(e){return Object(p.a)("MuiCheckbox",e)}var f=Object(g.a)("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary"]),y=["checkedIcon","color","icon","indeterminate","indeterminateIcon","inputProps","size"],w=Object(u.a)(d.a,{shouldForwardProp:function(e){return Object(u.b)(e)||"classes"===e},name:"MuiCheckbox",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[t.root,a.indeterminate&&t.indeterminate,"default"!==a.color&&t["color".concat(Object(h.a)(a.color))]]}})((function(e){var t,a=e.theme,i=e.ownerState;return Object(l.a)({color:a.palette.text.secondary},!i.disableRipple&&{"&:hover":{backgroundColor:Object(r.a)("default"===i.color?a.palette.action.active:a.palette[i.color].main,a.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"default"!==i.color&&(t={},Object(c.a)(t,"&.".concat(f.checked,", &.").concat(f.indeterminate),{color:a.palette[i.color].main}),Object(c.a)(t,"&.".concat(f.disabled),{color:a.palette.action.disabled}),t))})),C=Object(o.jsx)(m,{}),S=Object(o.jsx)(b,{}),z=Object(o.jsx)(x,{}),k=s.forwardRef((function(e,t){var a,c,r=Object(O.a)({props:e,name:"MuiCheckbox"}),d=r.checkedIcon,j=void 0===d?C:d,b=r.color,m=void 0===b?"primary":b,x=r.icon,u=void 0===x?S:x,p=r.indeterminate,g=void 0!==p&&p,f=r.indeterminateIcon,k=void 0===f?z:f,E=r.inputProps,I=r.size,M=void 0===I?"medium":I,T=Object(i.a)(r,y),P=g?k:u,A=g?k:j,R=Object(l.a)({},r,{color:m,indeterminate:g,size:M}),q=function(e){var t=e.classes,a=e.indeterminate,c=e.color,i={root:["root",a&&"indeterminate","color".concat(Object(h.a)(c))]},s=Object(n.a)(i,v,t);return Object(l.a)({},t,s)}(R);return Object(o.jsx)(w,Object(l.a)({type:"checkbox",inputProps:Object(l.a)({"data-indeterminate":g},E),icon:s.cloneElement(P,{fontSize:null!=(a=P.props.fontSize)?a:M}),checkedIcon:s.cloneElement(A,{fontSize:null!=(c=A.props.fontSize)?c:M}),ownerState:R,ref:t},T,{classes:q}))}));t.a=k},601:function(e,t,a){"use strict";a.r(t);var c=a(7),i=a(13),l=a(0),s=a.n(l),n=a(285),r=a(303),d=a(284),j=a(279),o=a(357),b=a(69),m=a(128),x=a(92),h=a(91),O=a(39),u=a(398),p=a(295),g=a(300),v=a(158),f=a(109),y=a(159),w=a(305),C=a(1),S=function(e){var t=e.handleEvent,a=Object(m.a)(),i=a.register;a.formState.errors,a.handleSubmit,a.setValue,a.reset;return Object(C.jsxs)(n.a,{container:!0,spacing:O.b,children:[Object(C.jsx)(n.a,{item:!0,xs:12,sm:6,children:Object(C.jsx)(x.a,{title:"N. Credito F\xedsica",style:{textAlign:"center"},children:Object(C.jsx)("center",{children:Object(C.jsx)(u.a,Object(c.a)({style:{transform:"scale(2)"},onClick:function(e){return t(!0)}},i("notaCreditoFisico")))})})}),Object(C.jsx)(n.a,{item:!0,xs:12,sm:6,children:Object(C.jsx)(x.a,{title:"N. Credito Elect.",style:{textAlign:"center"},children:Object(C.jsx)("center",{children:Object(C.jsx)(u.a,Object(c.a)({style:{transform:"scale(2)"},onClick:function(e){return t(!0)}},i("notaCreditoElect")))})})})]})},z=a(157),k=a(224),E=a.n(k),I=(a(325),a(344)),M=a(348),T=a(347),P=a(343),A=a(345),R=a(346),q=a(292),N=a(355),F=a.n(N),D=function(){var e=Object(m.a)(),t=e.register,a=(e.formState.errors,e.handleSubmit,e.setValue,e.reset,Object(l.useState)(!1)),r=Object(i.a)(a,2),d=r[0],j=r[1],o=s.a.useState(!1),b=Object(i.a)(o,2),h=(b[0],b[1],s.a.useState("paper")),u=Object(i.a)(h,2);u[0],u[1];function v(e,t,a,c,i){return{name:e,calories:t,fat:a,carbs:c,protein:i}}var f,y=[v("Frozen yoghurt",159,6,24,4),v("Ice cream sandwich",237,9,37,4.3)];return d&&(f=Object(C.jsx)(P.a,{component:q.a,children:Object(C.jsxs)(I.a,{sx:{minWidth:650},"aria-label":"simple table",children:[Object(C.jsx)(A.a,{children:Object(C.jsxs)(R.a,{children:[Object(C.jsx)(T.a,{children:"#"}),Object(C.jsx)(T.a,{align:"right",children:"N\xfamero"}),Object(C.jsx)(T.a,{align:"right",children:"Raz\xf3n Social"}),Object(C.jsx)(T.a,{align:"right",children:"Ci/Ruc"}),Object(C.jsx)(T.a,{align:"right",children:"Fecha"}),Object(C.jsx)(T.a,{align:"right",children:"Iva"}),Object(C.jsx)(T.a,{align:"right",children:"Total"}),Object(C.jsx)(T.a,{align:"right"})]})}),Object(C.jsx)(M.a,{children:y.map((function(e){return Object(C.jsxs)(R.a,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[Object(C.jsx)(T.a,{component:"th",scope:"row",children:e.calories}),Object(C.jsx)(T.a,{align:"right",children:e.calories}),Object(C.jsx)(T.a,{align:"right",children:e.name}),Object(C.jsx)(T.a,{align:"right",children:e.carbs}),Object(C.jsx)(T.a,{align:"right",children:e.carbs}),Object(C.jsx)(T.a,{align:"right",children:e.carbs}),Object(C.jsx)(T.a,{align:"right",children:e.carbs}),Object(C.jsx)(T.a,{align:"right",children:Object(C.jsx)(p.a,{variant:"contained",startIcon:Object(C.jsx)(F.a,{}),children:"Nota de credito"})})]},e.name)}))})]})})),Object(C.jsx)(n.a,{container:!0,spacing:O.b,children:Object(C.jsx)(n.a,{item:!0,xs:12,sm:12,children:Object(C.jsxs)(x.a,{className:"col-12",title:"Buscar Factura",style:{textAlign:"center"},children:[Object(C.jsxs)(n.a,{container:!0,spacing:2,children:[Object(C.jsx)(n.a,{item:!0,xs:12,sm:6,md:6,lg:6,children:Object(C.jsx)(g.a,Object(c.a)({required:!0,id:"outlined-basic",label:"Ruc | Proveedor| N\xb0 Fact.:",placeholder:"N\xb0 Factura - Proveedor - Ruc",style:{width:"100%"}},t("proveedor")))}),Object(C.jsx)(n.a,{item:!0,xs:12,sm:6,md:6,lg:6,children:Object(C.jsx)(p.a,{variant:"outlined",startIcon:Object(C.jsx)(E.a,{}),onClick:function(e){return j(!0)},children:"Buscar"})})]}),Object(C.jsx)("br",{}),Object(C.jsx)(z.a,{}),f]})})})};a(339),t.default=function(){var e,t=Object(m.a)(),a=t.register,s=(t.formState.errors,t.handleSubmit),z=(t.setValue,t.reset,Object(l.useState)(!1)),k=Object(i.a)(z,2),E=k[0],I=k[1];e=E?Object(C.jsx)(D,{}):Object(C.jsx)(S,{handleEvent:I});return Object(C.jsx)("form",{onSubmit:s((function(e,t){alert(),console.log(e)})),children:Object(C.jsx)(h.a,{title:"Nota de Credito",children:Object(C.jsxs)(n.a,{container:!0,spacing:O.b,children:[Object(C.jsx)(n.a,{item:!0,xs:12,md:12,sm:12,lg:12,children:e}),Object(C.jsx)(n.a,{item:!0,xs:12,sm:12,children:Object(C.jsxs)(x.a,{className:"col-12",container:!0,title:"DATOS DE NOTA DE CREDITO",style:{textAlign:"center"},children:[Object(C.jsxs)(n.a,{container:!0,rowSpacing:2,columnSpacing:{xs:1,sm:2,md:3},children:[Object(C.jsx)(n.a,{item:!0,xs:12,sm:12,md:6,lg:6}),Object(C.jsx)(n.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(C.jsxs)(r.a,{sx:{minWidth:"100%"},children:[Object(C.jsx)(d.a,{id:"demo-simple-select-helper-label",children:"Sustento Tributario"}),Object(C.jsxs)(j.a,Object(c.a)(Object(c.a)({labelId:"demo-simple-select-helper-label",id:"sustentoTributario",name:"sustentoTributario",style:{width:"100%"},required:!0,label:"Sustento Tributario"},a("sustentoTributario")),{},{children:[Object(C.jsx)(o.a,{value:10,children:"FACTURA"}),Object(C.jsx)(o.a,{value:20,children:"NOTA DE VENTA"})]}))]})}),Object(C.jsx)(n.a,{item:!0,xs:12,md:12,sm:12,lg:12,children:Object(C.jsxs)(n.a,{container:!0,spacing:2,children:[Object(C.jsx)(n.a,{item:!0,xs:12,sm:12,md:3,lg:3,children:Object(C.jsx)("small",{style:{width:"100%"},children:Object(C.jsx)("b",{children:"N\xb0 Nota de Credito:"})})}),Object(C.jsx)(n.a,{item:!0,xs:12,sm:12,md:3,lg:3,children:Object(C.jsx)(g.a,Object(c.a)({id:"emision",name:"emision",label:"000",style:{width:"100%"}},a("emision")))}),Object(C.jsx)(n.a,{item:!0,xs:12,sm:12,md:3,lg:3,children:Object(C.jsx)(g.a,Object(c.a)({id:"puntoEmision",name:"puntoEmision",label:"000 ",style:{width:"100%"}},a("puntoEmision")))}),Object(C.jsx)(n.a,{item:!0,xs:12,sm:12,md:3,lg:3,children:Object(C.jsx)(g.a,Object(c.a)({id:"secuencial",name:"secuencial",label:"000000000",multiline:!0,style:{width:"100%"}},a("secuencial")))}),Object(C.jsx)(n.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(C.jsx)(g.a,Object(c.a)({id:"fechaEmsion",name:"fechaEmsion",label:"F. Emisi\xf3n:",type:"date",style:{width:"100%",float:"right"},InputLabelProps:{shrink:!0}},a("fechaEmsion")))}),Object(C.jsx)(n.a,{item:!0,xs:12,md:6,sm:12,lg:6,children:Object(C.jsx)(g.a,Object(c.a)({id:"fechaRegistro",name:"fechaRegistro",label:"F. Registro:",type:"date",style:{width:"100%"},InputLabelProps:{shrink:!0}},a("fechaRegistro")))})]})})]}),Object(C.jsx)("br",{}),Object(C.jsxs)(n.a,{container:!0,rowSpacing:2,columnSpacing:{xs:1,sm:2,md:3},children:[Object(C.jsx)(n.a,{item:!0,xs:12,md:6,sm:12,lg:6,children:Object(C.jsxs)(v.a,{children:[Object(C.jsx)(f.a,{title:"Datos de la Factura",style:{backgroundColor:"yellow",textAlign:"center",height:"50px"}}),Object(C.jsx)(y.a,{children:Object(C.jsxs)(n.a,{container:!0,spacing:2,children:[Object(C.jsx)(n.a,{item:!0,xs:12,md:12,sm:12,lg:12,children:Object(C.jsx)(g.a,Object(c.a)({id:"proveedor",name:"proveedor",label:"Proveedor: ",style:{width:"100%"}},a("proveedor")))}),Object(C.jsx)(n.a,{item:!0,xs:12,md:12,sm:12,lg:12,children:Object(C.jsx)(g.a,Object(c.a)({id:"numeroFactura",name:"numeroFactura",label:"N\xb0 Factura:",style:{width:"100%"}},a("numeroFactura")))}),Object(C.jsx)(n.a,{item:!0,xs:12,md:12,sm:12,lg:12,children:Object(C.jsx)(g.a,Object(c.a)({id:"fechaEmision",name:"fechaEmision",label:"Fecha de Emision:",type:"date",style:{width:"100%"},InputLabelProps:{shrink:!0}},a("fechaEmision")))})]})})]})}),Object(C.jsx)(n.a,{item:!0,xs:12,md:6,sm:12,lg:6,children:Object(C.jsxs)(v.a,{children:[Object(C.jsx)(f.a,{title:"Datos de la Nota de Credito",style:{backgroundColor:"yellow",textAlign:"center",height:"50px"}}),Object(C.jsx)(y.a,{children:Object(C.jsxs)(n.a,{container:!0,spacing:2,children:[Object(C.jsx)(n.a,{item:!0,xs:12,md:12,sm:12,lg:12,children:Object(C.jsx)(g.a,Object(c.a)({id:"numeroAutorizacion",name:"numeroAutorizacion",label:"Numero Autorizaci\xf3n: ",style:{width:"100%"}},a("numeroAutorizacion")))}),Object(C.jsx)(n.a,{item:!0,xs:12,md:12,sm:12,lg:12,children:Object(C.jsx)(g.a,Object(c.a)({id:"razonModificacion",name:"razonModificacion",label:"Raz\xf3n de Modificaci\xf3n:",style:{width:"100%"}},a("razonModificacion")))})]})})]})})]})]})}),Object(C.jsxs)(n.a,{item:!0,xs:12,md:12,sm:12,lg:12,children:[Object(C.jsxs)(x.a,{className:"col-12",container:!0,title:"Detalle de Factura",style:{textAlign:"center"},children:[Object(C.jsx)("div",{children:Object(C.jsxs)(n.a,{container:!0,children:[Object(C.jsx)(n.a,{item:!0,xs:12,md:6,sm:12,lg:6,children:Object(C.jsxs)("center",{children:[Object(C.jsx)(u.a,Object(c.a)({id:"devolucion",name:"devolucion",style:{transform:"scale(1)"}},a("devolucion"))),Object(C.jsx)("small",{children:"Devolucion"})]})}),Object(C.jsx)(n.a,{item:!0,xs:12,md:6,sm:12,lg:6,children:Object(C.jsxs)("center",{children:[Object(C.jsx)(u.a,Object(c.a)({id:"descuento",name:"descuento",style:{transform:"scale(1)"}},a("descuento"))),Object(C.jsx)("small",{children:"Descuento"})]})}),Object(C.jsx)(n.a,{item:!0,xs:12,md:12,sm:12,lg:12,children:Object(C.jsx)(b.a,{variant:"h5",gutterBottom:!0,component:"div",children:"Total Factura Restante:"})})]})}),Object(C.jsx)("br",{}),Object(C.jsxs)(n.a,{container:!0,rowSpacing:2,columnSpacing:{xs:1,sm:2,md:3},children:[Object(C.jsx)(n.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(C.jsxs)(r.a,{sx:{minWidth:"100%"},children:[Object(C.jsx)(d.a,{id:"demo-simple-select-helper-label",children:"Departamento"}),Object(C.jsxs)(j.a,Object(c.a)(Object(c.a)({labelId:"demo-simple-select-helper-label",id:"departamento",name:"departamento",style:{width:"100%"},required:!0,label:"Departamento"},a("departamento")),{},{children:[Object(C.jsx)(o.a,{value:"Huaquillas",children:"Huaquillas"}),Object(C.jsx)(o.a,{value:"Santo Domingo",children:"Santo Domingo"}),Object(C.jsx)(o.a,{value:"Esmeraldas",children:"Esmeraldas"})]}))]})}),Object(C.jsx)(n.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(C.jsxs)(r.a,{sx:{minWidth:"100%"},children:[Object(C.jsx)(d.a,{id:"demo-simple-select-helper-label",children:"Subcuenta"}),Object(C.jsxs)(j.a,Object(c.a)(Object(c.a)({labelId:"demo-simple-select-helper-label",id:"subcuenta",name:"subcuenta",style:{width:"100%"},required:!0,label:"Subcuenta"},a("subcuenta")),{},{children:[Object(C.jsx)(o.a,{value:"Insumos Medicos",children:"Insumos Medicos"}),Object(C.jsx)(o.a,{value:"Tecnologico",children:"Tecnologico"}),Object(C.jsx)(o.a,{value:"Gastos",children:"Gastos"})]}))]})}),Object(C.jsx)(n.a,{item:!0,xs:12,md:6,sm:12,lg:6,children:Object(C.jsx)(g.a,Object(c.a)({id:"subtotal",name:"subtotal",label:"Subtotal ",variant:"outlined",style:{width:"100%"}},a("subtotal")))}),Object(C.jsx)(n.a,{item:!0,xs:12,md:6,sm:12,lg:6,children:Object(C.jsx)(g.a,Object(c.a)({id:"descuento",name:"descuento",label:"Descuento:",variant:"outlined",style:{width:"100%"}},a("descuento")))}),Object(C.jsx)(n.a,{item:!0,xs:12,md:6,sm:12,lg:6,children:Object(C.jsx)(g.a,Object(c.a)({id:"subtotal12",name:"subtotal12",label:"Subtotal 12%:",variant:"outlined",style:{width:"100%"}},a("subtotal12")))}),Object(C.jsx)(n.a,{item:!0,xs:12,md:6,sm:12,lg:6,children:Object(C.jsx)(g.a,Object(c.a)({id:"iva12",name:"iva12",label:"Iva 12%:",variant:"outlined",style:{width:"100%"}},a("iva12")))}),Object(C.jsx)(n.a,{item:!0,xs:12,md:6,sm:12,lg:6,children:Object(C.jsx)(g.a,Object(c.a)({id:"subtotal0",name:"subtotal0",label:"Subtotal 0%:",variant:"outlined",style:{width:"100%"}},a("subtotal0")))}),Object(C.jsx)(n.a,{item:!0,xs:12,md:6,sm:12,lg:6,children:Object(C.jsx)(g.a,Object(c.a)(Object(c.a)({id:"valorTotal",name:"valorTotal",label:"Valor Total:",variant:"outlined"},a("valorTotal")),{},{style:{width:"100%"}}))})]})]}),Object(C.jsx)(w.a,{children:Object(C.jsx)(n.a,{container:!0,children:Object(C.jsx)(n.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(C.jsx)(p.a,{type:"submit",variant:"contained",style:{width:"100%",backgroundColor:"#536dfe"},children:"Guardar"})})})})]})]})})})}}}]);
//# sourceMappingURL=25.d445f583.chunk.js.map