import {useEffect, useState} from "react";
import {backend_url} from "../url";

export default function Room() {
    const [room_list, set_list] = useState([])
    useEffect(() => {
        fetch(`${backend_url}/admin/rooms`, {
            method: 'GET', mode: 'cors', credentials: 'include',
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => res.json()).then(data => {
            set_list(data)
        })
    }, [])
    return <>
        <div className="col-12">

            <h3>Room List</h3>
            <div className="col-12" style={{paddingRight: '2em'}}>
                <table className="col-12">
                    <tr style={{
                        display: "grid",
                        gridTemplateColumns: '2fr 1fr 2fr 0.5fr 0.5fr 1fr 1fr 1fr',
                        width: '100%'
                    }}>
                        <th style={{textAlign: 'center'}}>ID</th>
                        <th style={{textAlign: 'center'}}>Title</th>
                        <th style={{textAlign: 'center'}}>Description</th>
                        <th style={{textAlign: 'center'}}>Price</th>

                        <th style={{textAlign: 'center'}}>Max</th>
                        <th style={{textAlign: 'center'}}>Last Booked</th>
                        <th style={{textAlign: 'center'}}>Room Numbers</th>
                        <th style={{textAlign: 'center'}}>Delete</th>
                    </tr>

                    {room_list.map(room => Room_table(room))}
                </table>
            </div>

        </div>
    </>
}

function Room_table(room) {
    const time = latest_date(room.date_fill) // time[1] dùng để validate xóa
    function delete_room() {
        let today_time = new Date().getTime()
        if (today_time > time[1]) {
            console.log(room._id);
            if (window.confirm(`You are about to delete the - ${room.title} - Room - ${room.roomNumbers.toString()}. Are you sure?`) === true) {
                fetch(`${backend_url}/admin/rooms/${room._id}/${room.hotel}`, {
                    method: 'delete', mode: 'cors', credentials: 'include',
                    headers: {'Content-Type': 'application/json'}
                })
                    .then(res => res.json()).then(data => {
                    console.log(data)
                    window.location.reload() // load lại page
                })
            }
        } else {
            alert('Cant Delete');
            return
        }
    }

    return <>
        <tr style={{
            display: "grid",
            gridTemplateColumns: '2fr 1fr 2fr 0.5fr 0.5fr 1fr 1fr 1fr',
            width: '100%'
        }}>
            <td style={{textAlign: 'center'}}>{room._id}</td>
            <td style={{textAlign: 'center'}}>{room.title}</td>
            <td style={{textAlign: 'center'}}>{room.desc}</td>
            <td style={{textAlign: 'center'}}>{room.price}</td>
            <td style={{textAlign: 'center'}}>{room.maxPeople}</td>
            <td style={{textAlign: 'center'}}>{time[0]}</td>
            <td style={{textAlign: 'center'}}>{room.roomNumbers.toString()}</td>
            <td style={{textAlign: 'center'}}>
                <button className="btn btn-secondary" style={ {display:'none'} } onClick={delete_room}>Delete</button>
            </td>
        </tr>
    </>
}

function latest_date(date_fill) {
    // console.log(props_list)
    const arr = date_fill.map(el => el.date[0])
    const arr_get_time = arr.map(el => {
        if (el === undefined) return 0;
        if (el !== undefined) return new Date(el).getTime()
    })
    arr_get_time.sort((a, b) => b - a)

    return [new Date(arr_get_time[0]).toLocaleDateString(), arr_get_time[0]]
}