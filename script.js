// Динамическая роль
const roles = [
  "делаю роблокс‑скрипты",
  "пишу Telegram‑ботов", 
  "поднимаю бэкенды на Flask",
  "оптимизирую UI и анимации",
  "чину баги в проде",
  "броню FPS от лагов",
  "автоматизирую рутину"
];
const roleEl = document.getElementById("dynamic-role");
let currentRoleIndex = 0;
let currentCharIndex = 0;
let typing = true;

function typeLoop() {
  const role = roles[currentRoleIndex];
  if (typing) {
    if (currentCharIndex <= role.length) {
      roleEl.textContent = role.slice(0, currentCharIndex);
      currentCharIndex++;
      setTimeout(typeLoop, 60);
    } else {
      typing = false;
      setTimeout(typeLoop, 1500);
    }
  } else {
    if (currentCharIndex > 0) {
      currentCharIndex--;
      roleEl.textContent = role.slice(0, currentCharIndex);
      setTimeout(typeLoop, 28);
    } else {
      typing = true;
      currentRoleIndex = (currentRoleIndex + 1) % roles.length;
      setTimeout(typeLoop, 120);
    }
  }
}
typeLoop();

// Статбары
window.addEventListener("load", () => {
  document.querySelectorAll(".stat-bar-fill").forEach((bar) => {
    const fill = parseFloat(bar.dataset.fill || "0");
    requestAnimationFrame(() => {
      bar.style.transition = "transform 900ms cubic-bezier(0.22, 0.8, 0.3, 1)";
      bar.style.transform = `scaleX(${fill})`;
    });
  });
});

// Время MSK
const timeBox = document.getElementById("timeBox");
function updateTime() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Moscow",
    hour12: false
  });
  const timeStr = formatter.format(now);
  timeBox.innerHTML = `<span>${timeStr}</span> MSK<br />режим: night‑coder`;
}
updateTime();
setInterval(updateTime, 1000 * 60);

// Ping
const pingBox = document.getElementById("pingBox");
function updatePing() {
  const base = 16 + Math.random() * 22;
  pingBox.textContent = `~${base.toFixed(0)} ms`;
}
updatePing();
setInterval(updatePing, 2200);

// Кнопки
document.getElementById("contactBtn").addEventListener("click", () => {
  window.open("https://t.me/username", "_blank");
});

document.getElementById("projectsBtn").addEventListener("click", () => {
  window.open("https://github.com/username?tab=repositories", "_blank");
});

document.querySelectorAll(".link-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    const url = chip.dataset.url;
    if (url) window.open(url, "_blank");
  });
});

// Копирование био
const copyBtn = document.getElementById("copyBioBtn");
copyBtn.addEventListener("click", async () => {
  const text = "t1nkq — делаю ботов, скрипты (Roblox / Telegram / парсеры) и быстрые backends под реальные задачи. Люблю, когда UI красивый, а код быстрый и понятный.";
  try {
    await navigator.clipboard.writeText(text);
    const old = copyBtn.textContent;
    copyBtn.textContent = "скопировано ✅";
    setTimeout(() => (copyBtn.textContent = old), 1500);
  } catch (e) {
    alert("Не получилось скопировать :(");
  }
});

// 🔥 SPOTIFY PLAYER (100% РАБОЧИЙ)
class SpotifyPlayer {
  constructor() {
    this.audio = new Audio();
    this.isPlaying = false;
    this.currentTime = 0;
    this.duration = 0;
    this.volume = 0.7;
    this.trackData = null;
    
    this.initElements();
    this.bindEvents();
    this.loadTrack();
  }

  initElements() {
    this.playPauseBtn = document.getElementById('playPauseBtn');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.progressFill = document.getElementById('progressFill');
    this.progressThumb = document.getElementById('progressThumb');
    this.currentTimeEl = document.getElementById('currentTime');
    this.totalTimeEl = document.getElementById('totalTime');
    this.trackTitleEl = document.getElementById('trackTitle');
    this.trackArtistEl = document.getElementById('trackArtist');
    this.trackArtEl = document.getElementById('trackArt');
    this.volumeBtn = document.getElementById('volumeBtn');
    this.volumeFill = document.getElementById('volumeFill');
    this.volumeThumb = document.getElementById('volumeThumb');
    this.progressTrack = document.getElementById('progressTrack');
    this.volumeTrack = document.getElementById('volumeTrack');
    this.player = document.getElementById('spotifyPlayer');
  }

  bindEvents() {
    if (!this.playPauseBtn) return;
    
    this.playPauseBtn.addEventListener('click', () => this.togglePlay());
    if (this.progressTrack) this.progressTrack.addEventListener('click', (e) => this.seek(e));
    if (this.volumeTrack) this.volumeTrack.addEventListener('click', (e) => this.setVolume(e));
    
    this.audio.addEventListener('play', () => this.updatePlayState());
    this.audio.addEventListener('pause', () => this.updatePlayState());
    this.audio.addEventListener('timeupdate', () => this.updateProgress());
    this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
    this.audio.addEventListener('ended', () => this.onTrackEnd());
    this.audio.addEventListener('volumechange', () => this.updateVolumeUI());
  }

  loadTrack() {
    // ТВОЙ ТРЕК GAYAZOV$ BROTHER$
    this.audio.src = 'https://p.scdn.co/mp3-preview/31daccd9450854b8f1ef0a17e756d8e5ed67fde0.mp3';
    this.trackData = {
      title: 'До встречи на танцполе',
      artist: 'GAYAZOV$ BROTHER$',
      art: 'https://i.scdn.co/image/ab67616d00001e022d8555fd107e934a8e420237'
    };
    this.updateTrackInfo();
    this.audio.load();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play().catch(e => console.log('▶️ Кликни ещё раз'));
    }
  }

  updatePlayState() {
    this.isPlaying = !this.audio.paused;
    if (this.player) this.player.classList.toggle('playing', this.isPlaying);
    
    const playIcon = this.playPauseBtn?.querySelector('.play-icon');
    const pauseIcon = this.playPauseBtn?.querySelector('.pause-icon');
    if (playIcon && pauseIcon) {
      playIcon.style.display = this.isPlaying ? 'none' : 'block';
      pauseIcon.style.display = this.isPlaying ? 'block' : 'none';
    }
  }

  updateProgress() {
    if (!this.duration || !this.progressFill) return;
    const progress = this.audio.currentTime / this.duration;
    this.progressFill.style.width = `${progress * 100}%`;
    if (this.currentTimeEl) this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
  }

  updateDuration() {
    this.duration = this.audio.duration || 30;
    if (this.totalTimeEl) this.totalTimeEl.textContent = this.formatTime(this.duration);
  }

  seek(e) {
    if (!this.progressTrack || !this.duration) return;
    const rect = this.progressTrack.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    this.audio.currentTime = pos * this.duration;
  }

  setVolume(e) {
    if (!this.volumeTrack) return;
    const rect = this.volumeTrack.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    this.volume = Math.max(0, Math.min(1, pos));
    this.audio.volume = this.volume;
  }

  updateVolumeUI() {
    if (!this.volumeFill) return;
    this.volumeFill.style.width = `${this.volume * 100}%`;
  }

  updateTrackInfo() {
    if (this.trackTitleEl) this.trackTitleEl.textContent = this.trackData?.title || 'Трек';
    if (this.trackArtistEl) this.trackArtistEl.textContent = this.trackData?.artist || 'Артист';
    if (this.trackArtEl && this.trackData?.art) {
      this.trackArtEl.style.backgroundImage = `url(${this.trackData.art})`;
      this.trackArtEl.style.backgroundSize = 'cover';
    }
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  onTrackEnd() {
    this.isPlaying = false;
    this.updatePlayState();
  }
}

const spotifyPlayer = new SpotifyPlayer();
