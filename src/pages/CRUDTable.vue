<template>
  <div class="q-pa-md CrudTab">

    <q-btn outline style="color: goldenrod" label="Add new Product" class="AddBtn" @click="addNewProduct('create')" />

    <q-table class="my-sticky-header-column-table" title="Products" :data="data" :columns="products" row-key="name">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="mode_edit" @click="addNewProduct('update', props.row.id)"></q-btn>
          <q-btn icon="delete" @click="deleteProduct(props.row.id)"></q-btn>
        </q-td>
      </template>
    </q-table>
    <AddModal v-if="isNewProduct && productTypes.length > 0" :type="type" @close="closeModal" :productTypes="productTypes"
      :product_id="product_id" />
  </div>
</template>

<script>
import AddModal from "./AddModal.vue";
export default {
  name: "crud-table",
  components: { AddModal },
  data() {
    return {
      products: [
        {
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          field: (row) => row.name_uz,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "cost",
          align: "center",
          label: "Price",
          field: "cost",
          sortable: true,
        },
        {
          name: "protein",
          label: "Address",
          field: "address",
          sortable: true,
        },
        {
          name: "actions",
          label: "Actions",
          field: "actions",
        },
      ],

      data: [],
      isNewProduct: false,
      productTypes: [],
      type: '',
      product_id: null
    };
  },
  mounted() {
    this.getProductTypes()
    this.getAllProducts();
  },

  methods: {
    async getProductTypes() {
      await this.$store.dispatch('getProductTypes')
        .then(resp => {
          this.productTypes = resp
        })
    },
    async getAllProducts() {
      await this.$store.dispatch("getAllProducts").then((resp) => {
        if (resp) {
          this.data = resp;
        }
      });
    },
    addNewProduct(val, id = null) {
      this.isNewProduct = !this.isNewProduct;
      this.type = val
      this.product_id = id
    },
    deleteProduct(product_id) {
      this.$store.dispatch('deleteSingleProduct', product_id)
        .then(resp => {
          if (resp) {
            this.$router.go()
          }
        })
    },
    closeModal() {
      this.isNewProduct = false;
    },
  },
};
</script>
