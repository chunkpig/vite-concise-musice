import{e as v,Y as f,Z as x,y as g,o as h,f as s,q as o,l as a,Q as l,F as _,V as k,m as c}from"./index.7b6421ae.js";import{b as w}from"./home.68cef1c4.js";import{B as b}from"./search.7c8446e3.js";import{_ as S}from"./plugin-vue_export-helper.db4a78ed.js";const B={class:"play width h_c_150 m_t_x_20 flex flex-wrap align-content-start"},I=["onClick"],q={class:"ellipsis_1"},C=v({__name:"index",setup(Y){const i=b(),d=f(),u=x(),r=g({collapseList:[],playlist:[],active:0,catname:""}),{id:p}=u.query,m=()=>{w({uid:p}).then(e=>{e.code===200&&(r.playlist=e.playlist)})},y=e=>{i.singlelist=[],d.push({path:"/music/details",query:{id:e.id}})};return h(()=>{m()}),(e,$)=>(s(),o(_,null,[a("p",null,l(e.userId),1),a("div",B,[(s(!0),o(_,null,k(r.playlist,(t,n)=>(s(),o("div",{key:n+t.userId,class:"w_x_120 m_r_x_30 m_l_x_15 m_b_x_15 cursor-pointer c_c5c9cd tag",style:c({animation:`change ${.2*n}s`})},[a("div",{onClick:z=>y(t),class:"w_x_120 h_x_120 m_b_x_5",style:c({background:`url(${t.coverImgUrl}) no-repeat`,backgroundSize:"cover"})},null,12,I),a("p",q,l(t.name),1)],4))),128))])],64))}});var D=S(C,[["__scopeId","data-v-71e6d310"]]);export{D as default};
