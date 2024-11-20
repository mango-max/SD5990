document.addEventListener('DOMContentLoaded', function() {
    const firstImage = document.getElementById('firstImage');
    const videoContent = document.getElementById('videoContent');
    const secondImage = document.getElementById('secondImage');
    const secondVideoContent = document.getElementById('secondVideoContent');
    const thirdImage = document.getElementById('thirdImage');
    const thirdVideoContent = document.getElementById('thirdVideoContent');
    const fourthImage = document.getElementById('fourthImage');
    const fourthVideoContent = document.getElementById('fourthVideoContent');
    const fifthImage = document.getElementById('fifthImage');
    
    const challengeBtn = document.getElementById('challengeBtn');
    const fightBtn = document.getElementById('fightBtn');
    const finalChallengeBtn = document.getElementById('finalChallengeBtn');
    const finalFightBtn = document.getElementById('finalFightBtn');
    
    const mainVideo = document.getElementById('mainVideo');
    const secondVideo = document.getElementById('secondVideo');
    const thirdVideo = document.getElementById('thirdVideo');
    const fourthVideo = document.getElementById('fourthVideo');
    const bgMusic = document.getElementById('bgMusic');
    const startModal = document.getElementById('startModal');
    const startBtn = document.getElementById('startBtn');
    const exitBtn = document.getElementById('exitBtn');
    const victoryModal = document.getElementById('victoryModal');
    const playAgainBtn = document.getElementById('playAgainBtn');
    const victoryExitBtn = document.getElementById('victoryExitBtn');
    const victoryBgVideo = document.getElementById('victoryBgVideo');
    const victoryBgm = document.getElementById('victoryBgm');

    // 初始状态：隐藏主内容
    firstImage.classList.remove('active');

    // 开始按钮点击事件
    startBtn.addEventListener('click', function() {
        startModal.classList.remove('active');
        firstImage.classList.add('active');
        // 尝试播放背景音乐
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                document.addEventListener('click', function startMusic() {
                    bgMusic.play();
                    document.removeEventListener('click', startMusic);
                }, { once: true });
            });
        }
    });

    // 退出按钮点击事件
    exitBtn.addEventListener('click', function() {
        window.close();
        // 如果window.close()不起作用，重定向到空白页面
        if (!window.closed) {
            window.location.href = 'about:blank';
        }
    });

    // 点击第一个 Challenge 按钮
    challengeBtn.addEventListener('click', function() {
        firstImage.classList.remove('active');
        videoContent.classList.add('active');
        mainVideo.play();
    });

    // 第一个视频结束后显示第二张图片
    mainVideo.addEventListener('ended', function() {
        videoContent.classList.remove('active');
        secondImage.classList.add('active');
    });

    // 点击 Fight 按钮
    fightBtn.addEventListener('click', function() {
        secondImage.classList.remove('active');
        secondVideoContent.classList.add('active');
        secondVideo.play();
    });

    // 第二个视频结束后显示第三张图片
    secondVideo.addEventListener('ended', function() {
        secondVideoContent.classList.remove('active');
        thirdImage.classList.add('active');
    });

    // 点击最后的 Challenge 按钮
    finalChallengeBtn.addEventListener('click', function() {
        thirdImage.classList.remove('active');
        thirdVideoContent.classList.add('active');
        thirdVideo.play();
    });

    // 第三个视频结束后显示第四张图片
    thirdVideo.addEventListener('ended', function() {
        thirdVideoContent.classList.remove('active');
        fourthImage.classList.add('active');
    });

    // 点击最后的 Fight 按钮
    finalFightBtn.addEventListener('click', function() {
        fourthImage.classList.remove('active');
        fourthVideoContent.classList.add('active');
        fourthVideo.play();
    });

    // 第四个视频结束后显示第五张图片，并在2秒后显示胜利弹窗
    fourthVideo.addEventListener('ended', function() {
        fourthVideoContent.classList.remove('active');
        fifthImage.classList.add('active');
        
        setTimeout(() => {
            victoryModal.classList.add('active');
            victoryBgVideo.play();
            
            // 淡出第一个BGM，淡入第二个BGM
            fadeOutAudio(bgMusic, 1000); // 1秒内淡出
            victoryBgm.volume = 0;
            victoryBgm.play();
            fadeInAudio(victoryBgm, 1000); // 1秒内淡入
            
            const fireworksInterval = setInterval(createFirework, 300);
            victoryModal.dataset.fireworksInterval = fireworksInterval;
        }, 1000);
    });

    // 重新开始游戏
    playAgainBtn.addEventListener('click', function() {
        clearFireworks();
        victoryModal.classList.remove('active');
        victoryBgVideo.pause();
        victoryBgVideo.currentTime = 0;
        
        // 停止胜利BGM
        victoryBgm.pause();
        victoryBgm.currentTime = 0;
        
        document.querySelectorAll('.content').forEach(element => {
            element.classList.remove('active');
        });
        
        startModal.classList.add('active');
        
        // 重置第一个BGM
        bgMusic.pause();
        bgMusic.currentTime = 0;
        
        [mainVideo, secondVideo, thirdVideo, fourthVideo].forEach(video => {
            video.pause();
            video.currentTime = 0;
        });
    });

    // 退出游戏
    victoryExitBtn.addEventListener('click', function() {
        clearFireworks();
        victoryBgVideo.pause();
        victoryBgm.pause(); // 停止胜利BGM
        window.close();
        if (!window.closed) {
            window.location.href = 'about:blank';
        }
    });

    // 在 DOMContentLoaded 事件监听器中添加以下函数

    function createFirework() {
        const colors = [
            '#ff0000', // 红色
            '#00ff00', // 绿色
            '#0000ff', // 蓝色
            '#ffff00', // 黄色
            '#ff00ff', // 粉色
            '#00ffff', // 青色
            '#ffd700'  // 金色
        ];
        const fireworksContainer = document.querySelector('.fireworks-container');
        
        // 创建多个礼花粒子
        for (let i = 0; i < 5; i++) { // 每次创建5个粒子
            const firework = document.createElement('div');
            firework.className = 'firework';
            
            // 随机起始位置
            const startPositionLeft = 20 + Math.random() * 60; // 限制在20%-80%的范围内
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // 随机水平位移
            const dx = (Math.random() - 0.5) * 200; // 随机左右偏移
            firework.style.setProperty('--dx', `${dx}px`);
            
            firework.style.left = `${startPositionLeft}%`;
            firework.style.backgroundColor = color;
            firework.style.color = color;
            
            // 随机大小
            const size = 8 + Math.random() * 8; // 8-16px
            firework.style.width = `${size}px`;
            firework.style.height = `${size}px`;
            
            // 随机动画持续时间
            const duration = 1 + Math.random() * 0.5; // 1-1.5秒
            firework.style.animationDuration = `${duration}s`;
            
            // 随机动画延迟
            const delay = Math.random() * 0.3; // 0-0.3秒延迟
            firework.style.animationDelay = `${delay}s`;
            
            fireworksContainer.appendChild(firework);
            
            // 动画结束后移除礼花
            firework.addEventListener('animationend', () => {
                firework.remove();
            });
        }
    }

    // 在关闭胜利弹窗时清除礼花效果
    function clearFireworks() {
        const interval = victoryModal.dataset.fireworksInterval;
        if (interval) {
            clearInterval(interval);
        }
        const fireworksContainer = document.querySelector('.fireworks-container');
        fireworksContainer.innerHTML = '';
    }

    // 添加音频淡入淡出函数
    function fadeOutAudio(audio, duration) {
        const startVolume = audio.volume;
        const steps = 20;
        const volumeStep = startVolume / steps;
        const stepDuration = duration / steps;
        
        let currentStep = 0;
        
        const fadeInterval = setInterval(() => {
            currentStep++;
            if (currentStep <= steps) {
                audio.volume = startVolume - (volumeStep * currentStep);
            } else {
                clearInterval(fadeInterval);
                audio.pause();
            }
        }, stepDuration);
    }

    function fadeInAudio(audio, duration) {
        const targetVolume = 0.5; // 设置目标音量
        const steps = 20;
        const volumeStep = targetVolume / steps;
        const stepDuration = duration / steps;
        
        let currentStep = 0;
        
        const fadeInterval = setInterval(() => {
            currentStep++;
            if (currentStep <= steps) {
                audio.volume = volumeStep * currentStep;
            } else {
                clearInterval(fadeInterval);
            }
        }, stepDuration);
    }
}); 