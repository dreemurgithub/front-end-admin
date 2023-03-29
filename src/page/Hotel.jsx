import {useState, useEffect} from "react";
import {backend_url} from "../url";

export default function Hotel() {

    const [hotel_state, set_hotel] = useState([])
    useEffect(() => {
        fetch(`${backend_url}/admin/hotel`, {
            method: 'GET', mode: 'cors', credentials: 'include',
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => res.json()).then(data => {
            console.log(data)
            set_hotel(data)
        })
    }, [])
    return <>
        <div className="col-12">

            <h3>Hotel List</h3>
            <div className="col-12" style={{paddingRight: '2em'}}>
                <table className="col-12">
                    <tr style={{
                        display: "grid",
                        gridTemplateColumns: '2fr 2fr 1fr 1fr 2fr 1fr 1fr 1fr 1fr',
                        width: '100%'
                    }}>
                        <th style={{textAlign: 'center'}}>ID</th>
                        <th style={{textAlign: 'center'}}>Name</th>
                        <th style={{textAlign: 'center'}}>Type</th>
                        <th style={{textAlign: 'center'}}>City</th>
                        <th style={{textAlign: 'center'}}>Room IDs</th>
                        <th style={{textAlign: 'center'}}>Price</th>
                        <th style={{textAlign: 'center'}}>Edit</th>
                        <th style={{textAlign: 'center'}}>Save</th>
                        <th style={{textAlign: 'center'}}>Delete</th>
                    </tr>

                    {hotel_state.map(hotel => Hotel_tr(hotel))}
                </table>
            </div>
            <h3>Edit Hotel</h3>
            <form className="row g-3" style={{padding: '2em'}}>
                <div className="col-md-6">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" id="name"/>
                </div>
                <div className="col-md-3">
                    <label className="form-label">Type</label>
                    <select id="type" className="form-select">
                        <option value='hotel'>Hotel</option>
                        <option value='villas'>Villas</option>
                        <option value='resorts'>Resorts</option>
                        <option value='cabins'>Cabins</option>
                        <option value='apartment'>Apartment</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <label htmlFor="inputPassword4" className="form-label">Distance from center</label>
                    <input type="number" className="form-control" id="distance"/>

                </div>
                <div className="col-12">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" placeholder="1234 Main St"/>
                </div>

                <div className="col-12" style={{display: 'flex', gap: '1em'}}>

                    <div className="col-md-3">
                        <label className="form-label">Description</label><br/>
                        <textarea name="" id="description" cols="40" rows="6" className="form-control"></textarea> <br/>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Rooms - , to seperate</label><br/>
                        <textarea name="" id="rooms" cols="40" rows="6" disabled={true}
                                  className="form-control"></textarea>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Photos - , to seperate</label><br/>
                        <textarea name="" id="photos" cols="60" rows="6" className="form-control"></textarea>
                    </div>

                </div>
                <div className="col-md-6">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" id="title"/>
                </div>
                <div className="col-md-2">
                    <label className="form-label">City</label>
                    <select id="city" className="form-select">
                        <option value='Ha Noi'>Ha Noi</option>
                        <option value='Ho Chi Minh'>Ho Chi Minh</option>
                        <option value='Da Nang'>Da Nang</option>
                    </select>
                </div>
                <div className="col-md-1">
                    <label className="form-label">Rating</label>
                    <input type="number" step="0.1" className="form-control" id="rating"/>
                </div>
                <div className="col-md-2">
                    <label className="form-label">Feature?</label>
                    <select id="feature" className="form-select">
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>
                <div className="col-md-1">
                    <label className="form-label">Price</label>
                    <input type="text" className="form-control" id="price"/>

                </div>

            </form>
        </div>
    </>
}

function Hotel_tr(hotel) {
    function edit_to_form() {
        document.querySelector('#name').value = hotel.name;
        document.querySelector('#type').value = hotel.type;
        document.querySelector('#distance').value = hotel.distance;
        document.querySelector('#description').value = hotel.desc;
        document.querySelector('#rooms').value = hotel.rooms.toString();
        document.querySelector('#photos').value = hotel.photos.toString();
        document.querySelector('#title').value = hotel.title;
        document.querySelector('#city').value = hotel.city;
        document.querySelector('#rating').value = hotel.rating;
        document.querySelector('#address').value = hotel.address;
        document.querySelector('#price').value = hotel.cheapestPrice;
    }

    function fetch_put(e) {
        e.preventDefault()
        if (document.querySelector('#name').value === '' ||
            document.querySelector('#type').value === '' ||
            document.querySelector('#description').value === '' ||
            document.querySelector('#photos').value === '' ||
            document.querySelector('#title').value === '' ||
            document.querySelector('#price').value === '' ||
            document.querySelector('#address').value === ''
        ) {
            alert('Blank Space');
            return
        }
        if (window.confirm(`You are about to save the - ${hotel.name} - Information by the form below, are you sure?`) === true) {
            fetch(`${backend_url}/admin/hotel`, {
                method: 'put', mode: 'cors', credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: hotel._id,
                    name: document.querySelector('#name').value,
                    type: document.querySelector('#type').value,
                    distance: document.querySelector('#distance').value,
                    desc: document.querySelector('#description').value,
                    rooms: document.querySelector('#rooms').value,
                    photos: document.querySelector('#photos').value,
                    title: document.querySelector('#title').value,
                    city: document.querySelector('#city').value,
                    rating: document.querySelector('#rating').value,
                    feature: document.querySelector('#feature').value,
                    price: document.querySelector('#price').value,
                    address: document.querySelector('#address').value

                })
            })
                .then(res => res.json()).then(data => {
                console.log(data)
                window.location.reload() // load lại page
            })
        }

    }

    return <tr style={{
        display: "grid",
        gridTemplateColumns: '2fr 2fr 1fr 1fr 2fr 1fr 1fr 1fr 1fr',
        width: '100%'
    }}>
        <td style={{textAlign: 'center'}}>{hotel._id}</td>
        <td style={{textAlign: 'center'}}>{hotel.name}</td>
        <td style={{textAlign: 'center'}}>{hotel.type}</td>
        <td style={{textAlign: 'center'}}>{hotel.city}</td>
        <td style={{textAlign: 'center'}}>{hotel.rooms.map(el =>
            <><small>{el}</small> <br/>
            </>)}
        </td>
        <td style={{textAlign: 'center'}}>{hotel.cheapestPrice}</td>
        <td style={{textAlign: 'center'}}>
            <button className="btn btn-primary" onClick={edit_to_form}>Edit</button>
        </td>
        <td style={{textAlign: 'center'}}>
            <button type="button" className="btn btn-danger" id={hotel._id} onClick={fetch_put}>Save</button>
        </td>
        <td style={{textAlign: 'center'}}>
            <button className="btn btn-secondary" onClick={() => {
                if (window.confirm(`You are about to delete the - ${hotel.name} - Information by the form below, are you sure?`) === true) {
                    fetch(`${backend_url}/admin/hotel`, {
                        method: 'delete', mode: 'cors', credentials: 'include',
                        headers: {'Content-Type': 'application/json'},
                        body:JSON.stringify({
                            id:hotel._id
                        })
                    })
                        .then(res => res.json()).then(data => {
                        console.log(data)
                        window.location.reload() // load lại page
                    })
                }

            }}>Delete
            </button>
        </td>
    </tr>

}