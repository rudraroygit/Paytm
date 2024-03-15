import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useState,useEffect } from "react"
import axios from "axios";


export const Dashboard = () => {
    
    const [balance, setBalance] = useState(0);
    const [name,setName]= useState("")

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get("http://localhost:3000/api/v1/account/balance" ,{
            headers: {
                'authorization': `Bearer ${token}`
              }
        })
            .then(response => {
                
                setBalance(response.data.balance);
                setName(response.data.name);
            })
    }, [balance])
    
    
    return <div>
        <Appbar name={name}/>
        <div className="m-8">


            <Balance value={balance} />
            <Users />
        </div>
    </div>
}