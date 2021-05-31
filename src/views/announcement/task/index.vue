<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 18}" :xl="{span: 18}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>

    </el-row>
  </div>

</template>

<script>

import TransactionTable from '../components/TransactionTable'
import TodoList from '../components/TodoList'
import BoxCard from '../components/BoxCard'


export default {
  name: "index",
  components:{TransactionTable,TodoList,BoxCard}

}
</script>

<style scoped>

</style>
