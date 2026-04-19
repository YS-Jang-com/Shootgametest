const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const stageTxt = document.getElementById('stage');
const scoreTxt = document.getElementById('score');
const timerTxt = document.getElementById('timer');
const overlay = document.getElementById('msg-overlay');

// 게임 설정
canvas.width = 800;
canvas.height = 600;

let score = 0;
let currentStage = 0;
let timeLeft = 30;
let targets = [];
let gameActive = false;

// 타겟 종류 정의
const targetTypes = [
    { type: 'beer', color: '#ffcc00', points: 10, size: 30 },
    { type: 'plate', color: '#eeeeee', points: 20, size: 20 },
    { type: 'enemy', color: '#333333', points: 50, size: 40 }
];

class Target {
    constructor() {
        const config = targetTypes[Math.floor(Math.random() * targetTypes.length)];
        this.type = config.type;
        this.x = Math.random() * (canvas.width - 100) + 50;
        this.y = canvas.height; // 아래에서 등장
        this.size = config.size;
        this.color = config.color;
        this.points = config.points;
        this.speedY = -(Math.random() * 3 + 2 + currentStage); // 스테이지 높을수록 빠름
        this.speedX = (Math.random() - 0.5) * 4;
        this.isHit = false;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.speedY += 0.1; // 중력 효과
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        if(this.type === 'plate') {
            ctx.ellipse(this.x, this.y, this.size, this.size/2, 0, 0, Math.PI * 2);
        } else {
            ctx.rect(this.x - this.size/2, this.y - this.size, this.size, this.size);
        }
        ctx.fill();
        ctx.stroke();
    }
}

// 클릭 이벤트 (발포)
canvas.addEventListener('mousedown', (e) => {
    if (!gameActive) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // 타격 판정 (역순으로 체크하여 위에 있는 것부터 맞게 함)
    for (let i = targets.length - 1; i >= 0; i--) {
        const t = targets[i];
        const dist = Math.hypot(t.x - mouseX, t.y - mouseY);
        
        if (dist < t.size) {
            score += t.points;
            scoreTxt.innerText = score;
            targets.splice(i, 1); // 타겟 제거
            drawFlash(mouseX, mouseY); // 총구 화염 효과
            break; 
        }
    }
});

function drawFlash(x, y) {
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();
}

function spawnTarget() {
    if(gameActive && Math.random() < 0.03 + (currentStage * 0.01)) {
        targets.push(new Target());
    }
}

function gameLoop() {
    if (!gameActive) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 배경 (간단한 테이블선)
    ctx.fillStyle = '#5d4037';
    ctx.fillRect(0, 450, canvas.width, 150);

    spawnTarget();

    targets.forEach((target, index) => {
        target.update();
        target.draw();
        // 화면 밖으로 나가면 제거
        if (target.y > canvas.height + 50) targets.splice(index, 1);
    });

    requestAnimationFrame(gameLoop);
}

// 타이머 루프
const timerInterval = setInterval(() => {
    if (gameActive) {
        timeLeft--;
        timerTxt.innerText = timeLeft;
        if (timeLeft <= 0) {
            endStage();
        }
    }
}, 1000);

function endStage() {
    gameActive = false;
    overlay.classList.remove('hidden');
    document.getElementById('msg-text').innerText = `STAGE ${currentStage} 완료!`;
    document.getElementById('msg-btn').innerText = "다음 스테이지";
}

function nextStage() {
    currentStage++;
    if(currentStage > 10) {
        alert("모든 스테이지를 정복하셨습니다! 당신은 전설의 총잡이입니다.");
        location.reload();
        return;
    }
    scoreTxt.innerText = score;
    stageTxt.innerText = currentStage;
    timeLeft = 30;
    targets = [];
    gameActive = true;
    overlay.classList.add('hidden');
    gameLoop();
}

// 초기에는 gameLoop를 실행하지 않습니다. nextStage()에서 실행 시작!
