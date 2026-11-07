"""
=============================================================================
🥊 VÕ ĐÀI TÌNH YÊU: QUYẾT ĐẤU XEM AI RỬA BÁT & BAO TRÀ SỮA! 🥊
Ngôn ngữ: Python 3 (Tkinter GUI thuần - Không cần cài thêm thư viện)
Cách chạy: Mở Terminal tại D:\\anhQuyen và gõ: python game_vo_dai.py
=============================================================================
"""

import tkinter as tk
from tkinter import messagebox
import random

try:
    import winsound
    def play_hit(): winsound.Beep(450, 60)
    def play_ko(): winsound.Beep(880, 250)
except Exception:
    def play_hit(): pass
    def play_ko(): pass

class LoveBoxingGame:
    def __init__(self, root):
        self.root = root
        self.root.title("🥊 VÕ ĐÀI TÌNH YÊU: AI RỬA BÁT? 🥊")
        self.root.geometry("640x560")
        self.root.configure(bg="#150a21")
        self.root.resizable(False, False)

        self.girl_hp = 100
        self.boy_hp = 100

        # Title Banner
        title = tk.Label(root, text="🔥 ĐẠI CHIẾN VÕ ĐÀI TÌNH YÊU 🔥", 
                         font=("Arial", 18, "bold"), fg="#ffd600", bg="#150a21")
        title.pack(pady=8)

        sub = tk.Label(root, text="Võ sĩ nào gục ngã sẽ phải RỬA BÁT & BAO TRÀ SỮA 1 TUẦN!", 
                       font=("Arial", 10), fg="#e0b0d5", bg="#150a21")
        sub.pack()

        # Health Frame
        hp_frame = tk.Frame(root, bg="#150a21")
        hp_frame.pack(fill="x", padx=30, pady=10)

        # Girl HP
        self.girl_lbl = tk.Label(hp_frame, text="👸 BÉ YÊU: 100%", font=("Arial", 11, "bold"), fg="#ff2a85", bg="#150a21")
        self.girl_lbl.pack(side="left")

        # Boy HP
        self.boy_lbl = tk.Label(hp_frame, text="👦 ANH YÊU: 100%", font=("Arial", 11, "bold"), fg="#00e5ff", bg="#150a21")
        self.boy_lbl.pack(side="right")

        # Canvas Arena
        self.canvas = tk.Canvas(root, width=580, height=260, bg="#241033", highlightthickness=2, highlightbackground="#ffd600")
        self.canvas.pack(pady=10)

        # Draw Ring Ropes
        self.canvas.create_line(0, 80, 580, 80, fill="#ff2a85", width=3)
        self.canvas.create_line(0, 110, 580, 110, fill="#ffd600", width=3)
        self.canvas.create_line(0, 140, 580, 140, fill="#00e5ff", width=3)

        # Girl Fighter (Left)
        self.girl_body = self.canvas.create_oval(120, 120, 180, 180, fill="#ff69b4", outline="#fff", width=3)
        self.girl_face = self.canvas.create_text(150, 150, text="🥰", font=("Arial", 28))
        self.girl_glove = self.canvas.create_oval(175, 140, 205, 170, fill="#ff0055", outline="#fff", width=2)
        self.canvas.create_text(150, 195, text="Vô Địch", font=("Arial", 10, "bold"), fill="#ff94b9")

        # Boy Fighter (Right)
        self.boy_body = self.canvas.create_oval(400, 120, 460, 180, fill="#3894e6", outline="#fff", width=3)
        self.boy_face = self.canvas.create_text(430, 150, text="🥺", font=("Arial", 28))
        self.boy_glove = self.canvas.create_oval(375, 140, 405, 170, fill="#00e5ff", outline="#fff", width=2)
        self.canvas.create_text(430, 195, text="Chịu Trận", font=("Arial", 10, "bold"), fill="#8ad3ff")

        # Controls Button Frame
        btn_frame = tk.Frame(root, bg="#150a21")
        btn_frame.pack(pady=12)

        tk.Button(btn_frame, text="🥊 Đấm Dỗi Hờn (J)", font=("Arial", 11, "bold"), 
                  bg="#ff2a85", fg="#fff", padx=12, pady=6, bd=0, cursor="hand2", command=self.jab).grid(row=0, column=0, padx=6)
        
        tk.Button(btn_frame, text="💥 Móc Hàm 'Ăn Gì Cũng Được' (K)", font=("Arial", 11, "bold"), 
                  bg="#ffd600", fg="#111", padx=12, pady=6, bd=0, cursor="hand2", command=self.uppercut).grid(row=0, column=1, padx=6)
        
        tk.Button(btn_frame, text="⚡ Chiêu: Em Luôn Đúng! (L)", font=("Arial", 11, "bold"), 
                  bg="#00e5ff", fg="#111", padx=12, pady=6, bd=0, cursor="hand2", command=self.ultimate).grid(row=0, column=2, padx=6)

        # Keyboard shortcuts
        self.root.bind("<j>", lambda e: self.jab())
        self.root.bind("<k>", lambda e: self.uppercut())
        self.root.bind("<l>", lambda e: self.ultimate())

    def animate_punch(self):
        play_hit()
        # Punch extension
        self.canvas.move(self.girl_glove, 40, 0)
        self.root.update()
        self.root.after(100)
        self.canvas.move(self.girl_glove, -40, 0)
        
        # Boy shake
        self.canvas.move(self.boy_body, 15, 0)
        self.canvas.move(self.boy_face, 15, 0)
        self.canvas.move(self.boy_glove, 15, 0)
        self.root.update()
        self.root.after(100)
        self.canvas.move(self.boy_body, -15, 0)
        self.canvas.move(self.boy_face, -15, 0)
        self.canvas.move(self.boy_glove, -15, 0)

    def damage_boy(self, dmg, phrase):
        if self.boy_hp <= 0:
            return
        self.animate_punch()
        self.boy_hp = max(0, self.boy_hp - dmg)
        self.boy_lbl.config(text=f"👦 ANH YÊU: {self.boy_hp}%")
        
        # Floating hit text
        tag = self.canvas.create_text(300, 70, text=phrase, font=("Arial", 14, "bold"), fill="#ffd600")
        self.root.after(500, lambda: self.canvas.delete(tag))

        if self.boy_hp < 40:
            self.canvas.itemconfig(self.boy_face, text="😵")
        elif self.boy_hp < 70:
            self.canvas.itemconfig(self.boy_face, text="😭")

        if self.boy_hp <= 0:
            play_ko()
            self.canvas.itemconfig(self.boy_face, text="💀")
            messagebox.showinfo(
                "🏆 K.O! CÔNG CHÚA CHIẾN THẮNG! 👑",
                "TÒA ÁN TÌNH YÊU TUYÊN ÁN:\n\n"
                "1. Anh phải rửa toàn bộ bát đĩa trong 1 tuần tới!\n"
                "2. Đèo em đi mua Trà Sữa Full Topping ngay lập tức!\n"
                "3. Nghiêm cấm hỏi câu 'Hôm nay ăn gì?' dưới mọi hình thức!"
            )
            self.reset_game()

    def jab(self):
        self.damage_boy(15, "BỐP! (-15 HP)")

    def uppercut(self):
        self.damage_boy(30, "MÓC HÀM! (-30 HP)")

    def ultimate(self):
        self.damage_boy(55, "TUYỆT CHIÊU DỖI HỜN! (-55 HP)")

    def reset_game(self):
        self.boy_hp = 100
        self.boy_lbl.config(text="👦 ANH YÊU: 100%")
        self.canvas.itemconfig(self.boy_face, text="🥺")

if __name__ == "__main__":
    app_root = tk.Tk()
    game = LoveBoxingGame(app_root)
    app_root.mainloop()
