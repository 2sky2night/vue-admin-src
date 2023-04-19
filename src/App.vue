<script setup lang="ts">

</script>

<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="system">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
.system-enter-active{
  animation: system 1 .5s ease-in-out;
}

@keyframes system {
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
}

</style>
