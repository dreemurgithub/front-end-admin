import {useEffect, useState} from "react";
import {backend_url} from "../url";

export default function Transaction() {

    const [trans_all, set_all] = useState([])
    // const [trans_display, set_display] = useState([])
    const [page, setpage] = useState(0)
    // useEffect(() => {
    //     // const arr = trans_all.slice(5*page, (page+1)*5)
    //     const arr = trans_all.splice(5*page, (page+1)*5)
    //     set_display(arr)
    // }, [page])
    useEffect(() => {
        fetch(`${backend_url}/admin/tran/${page}`, {
            method: 'GET', mode: 'cors', credentials: 'include',
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => res.json()).then(data => {
            console.log(data)
            set_all(data)
        })
    },[])
    useEffect(() => {
        fetch(`${backend_url}/admin/tran/${page}`, {
            method: 'GET', mode: 'cors', credentials: 'include',
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => res.json()).then(data => {
            console.log(data)
            set_all(data)
        })
    },[page])

    return <>
        <div className="col-12">
            <div style={{display:'flex',justifyContent:'space-between',padding:'2em'}}>
                <h3>Latest Transactions</h3>
                <div>
                    <label htmlFor="">Page</label>
                    <input type="number" min='0'value={page} onChange={(e)=>setpage(e.target.value) } size='1' style={{width:'4em'} }/>
                </div>
            </div>
            <div className="col-12" style={{paddingRight: '2em'}} >
                <table className="col-12">
                    <tr style={{
                        display: "grid",
                        gridTemplateColumns: '2fr 1fr 3fr 1fr 2fr 1fr 1fr 1fr',
                        width: '100%'
                    }}>
                        <th style={{textAlign: 'center'}}>ID</th>
                        <th style={{textAlign: 'center'}}>User</th>
                        <th style={{textAlign: 'center'}}>Hotel</th>
                        <th style={{textAlign: 'center'}}>Room</th>
                        <th style={{textAlign: 'center'}}>Date</th>
                        <th style={{textAlign: 'center'}}>Price</th>
                        <th style={{textAlign: 'center'}}>Payment</th>
                        <th style={{textAlign: 'center'}}>Status</th>
                    </tr>

                    {trans_all.map(trans => {
                        return <tr style={{
                            display: "grid",
                            gridTemplateColumns: '2fr 1fr 3fr 1fr 2fr 1fr 1fr 1fr',
                            width: '100%'
                        }}>
                            <td style={{textAlign: 'center'}}>{trans._id}</td>
                            <td style={{textAlign: 'center'}}>{trans.user[0]}</td>
                            <td style={{textAlign: 'center'}}>{trans.hotel.name}</td>
                            <td style={{textAlign: 'center'}}>{trans.roomNumbers.toString()}</td>
                            {/*<td style={{textAlign: 'center'}}>{trans.dateStart.toString().slice(0, 10)} - {trans.dateEnd.toString().slice(0, 10)}</td>*/}
                            <td style={{textAlign: 'center'}}>{new Date(trans.dateStart).toLocaleDateString() } - {new Date(trans.dateEnd).toLocaleDateString() }</td>
                            <td style={{textAlign: 'center'}}>{trans.price}</td>
                            <td style={{textAlign: 'center'}}>{trans.Payment}</td>
                            <td style={{textAlign: 'center'}}>{trans.status}</td>
                        </tr>
                    })}
                </table>
            </div>
        </div>
    </>
}