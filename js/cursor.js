const cursor = document.getElementById('cursor');

window.addEventListener('mousemove', (e) => {
    const x = e.clientX - cursor.offsetWidth / 2;
    const y = e.clientY - cursor.offsetHeight / 2;

    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';
});