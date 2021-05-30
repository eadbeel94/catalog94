/** @namespace view/hooks */

/**
 * React hook that allow change state into constructor Function React Component
 * @function useState
 * @memberof view/hooks
 * @param {any} state include variable state
 * @param {function} setState include function to change variable state
 */
import { useState } from 'react';
/**
 * React custom hook that allow change state
 * @function useShowHide
 * @memberof hooks
 * @param {boolean|any} request include variable state
 * @param {function} actShow include function to change variable state to true
 * @param {function} actHide include function to change variable state to false
 */
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
/**
 * React custom hook that allow change state
 * @function useMessage
 * @memberof view/hooks
 * @param {object} item include variable state
 * @param {function} setOnlyMess include function to change property message
 * @param {function} setOnlyTime include function to change property time
 * @param {function} setAll include function to change three properties request, message and time
 * @param {function} initMessage include function to change three properties to init state
 */
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
/**
 * React custom hook that allow change state
 * @function useItem
 * @memberof view/hooks
 * @param {object} item include variable state
 * @param {function} setData include function to change property data
 * @param {function} initData include function to change init state
 */
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
/**
 * React custom hook that allow change state
 * @function useAlert
 * @memberof view/hooks
 * @param {object} item include variable state
 * @param {function} setData include function to change all properties, request, message and callback
 * @param {function} setMess include function to change property message
 * @param {function} setCB include function to change property callback
 * @param {function} initData include function to change three properties to init state
 */
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

/**
 * @typedef useState React hook that allow change state into constructor Function React Component
 * @property {any} state  include variable state
 * @property {function} setState include function to change variable state
 * @memberof view/hooks
 */