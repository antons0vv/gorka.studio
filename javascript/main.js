let frames = [];
let i = 0;
let ascii;
let animationTimeout;
let isAnimating = false;
const speed = 450;

function showNextFrame() {
    if (frames.length === 0 || !ascii) return; // Safety check
    
    ascii.textContent = frames[i];
    i++;
    
    // Continue only if there are more frames to show and we're still animating
    if (i < frames.length && isAnimating) {
        animationTimeout = setTimeout(showNextFrame, speed);
    } else if (i >= frames.length) {
        // Animation finished
        isAnimating = false;
        i = frames.length - 1; // Stay on last frame
    }
}

function startAnimation() {
    if (isAnimating) return; // Don't start if already animating
    
    isAnimating = true;
    i = 0; // Start from first frame
    showNextFrame();
}

function stopAnimation() {
    isAnimating = false;
    if (animationTimeout) {
        clearTimeout(animationTimeout);
        animationTimeout = null;
    }
    // Show last frame
    if (frames.length > 0) {
        i = frames.length - 1;
        ascii.textContent = frames[i];
    }
}

document.addEventListener('DOMContentLoaded', function () {
    ascii = document.getElementById('ascii');
    
    fetch('./frame.txt')
        .then(response => response.text())
        .then(data => {
            frames = data.split('---FRAME---').map(f => f.trim());
            
            // Play animation once on load
            startAnimation();
        });
    
    let animation = document.getElementById('ascii');
    
    animation.addEventListener('mouseenter', function() {
        startAnimation();
    });
    
    animation.addEventListener('mouseleave', function() {
        stopAnimation();
    });
});