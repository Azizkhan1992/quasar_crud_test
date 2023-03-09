<template>
    <div class="addContainer addContainer container position-absolute top-50 start-50 translate-middle">
        <h5 class="m-0" v-if="type === 'create'">Add New Product</h5>
        <h5 class="m-0" v-else>Update Product</h5>
        <q-form @submit="onSubmit" @reset="onReset">

            <q-input v-model="form.name" label="Product name" style="min-width: 280px" type="text" :rules="[val => !!val || 'Mahsulot nomini kiritish shart',
            val => (!!val && val.length > 3) || 'Mahsulot nomi to\'rttadan ko\'p bo\'lishi kerak'
            ]" />
            <q-input type="number" v-model.number="form.cost" label="Product cost" style="min-width: 280px" />
            <q-input v-model="form.address" label="Product address" style="min-width: 280px" :rules="[val => !!val || 'Manzil kiritilishi shart',
            val => (!!val && (val.length > 4 && val.length < 150)) || 'Manzil nomi to\'rttadan ko\'p va bir yuz elliktadan kam bo\'lishi kerak'
            ]" />
            <div class="q-gutter-md row" style="min-width: 280px;">
                <q-select class="col" v-model="form.product_type_id" :option-value="'id'" :option-label="'name_uz'"
                    :options="productTypes" label="Mahsulot turi" emit-value map-options />
            </div>


            <div class="q-pa-md" style="max-width: 300px">
                <q-input filled v-model="form.created_date" mask="####-##-##">
                    <template v-slot:prepend>
                        <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                                <q-date v-model="form.created_date" mask="YYYY-MM-DD" :locale="calendarOptions"
                                    :default-year-month="calendarDefault">
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                </q-date>
                            </q-popup-proxy>
                        </q-icon>
                    </template>

                    <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                                <q-time v-model="form.created_date" mask="YYYY-MM-DD HH:mm" format24h>
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                </q-time>
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
            </div>


            <div class="formButtons">
                <q-btn outline style="color: goldenrod" label="Save" type="submit" />
                <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
        </q-form>
        <i class="bi bi-x-circle" @click="close"></i>
    </div>
</template>

<script>
export default {
    name: "add-new",
    props: {
        AddNew: {
            type: Boolean,
            default: false,
        },
        productTypes: {
            type: Array,
            default: () => []
        },
        type: {
            type: String,
            default: 'create'
        },
        product_id: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            form: {
                product_type_id: null,
                name: null,
                cost: null,
                address: null,
                created_date: null
            },
            isDatePicker: false,
            calendarOptions: {
                days: [
                    'Yakshanba',
                    'Dushanba',
                    'Seshanba',
                    'Chorshanba',
                    'Payshanba',
                    'Juma',
                    'Shanba'
                ],
                daysShort: ['Yak', 'Du', 'Se', 'Chor', 'Pay', 'Ju', 'Shan'],
                months: ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'],
                monthsShort: ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek']
            }
        };
    },
    mounted() {
        if (this.product_id !== null) {
            this.getProduct(this.product_id)
        }
    },
    methods: {
        close() {
            this.$emit("close");
        },
        getProduct(product_id) {
            let allProducts = this.$store.state.products,
                item

            item = allProducts.find(e => e.id == product_id)

            this.form.address = item.address
            this.form.name = item.name_uz
            this.form.cost = item.cost
            this.form.created_date = this.formatDate(item.created_date)
            this.form.product_type_id = item.product_type_id
        },
        onSubmit() {
            if (this.type === 'update') {
                this.$q.notify({
                    message: 'Yangilash muvaffaqiyatli amalga oshirildi',
                    color: 'positive'
                })
                const params = {
                    id: this.product_id,
                    product_type_id: this.form.product_type_id,
                    name_uz: this.form.name,
                    cost: this.form.cost,
                    address: this.form.address,
                    created_date: new Date(this.form.created_date)
                }

                this.$store.dispatch('updateProduct', params)
                    .then(resp => {
                        if (resp) {
                            this.onReset()
                            this.close()
                            this.$router.go()
                        }
                    })
            } else {
                this.$q.notify({
                    message: 'Yangi mahsulot qo\'shildi',
                    color: 'positive'
                })

                const params = {
                    product_type_id: this.form.product_type_id,
                    name_uz: this.form.name,
                    cost: this.form.cost,
                    address: this.form.address,
                    created_date: new Date(this.form.created_date)
                }

                this.$store.dispatch('createProduct', params)
                    .then((resp) => {
                        if (resp) {
                            this.onReset()
                            this.close()
                            this.$router.go()
                        }
                    })
            }
        },
        onReset() {
            this.form.name = null,
                this.form.address = null,
                this.form.cost = null,
                this.form.created_date = null,
                this.form.product_type_id = null
        },
        formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-') + '00:00:00';
        }
    },
    computed: {
        calendarDefault() {
            const date = new Date();
            const month = date.getMonth() + 1;

            return date.getFullYear() + '/' + (month < 10 ? '0' + month : month);
        }
    }
};
</script>

<style lang="scss">
.addContainer {
    height: 520px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    left: calc(100% - 1300px);
    top: calc(100% - 450px);
    z-index: 2299;
    min-width: 420px;
    max-width: 620px;
    border-radius: 4px;
    background: #fff;
    color: rgba(0, 0, 0, 0.87);
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
        0 1px 5px 0 rgb(0 0 0 / 12%);
    padding: 24px 12px;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: scroll;

    .q-form {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 12px;
    }

    .formButtons {
        width: 300px;
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
    }

    .crudBtns {
        .q-pa-md {
            padding: 0 !important;
        }
    }

    .bi-x-circle {
        display: block;
        width: 24px;
        height: 24px;
        cursor: pointer;
        z-index: 1500;
        transform: scale(1.5);
        position: absolute;
        top: 4px;
        right: -4px;

        &::before {
            width: 100%;
            height: 100%;
            z-index: 1500;
        }
    }
}

.datePicker {
    transform-origin: top;
    transition: 0.32s linear;

    &.pickerDeactive {
        transform: scaleY(0);
    }

    &.pickerActive {
        transform: scaleY(1);
    }
}

@media screen and (max-width: 1440px) and (min-width: 1025px) {
    .addContainer {
        left: calc(100% - 800px) !important;
    }
}

@media screen and (max-width: 1024px) and (min-width: 769px) {
    .addContainer {
        left: calc(100% - 700px) !important;
    }
}

@media screen and (max-width: 768px) {
    .addContainer {
        min-width: 280px !important;
        left: calc(100% - 400px) !important;
        padding: 4px !important;

        form{
            label{
                min-width: 200px !important;
            }
        }
    }
}
</style>
