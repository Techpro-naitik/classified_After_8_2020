import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';




@Component({
  selector: 'app-jw-pagination',
  templateUrl: './jw-pagination.component.html',
  styleUrls: ['./jw-pagination.component.css']
})
export class JwPaginationComponent implements OnInit {
  @Input() items: Array<any>;
  @Output() changePage = new EventEmitter<any>(true);
  @Output() currentPage = new EventEmitter<any>(true);

  @Input() initialPage = 1;
  @Input() pageSize = 12;
  @Input() maxPages = 12 ;
  @Input()  filterItem : Array<any>;
  pager: any = {};

  ngOnInit() {
//   console.log(this.items)
    // set page if items array isn't empty
    if (this.items && this.items.length) {
      this.setPage(this.initialPage);
    }
    if (this.filterItem && this.filterItem.length) {
      this.setPage(this.initialPage);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // reset page if items array has changed
    
    if (changes.items.currentValue !== changes.items.previousValue) {
      console.log(changes)
      this.setPage(this.initialPage);
    }
  }

  private setPage(page: number) {
    // get new pager object for specified page
    // this.pager = paginate(this.items.length, page, this.pageSize, this.maxPages);

    // get new page of items from items array
    var pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
    var pageOfItems = this.filterItem.slice(this.pager.startIndex, this.pager.endIndex + 1);
    // call change page function in parent component
    this.changePage.emit(pageOfItems);
    this.currentPage.emit(pageOfItems)
  }
}