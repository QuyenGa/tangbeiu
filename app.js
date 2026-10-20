// ── Application Coordinator ───────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    const config = window.APP_CONFIG || {};

    // 1. Áp dụng Theme và Tiêu đề từ Config
    const theme = config.theme || 'sakura';
    document.documentElement.setAttribute('data-theme', theme);
    if (config.pageTitle) document.title = config.pageTitle;

    const letterTitleEl = document.getElementById('letter-title');
    if (letterTitleEl && config.recipientName) {
        letterTitleEl.textContent = `❤ Thư Gửi ${config.recipientName} ❤`;
    }

    const LETTER_TEXT     = config.letterText || 'Chúc em một ngày luôn vui vẻ, bình an và hạnh phúc! ❤️';
    const KEEPSAKE_NOTE   = config.keepsakeNote || 'Nhớ ăn uống đầy đủ và giữ nụ cười thật tươi nhé! ♡';
    const KEEPSAKE_WISHES = config.keepsakeWishes || ['Ngắm hoàng hôn cùng nhau', 'Cùng nhau đi du lịch xa'];
    const PHOTOS          = config.photos || [];

    let photoIndex    = 0;
    let lightboxIndex = 0;
    let stopPetals    = null;

    const stagePuzzle   = document.getElementById('stage-puzzle');
    const stageMain     = document.getElementById('stage-main');
    const petalCanvas   = document.getElementById('petal-canvas');
    const treeCanvas    = document.getElementById('tree-canvas');
    const letterCard    = document.getElementById('letter-card');
    const letterBody    = document.getElementById('letter-body');
    const viewBtn       = document.getElementById('view-photos-btn');
    const rollBtn       = document.getElementById('roll-letter-btn');
    const home          = document.getElementById('keepsake-home');
    const detail        = document.getElementById('keepsake-detail');
    const detailContent = document.getElementById('keepsake-content');
    const status        = document.getElementById('keepsake-status');
    const lightbox      = document.getElementById('lightbox-modal');
    const lightboxImg   = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    // Đưa chú thỏ sticker vào footer để định vị chuẩn xác
    const bunny = document.querySelector('.letter-bunny');
    const footer = document.querySelector('.letter-footer');
    if (bunny && footer) footer.appendChild(bunny);

    const characters = Array.from(LETTER_TEXT);
    let textNode;
    let rolling = false;
    let returnFocus = viewBtn;

    // ── Khởi động mưa cánh hoa ở Stage 1
    if (petalCanvas && typeof startPetalSystem === 'function') {
        stopPetals = startPetalSystem(petalCanvas);
    }

    // ── Khởi động trò chơi ghép ảnh Puzzle 3x3
    new PuzzleGame('puzzle-mount', {
        imageSrc: config.puzzleImage || 'images/screen.JPG',
        onComplete: () => {
            // Tự động phát nhạc khi ghép xong
            if (window.startMusic) window.startMusic();

            // Chuyển cảnh mượt mà sang Stage 2
            stagePuzzle.classList.add('fade-out');
            if (stopPetals) stopPetals();

            setTimeout(() => {
                stagePuzzle.style.display = 'none';
                stageMain.style.display   = 'block';
                stageMain.classList.add('fade-in');
                initTreeStage();
            }, 700);
        }
    });

    // ── Giai đoạn Cây Tình Yêu
    function initTreeStage() {
        const tree = new HeartTree(treeCanvas, () => {
            // Cây nở rộ hoàn tất → Mở lá thư tình
            setTimeout(() => {
                letterCard.classList.add('visible');
                startTypewriter();
            }, 600);
        });
        tree.start();
    }

    // ── Hiệu ứng máy đánh chữ gõ từng ký tự thư
    function startTypewriter() {
        let i = 0;
        letterBody.textContent = '';
        textNode = document.createTextNode('');
        letterBody.appendChild(textNode);

        function tick() {
            if (i < characters.length) {
                textNode.appendData(characters[i]);
                if (letterBody.parentElement) {
                    letterBody.parentElement.scrollTop = letterBody.parentElement.scrollHeight;
                }
                i++;
                setTimeout(tick, 16);
            } else {
                // Gõ xong thư → Hiện nút cuộn thư và treo ảnh lên cành cây
                if (letterBody.parentElement) {
                    letterBody.parentElement.scrollTop = 0;
                }
                rollBtn.hidden = false;
                startTreePhotos();
            }
        }
        tick();
    }

    // ── Treo ảnh kỷ niệm lên cành cây
    const treeMemories = new TreeMemories(
        treeCanvas,
        PHOTOS,
        index => openPhoto(index),
        index => {
            photoIndex = index;
            viewBtn.classList.add('visible');
        }
    );

    function startTreePhotos() {
        treeMemories.start();
    }

    // ── Lightbox phóng to ảnh Polaroid
    function openPhoto(index = photoIndex) {
        if (!PHOTOS.length) return;
        returnFocus = document.activeElement;
        lightboxIndex = index;
        lightboxImg.src = PHOTOS[lightboxIndex];
        lightboxImg.alt = `Ảnh kỷ niệm ${lightboxIndex + 1}`;
        lightbox.classList.add('active');
        treeMemories.pause();
        lightboxClose.focus();
    }

    function closePhoto() {
        lightbox.classList.remove('active');
        treeMemories.resume();
        if (returnFocus instanceof HTMLElement && returnFocus.isConnected) {
            returnFocus.focus();
        }
    }

    viewBtn.addEventListener('click', () => openPhoto());
    lightboxClose.addEventListener('click', closePhoto);
    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) closePhoto();
    });

    // ── Thao tác Cuộn thư lại để mở Chiếc Hộp Kỷ Niệm
    function showHome() {
        home.hidden = false;
        detail.hidden = true;
        status.textContent = 'Thư đã được cất gọn. Hộp kỷ niệm đã mở.';
        const firstBtn = home.querySelector('button');
        if (firstBtn) firstBtn.focus();
    }

    function rollLetter() {
        if (rolling || rollBtn.hidden || letterCard.hidden) return;
        rolling = true;
        rollBtn.disabled = true;
        treeMemories.stop();
        viewBtn.classList.remove('visible');

        letterCard.style.setProperty('--unrolled-height', `${letterCard.getBoundingClientRect().height}px`);
        letterCard.classList.add('rolling-up');
        status.textContent = 'Đang cuộn thư…';

        const done = () => {
            letterCard.hidden = true;
            letterCard.classList.remove('rolling-up');
            letterCard.style.removeProperty('--unrolled-height');
            rollBtn.disabled = false;
            rolling = false;
            showHome();
        };

        const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
        setTimeout(done, reducedMotion ? 0 : 2800);
    }

    rollBtn.addEventListener('click', rollLetter);

    // Hỗ trợ vuốt lên (swipe up) trên màn hình cảm ứng để cuộn thư
    let pullY = null;
    rollBtn.addEventListener('pointerdown', e => {
        pullY = e.clientY;
        rollBtn.setPointerCapture(e.pointerId);
    });
    rollBtn.addEventListener('pointerup', e => {
        if (pullY !== null && pullY - e.clientY > 30) rollLetter();
        pullY = null;
    });
    rollBtn.addEventListener('pointercancel', () => { pullY = null; });

    // ── Mở 4 ngăn kéo trong Hộp Kỷ Niệm
    function openKeepsake(name) {
        home.hidden = true;
        detail.hidden = true;

        if (name === 'letter') {
            letterCard.hidden = false;
            letterCard.classList.add('visible');
            startTreePhotos();
            rollBtn.focus();
            status.textContent = 'Đã mở lại lá thư.';
            return;
        }

        detailContent.replaceChildren();
        const heading = document.createElement('h2');
        heading.textContent = {
            album: 'Những nụ cười anh thích',
            notes: 'Một lời nhắn cho hôm nay',
            wishes: 'Chuyện nhỏ mình cùng làm'
        }[name] || 'Kỷ niệm của chúng mình';
        detailContent.appendChild(heading);

        if (name === 'album') {
            const grid = document.createElement('div');
            grid.className = 'keepsake-album';
            PHOTOS.forEach((src, index) => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'album-photo';
                button.setAttribute('aria-label', `Mở ảnh kỷ niệm ${index + 1}`);

                const image = document.createElement('img');
                image.src = src;
                image.alt = `Kỷ niệm ${index + 1}`;
                image.loading = 'lazy';
                image.addEventListener('error', () => { button.hidden = true; });

                button.appendChild(image);
                button.addEventListener('click', () => openPhoto(index));
                grid.appendChild(button);
            });
            detailContent.appendChild(grid);
        } else if (name === 'notes') {
            const note = document.createElement('p');
            note.className = 'keepsake-note';
            note.textContent = KEEPSAKE_NOTE;
            detailContent.appendChild(note);
        } else if (name === 'wishes') {
            const list = document.createElement('ul');
            list.className = 'keepsake-wishes';
            KEEPSAKE_WISHES.forEach(text => {
                const item = document.createElement('li');
                item.textContent = `♡  ${text}`;
                list.appendChild(item);
            });
            detailContent.appendChild(list);
        }

        detail.hidden = false;
        detail.scrollTop = 0;
        const backBtn = document.getElementById('keepsake-back');
        if (backBtn) backBtn.focus();
        status.textContent = heading.textContent;
    }

    document.querySelectorAll('[data-keepsake]').forEach(button => {
        button.addEventListener('click', () => openKeepsake(button.dataset.keepsake));
    });

    const backBtn = document.getElementById('keepsake-back');
    if (backBtn) backBtn.addEventListener('click', showHome);

    // ── Phím tắt bàn phím (Esc đóng ảnh, Mũi tên trái/phải chuyển ảnh)
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) closePhoto();
        if (lightbox.classList.contains('active') && ['ArrowLeft', 'ArrowRight'].includes(e.key) && PHOTOS.length) {
            e.preventDefault();
            lightboxIndex = (lightboxIndex + (e.key === 'ArrowRight' ? 1 : PHOTOS.length - 1)) % PHOTOS.length;
            lightboxImg.src = PHOTOS[lightboxIndex];
            lightboxImg.alt = `Ảnh kỷ niệm ${lightboxIndex + 1}`;
        }
    });
});
