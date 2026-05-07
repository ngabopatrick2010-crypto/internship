<template>
  <div class="game-container">
    <div class="hud">
      <h1>🎮 Jump Runner</h1>
      <p>Score: {{ score }}</p>
      <p v-if="gameOver" class="game-over">💥 Game Over - Press Restart</p>
    </div>

    <div class="game-area" @click="jump">
      <!-- Player -->
      <div class="player" :class="{ jump: isJumping }"></div>

      <!-- Obstacle -->
      <div class="obstacle" :style="{ left: obstacleX + 'px' }"></div>

      <!-- Ground -->
      <div class="ground"></div>
    </div>

    <button class="btn" @click="restart">Restart</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isJumping: false,
      obstacleX: 600,
      score: 0,
      gameOver: false,
      gameLoop: null,
    };
  },

  mounted() {
    this.startGame();
    window.addEventListener("keydown", this.handleKey);
  },

  beforeUnmount() {
    clearInterval(this.gameLoop);
    window.removeEventListener("keydown", this.handleKey);
  },

  methods: {
    startGame() {
      this.gameLoop = setInterval(() => {
        if (this.gameOver) return;

        this.obstacleX -= 6;
        this.score++;

        // reset obstacle
        if (this.obstacleX < -50) {
          this.obstacleX = 600;
        }

        // collision detection
        if (this.obstacleX < 80 && this.obstacleX > 20 && !this.isJumping) {
          this.gameOver = true;
        }
      }, 30);
    },

    jump() {
      if (this.isJumping || this.gameOver) return;

      this.isJumping = true;
      setTimeout(() => {
        this.isJumping = false;
      }, 500);
    },

    handleKey(e) {
      if (e.code === "Space") this.jump();
    },

    restart() {
      this.score = 0;
      this.obstacleX = 600;
      this.gameOver = false;
    },
  },
};
</script>

<style scoped>
.game-container {
  text-align: center;
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  height: 100vh;
  color: white;
  overflow: hidden;
}

.hud {
  padding: 10px;
}

.game-area {
  position: relative;
  width: 600px;
  height: 300px;
  margin: 20px auto;
  background: linear-gradient(to top, #56ccf2, #2f80ed);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
}

/* PLAYER */
.player {
  position: absolute;
  bottom: 40px;
  left: 50px;
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, #ff6a00, #ee0979);
  border-radius: 10px;
  transition: 0.2s;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

.jump {
  animation: jump 0.5s ease;
}

@keyframes jump {
  0% { bottom: 40px; }
  50% { bottom: 150px; }
  100% { bottom: 40px; }
}

/* OBSTACLE */
.obstacle {
  position: absolute;
  bottom: 40px;
  width: 30px;
  height: 50px;
  background: linear-gradient(45deg, #00c6ff, #0072ff);
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.3);
}

/* GROUND */
.ground {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  background: linear-gradient(to right, #11998e, #38ef7d);
}

/* BUTTON */
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  background: #ffcc00;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  transition: 0.3s;
}

.btn:hover {
  transform: scale(1.1);
}

.game-over {
  color: #ff4b5c;
  font-weight: bold;
}
</style>