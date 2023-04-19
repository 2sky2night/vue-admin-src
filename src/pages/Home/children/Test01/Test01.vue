<template>
    <div class="page">
        <h2>Test</h2>
        <RouterLink :to="{ name: 'test-son01' }">1</RouterLink>
        &nbsp;
        <RouterLink :to="{ name: 'test-son02' }">2</RouterLink>
        <RouterView></RouterView>
    </div>
</template>
<script lang='ts' setup>

</script>
<style scoped></style>