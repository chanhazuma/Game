window.onload = () => {
  alert("🎮 BOUNCE BALL\n\nTekan OK untuk mulai!");

  const canvas = document.getElementById('cnv');
  const ctx = canvas.getContext('2d');

  canvas.width = innerWidth - 15;
  canvas.height = innerHeight - 200;

  // bola
  let x = 50, y = 50;
  let dx = 4, dy = 4;
  let r = 20;

  // paddle
  let rx = 200;
  let ry = canvas.height - 15;

  // score
  let s = 0;

  const rightMove = document.getElementById('right');
  const leftMove = document.getElementById('left');


  // ======================
  // CONTROL (di luar animate!)
  // ======================
  rightMove.onclick = () => {
    rx += 60;
    if (rx + 110 > canvas.width) rx = canvas.width - 110;
  };

  leftMove.onclick = () => {
    rx -= 60;
    if (rx < 0) rx = 0;
  };


  // ======================
  // GAME LOOP
  // ======================
  function animate() {
    requestAnimationFrame(animate);

    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // bola
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = "#FFB7CF";
    ctx.fill();

    // paddle
    ctx.fillRect(rx, ry, 110, 10);

    // score
    ctx.font = "20px Arial";
    ctx.fillText("Score : " + s, canvas.width - 150, 30);


    // ======================
    // COLLISION DINDING
    // ======================
    if (x + r > canvas.width || x - r < 0) dx = -dx;
    if (y - r < 0) dy = -dy;


    // ======================
    // COLLISION PADDLE
    // ======================
    if (y + r + dy >= ry) {
      if (x > rx && x < rx + 110) {
        dy = -dy;
        s += 10;
      }
    }


    // ======================
    // GAME OVER
    // ======================
    if (y + r > canvas.height) {
      alert("💀 Game Over!\n\nScore kamu : " + s + "\n\nTekan OK untuk main lagi!");
      x = 50;
      y = 50;
      dx = 4;
      dy = 4;
      s = 0;
    }


    // update posisi
    x += dx;
    y += dy;
  }

  animate();
};