<template>
  <div class="emp_container">
    <el-card class="emp_card">
      <h1>EMPLOYESS</h1>
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
      >
        <el-table-column prop="firstName" label="First Name"></el-table-column>
        <el-table-column prop="lastName" label="Last Name"></el-table-column>
        <el-table-column prop="salary" label="Salary"> </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <span @click="edit(scope.row)" class="emp_edit">Edit</span>
            <span @click="del(scope.row)" class="emp_delete">Delete</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total">
      </el-pagination>
      <el-button class="emp_add_btn" size="small" @click="dialogVisible = true"
        >Add Employee</el-button
      >
    </el-card>
    <form-dialog
      @closeDialog="close"
      :is-edit="isEdit"
      :dialogVisible="dialogVisible"
      :rowData="rowData"
    />
  </div>
</template>

<script>
import { list, deleteById } from "@/api/employess.js";
import formDialog from "./form.vue";
export default {
  data() {
    return {
      tableData: [],
      cellStyle: {
        color: "#7a848d",
        "font-size": "16px",
        "font-weight": "700",
        "text-align": "center",
      },
      headerCellStyle: {
        "text-align": "center",
      },
      dialogVisible: false,
      isEdit: false,
      pageNum:1,
      pageSize:8,
      searchKey:'',
      total:0,
      rowData: {},
    };
  },
  components: {
    formDialog,
  },
  async mounted() {
    await this.initdata()
  },
  methods: {
    async initdata(){
      const data = (await list({pageNum:this.pageNum,pageSize:this.pageSize,searchKey:this.searchKey})).data
      console.log(data)
      this.tableData = data.data.list
      this.total = data.data.total
    },
    edit(val) {
      this.isEdit = true
      this.dialogVisible = true;
      this.rowData = val;
    },
    del(val) {
      this.$confirm("confirm to delete?", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(async () => {
         const res = (await deleteById({ids:[val.id]})).data
          if(res.code===0){
            this.$message({
              type: "success",
              message: "success!",
            });
            await  this.initdata()
          }else {
            this.$message({
              type: "error",
              message: "error!",
            });
          }
          console.log(res)

        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "cancel",
          });
        });
    },
    async close(val) {
      console.log("trigger");
      this.dialogVisible = false;
      this.isEdit = false;
      if(val) await this.initdata()
    },
    handleSizeChange(){

    },
    async handleCurrentChange(val){
      this.pageNum = val
      await this.initdata()
    }
  },
};
</script>