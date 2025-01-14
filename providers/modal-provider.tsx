"use client"
import PreviewModal from "@/components/preview-modal"
import { useEffect, useState } from "react"

const ModalProvider=()=>{
    const[isMounted,setIsMouted]=useState(false);
useEffect(()=>{
setIsMouted(true);
},[]);

if(!isMounted){
    return null;
}
return(
    <>
    <PreviewModal/>
    </>
)


}
export default ModalProvider;