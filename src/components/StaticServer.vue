<template>
  <div>
    <h1>Index of {{ path }}</h1>
    <b-button variant="danger" @click="back()">返回</b-button>
    <b-table striped hover :items="items" :fields="fields">
      <template v-slot:cell(file)="data">
        <i class="fa fa-file" style="font-size:24px"></i>
      </template>
      <template v-slot:cell(name)="data">
        <b-link>{{ data.value.toUpperCase() }}</b-link>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      path: null,
      fields: [
        {
          key: 'file',
        },
        {
          key: 'ctime',
          sortable: true
        },
        {
          key: 'size',
          sortable: true
        },
        {
          key: 'name',
          sortable: true
        }
      ],
      items: null
    }
  },
	created(){
		this.getListData('.')
  },
	methods:{
		getListData(fp) {
			this.axios.get(fp).then((response) => {
        if (Array.isArray(response.data)) {
          this.iframeSrc = null
          this.path = fp + '/'
          this.items = response.data || []
        } else {
          this.iframeSrc = fp
        }
      })
    },
    check(name){
		  this.getListData(this.path + name)
    },
    back(){
      let arr = this.path.split('/')
		  this.getListData(arr.slice(0, arr.length - 2).join('/'))
    }
	},
  components: {
  }
}
</script>