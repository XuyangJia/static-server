<template>
  <div>
    <h1>Index of {{ path }}</h1>
    <a @click="back()">返回</a>
    <b-table striped hover :items="items" :fields="fields">
      <template v-slot:cell(name)="data">
        <i class="fa fa-file" style="font-size:24px"></i>
        <b-link>{{ data.value.toUpperCase() }}</b-link>
      </template>
    </b-table>
    <!-- <table>
      <thead>
        <tr>
          <th>日期</th>
          <th>大小</th>
          <th>名称</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td><img :src= "item.file ? iconFile : iconDir">  {{  item.ctime  }}</td>
          <td>{{  item.size  }}</td>
          <td><a @click="check(item.name)">{{  item.name  }}</a></td>
        </tr>
      </tbody>
    </table> -->
    <b-button variant="danger">Button</b-button>
    <b-link href="#foo">Link</b-link>
    <iframe v-if="iframeSrc" :src="iframeSrc"></iframe>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      path: null,
      iframeSrc: null,
      iconDir: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWBJREFUeNqEUj1LxEAQnd1MVA4lyIEWx6UIKEGUExGsbC3tLfwJ/hT/g7VlCnubqxXBwg/Q4hQP/LhKL5nZuBsvuGfW5MGyuzM7jzdvVuR5DgYnZ+f99ai7Vt5t9K9unu4HLweI3qWYxI6PDosdy0fhcntxO44CcOBzPA7mfEyuHwf7ntQk4jcnywOxIlfxOCNYaLVgb6cXbkTdhJXq2SIlNMC0xIqhHczDbi8OVzpLSUa0WebRfmigLHqj1EcPZnwf7gbDIrYVRyEinurj6jTBHyI7pqVrFQqEbt6TEmZ9v1NRAJNC1xTYxIQh/MmRUlmFQE3qWOW1nqB2TWk1/3tgJV0waVvkFIEeZbHq4ElyKzAmEXOx6gnEVJuWBzmkRJBRPYGZBDsVaOlpSgVJE2yVaAe/0kx/3azBRO0VsbMFZE3CDSZKweZfYIVg+DZ6v7h9GDVOwZPw/PoxKu/fAgwALbDAXf7DdQkAAAAASUVORK5CYII=',
      iconFile: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAmhJREFUeNpsUztv01AYPfdhOy/XTZ80VV1VoCqlA2zQqUgwMEErWBALv4GJDfEDmOEHsFTqVCTExAiiSI2QEKJKESVFFBWo04TESRzfy2c7LY/kLtf2d8+555zvM9NaI1ora5svby9OnbUEBxgDlIKiWjXQeLy19/X17sEtcPY2rtHS96/Hu0RvXXLz+cUzM87zShsI29DpHCYt4E6Box4IZzTnbDx7V74GjhOSfwgE0H2638K9h08A3iHGVbjTw7g6YmAyw/BgecHNGGJjvfQhIfmfIFDAXJpjuugi7djIFVI4P0plctgJQ0xnFe5eOO02OwEp2VkhSCnC8WOCdqgwnzFx4/IyppwRVN+XYXsecqZA1pB48ekAnw9/4GZx3L04N/GoTwEjX4cNH5vlPfjtAIYp8cWrQutxrC5Mod3VsXVTMFSqtaE+gl9dhaUxE2tXZiF7nYiiatJ3v5s8R/1yOCNLOuwjkELiTbmC9dJHpIaGASsDkoFQGJQwHWMcHWJYOmUj1OjvQotuytt5nHMLEGkCyx6QU384jwkUAd2sxJbS/QShZtg/8rHzzQOzSaFhxQrA6YgQMQHojCUlgnCAAvKFBoXXaHfArSCZDE0gyWJgFIKmvUFKO4MUNIk2a4+hODtDUVuJ/J732AKS6ZtImdTyAQQB3bZN8l9t75IFh0JMUdVKsohsUPqRgnka0tYgggYpCHkKGTsHI5NOMojB4iTICCepvX53AIEfQta1iUCmoTiBmdEri2RgddKFhuJoqb/af/yw/d3zTNM6UkaOfis62aUgddAbnz+rXuPY+Vnzjt9/CzAAbmLjCrfBiRgAAAAASUVORK5CYII=',
      fields: [
        {
          key: 'name',
          sortable: true
        },
        {
          key: 'file',
          sortable: true
        },
        {
          key: 'ctime',
          sortable: true
        },
        {
          key: 'size',
          sortable: true
        }
      ],
      items: null
    }
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
	created(){
		this.getListData('.')
	}
}
</script>