<template>
  <div class="app-container">

    <div>
      <el-row :gutter="20">
        <el-col :span="24" :xs="24">

          <el-card>

            <div class="demo-image__placeholder" style="display: flex">
              <div class="block"><span>社团子部门</span>
              </div>
              <div class="block" v-for="item in list" style="margin-left: 40px">
                <div align="center" style="margin-bottom: 10px"><span class="demonstration" style="flex: auto">部门：{{item.assName}}</span></div>
                <el-image :src="item.indexImageUrl" style="width: 100px; height: 100px;border-radius: 50%" @click="getMember(item.id)"></el-image>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>


    <div style="margin-top: 20px">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <el-card>
            <el-image :src="ruleForm.indexImageUrl" style="border-radius: 50%;width: 200px;height: 200px"></el-image>
            <center><el-tag type="success" align="center" style="margin-top: 20px">部门：{{ruleForm.assName}}</el-tag></center>
              <div style="margin-top: 10px">
                <center><el-tag>邮箱：{{ruleForm.associationEmail}}</el-tag></center>
              </div>

              <div style="margin-top: 10px">
                <center><el-tag type="info">创建时间{{ruleForm.createTime}}</el-tag></center>
              </div>


          </el-card>
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-table
              :key="tableKey"
              v-loading="listLoading"
              :data="memberList"
              border
              fit
              highlight-current-row
              style="width: 100%;">
              <el-table-column label="姓名" width="130px" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.memberName}}</span>
                </template>
              </el-table-column>

              <el-table-column label="邮箱" width="200px" align="center">
                <template slot-scope="{row}">
                  <span>{{ row.memberEmail}}</span>
                </template>
              </el-table-column>
              <el-table-column label="性别" class-name="status-col" width="50">
                <template slot-scope="{row}">
                  <el-tag :type="row.memberSex">
                    {{ row.memberSex=='1'?'男':'女' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="职位" class-name="status-col" width="150">
                <template slot-scope="{row}">
                  <el-tag :type="row.position">
                    {{row.position}}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="Actions" align="center" width="300" class-name="small-padding fixed-width">
                <template slot-scope="{row,$index}">
                  <el-button type="primary" size="mini" @click="handleUpdate(row,$index)" v-if="row.position=='普通成员'">
                    设为部长
                  </el-button>
                  <el-button type="danger" size="mini" @click="handleUpdate1(row,$index)" v-else="row.position=='部长'">
                    撤销部长
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

            <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getMember" />

          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import {deleteAssocationById, getAssocaitionChil, updateAssocation,} from "@/api/assocaition";
import {getMemberListByAssId,addAssocaitionManage} from "@/api/member";
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: "index",
  components: { Pagination },
  directives: { waves },
  //数据
  data() {
    return {
      ruleForm: {
        id: '',
        assName: '',
        introduction: '',
        associationEmail: '',
        telephone: '',
        indexImageUrl: '',
        fileList:[],
        createTime:''
      },
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      memberForm: '',
      memberList: null,
      listQuery: {
        page: 1,
        limit: 8,
        assId: ''
      }
    }
  },
  created(){
    this.getAssocationchil()
  },
  //方法
  methods: {
    getAssocationchil(){
      getAssocaitionChil().then(res=>{
        this.list = res.data
        Object.assign(this.ruleForm, this.list[0])
        this.listQuery.assId = this.ruleForm.id

        getMemberListByAssId(this.listQuery).then(resp=>{
          this.memberList = resp.data.items
          this.total = resp.data.total
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })

      }).catch(e=>{

      })
    },
    getMember(id){
      Object.assign(this.ruleForm=this.list.filter(i=>{return i.id == id})[0])
      this.listQuery.assId = id
      this.listLoading = true
      getMemberListByAssId(this.listQuery).then(resp1=>{
        this.memberList = resp1.data.items
        this.total = resp1.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })

    },
    handleUpdate(row,index) {
      row.position='部长'
      addAssocaitionManage(row).then(res=>{
        if (res.code==20000){
          this.$notify({
            title: 'Success',
            message: 'Successfully',
            type: 'success',
            duration: 2000
          })
          this.memberList.splice(index, row)
        }
      }).catch(reason => {
        this.memberList[index].position='普通成员'
        this.$message({
          type: 'error',
          message: '此部门已有部长，请撤销后在操作'
        });
      })
    },

    handleUpdate1(row,index) {
      row.position='普通成员'
      addAssocaitionManage(row).then(res=>{
        if (res.code==20000){
          this.$notify({
            title: 'Success',
            message: 'Successfully',
            type: 'success',
            duration: 2000
          })
          this.memberList.splice(index, row)
        }
      }).catch(reason => {
        this.memberList[index].position='普通成员'
      })
    },
    handleDelete(row, index) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAssocationById(row.id).then(response => {
          this.getList()
          this.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
        })
        this.memberList.splice(index, 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
  }

}
</script>

<style scoped>

</style>
