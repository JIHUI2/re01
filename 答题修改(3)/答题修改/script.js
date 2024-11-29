window.onload = function() {
    // 从 localStorage 获取已完成的题目
    const completedQuizzes = JSON.parse(localStorage.getItem('completedQuizzes')) || [];
    const circles = document.querySelectorAll('.stamp-circle');
    
    // 更新所有已完成题目的圆圈状态
    updateStamps();
    
    // 为每个圆圈添加点击事件
    circles.forEach((circle, index) => {
        circle.addEventListener('click', () => {
            const completedQuizzes = JSON.parse(localStorage.getItem('completedQuizzes')) || [];
            if (!completedQuizzes.includes(index)) {
                // 存储当前题目索引并跳转
                localStorage.setItem('currentQuizIndex', index);
                window.location.href = 'quiz.html';
            }
        });
    });

    // 添加重置按钮事件
    const resetButton = document.getElementById('resetCard');
    if (resetButton) {
        resetButton.addEventListener('click', resetCard);
    }
};

// 更新印章状态的函数
function updateStamps() {
    const completedQuizzes = JSON.parse(localStorage.getItem('completedQuizzes')) || [];
    const circles = document.querySelectorAll('.stamp-circle');
    
    // 先清除所有完成状态
    circles.forEach(circle => {
        circle.classList.remove('completed');
    });
    
    // 更新已完成的印章
    completedQuizzes.forEach(index => {
        circles[index].classList.add('completed');
    });
}

// 重置卡片状态的函数
function resetCard() {
    if (confirm('Are you sure you want to reset your loyalty card? This will clear all your progress.')) {
        // 清除所有相关的 localStorage 数据
        localStorage.removeItem('completedQuizzes');
        localStorage.removeItem('currentQuizIndex');
        
        // 更新 UI
        updateStamps();
    }
}