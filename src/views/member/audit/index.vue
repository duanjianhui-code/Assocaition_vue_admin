<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.memberName" placeholder="名字" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
      <el-select v-model="listQuery.memberSex" placeholder="请选择性别" class="filter-item">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
      <el-input v-model="listQuery.memberAge" placeholder="年龄" clearable class="filter-item" style="width: 130px"></el-input>
      &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;

      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Add
      </el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        Export
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange">
      <el-table-column label="姓名" width="150px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
          <span>{{ row.memberName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="性别" width="80px" align="center">
        <template slot-scope="{row}">
          <el-tag type="success">
            {{row.memberSex=='1'?'男':'女' }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="年龄" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.memberAge }}</span>
        </template>
      </el-table-column>

      <el-table-column label="邮箱" width="180px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.memberEmail }}</span>
        </template>
      </el-table-column>

      <el-table-column label="电话" width="180px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.memberPhone}}</span>
        </template>
      </el-table-column>
      <el-table-column label="籍贯" class-name="status-col" width="150">
        <template slot-scope="{row}">
          <el-tag type="success">
            {{row.nativePlace}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" width="150">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{row.status==1?'审核通过':row.status==2?'审核不通过':'待审核'}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Audit
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">

      <el-form ref="dataForm" :rules="rules" :model="temp"  label-position="left" label-width="80px" style="width: 400px; margin-left:50px;">
        <el-form-item label="姓名" prop="assName">
          <span>{{ temp.memberName}}</span>
        </el-form-item>
        <el-form-item label="性别" prop="introduction">
          <el-tag type="success">
            {{temp.memberSex=='1'?'男':'女' }}
          </el-tag>
        </el-form-item>
        <el-form-item label="年龄" prop="createUser">
          <span>{{ temp.memberAge}}</span>
        </el-form-item>
        <el-form-item label="籍贯">
          <span>{{ temp.nativePlace}}</span>
        </el-form-item>
        <el-form-item label="电话" prop="telephone">
          <span>{{ temp.memberPhone}}</span>
        </el-form-item>
        <el-form-item label="付款状态" prop="telephone" v-if="temp.orderNo!=undefined &&temp.orderNo!=' '">
          <span>{{ temp.isOrder=='1'?'已付款':'未付款'}}</span>
        </el-form-item>
        <el-form-item label="邮箱" prop="associationEmail">
          <span>{{ temp.memberEmail}}</span>
        </el-form-item>
        <el-form-item label="审核" prop="status">
          <el-radio-group v-model="temp.status">
            <el-radio label="1">审核通过</el-radio>
            <el-radio label="2">审核不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核意见" prop="opinion">
          <el-input v-model="temp.opinion" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {getAssocaitionList , deleteAssocationById,updateAssocation} from "@/api/assocaition";
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import {getMemberList,deleteMemberById,auditMember} from "@/api/member";


export default {
  name: 'index',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    var checkStatus = (rule, value, callback) => {
      if (value==0||value==undefined) {
        return callback(new Error('请审核'));
      }
      callback()
    };
    return {
      options: [{
        value: '1',
        label: '男'
      }, {
        value: '0',
        label: '女'
      }],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 8,
        memberName:'',
        memberAge: '',
        memberSex: ''
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions:'',
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        memberName: '',
        assId: '',
        position: '',
        memberEmail: '',
        memberPhone: '',
        nativePlace:'',
        memberAge: '',
        memberSex: '',
        userId:'',
        assName:'',
        status:'',
        opinion: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Audit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }],
        opinion: [{ required: true, message: 'opinion is required', trigger: 'blur' }],
        status:[{required: true,validator:checkStatus, message: '请输入审核选项', trigger: 'change'}]
      },
      downloadLoading: false,

    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getMemberList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        console.log(valid)
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          auditMember(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          }).catch(reason => {
            console.log(reason)
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMemberById(row.id).then(response => {
          // this.getList()
          this.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
        })
        this.list.splice(index, 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['社团名称', '申请人', '申请时间', '社团类型', '社团状态']
        const filterVal = ['assName', 'createUser', 'createTime', 'type', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  },computed: {
    getStatusName(status) {
      if (status == '0') {
        return '待审核'
      } else if (status == '1') {
        return '审核通过'
      }else {
        return '审核不通过'
      }
    }
  }
}
</script>

<style>

</style>
