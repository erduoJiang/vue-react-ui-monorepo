<template>
  <div style="padding: 24px">
    <h2>Vue Table (同构 API)</h2>
    <Table
      :data="mockData"
      :columns="columns"
      :page="page"
      :page-size="8"
      @update:page="setPage"
      @sort-change="onSort"
    />
    <div style="margin-top: 16px">
      <button @click="setPage(Math.max(1, page - 1))">Prev</button>
      <span style="margin: 0 8px">{{ page }}</span>
      <button @click="setPage(page + 1)">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Table from './Table.vue';
import type { Column } from './types';

interface User { id: number; name: string; age: number; }

const columns: Column<User>[] = [
  { key: 'id', title: 'ID', width: 60, sortable: true },
  { key: 'name', title: '姓名' },
  { key: 'age', title: '年龄', sortable: true },
];

const mockData: User[] = Array.from({ length: 46 }, (_, i) => ({
  id: i + 1,
  name: `User-${i + 1}`,
  age: 18 + (i % 20),
}));

const page = ref(1);
function setPage(p: number) { page.value = p; }
function onSort(key: string, order: 'asc' | 'desc') {
  console.log('[sort]', key, order);
}
</script>