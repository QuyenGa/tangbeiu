# 💖 DỰ ÁN 20/10: QUÀ TẶNG CÔNG CHÚA MEENAA 👑

Dự án quà tặng kỷ niệm ngày 20/10 dành riêng cho **MeeNaa**, tích hợp trải nghiệm lãng mạn đa giác quan và minigame **"Đại Chiến Nóc Nhà MeeNaa"** siêu đáng yêu, mượt mà trên cả PC và thiết bị di động.

---

## 📂 Cấu Trúc Dự Án Chuyên Nghiệp & Gọn Gàng

```text
D:\anhQuyen\anhQuyen\
├── index.html              # Trang quà chính 20/10 (tối ưu siêu nhẹ ~136KB, tải tức thì)
├── game-noc-nha.html       # Minigame Chibi Pop Mart "Đại Chiến Nóc Nhà MeeNaa"
├── server.js               # Node.js Server hỗ trợ stream nhạc chất lượng cao
├── nhaccuaanhyeu.mp3       # Bài hát chủ đề ngọt ngào
├── qr-website-tangbeiu.png # Mã QR tiện lợi để quét mở trên điện thoại
├── README.md               # Tài liệu hướng dẫn dự án
├── demo-assets/            # Tài nguyên đồ họa, hình ảnh minh họa Pop Mart 3D & thiệp
├── images/                 # Kho ảnh kỷ niệm của MeeNaa & Anh Yêu (bảo toàn 100%)
└── archive/                # Thư mục lưu trữ các file demo/backup cũ, giữ thư mục gốc siêu gọn
    ├── backups/            # Bản sao lưu cũ trước khi tối ưu (index 5MB, v.v.)
    ├── demos_html/         # Các bản HTML demo thử nghiệm giao diện
    ├── legacy_js_css/      # Code script/style cũ đã được tích hợp gọn
    └── old_games/          # Các nguyên mẫu game quyền anh/python cũ
```

---

## ✨ Điểm Nổi Bật

### 1. 💌 Website Quà Tặng 20/10 (`index.html`)
- **Tối ưu hóa hiệu năng vượt trội:** Giảm kích thước trang từ **3.3 MB xuống 136 KB (giảm 98%)**, loại bỏ toàn bộ dữ liệu base64 nặng nề, tải trong nháy mắt kể cả mạng 3G/4G yếu.
- **Hành trình 4 màn cảm xúc:**
  1. *Hộp quà bí mật & Đôi chim uyên ương:* Mở hộp quà với âm nhạc *Everytime*.
  2. *Lá thư tình 20/10:* Lời nhắn gửi chân thành, dịu dàng.
  3. *Nhật ký kỷ niệm:* Album ảnh Polaroid vuốt chạm mượt mà, trình chiếu tự động & phòng trưng bày tất cả ảnh kỷ niệm.
  4. *Tấm vé đặc quyền & Lời hứa:* Tấm vé hẹn hò VIP với tương tác thú vị ("Dạ có", "Để em suy nghĩ", "Em đang dỗi").
- **Tích hợp minigame tức thì:** Có thể mở game trực tiếp từ nút ghim nổi `👑 ĐẠI CHIẾN NÓC NHÀ 💖` hoặc sau khi hoàn thành phần vé hẹn hò. Chơi ngay trong popup modal mà không bị mất trang hiện tại.

### 2. 👑 Minigame "Đại Chiến Nóc Nhà MeeNaa" (`game-noc-nha.html`)
- **Đồ họa Chibi 3D Pop Mart siêu đáng yêu:** Nhân vật MeeNaa đội vương miện cầm ly trà sữa; Anh Yêu ôm gối *Vợ Là Số 1*.
- **Bộ kỹ năng cute xỉu:**
  - 🥊 *Đấm yêu:* MeeNaa vung nắm đấm bông làm anh yêu lùi bước.
  - 🧋 *Bắn Trà Sữa:* Trân châu đường đen bắn bay tà tà làm anh yêu giật mình.
  - 👡 *Phi Dép Cute:* Ném dép bông thỏ hồng chính xác từng centimet.
  - 💸 *Ting Ting:* Cơn mưa chuyển khoản ngân hàng ting-ting làm anh yêu cảm động.
- **Cơ chế Anh Yêu "chịu đòn trâu bò":**
  - Máu dày (600 HP), di chuyển qua lại, biết lấy gối đỡ đòn.
  - Mỗi khi bị dính đòn, bong bóng thoại truyện tranh hiện lên hàng loạt câu xin lỗi hài hước: *"Anh xin lỗi nóc nhà!", "Vợ nói gì cũng đúng!", "Tối nay anh tự giác rửa bát!", "Em xinh nhất trần đời!"...*
  - **Cơ chế Choáng & Hôn trộm:** Cứ mất mỗi 10% máu, anh yêu sẽ bị choáng với sao xoay vòng trên đầu (`⭐💫✨`), sau đó tức giận (`😤`) rồi bất ngờ lao tới hôn chụt MeeNaa (`💋 CHU MOAH~`) rồi co cẳng chạy thục mạng (`🏃‍♂️💨`).
- **Phần thưởng chiến thắng:** Khi anh yêu đầu hàng, MeeNaa nhận ngay voucher trà sữa Phúc Long/Mixue, lẩu Haidilao và 1 tuần rửa bát!

---

## 🚀 Hướng Dẫn Chạy & Trải Nghiệm

1. **Khởi chạy Local Server (đang chạy nền sẵn):**
   ```powershell
   node D:\anhQuyen\anhQuyen\server.js
   ```
2. **Truy cập:**
   - 🌟 **Trang chính quà tặng:** [http://localhost:3000/index.html](http://localhost:3000/index.html)
   - 🎮 **Chơi minigame độc lập:** [http://localhost:3000/game-noc-nha.html](http://localhost:3000/game-noc-nha.html)
3. **Mở trên điện thoại:**
   - Đảm bảo điện thoại và máy tính cùng chung mạng Wi-Fi, truy cập `http://<IP-Máy-Tính>:3000` hoặc quét mã `qr-website-tangbeiu.png`.
