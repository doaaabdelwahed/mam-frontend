import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MediaService } from 'src/app/shared/services/media.service';

@Component({
  selector: 'app-create-media',
  templateUrl: './create-media.component.html',
  styleUrls: ['./create-media.component.scss']
})
export class CreateMediaComponent implements OnInit {

  mediaData = {
    "description": "",
    "hour": 0,
    "minute": 0,
    "name": "",
    "thumbnailMobile": "mobile.png",
    "thumbnailTv": "tv.png",
    "thumbnailWeb": "web.png",
    "type": "",
    "hadif": "Hello",
    "tags": [
      { "id": 1 },
      { "id": 2 }
    ],
    "metadata": [
      {
        "name": "writer",
        "value": "doaa"
      },
      {
        "name": "Director",
        "value": "Wael"
      }

    ]

  }
  metadataForm: FormGroup;
  metadata: FormArray;
  myForm: FormGroup;
  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  tags = [];
  selectedItems = [];
  dropdownSettings: any = {};
  constructor(private formBuilder: FormBuilder, private mediaService: MediaService) { }

  ngOnInit(): void {
    this.tags = [
      { item_id: 1, item_text: 'Action' },
      { item_id: 2, item_text: 'Drama' },
      { item_id: 3, item_text: 'Kill' },
      { item_id: 4, item_text: 'Cartoon' },
      { item_id: 5, item_text: 'TV Shows' },
      { item_id: 6, item_text: 'Animals' },
      
    ];
    this.metadataForm = this.formBuilder.group({
      metadata: this.formBuilder.array([this.createItem()])
    });

    // this.selectedItems = [{ item_id: 4, item_text: 'Pune' }, { item_id: 6, item_text: 'Navsari' }];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: this.ShowFilter
    };
    this.myForm = this.formBuilder.group({
      tag: [this.selectedItems]
    });
  }

  onItemSelect(item: any) {
    console.log('onItemSelect', item);
    this.selectedItems.push(item);
  }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }
  toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
  }

  handleLimitSelection() {
    if (this.limitSelection) {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
    } else {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
    }
  }

  createItem() {
    return this.formBuilder.group({
      name: ["", Validators.required],
      value: ["", Validators.required]
    });
  }
  addItem(): void {
    this.metadata = this.metadataForm.get('metadata') as FormArray;
    this.metadata.push(this.createItem());
  }
  removeRow(index) {
    console.log(index);
    (<FormArray>this.metadataForm.get("metadata")).removeAt(index);
  }
  onSubmit() {
    console.log(this.metadataForm.value)

  }


  printItem() {
    let tags = [];
    for (var i = 0; i < this.selectedItems.length; i++) {
      let item={"id":this.selectedItems[i].item_id}
      tags.push(item);
    }
    this.mediaData.metadata = this.metadataForm.value.metadata;
    this.mediaData.tags = tags;
    this.mediaService.createMedia(this.mediaData).subscribe(response => {


      console.log("data" + response.data);
    });

    //console.log("item", this.mediaData)
  }
}
