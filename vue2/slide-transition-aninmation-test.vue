<template>
  <div>
    <button @click="addCurrentIndex">add</button>
    <div>
      <transition name="slide" :duration="1000">
        <button class="button" :key="currentIndex">{{ texts[currentIndex] }}</button>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      texts: ['Message 1', 'Message 2', 'Message 3', 'Message 4'],
      currentIndex: 0
    };
  },
  computed: {
  },
  methods: {
    addCurrentIndex () {
      this.currentIndex = (this.currentIndex + 1) % this.texts.length
    }
  },
  mounted() {
  }
};
</script>
<style scoped>
.button {
  display: block;
  width: 100%;
}
.slide-enter-active, .slide-leave-active {
  transition-duration: 1000ms;
  transition-timing-function: ease;
  transition-property: transform, opacity;

  pointer-events: none;
}

.slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-leave-from {
  transform: translateY(0);
}

.slide-enter-to {
  transform: translateY(-100%);
}

.slide-enter-from {
  transform: translateY(0);
  opacity: 0;
}
</style>
