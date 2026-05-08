// JumpGame.vue
import jumpSound from '@/assets/sounds/jump.mp3';
import scoreSound from '@/assets/sounds/score.mp3';
import bgMusic from '@/assets/sounds/music.mp3';

export default {
  data() {
    return {
      // Library of audio objects
      sounds: {
        jump: new Audio(jumpSound),
        score: new Audio(scoreSound),
        music: new Audio(bgMusic)
      }
    };
  },
  methods: {
    /**
     * Binds sound effects to specific game triggers
     * @param {String} name - The key of the sound to play
     */
    playSound(name) {
      const sound = this.sounds[name];
      if (sound) {
        // Reset sound to start to allow rapid re-triggering
        sound.currentTime = 0;
        sound.play().catch(e => console.warn("Playback blocked until user interaction."));
      }
    },

    /**
     * Initializes looping background ambiance
     */
    playMusic() {
      const music = this.sounds.music;
      music.loop = true;
      music.volume = 0.4; // Set to 40% volume for balance
      music.play().catch(e => console.log("Music waiting for user gesture..."));
    },

    jump() {
      // Existing jump logic...
      this.playSound('jump');
    },

    incrementScore() {
      // Existing score logic...
      this.playSound('score');
    }
  },
  mounted() {
    // Trigger background music when the component is ready
    this.playMusic();
  }
};