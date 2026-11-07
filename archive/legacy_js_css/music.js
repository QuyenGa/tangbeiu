// ── Trình điều khiển đĩa than và âm thanh (Vinyl Player) ─────────

(() => {
    const audio = document.getElementById('bg-audio');
    const player = document.getElementById('music-player');
    const disc = document.getElementById('music-btn');
    const play = document.getElementById('music-play');
    const expand = document.getElementById('music-expand');
    const details = document.getElementById('music-details');
    const volume = document.getElementById('music-volume');
    const output = document.getElementById('music-volume-value');
    const status = document.getElementById('music-status');
    const titleEl = document.getElementById('music-title');
    const eyebrowEl = document.getElementById('music-eyebrow');
    const quoteEl = document.getElementById('music-quote');

    // Nạp cấu hình từ config.js nếu có
    const cfg = window.APP_CONFIG?.music;
    if (cfg) {
        if (titleEl && cfg.title) titleEl.textContent = cfg.title;
        if (eyebrowEl && cfg.subTitle) eyebrowEl.textContent = cfg.subTitle;
        if (quoteEl && cfg.quote) quoteEl.textContent = cfg.quote;
        if (volume && cfg.defaultVolume !== undefined) {
            volume.value = cfg.defaultVolume;
            if (output) output.textContent = `${cfg.defaultVolume}%`;
        }
    }

    let started = false;
    let userPaused = false;
    let playPending = false;

    // Giữ chiều cao dock trên mobile để không che khuất chân cây
    const phoneLayout = matchMedia('(max-width: 600px)');
    function sizeDock() {
        if (!player) return;
        document.documentElement.style.setProperty(
            '--music-dock-height',
            phoneLayout.matches ? `${Math.ceil(player.getBoundingClientRect().height)}px` : '0px'
        );
    }
    if (player) {
        new ResizeObserver(sizeDock).observe(player);
        phoneLayout.addEventListener('change', sizeDock);
        window.addEventListener('resize', sizeDock);
        sizeDock();
    }

    if (volume && audio) {
        audio.volume = Number(volume.value) / 100;
    }

    function sync() {
        if (!audio || !player) return;
        const playing = !audio.paused && !audio.ended && !audio.error;
        player.classList.toggle('playing', playing);
        [disc, play].forEach(button => {
            if (!button) return;
            button.setAttribute('aria-label', playing ? 'Tạm dừng nhạc' : 'Phát nhạc');
            button.setAttribute('aria-pressed', String(playing));
        });
        if (play) play.textContent = playing ? 'Ⅱ' : '▶';
        if (status) {
            status.textContent = playing
                ? (audio.muted || audio.volume === 0 ? 'Đang phát · Âm lượng đang tắt' : 'Đang phát một chút yêu thương')
                : (started ? 'Nhạc đã tạm dừng' : 'Chạm để nghe một chút thương');
        }
    }

    async function requestPlay() {
        if (!audio || playPending) return;
        playPending = true;
        try {
            await audio.play();
            if (userPaused) { audio.pause(); return; }
            started = true;
            removeUnlockListeners();
            sync();
        } catch (error) {
            sync();
            if (!userPaused && status) {
                status.textContent = error.name === 'NotAllowedError' ? 'Chạm màn hình để bật nhạc ♡' : 'Chạm nút phát để thử lại nhé';
            }
        } finally {
            playPending = false;
        }
    }

    window.startMusic = () => {
        if (!started && !userPaused) return requestPlay();
    };

    function toggle() {
        if (!audio) return;
        if (audio.paused && !playPending) {
            userPaused = false;
            requestPlay();
        } else {
            userPaused = true;
            removeUnlockListeners();
            audio.pause();
        }
    }

    function unlock(event) {
        if (player && player.contains(event.target)) return;
        if (userPaused || started) return;
        if (event.type === 'keydown' && !['Enter', ' '].includes(event.key)) return;
        requestPlay();
    }

    function removeUnlockListeners() {
        document.removeEventListener('click', unlock);
        document.removeEventListener('touchend', unlock);
        document.removeEventListener('keydown', unlock);
    }

    if (disc) disc.addEventListener('click', toggle);
    if (play) play.addEventListener('click', toggle);

    if (expand && details) {
        expand.addEventListener('click', () => {
            details.hidden = !details.hidden;
            expand.setAttribute('aria-expanded', String(!details.hidden));
            expand.setAttribute('aria-label', details.hidden ? 'Mở điều khiển âm lượng' : 'Thu gọn điều khiển âm lượng');
        });

        document.addEventListener('click', event => {
            if (!details.hidden && player && !player.contains(event.target)) {
                details.hidden = true;
                expand.setAttribute('aria-expanded', 'false');
                expand.setAttribute('aria-label', 'Mở điều khiển âm lượng');
            }
        });
    }

    if (volume && audio && output) {
        volume.addEventListener('input', () => {
            audio.volume = Number(volume.value) / 100;
        });
        audio.addEventListener('volumechange', () => {
            volume.value = Math.round(audio.volume * 100);
            output.textContent = `${volume.value}%`;
            sync();
        });
    }

    if (audio) {
        ['play', 'playing', 'pause', 'ended'].forEach(event => audio.addEventListener(event, sync));
        audio.addEventListener('waiting', () => {
            if (player) player.classList.remove('playing');
            if (status) status.textContent = 'Đang tải giai điệu…';
        });
        audio.addEventListener('error', () => {
            sync();
            if (status) status.textContent = 'Chưa tải được nhạc, thử lại nhé';
        });
    }

    sync();
    document.addEventListener('click', unlock);
    document.addEventListener('touchend', unlock, { passive: true });
    document.addEventListener('keydown', unlock);
    requestPlay();
})();
