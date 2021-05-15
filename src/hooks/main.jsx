import { useState } from 'react';

export const useShowHide= ({ req }) => {
  const [request, setRequest] = useState(req);

  const actShow= ()=> setRequest(true);

  const actHide= ()=> setRequest(false);
   
  return [
    request,
    actShow,
    actHide
  ];
};

export const useMessage= ({ req= false , mess= "" , time= 1000 }) => {

  const [ item, setItem ]= useState({ req , mess , time });

  const setOnlyMess= (newMess)=> setItem({ ...item , req: true , mess: newMess });

  const setOnlyTime= (newTime)=> setItem({ ...item , req: true , time: newTime });

  const setAll= ( newM , newT )=> setItem({ req: true , mess: newM , time: newT });

  const initMessage= ()=> setItem({ req: false , mess: "" , time: 1000 });
   
  return [
    item,
    setOnlyMess,
    setOnlyTime,
    setAll,
    initMessage
  ];
};

export const useItem= ({ req= false, data }) => {
  const [ item, setItem ]= useState({ req , data });

  const setData= (newData) => setItem({ req: true , data: newData });

  const initData= () => setItem({ req: false , data: {} });

  return [
    item,
    setData,
    initData
  ];
};

export const useAlert= ({ req= false, mess="", cb=()=>{} }) =>{
  const [ item, setItem ]= useState({ req , mess, cb });

  const setData= ( newMess , newCB ) => setItem({ req: true , mess: newMess , cb: newCB });

  const setMess= ( newMess ) => setItem({ ...item, req: true , mess: newMess });

  const setCB= ( newCB ) => setItem({ ...item, req: true , cb: newCB });

  const initData= () => setItem({ req: false , mess: "", cb: ()=>{} });

  return [
    item,
    setData,
    setMess,
    setCB,
    initData
  ];
};

//export useShowHide;

/*
const useShowHide:FunctionComponent<{ initial?: number }> = ({ initial = 0 }) => {
  const [request, setRequest] = useState(initial);

  const actShow= ()=> setRequest(0);

  const actHide= ()=> setRequest(0);

  const actCancel=  ( cb: Function ) => cb();

  const actConfirm= ( cb: Function , data: any ) => cb();
   
  return [
    request,
    actShow,
    actHide,
    actConfirm,
    actCancel
  ];
};

export default useShowHide;
*/

/*
import React, { FunctionComponent, useState } from 'react';

// our components props accept a number for the initial value
const Counter:FunctionComponent<{ initial?: number }> = ({ initial = 0 }) => {
  // since we pass a number here, clicks is going to be a number.
  // setClicks is a function that accepts either a number or a function returning
  // a number
  const [clicks, setClicks] = useState(initial);
  return <>
    <p>Clicks: {clicks}</p>
    <button onClick={() => setClicks(clicks+1)}>+</button>
    <button onClick={() => setClicks(clicks-1)}>-</button>
  </>
};


export default Counter;


/*
const Counter:FunctionComponent<{ initial?: number }> = ({ initial = 0 }) => {
  // since we pass a number here, clicks is going to be a number.
  // setClicks is a function that accepts either a number or a function returning
  // a number
  const [clicks, setClicks] = useState(initial);
  return <>
    <p>Clicks: {clicks}</p>
    <button onClick={() => setClicks(clicks+1)}>+</button>
    <button onClick={() => setClicks(clicks-1)}>-</button>
  </>
};

export default Counter;
*/