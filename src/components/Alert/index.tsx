import type {FC} from 'react';
import Alert from "reactjs-alert";

interface AlertProps {
    message: string;
    type: "success" | "error" | "warning" | "info";
    open: boolean;
    setStatus: (arg0: boolean) => void;
}


const AlertC:FC<AlertProps> = ({message, type, open, setStatus})=>{
    return (
        <Alert status={open} type={type} onClose={()=>setStatus(false)} title={message}/>
    )
}
