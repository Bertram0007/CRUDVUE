<template>
  <div class="emp_form">
    <el-dialog
      :title="isEdit ? 'Edit Employee' : 'Add Employee'"
      :visible="dialogVisible"
      width="25%"
      @open="handleDialogOpen"
      @close="handleDialogClose"
      @closed="form = {}"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item prop="firstName" label="First Name: ">
          <el-input v-model="form.firstName"></el-input>
        </el-form-item>
        <el-form-item prop="lastName" label="Last Name: ">
          <el-input v-model="form.lastName"></el-input>
        </el-form-item>
        <el-form-item prop="salary" label="Salary: ">
          <el-input v-model="form.salary" type="number"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">save</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { create, update } from "@/api/employess.js";
export default {
  props: {
    isEdit: {
      type:Boolean,
      default: false,
    },
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    rowData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        salary: "",
      },
      rules: {
        firstName: [
          {
            required: true,
            message: "Please input firstName",
            trigger: "blur",
          },
        ],
        lastName: [
          {
            required: true,
            message: "Please input lastName",
            trigger: "blur",
          },
        ],
        salary: [
          {
            required: true,
            message: "Please input salary",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    save() {
      this.$refs["form"].validate(async(valid) => {
        if (valid) {
          const res = this.isEdit
            ? (await update(this.form)).data
            : (await create(this.form)).data
          console.log(res)
          if(res.code===0){
            this.$message({
              type:'success',
              message:'success!'
            })
            this.handleDialogClose(true)
          }
        }
      });
    },
    handleDialogOpen() {
      if (this.isEdit) {
        Object.assign(this.form, this.rowData);
      }
    },
    handleDialogClose(val) {
      this.$emit("closeDialog", val);
    },
  },
};
</script>

<style>
</style>