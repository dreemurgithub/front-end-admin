# App tạo từ create-react-app

## Dev enviroment, deploy, cách vận hành

### Server link trong url.js

```
const backend_url = window.location.host.includes('localhost') ? 'http://localhost:5000' : 'https://Hotelbackendasm2.ducminh27.repl.co';
```

Dưới dev enviroment server là localhost:5000, deploy server sẽ là https://Hotelbackendasm2.ducminh27.repl.co và deploy
server có coldstart nên sẽ load sản phẩm lần đầu tiên trong 30s

### Deploy site

https://admin-hotel-asm2.web.app với account có sẵn là aaa@a.com với password 4444 . Sau khi đăng nhập sẽ hiện ra 8 transaction mới nhất

## Cách vận hành

Tất cả các user tạo ra từ USER frontend tại https://hotel-asm.firebaseapp.com/ đều có thể đăng nhập. Nhưng chỉ có user admin: true mới có thể đăng nhập sử dụng https://admin-hotel-asm2.web.app . Sau khi tạo session từ đăng nhập thì mọi fetch request sẽ send session qua admin route để kiểm tra. Đọc thêm https://github.com/dreemurgithub/backend2_asm2_mon5 để nắm cách thức hoạt động của các session cho user và admin 
## Chi tiết chức năng(Đăng nhập Admin mới dùng được)

### Edit Hotel trong https://admin-hotel-asm2.web.app/hotel

Sử dụng post request chứa ID của Hotel và các thông tin khác để edit đúng hotel cần, tương tự với lệnh delete sử dụng delete request. Ngoài ra link trên chứa mọi ID của room trong hotel

### https://admin-hotel-asm2.web.app/room với danh sách phòng của từng Hotel

Hiển thị toàn bộ room, và mỗi room đều thuộc về một Hotel(xem title)
### https://admin-hotel-asm2.web.app/transaction Mọi transaction mọi user

Edit page từ 0 tới... để hiển thị nhóm 5 transaction/lần

### https://admin-hotel-asm2.web.app/hotel_new để tạo Hotel mới

Nhập các thông tin như name, type... và danh sách các Photos, tách ra bởi dấu phẩy để parse text
### https://admin-hotel-asm2.web.app/room_new để tạo room mới

Nhập title, chọn Hotel và auto ghi Hotel ID, Room number cách nhau bởi dấu phẩy để parse text

### Signin/Signout (khi đăng nhập có session sẽ hiển thị signout)
Nhập thông tin đăng nhập rồi Click signin, coldstart của server trên replit sẽ cần 30s để load

