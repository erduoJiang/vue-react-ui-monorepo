<template>
    <table class="vue-table" cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse;">
      <thead>
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            :style="{ width: col.width + 'px', cursor: col.sortable ? 'pointer' : 'default' }"
            @click="col.sortable && handleSort(col)"
          >
            {{ col.title }}
            <span v-if="col.sortable" style="margin-left: 4px; font-size: 12px;">
              {{ sortKey === col.key ? (sortOrder === 'asc' ? '▲' : '▼') : '⇅' }}
            </span>
          </th>
        </tr>   
      </thead>
      <tbody>
        <tr v-for="(record, idx) in displayData" :key="idx">
          <td v-for="col in columns" :key="col.key">
            <template v-if="col.render">
              <component :is="col.render((record as any)[col.key], record)" />
            </template>
            <template v-else>
              {{ (record as any)[col.key] }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script setup lang="ts" generic="T">
  import { computed, ref } from 'vue';
  import type { Column, TableProps } from './types';
  
  const props = withDefaults(defineProps<TableProps<T>>(), {
    page: 1,
    pageSize: 10,
  });
  
  const emit = defineEmits<{
    'update:page': [p: number];
    sortChange: [key: string, order: 'asc' | 'desc'];
  }>();
  
  const sortKey = ref<string>('');
  const sortOrder = ref<'asc' | 'desc'>('asc');
  
  function handleSort(col: Column<T>) {
    const newOrder = sortKey.value === col.key && sortOrder.value === 'asc' ? 'desc' : 'asc';
    sortKey.value = col.key;
    sortOrder.value = newOrder;
    emit('sortChange', col.key, newOrder);
  }
  
  const sortedData = computed(() =>
    [...props.data].sort((a, b) => {
      if (!sortKey.value) return 0;
      const valA = (a as any)[sortKey.value];
      const valB = (b as any)[sortKey.value];
      if (valA === valB) return 0;
      const result = valA > valB ? 1 : -1;
      return sortOrder.value === 'asc' ? result : -result;
    })
  );
  
  const displayData = computed(() => {
    const start = (props.page - 1) * props.pageSize;
    return sortedData.value.slice(start, start + props.pageSize);
  });
  </script>
  
  <style scoped>
  .vue-table { border-collapse: collapse; }
  th, td { border: 1px solid #ddd; }
  </style>