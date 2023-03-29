import Navbar from './page/navbar';
import User_context from "./User_context";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useState} from "react";
import Home from "./page/Home";
import Hotel from "./page/Hotel";
import Room_new from "./page/Room_new";
import Hotel_new from "./page/Hotel_new";
import Transaction from "./page/Transaction";
import Room from "./page/Room";
function App() {
    const [userLogin, setLogin] = useState(false)
    return (
        <User_context.Provider value={[userLogin, setLogin]}>
            <BrowserRouter>
                <div style={{display: 'grid', gridTemplateColumns: '13em 1fr', gap: '1em'}}>

                    <Navbar/>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/hotel' element={<Hotel/>}/>
                        <Route path='/room_new' element={<Room_new/>}/>
                        <Route path='/hotel_new' element={<Hotel_new />} />
                        <Route path='/transaction' element={<Transaction />} />
                        <Route path='/room' element={<Room />} />

                    </Routes>
                </div>
            </BrowserRouter>
        </User_context.Provider>
    );
}

export default App;
