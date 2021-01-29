<template>

</template>

<script>
export default {
  name: "zhongzhuan",
  data(){
      this.$router.replace({
                name: 'Petlog',
                params: {
                    jlid: this.$route.params.jlid,
                }
            })
  }

}
</script>

<style scoped>

</style>
