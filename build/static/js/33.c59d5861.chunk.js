(this.webpackJsonpsgpclient=this.webpackJsonpsgpclient||[]).push([[33],{334:function(e,t,a){"use strict";var i=a(21),c=a(290),n=a(213),s=a(358),l=a(7),r=a(37),o=a(287),j=a(1),d=["color","outline","size","sx"],b=function(e){var t=e.color,a=e.outline,c=e.size,n=e.sx,s=Object(r.a)(e,d),b=Object(i.a)(),m=t&&!a&&{color:b.palette.background.paper,bgcolor:"".concat(t,".main")},x=a&&{color:t?"".concat(t,".main"):"primary.main",bgcolor:b.palette.background.paper,border:"2px solid",borderColor:t?"".concat(t,".main"):"primary.main"},h={};switch(c){case"badge":h={width:b.spacing(3.5),height:b.spacing(3.5)};break;case"xs":h={width:b.spacing(4.25),height:b.spacing(4.25)};break;case"sm":h={width:b.spacing(5),height:b.spacing(5)};break;case"lg":h={width:b.spacing(9),height:b.spacing(9)};break;case"xl":h={width:b.spacing(10.25),height:b.spacing(10.25)};break;case"md":h={width:b.spacing(7.5),height:b.spacing(7.5)};break;default:h={}}return Object(j.jsx)(o.a,Object(l.a)({sx:Object(l.a)(Object(l.a)(Object(l.a)(Object(l.a)({},m),x),h),n)},s))};t.a=function(e){var t=e.title,a=e.link,l=e.icon,r=Object(i.a)();return Object(j.jsx)(c.a,{title:t||"Reference",placement:"left",children:Object(j.jsxs)(n.a,{disableRipple:!0,children:[!l&&Object(j.jsx)(b,{component:s.a,href:a,target:"_blank",alt:"MUI Logo",size:"badge",color:"primary",outline:!0,children:Object(j.jsxs)("svg",{width:"500",height:"500",viewBox:"0 0 500 500",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[Object(j.jsxs)("g",{clipPath:"url(#clip0)",children:[Object(j.jsx)("path",{d:"M100 260.9V131L212.5 195.95V239.25L137.5 195.95V282.55L100 260.9Z",fill:r.palette.primary[800]}),Object(j.jsx)("path",{d:"M212.5 195.95L325 131V260.9L250 304.2L212.5 282.55L287.5 239.25V195.95L212.5 239.25V195.95Z",fill:r.palette.primary.main}),Object(j.jsx)("path",{d:"M212.5 282.55V325.85L287.5 369.15V325.85L212.5 282.55Z",fill:r.palette.primary[800]}),Object(j.jsx)("path",{d:"M287.5 369.15L400 304.2V217.6L362.5 239.25V282.55L287.5 325.85V369.15ZM362.5 195.95V152.65L400 131V174.3L362.5 195.95Z",fill:r.palette.primary.main})]}),Object(j.jsx)("defs",{children:Object(j.jsx)("clipPath",{id:"clip0",children:Object(j.jsx)("rect",{width:"300",height:"238.3",fill:"white",transform:"translate(100 131)"})})})]})}),l&&Object(j.jsx)(b,{component:s.a,href:a,target:"_blank",size:"badge",color:"primary",outline:!0,children:l})]})})}},358:function(e,t,a){"use strict";var i=a(13),c=a(3),n=a(5),s=a(2),l=a(0),r=(a(9),a(8)),o=a(89),j=a(14),d=a(68),b=a(10),m=a(4),x=a(11),h=a(72),O=a(17),u=a(69),p=a(79),g=a(90);function v(e){return Object(p.a)("MuiLink",e)}var f=Object(g.a)("MuiLink",["root","underlineNone","underlineHover","underlineAlways","button","focusVisible"]),y=a(1),w=["className","color","component","onBlur","onFocus","TypographyClasses","underline","variant"],k={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},I=Object(m.a)(u.a,{name:"MuiLink",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[t.root,t["underline".concat(Object(b.a)(a.underline))],"button"===a.component&&t.button]}})((function(e){var t=e.theme,a=e.ownerState,i=Object(j.b)(t,"palette.".concat(function(e){return k[e]||e}(a.color)))||a.color;return Object(s.a)({},"none"===a.underline&&{textDecoration:"none"},"hover"===a.underline&&{textDecoration:"none","&:hover":{textDecoration:"underline"}},"always"===a.underline&&{textDecoration:"underline",textDecorationColor:"inherit"!==i?Object(d.a)(i,.4):void 0,"&:hover":{textDecorationColor:"inherit"}},"button"===a.component&&Object(c.a)({position:"relative",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none","&::-moz-focus-inner":{borderStyle:"none"}},"&.".concat(f.focusVisible),{outline:"auto"}))})),S=l.forwardRef((function(e,t){var a=Object(x.a)({props:e,name:"MuiLink"}),c=a.className,j=a.color,d=void 0===j?"primary":j,m=a.component,u=void 0===m?"a":m,p=a.onBlur,g=a.onFocus,f=a.TypographyClasses,k=a.underline,S=void 0===k?"always":k,V=a.variant,L=void 0===V?"inherit":V,R=Object(n.a)(a,w),D=Object(h.a)(),T=D.isFocusVisibleRef,A=D.onBlur,C=D.onFocus,N=D.ref,M=l.useState(!1),P=Object(i.a)(M,2),E=P[0],B=P[1],F=Object(O.a)(t,N),z=Object(s.a)({},a,{color:d,component:u,focusVisible:E,underline:S,variant:L}),W=function(e){var t=e.classes,a=e.component,i=e.focusVisible,c=e.underline,n={root:["root","underline".concat(Object(b.a)(c)),"button"===a&&"button",i&&"focusVisible"]};return Object(o.a)(n,v,t)}(z);return Object(y.jsx)(I,Object(s.a)({className:Object(r.a)(W.root,c),classes:f,color:d,component:u,onBlur:function(e){A(e),!1===T.current&&B(!1),p&&p(e)},onFocus:function(e){C(e),!0===T.current&&B(!0),g&&g(e)},ref:F,ownerState:z,variant:L},R))}));t.a=S},587:function(e,t,a){"use strict";a.r(t);var i=a(7),c=a(13),n=a(0),s=a.n(n),l=a(285),r=a(128),o=a(92),j=a(91),d=(a(334),a(39)),b=a(398),m=a(295),x=a(300),h=a(158),O=a(109),u=a(159),p=a(279),g=a(284),v=a(357),f=a(303),y=a(344),w=a(348),k=a(347),I=a(343),S=a(345),V=a(346),L=a(157),R=a(305),D=a(364),T=a(318),A=a.n(T),C=a(325),N=a(1);t.default=function(){var e,t=Object(r.a)(),a=t.register,n=(t.formState.errors,t.handleSubmit,t.setValue,t.reset,s.a.useState(!1)),T=Object(c.a)(n,2),M=T[0],P=T[1],E=s.a.useState("paper"),B=Object(c.a)(E,2),F=(B[0],B[1]),z=s.a.useState(!1),W=Object(c.a)(z,2),q=W[0],Z=W[1];return Object(N.jsxs)(j.a,{title:"Pasajes emitidos por empresa de Aviaci\xf3n",children:[Object(N.jsxs)(l.a,{container:!0,spacing:d.b,children:[Object(N.jsx)(l.a,{item:!0,xs:12,md:12,sm:12,lg:12,children:Object(N.jsxs)(o.a,{className:"col-12",container:!0,title:"Datos de Factura",style:{textAlign:"center"},children:[Object(N.jsxs)(l.a,{container:!0,rowSpacing:2,columnSpacing:{xs:1,sm:2,md:3,lg:2},children:[Object(N.jsx)(l.a,{item:!0,xs:12,md:6,sm:12,lg:6}),Object(N.jsx)(l.a,{item:!0,xs:12,md:6,sm:12,lg:6,children:Object(N.jsxs)(f.a,{sx:{minWidth:"100%"},xs:12,md:6,sm:6,lg:6,children:[Object(N.jsx)(g.a,{id:"demo-simple-select-helper-label",children:"Sustento Tributario"}),Object(N.jsxs)(p.a,Object(i.a)(Object(i.a)({labelId:"demo-simple-select-helper-label",id:"sustentoTributario",name:"sustentoTributario",style:{width:"100%",float:"right"},required:!0,label:"Sustento Tributario"},a("sustentoTributario")),{},{children:[Object(N.jsx)(v.a,{value:10,children:"FACTURA"}),Object(N.jsx)(v.a,{value:20,children:"NOTA DE VENTA"})]}))]})}),Object(N.jsx)(l.a,{item:!0,xs:12,md:12,sm:12,lg:12,children:Object(N.jsxs)(l.a,{container:!0,spacing:2,children:[Object(N.jsx)(l.a,{item:!0,xs:12,sm:12,md:3,lg:3,children:Object(N.jsx)("small",{style:{width:"100%"},children:Object(N.jsx)("b",{children:"N\xb0 Factura:"})})}),Object(N.jsx)(l.a,{item:!0,xs:12,sm:12,md:3,lg:3,children:Object(N.jsx)(x.a,Object(i.a)({id:"emision",name:"emision",label:"000",style:{width:"100%"}},a("emision")))}),Object(N.jsx)(l.a,{item:!0,xs:12,sm:12,md:3,lg:3,children:Object(N.jsx)(x.a,Object(i.a)({id:"puntoEmision",name:"puntoEmision",label:"000 ",style:{width:"100%"}},a("puntoEmision")))}),Object(N.jsx)(l.a,{item:!0,xs:12,sm:12,md:3,lg:3,children:Object(N.jsx)(x.a,Object(i.a)({id:"secuencial",name:"secuencial",label:"000000000",multiline:!0,style:{width:"100%"}},a("secuencial")))}),Object(N.jsx)(l.a,{item:!0,xs:12,sm:12,md:6,lg:6,children:Object(N.jsx)(x.a,Object(i.a)({id:"fechaEmsion",name:"fechaEmsion",label:"F. Emisi\xf3n:",type:"date",style:{width:"100%",float:"right"},InputLabelProps:{shrink:!0}},a("fechaEmsion")))}),Object(N.jsx)(l.a,{item:!0,xs:12,md:6,sm:12,lg:6,children:Object(N.jsx)(x.a,Object(i.a)({id:"fechaRegistro",name:"fechaRegistro",label:"F. Registro:",type:"date",style:{width:"100%",float:"right"},InputLabelProps:{shrink:!0}},a("fechaRegistro")))})]})})]}),Object(N.jsx)("br",{}),Object(N.jsxs)(h.a,{children:[Object(N.jsx)(O.a,{title:"Datos del proveedor",style:{backgroundColor:"yellow",textAlign:"center",height:"60px"}}),Object(N.jsx)(u.a,{children:Object(N.jsxs)(l.a,{container:!0,rowSpacing:2,columnSpacing:{xs:1,sm:2,md:3,lg:2},children:[Object(N.jsx)(l.a,{container:!0,item:!0,xs:12,md:12,sm:12,lg:12,children:Object(N.jsx)(l.a,{item:!0,xs:12,md:12,sm:12,lg:12,children:Object(N.jsx)(l.a,{container:!0,spacing:2,children:Object(N.jsx)(l.a,{item:!0,xs:12,md:12,sm:12,lg:12,children:Object(N.jsx)(m.a,{"aria-label":"settings",style:{width:"100%",float:"right"},variant:"outlined",startIcon:Object(N.jsx)(A.a,{}),onClick:function(){return Z(!0)},children:"Editar Proveedor"})})})})}),Object(N.jsx)(l.a,{container:!0,item:!0,xs:12,sm:12,md:6,lg:6,children:Object(N.jsx)(l.a,{item:!0,spacing:2,xs:12,sm:12,md:12,lg:12,children:Object(N.jsxs)(l.a,{container:!0,spacing:2,children:[Object(N.jsx)(l.a,{item:!0,xs:12,sm:12,md:12,lg:12,children:Object(N.jsx)(x.a,Object(i.a)({id:"ruc",name:"ruc",label:"Numero Ruc: ",style:{width:"100%"}},a("ruc")))}),Object(N.jsx)(l.a,{item:!0,xs:12,sm:12,md:12,lg:12,children:Object(N.jsx)(x.a,Object(i.a)({id:"numeroAutorizacion",name:"numeroAutorizacion",label:"Numero Autorizaci\xf3n:",style:{width:"100%"}},a("numeroAutorizacion")))})]})})}),Object(N.jsx)(l.a,{container:!0,item:!0,xs:12,sm:12,md:6,lg:6,children:Object(N.jsx)(l.a,{item:!0,spacing:2,xs:12,sm:12,md:12,lg:12,children:Object(N.jsxs)(l.a,{container:!0,spacing:2,children:[Object(N.jsx)(l.a,{item:!0,xs:12,sm:12,md:12,lg:12,children:Object(N.jsx)(x.a,Object(i.a)({id:"telefono",name:"telefono",label:"Telefono: ",style:{width:"100%"}},a("telefono")))}),Object(N.jsx)(l.a,{item:!0,xs:12,sm:12,md:12,lg:12,children:Object(N.jsx)(x.a,Object(i.a)({id:"direccionDomiciliaria",name:"direccionDomiciliaria",label:"Direcci\xf3n:",style:{width:"100%"}},a("direccionDomiciliaria")))}),Object(N.jsx)(l.a,{item:!0,xs:12,sm:12,md:12,lg:12,children:Object(N.jsx)(x.a,Object(i.a)({id:"correo",name:"correo",label:"Email:",style:{width:"100%"}},a("correo")))})]})})})]})})]})]})}),Object(N.jsx)(l.a,{item:!0,xs:12,sm:12,md:12,lg:12,children:Object(N.jsxs)(o.a,{className:"col-12",container:!0,title:"Detalle de Factura",style:{textAlign:"center"},children:[Object(N.jsxs)(l.a,{container:!0,xs:12,md:12,sm:12,lg:12,spacing:2,children:[Object(N.jsx)(l.a,{item:!0,xs:12,sm:12,md:4,lg:4,children:Object(N.jsxs)(f.a,{sx:{minWidth:"100%",float:"left"},children:[Object(N.jsx)(g.a,{id:"demo-simple-select-helper-label",children:"Iva"}),Object(N.jsxs)(p.a,Object(i.a)(Object(i.a)({labelId:"demo-simple-select-helper-label",id:"iva",name:"iva",style:{width:"100%"},required:!0,label:"Iva"},a("iva")),{},{children:[Object(N.jsx)(v.a,{value:10,children:"Iva 12%"}),Object(N.jsx)(v.a,{value:20,children:"Iva 8%"})]}))]})}),Object(N.jsx)(l.a,{item:!0,xs:12,sm:12,md:4,lg:4,children:Object(N.jsxs)(f.a,{sx:{minWidth:"100%",float:"left"},children:[Object(N.jsx)(g.a,{id:"demo-simple-select-helper-label",children:"Departamento"}),Object(N.jsxs)(p.a,Object(i.a)(Object(i.a)({labelId:"demo-simple-select-helper-label",id:"departamento",name:"departamento",style:{width:"100%"},required:!0,label:"Departamento"},a("departamento")),{},{children:[Object(N.jsx)(v.a,{value:"Huaquillas",children:"Huaquillas"}),Object(N.jsx)(v.a,{value:"Santo Domingo",children:"Santo Domingo"}),Object(N.jsx)(v.a,{value:"Esmeraldas",children:"Esmeraldas"})]}))]})}),Object(N.jsx)(l.a,{item:!0,xs:12,sm:12,md:4,lg:4,children:Object(N.jsxs)(f.a,{sx:{minWidth:"100%",float:"left"},children:[Object(N.jsx)(g.a,{id:"demo-simple-select-helper-label",children:"Subcuenta"}),Object(N.jsxs)(p.a,Object(i.a)(Object(i.a)({labelId:"demo-simple-select-helper-label",id:"subcuenta",name:"subcuenta",style:{width:"100%"},required:!0,label:"Subcuenta"},a("subcuenta")),{},{children:[Object(N.jsx)(v.a,{value:"Insumos Medicos",children:"Insumos Medicos"}),Object(N.jsx)(v.a,{value:"Tecnologico",children:"Tecnologico"}),Object(N.jsx)(v.a,{value:"Gastos",children:"Gastos"})]}))]})})]}),Object(N.jsx)("br",{}),Object(N.jsx)("div",{children:Object(N.jsx)(I.a,{children:Object(N.jsxs)(y.a,{sx:{minWidth:650},"aria-label":"simple table",children:[Object(N.jsx)(S.a,{style:{backgroundColor:"skyblue",color:"black"},children:Object(N.jsxs)(V.a,{children:[Object(N.jsx)(k.a,{children:"#"}),Object(N.jsx)(k.a,{align:"center",children:"Cant."}),Object(N.jsx)(k.a,{align:"center",children:"Tipo Base"}),Object(N.jsx)(k.a,{align:"center",children:"Descripci\xf3n"}),Object(N.jsx)(k.a,{align:"center",children:"Precio Unit."}),Object(N.jsx)(k.a,{align:"center",children:"Total"}),Object(N.jsx)(k.a,{align:"center",children:"Opcion"})]})}),Object(N.jsx)(w.a,{})]})})}),Object(N.jsx)("br",{}),Object(N.jsxs)(l.a,{container:!0,rowSpacing:2,columnSpacing:{xs:1,sm:2,md:3},children:[Object(N.jsx)(l.a,{item:!0,xs:12,sm:12,md:4,lg:4,children:Object(N.jsx)(x.a,Object(i.a)({style:{width:"100%"},id:"subtotal12",name:"subtotal12",label:"Subtotal 12%",variant:"outlined"},a("subtotal12")))}),Object(N.jsx)(l.a,{item:!0,xs:12,sm:12,md:4,lg:4,children:Object(N.jsx)(x.a,Object(i.a)({style:{width:"100%"},id:"baseObjIVA",name:"baseObjIVA",label:"Base No Objeto IVA:",variant:"outlined"},a("baseObjIVA")))}),Object(N.jsx)(l.a,{item:!0,xs:12,sm:12,md:4,lg:4,children:Object(N.jsx)(x.a,Object(i.a)({style:{width:"100%"},id:"subtotal",name:"subtotal",label:"Subtotal:",variant:"outlined"},a("subtotal")))}),Object(N.jsx)(l.a,{item:!0,xs:12,sm:12,md:4,lg:4,children:Object(N.jsx)(x.a,Object(i.a)({style:{width:"100%"},id:"subtotal0",name:"subtotal0",label:"Subtotal 0%:",variant:"outlined"},a("subtotal0")))}),Object(N.jsxs)(l.a,{item:!0,xs:12,sm:12,md:4,lg:4,children:[Object(N.jsx)("label",{children:Object(N.jsx)(b.a,Object(i.a)({id:"usaIce",name:"usaIce",style:{width:"20%",transform:"scale(1)"}},a("usaIce")))}),Object(N.jsx)(x.a,Object(i.a)({style:{width:"80%"},id:"ice",name:"ice",label:"Ice:",variant:"outlined"},a("ice")))]}),Object(N.jsx)(l.a,{item:!0,xs:12,sm:12,md:4,lg:4,children:Object(N.jsx)(x.a,Object(i.a)({style:{width:"100%"},id:"iva12",name:"iva12",label:"Iva 12 %:",variant:"outlined"},a("iva12")))}),Object(N.jsx)(l.a,{item:!0,xs:12,sm:12,md:4,lg:4,children:Object(N.jsx)(x.a,Object(i.a)({style:{width:"100%"},id:"descuento12",name:"descuento12",label:"Descuento 12%:",variant:"outlined"},a("descuento12")))}),Object(N.jsx)(l.a,{item:!0,xs:12,sm:12,md:4,lg:4,children:Object(N.jsx)(x.a,Object(i.a)({style:{width:"100%"},id:"propina",name:"propina",label:"Propina Tip (Serv. 10%):",variant:"outlined"},a("propina")))}),Object(N.jsx)(l.a,{item:!0,xs:12,sm:12,md:4,lg:4,children:Object(N.jsx)(x.a,Object(i.a)({style:{width:"100%"},id:"valorTotal",name:"valorTotal",label:"Valor Total:",variant:"outlined"},a("valorTotal")))}),Object(N.jsx)(l.a,{item:!0,xs:12,sm:12,md:4,lg:4,children:Object(N.jsx)(x.a,Object(i.a)({style:{width:"100%"},id:"descuento0",name:"descuento0",label:"Descuento 0%:",variant:"outlined"},a("descuento0")))}),Object(N.jsx)(l.a,{item:!0,xs:12,sm:12,md:4,lg:4,children:Object(N.jsx)(x.a,Object(i.a)({style:{width:"100%"},id:"impIRBPNR",name:"impIRBPNR",label:"IMP. IRBPNR:",variant:"outlined"},a("impIRBPNR")))})]}),Object(N.jsx)("br",{}),Object(N.jsx)(L.a,{}),Object(N.jsx)(R.a,{children:Object(N.jsxs)(l.a,{container:!0,spacing:2,children:[Object(N.jsx)(l.a,{item:!0,xs:12,sm:12,md:4,lg:4,children:Object(N.jsx)(m.a,{variant:"contained",style:{width:"100%",backgroundColor:"#536dfe"},children:"Guardar"})}),Object(N.jsx)(l.a,{item:!0,xs:12,sm:12,md:4,lg:4,children:Object(N.jsx)(m.a,{onClick:(e="paper",function(){P(!0),F(e)}),style:{width:"100%"},variant:"contained",children:"Retener"})}),Object(N.jsx)(l.a,{item:!0,xs:12,sm:12,md:4,lg:4,children:Object(N.jsx)(m.a,{variant:"contained",style:{width:"100%",backgroundColor:"#f57f17"},children:"Cancelar"})})]})})]})})]}),Object(N.jsx)(D.a,{open:M,onClose:function(){P(!1)}}),Object(N.jsx)(C.a,{open:q,onClose:function(){return Z(!1)}})]})}}}]);
//# sourceMappingURL=33.c59d5861.chunk.js.map