import{e as i,Z as r,c,o as l,f as d,q as m,s as u,u as _}from"./index.7b6421ae.js";import{B as f}from"./search.7c8446e3.js";import{_ as p}from"./index.9897b74e.js";const h={class:"w_100 h_100 overflow-hidden"},S=i({__name:"index",setup(g){const o=r(),e=f(),{id:t,name:s}=o.query,a=c(()=>e.singlelist),n=()=>{t?e.udatGetdetail({id:t,limit:100}):s&&e.updateSearch({keywords:s,limit:100,type:1})};return l(()=>{n()}),(k,w)=>(d(),m("div",h,[u(p,{list:_(a)},null,8,["list"])]))}});export{S as default};