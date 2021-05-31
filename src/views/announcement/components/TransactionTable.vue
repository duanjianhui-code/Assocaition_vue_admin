<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="待办类型" min-width="100">
      <template slot-scope="scope">
        {{ scope.row.businessName | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column label="提交人" width="200" align="center">
      <template slot-scope="scope">
        {{ scope.row.createName}}
      </template>
    </el-table-column>
    <el-table-column label="提交时间" width="195" align="center">
      <template slot-scope="scope">
        {{ scope.row.createTime}}
      </template>
    </el-table-column>
    <el-table-column label="状态" width="195" align="center">
      <template slot-scope="scope">
        <el-tag type="success">{{ scope.row.state=='0'?'待审核':'已办结'}}</el-tag>
      </template>
    </el-table-column>

    <el-table-column label="action" width="150" align="center">
      <template slot-scope="{row}">
        <el-button type="primary" size="mini" @click="handleUpdate(row.businessUrl)">
          Audit
        </el-button>
      </template>
    </el-table-column>

  </el-table>
</template>

<script>
import { transactionList } from '@/api/remote-search'
import {getTaskList} from "@/api/task";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: '0',
        pending: '1'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getTaskList().then(response => {
        this.list = response.data.slice(0, 8)
      })
    },
    handleUpdate(businessUrl){
      this.$router.push(businessUrl)
}
  }
}
</script>
