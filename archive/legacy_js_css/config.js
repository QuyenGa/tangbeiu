/**
 * ===================================================================
 *  TRUNG TÂM CẤU HÌNH DỰ ÁN KỶ NIỆM (CONFIG)
 *  Bạn có thể dễ dàng thay đổi nội dung, ảnh, bài hát, lời chúc tại đây!
 * ===================================================================
 */

window.APP_CONFIG = {
    // 1. Tiêu đề trang & Người nhận
    recipientName: "Em Yêu", // Tên hoặc biệt danh người nhận
    senderName: "Anh",       // Tên người gửi
    pageTitle: "Chúc Mừng Ngày Đặc Biệt Dành Cho Em ❤️",

    // 2. Chủ đề màu sắc: 'sakura' (Hồng ngọt ngào) | 'starry' (Bầu trời đêm lãng mạn) | 'sunset' (Hoàng hôn ấm áp)
    theme: 'sakura',

    // 3. Ảnh dùng cho màn ghép Puzzle 3x3
    puzzleImage: 'images/anh1.JPG',

    // 4. Nội dung bức thư tình (Hiệu ứng gõ máy chữ typewriter)
    letterText: `Gửi babi cụa anhhh...
Chúc công chúa của anh một ngày thật vui vẻ và hạnh phúc nhéee ❤️ 🌷 Anh mong em lúc nào cũng giữ được nụ cười xinh xắn trên môi, luôn vui vẻ, bình an và gặp thật nhiều điều tốt đẹp trong cuộc sống. Cảm ơn em vì đã xuất hiện và trở thành một phần đặc biệt trong thế giới của anh.

Anh không biết sau này sẽ có bao nhiêu điều thay đổi, nhưng anh mong mình vẫn có thể ở bên cạnh em, cùng em chia sẻ những niềm vui, an ủi em những lúc buồn và yêu thương em bằng tất cả sự chân thành của mình. Anh không hứa sẽ khiến mọi ngày của em đều hoàn hảo, nhưng anh sẽ cố gắng để em luôn cảm nhận được rằng mình được yêu thương và trân trọng.

Chúc cô gái của anh ngập tràn hoa, quà, niềm vui và đặc biệt là thật nhiều tình yêu từ anh nhaaa.

Yêu em nhiều lắmmm, bé yêu của anh ❤️ 🌷 🐻`,

    // 5. Ngăn Lời nhắn nhỏ trong Hộp Kỷ Niệm
    keepsakeNote: 'Babii cụa anh, buổi trưa nhớ phải ăn đúng giờ nghe chưa, hong được bỏ bữa kẻo anh lo đó nghenn ♡',

    // 6. Ngăn Những điều mình sẽ cùng làm (Bucket list)
    keepsakeWishes: [
        'Ngắm hoàng hôn cùng nhau',
        'Cùng nhau đu trend tíc tóccc',
        'Chụp Photobooth thật xinh',
        'Đi ăn mì cayyy cùng nhau',
        'Dành trọn một ngày chỉ để ở bên nhau',
        'Cùng nhau đi du lịch đến một nơi thật xa'
    ],

    // 7. Danh sách ảnh kỷ niệm (Dùng để treo trên cành cây và hiển thị trong Album Polaroid)
    photos: [
        'images/anh1.JPG',
        'images/anh2.JPG',
        'images/anh3.JPG'
    ],

    // 8. Cấu hình bài hát phát nền
    music: {
        title: "Giai điệu của chúng mình",
        subTitle: "BÀI HÁT DÀNH CHO EM",
        quote: "Một bài hát, dành riêng cho một người ♡",
        sources: [
            { src: "music.m4a", type: "audio/mp4" },
            { src: "music.aac", type: "audio/aac" }
        ],
        defaultVolume: 65 // Âm lượng mặc định (0 - 100)
    }
};
