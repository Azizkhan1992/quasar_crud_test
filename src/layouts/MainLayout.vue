<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="qHeader" @click="$router.push({ path: '/' })">
      <i class="bi bi-cart4 cartLogo"></i>
      <h3 class="commonT m-0 cPtr">My Quasar CRUD Test Example</h3>
    </q-header>
    <q-page-container>
      <RouterView />
    </q-page-container>

    <q-footer elevated>
      <q-toolbar>
        <h5 class="commonP m-0">Footer</h5>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { RouterView } from 'vue-router'
export default {
  name: 'MainLayout',
  components: { RouterView }
}
</script>
<style lang="scss">
.qHeader {
  display: flex;
  align-items: center;
  column-gap: 12px;
}

@media screen and (max-width: 768px) {
  .qHeader{
    h3{
      font-size: 1.5rem !important;
    }
  }
}
</style>
