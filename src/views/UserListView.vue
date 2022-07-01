<template>
  <div class="list-container">
    <el-table :data="filterTableData" style="width: 100%" table-layout="fixed">
      <el-table-column fixed prop="firstname" label="First Name" width="150" />
      <el-table-column prop="lastname" label="Last Name" width="120" />
      <el-table-column prop="email" label="Email" width="120" />
      <el-table-column prop="address" label="Address" width="300" />
      <el-table-column prop="age" label="Age" width="120" />
      <el-table-column label="Operations" width="200">
        <template #header>
          <el-input v-model="search" size="small" placeholder="Type to search" />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)"
            >Edit</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :hide-on-single-page="hidePagination"
      class="paginate" 
      background
      @current-change="paginate"
      :currentPage="query.page"
      :current-page="query.page"
      :default-current-page="query.page"
      :page-size="query.limit"
      :page-count="Math.ceil(totalUsers/query.limit)"
      layout="prev, pager, next"
    />
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      search : "",
      hidePagination : false,
      query : {
        page : 1,
        limit : 10
      }
    }
  },
  computed: { 
    ...mapGetters(["userList", "isLoading","totalUsers"]),
    filterTableData(){
      return this.userList.filter(
        (data) =>
          !this.search ||
          data.firstname.toLowerCase().includes(this.search.toLowerCase()) || data.lastname.toLowerCase().includes(this.search.toLowerCase()) || data.email.toLowerCase().includes(this.search.toLowerCase()) || data.address.toLowerCase().includes(this.search.toLowerCase())
      )
    }
  },
  methods: {
    ...mapActions(["fetchAllUsers"]),
    getResults() {
      this.fetchAllUsers(this.query);
    },
    paginate(e){
      this.query.page = e
      console.log(this.query)
      this.fetchAllUsers(this.query)
    },
    handleEdit(row){
      this.$router.push('/update/'+row.id)
    },
    handleDelete(row){
      this.$router.push('/delete/'+row.id)
    }
  },
  mounted() {
    this.fetchAllUsers(this.query);
    // console.log(Math.ceil(this.totalUsers/this.query.limit))
    console.log(this.totalUsers)
    
  },
}
</script>
<style>
.list-container{
  display: flex;
  flex-direction: column;
  gap: 3rem;
  justify-content: center;
  align-content: center;
  padding-top: 5rem;
  padding-left: 25rem;
  text-align: center;
  padding-right: 30rem;
}
.paginate{
  align-self: center;
}
</style>