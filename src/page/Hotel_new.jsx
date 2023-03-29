import {backend_url} from "../url";

export default function Hotel_new() {
    return <>
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
                    <textarea disabled={true} name="" id="rooms" cols="40" rows="6" className="form-control"></textarea>
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
            <div className="col-md-1">
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
            <button className="btn btn-success col-md-1" onClick={(e) => {
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
                ;
                fetch(`${backend_url}/admin/hotel`, {
                    method: 'post', mode: 'cors', credentials: 'include',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
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
                    alert('Done')
                    // window.location.reload() // load lại page
                })
            }}>Send
            </button>


        </form>
    </>
}