import {useEffect, useState} from "react";
import {backend_url} from "../url";

export default function Home() {

    const [trans_8,set_8] = useState([])
    useEffect(()=>{
        fetch(`${backend_url}/admin/home`, {
            method: 'GET', mode: 'cors',credentials:'include',
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => res.json()).then(data => {
            console.log(data)
            set_8(data)
        })
    },[])
    return <>
        <div className="col-12">
            <div className="col-12 bg-secondary text-white row">
                <div className="col-3"
                     style={{border: '1px solid white', display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <span>Admin: aaa@a.com</span>
                        <h3>4444</h3>
                    </div>
                    <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                </div>
                <div className="col-3"
                     style={{border: '1px solid white', display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <span>User: xxx@x.com, tài khoản có sẵn giao dịch cũ</span>
                        <h3>4444</h3>
                    </div>
                    <i className="fa fa-money" aria-hidden="true"></i>
                </div>
                <div className="col-3"
                     style={{border: '1px solid white', display: 'flex', justifyContent: 'space-between'}}>
                    <i className="fa  fa-calendar-check-o" aria-hidden="true"></i>
                </div>
                <div className="col-3"
                     style={{border: '1px solid white', display: 'flex', justifyContent: 'space-between'}}>
                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                </div>

            </div>
            <p>Latest Transactions</p>
            <div className="col-12" style={{paddingRight:'2em'}}>
                <table className="col-12" >
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

                    {trans_8.map(trans => {
                        return <tr style={{
                            display: "grid",
                            gridTemplateColumns: '2fr 1fr 3fr 1fr 2fr 1fr 1fr 1fr',
                            width: '100%'
                        }}>
                            <td style={{textAlign: 'center'}}>{trans._id}</td>
                            <td style={{textAlign: 'center'}}>{trans.user[0]}</td>
                            <td style={{textAlign: 'center'}}>{trans.hotel.name}</td>
                            <td style={{textAlign: 'center'}}>{trans.roomNumbers.toString()}</td>
                            <td style={{textAlign: 'center'}}>{new Date(trans.dateStart).toLocaleDateString() } - {new Date(trans.dateEnd).toLocaleDateString()}</td>
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
