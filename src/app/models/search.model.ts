export class FilterExpressionModel {
  constructor(name?: string, operator?: string, value?: any) {
      this.name = name && name || '';
      this.operator = operator && operator || '';
      this.value = value && value || null;
  }

  name: string;
  operator: string;
  value: any;
}

export class SearchModel {
  columns: string[] = [];
  filter: FilterExpressionModel[] = [];
  sort: string[] = [];
  pageSize: number = 0;
  pageIndex: number = 0;
  isDistinct: boolean = false;
  outputFormats: string[] = [];

  static quickSort(sort: string) {
      return new SearchModel().addSort(sort);
  }

  static quickFilter(name: string, value: any) {
      return new SearchModel().addFilter(name, 'eq', value);
  }

  addColumn(columnName: string) {
      this.columns.push(columnName);

      return this;
  }

  addFilter(name: string, operator: string, value: any) {
      this.filter.push(new FilterExpressionModel(name, operator, value));

      return this;
  }

  addSort(sort: string) {
      this.sort.push(sort);

      return this;
  }

  addOutputFormat(option: string) {
      this.outputFormats.push(option);
      return this;
  }

  changeSort(sort: string) {
      this.sort.length = 0;
      if(sort !== '') {
          this.sort.push(sort);
      }
      return this;
  }

  setPageSize(pageSize: number) {
      this.pageSize = pageSize;

      return this;
  }

  setPageIndex(pageIndex: number) {
      this.pageIndex = pageIndex;

      return this;
  }
}
