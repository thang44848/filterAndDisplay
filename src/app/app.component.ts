import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilterDisplayService } from './service/filter-display.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  constructor(
    private readonly filterAndDisplay: FilterDisplayService,
  ) { 
  }
  filterAndDisplaySubscription: any;

  public items!: [];
  public referenceItems!: [];
  public textInput!: string;
  public hello1!: string;

  ngOnInit(): void {         
    this.filterAndDisplaySubscription = this.filterAndDisplay.getListOfDisplayingItems().subscribe(
      (success) => {
        this.referenceItems = success;
        this.setFetchingItemsToDisplayOnScreen();
      }, (error) => {
        console.log('Failed fetching items');
      }
    )
  }

  setFetchingItemsToDisplayOnScreen(): void {
    this.items = JSON.parse(JSON.stringify(this.referenceItems));
  }
  
  setLowerCase(): void {
    this.setFetchingItemsToDisplayOnScreen();
    const lowercaseInput = this.textInput.toLowerCase();
    const lowercaseItems = this.items.map((item: string) => item.toLowerCase());
    if(lowercaseInput !== '') {
      this.filterItemsBasedOnInputText(lowercaseInput, lowercaseItems);
    }
    
  }

  filterItemsBasedOnInputText(lowercaseInput: string, lowercaseItems: any) {
    this.items = lowercaseItems.filter(
      (item: string) => item.includes(lowercaseInput)
    ).map(
      (item: string) => item.charAt(0).toUpperCase() + item.slice(1));
  }

  ngOnDestroy(): void {
    if(this.filterAndDisplaySubscription) {
      this.filterAndDisplaySubscription.unsubscribe();
    }
  }
}

