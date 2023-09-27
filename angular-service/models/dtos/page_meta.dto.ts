import { PageOptionsDto } from './page_options.dto';

export class PageMetaDto {
  page: number;
  pageSize: number;
  count: number;

  constructor(count: number, pageOptions: PageOptionsDto) {
    this.page = pageOptions.page;
    this.pageSize = pageOptions.pageSize;
    this.count = count;
  }
}
