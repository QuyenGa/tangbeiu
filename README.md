# 💖 Dự Án Kỷ Niệm Tương Tác (Love Keepsake Web App)

Dự án web thiệp tình cảm & kỷ niệm tương tác đa giai đoạn, được xây dựng bằng công nghệ web thuần tối ưu tốc độ, mượt mà trên cả máy tính và điện thoại thông minh.

---

## 🌟 Các Tính Năng Nổi Bật

1. **Giai đoạn 1 – Ghép Ảnh Kỷ Niệm (Puzzle 3×3):**
   - Mưa hạt cánh hoa & vì sao bồng bềnh trên Canvas.
   - Ghép ảnh hoán đổi vị trí với thanh tiến độ thời gian thực.
   - Nút hoàn thành nhanh tiện lợi.
   - Tự động mở nhạc khi người dùng tương tác lần đầu hoặc khi hoàn thành 100%.

2. **Giai đoạn 2 – Cây Tình Yêu (Heart Tree Canvas):**
   - Thân cây fractal đâm chồi, nở rộ hơn 700 trái tim đủ sắc màu.
   - Lá rơi chạm mặt đất có độ nảy và bóng sáng.
   - Chạm/click ngón tay vào bất kỳ trái tim nào để kích nổ chùm pháo hoa lấp lánh (sparkles).
   - Ảnh kỷ niệm treo đung đưa theo gió, luân phiên thay đổi ảnh và click để xem phóng to (Lightbox).

3. **Giai đoạn 3 – Lá Thư Tình & Chiếc Hộp Kỷ Niệm:**
   - Chữ gõ tự động theo hiệu ứng máy đánh chữ (Typewriter).
   - Nút **"Cuộn thư lại"** với hiệu ứng cuộn tròn giấy vật lý chân thực.
   - Mở ra **Chiếc Hộp Kỷ Niệm (Keepsake Box)** gồm 4 ngăn:
     - 💌 *Lá thư của anh* (Đọc lại thư bất kỳ lúc nào).
     - 📷 *Album của em* (Lưới ảnh polaroid dán băng dính washi tape, click xem phóng to).
     - 📝 *Lời nhắn nhỏ* (Sticky note ngọt ngào nhắc nhở ăn uống, chăm sóc bản thân).
     - ✨ *Điều mình sẽ làm* (Bucket list các buổi hẹn hò tương lai).

4. **Trình phát đĩa than (Vinyl Player):**
   - Đĩa than quay tít, kim đĩa hạ xuống khi phát nhạc, sóng âm thanh nhấp nhô.
   - Tối ưu dock điều khiển cố định phía dưới màn hình điện thoại (Safe Area).

---

## 🚀 Hướng Dẫn Khởi Chạy

### Cách 1: Chạy bằng Node.js (Khuyên dùng - stream nhạc siêu mượt)
Mở cửa sổ dòng lệnh (Terminal/PowerShell) tại thư mục `D:\anhQuyen` và chạy:
```bash
node server.js
```
Sau đó mở trình duyệt truy cập: **http://localhost:3000**

### Cách 2: Mở trực tiếp
Bạn chỉ cần click đúp vào file `index.html` để mở ngay trên trình duyệt (Chrome, Safari, Edge, Cốc Cốc, v.v.).

---

## ✏️ Hướng Dẫn Tùy Biến Nội Dung Cực Dễ

Tất cả nội dung được tập trung trong duy nhất một file: **`config.js`**. Bạn chỉ cần mở file này lên để chỉnh sửa:

- **Tên người nhận & tiêu đề:** Sửa `recipientName`, `pageTitle`.
- **Chủ đề màu sắc (`theme`):**
  - `'sakura'`: Tông hồng phấn ngọt ngào, lãng mạn (mặc định).
  - `'starry'`: Tông xanh vũ trụ & ngân hà lấp lánh sao.
  - `'sunset'`: Tông cam hoàng hôn & vàng nắng ấm áp.
- **Nội dung thư tình:** Sửa nội dung trong biến `letterText`.
- **Lời nhắn nhỏ:** Sửa nội dung trong `keepsakeNote`.
- **Danh sách điều ước:** Thêm/bớt các mục trong mảng `keepsakeWishes`.
- **Thêm ảnh riêng của bạn:** Copy ảnh của bạn vào thư mục `images/` và thêm tên ảnh vào danh sách `photos` trong `config.js`.
- **Đổi bài hát:** Thay file `music.m4a` / `music.aac` / `music.mp3` của bạn và cập nhật đường dẫn trong `config.js`.

---

## 🌐 Chia Sẻ Link Cho Người Ấy

Bạn có thể đưa toàn bộ thư mục `D:\anhQuyen` lên các nền tảng lưu trữ web miễn phí:
- **Vercel** / **Netlify**: Chỉ cần kéo thả thư mục vào là có ngay đường link `https://ten-ban-chon.vercel.app` để gửi qua Zalo / Messenger.
- **GitHub Pages**: Tạo repository và bật tính năng GitHub Pages.
