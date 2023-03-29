import {useEffect, useState} from "react";
import {backend_url} from "../url";

export default function Room_new() {
    useEffect(() => {
        fetch(`${backend_url}/admin/hotel`, {
            method: 'GET', mode: 'cors', credentials: 'include',
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => res.json()).then(data => {
            const arr = []
            data.forEach(el => arr.push({_id: el._id, name: el.name}))
            set_list(arr)
        })
    }, [])
    const [hotel_list, set_list] = useState([])

    return <div>
        <h3>New room</h3>
        <form className="row g-3" style={{padding: '2em'}}>
            <div className="col-md-4">
                <label className="form-label">Title</label>
                <input type="text" className="form-control" id="title"/>
            </div>
            <div className="col-md-4">
                <label className="form-label">Hotel Name</label>
                <select id="hotel_id" className="form-select"
                        onChange={(e) => document.querySelector('#hotel_onchange').value = e.target.value}>
                    <option value=''></option>
                    {hotel_list.map(el => <>
                        <option value={el._id}>{el.name}</option>
                    </>)}
                </select>
            </div>
            <div className="col-md-4">
                <label className="form-label">Hotel ID</label>
                <input type="text" className="form-control" id='hotel_onchange' disabled={true}/>
            </div>
            <div className="col-md-6">
                <label className="form-label">Description</label>
                <input type="text" className="form-control" id="desc"/>
            </div>
            <div className="col-md-3">
                <label htmlFor="inputPassword4" className="form-label">Room Numbers</label>
                <input type="text" className="form-control" id="roomNumbers"/>

            </div>
            <div className="col-md-1">
                <label className="form-label">Max people</label>
                <input type="number" className="form-control" id="maxPeople" min='0'/>
            </div>

            <div className="col-md-1">
                <label className="form-label">Price</label>
                <input type="number" className="form-control" id="price"/>

            </div>
            <button className="btn btn-success col-md-1" onClick={(e) => {
                e.preventDefault()
                if (document.querySelector('#hotel_id').value !== '') fetch(`${backend_url}/admin/rooms`, {
                    method: 'post', mode: 'cors', credentials: 'include',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        hotel_id: document.querySelector('#hotel_id').value,
                        desc: document.querySelector('#desc').value,
                        roomNumbers: document.querySelector('#roomNumbers').value,
                        title: document.querySelector('#title').value,
                        price: document.querySelector('#price').value,
                        maxPeople: document.querySelector('#maxPeople').value

                    })
                })
                    .then(res => res.json()).then(data => {
                        console.log(data)
                        alert('Done')
                        // window.location.reload() // load lại page
                    })
                if (document.querySelector('#hotel_id').value === '') alert('Pick a hotel')
            }}>Send
            </button>


        </form>
    </div>
}