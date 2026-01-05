import type { VNode } from 'vue';

export interface Column<T = any> {
  key: string;
  title: string;
  width?: number;
  sortable?: boolean;
  render?: (value: any, record: T) => VNode;
}

export interface TableProps<T = any> {
  data: T[];
  columns: Column<T>[];
  page?: number;
  pageSize?: number;
  'onUpdate:page'?: (p: number) => void;
  onSortChange?: (key: string, order: 'asc' | 'desc') => void;
}