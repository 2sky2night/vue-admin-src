<template>
    <div class="page-son-son">
        <h3>Test-son-son01</h3>
        <RouterLink :to="{ name: 'test-son-son-son01' }">1-1-1</RouterLink>
        &nbsp;
        <RouterLink :to="{ name: 'test-son-son-son02' }">1-1-2</RouterLink>
        <RouterView></RouterView>
    </div>
</template>
<script lang='ts' setup>

</script>
