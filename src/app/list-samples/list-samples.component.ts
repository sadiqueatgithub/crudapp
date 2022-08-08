import { Component, OnInit,ViewChild } from '@angular/core';
import { SamplesService } from '../samples.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable,MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';


export interface UserData{
	id:number,	
	name:string,
	state:string,
	zip:string,
	amount:string,
	qty:string,
	item:string,
}

@Component({
  selector: 'app-list-samples',
  templateUrl: './list-samples.component.html',
  styleUrls: ['./list-samples.component.css']
})
export class ListSamplesComponent implements OnInit {
  samples: any;

  constructor( private sampleservice: SamplesService,private router: Router,) { }
  msg: boolean=true;
  
  displayedColumns: string[]=['id','name','state','zip','amount','qty','item','action'];
  dataSource!:MatTableDataSource<UserData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  
  ngOnInit(): void {

    this.sampleservice.getSamples().subscribe(
      (result:any)=>{
        //console.log(result)
        this.samples  =  result.data;
		this.dataSource=new MatTableDataSource(this.samples);
		this.dataSource.sort= this.sort;
		this.dataSource.paginator = this.paginator;				
      }
    )


	

  }

  deleteSample(sample:any){
    //console.log(id);
   
   if(confirm('Are you sure to delete this record?')){
    this.msg=true;
	this.sampleservice.deleteSample(sample.id).subscribe(data=>{
    this.samples = this.samples.filter((u: any) => u !== sample);
	 this.refresh();
    })
    
    
   }
	
  }
  
  refresh(){
	  this.sampleservice.getSamples().subscribe(
      (result:any)=>{
        //console.log(result)
        this.samples  =  result.data;
		this.dataSource=new MatTableDataSource(this.samples);
		this.dataSource.sort= this.sort;
		this.dataSource.paginator = this.paginator;				
      }
    )
	  
  }

  
  filterData(event: any){
		this.dataSource.filter=event.target.value;		
	}

}
