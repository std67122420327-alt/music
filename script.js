const songs = [
    { title: "1. เพลงที่หนึ่ง", src: "music/song1.mp3" },
    { title: "2. เพลงที่สอง", src: "music/song2.mp3" },
    { title: "3. เพลงที่สาม", src: "music/song3.mp3" },
    { title: "4. เพลงที่สี่", src: "music/song4.mp3" },
    { title: "5. เพลงที่ห้า", src: "music/song5.mp3" },
    { title: "6. เพลงที่หก", src: "music/song6.mp3" },
    { title: "7. เพลงที่เจ็ด", src: "music/song7.mp3" },
    { title: "8. เพลงที่แปด", src: "music/song8.mp3" },
    { title: "9. เพลงที่เก้า", src: "music/song9.mp3" },
    { title: "10. เพลงที่สิบ", src: "music/song10.mp3" },
    { title: "11. เพลงที่สิบเอ็ด", src: "music/song11.mp3" },
    { title: "12. เพลงที่สิบสอง", src: "music/song12.mp3" },
    { title: "13. เพลงที่สิบสาม", src: "music/song13.mp3" },
    { title: "14. เพลงที่สิบสี่", src: "music/song14.mp3" },
    { title: "15. เพลงที่สิบห้า", src: "music/song15.mp3" },
    { title: "16. เพลงที่สิบหก", src: "music/song16.mp3" },
    { title: "17. เพลงที่สิบเจ็ด", src: "music/song17.mp3" },
    { title: "18. เพลงที่สิบแปด", src: "music/song18.mp3" },
    { title: "19. เพลงที่สิบเก้า", src: "music/song19.mp3" },
    { title: "20. เพลงที่ยี่สิบ", src: "music/song20.mp3" }
];

const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const stopBtn = document.getElementById('stop-btn'); // เพิ่มตัวแปรปุ่ม Stop
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');
const songTitle = document.getElementById('song-title');
const playlistList = document.getElementById('playlist-list');

let currentSongIndex = 0;
let isPlaying = false;

// โหลดรายการเพลงลง Playlist
function loadPlaylist() {
    playlistList.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-music"></i> <span>${song.title}</span>`;
        li.onclick = () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            playSong();
        };
        playlistList.appendChild(li);
    });
}

// โหลดข้อมูลเพลง
function loadSong(index) {
    const song = songs[index];
    songTitle.innerHTML = song.title;
    audioPlayer.src = song.src;
    
    document.querySelectorAll('#playlist-list li').forEach((li, i) => {
        li.classList.toggle('playing', i === index);
    });
}

// ควบคุมการเล่น (Play)
function playSong() {
    isPlaying = true;
    playPauseBtn.innerHTML = `<i class="fas fa-pause"></i>`;
    audioPlayer.play();
}

// พักเพลงชั่วคราว (Pause)
function pauseSong() {
    isPlaying = false;
    playPauseBtn.innerHTML = `<i class="fas fa-play"></i>`;
    audioPlayer.pause();
}

// หยุดเพลงเลย (Stop)
function stopSong() {
    isPlaying = false;
    playPauseBtn.innerHTML = `<i class="fas fa-play"></i>`;
    audioPlayer.pause();
    audioPlayer.currentTime = 0; // รีเซ็ตเวลากลับไปที่ 0
}

playPauseBtn.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
});

// กดปุ่ม Stop
stopBtn.addEventListener('click', stopSong);

// เปลี่ยนเพลง ก่อนหน้า-ถัดไป
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// เล่นเพลงถัดไปอัตโนมัติเมื่อจบเพลง
audioPlayer.addEventListener('ended', nextSong);

// ฟอร์แมตเวลา
function formatTime(seconds) {
    if (isNaN(seconds)) return "00:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

// อัปเดตหลอดเวลาตอนเพลงเล่น
audioPlayer.addEventListener('timeupdate', (e) => {
    const { currentTime, duration } = e.srcElement;
    
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    currentTimeEl.innerText = formatTime(currentTime);
    
    if (duration) {
        totalTimeEl.innerText = formatTime(duration);
    }
});

// คลิกที่แถบเวลาเพื่อกรอเพลง
progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (clickX / width) * duration;
});

// โหลดข้อมูลให้พร้อม
loadPlaylist();
loadSong(currentSongIndex);