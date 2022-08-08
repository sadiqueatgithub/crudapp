import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SamplesService } from '../samples.service';
@Component({
  selector: 'app-edit-samples',
  templateUrl: './edit-samples.component.html'
})
export class EditSamplesComponent implements OnInit {
  addForm:any;  
  vals = ''
  id: any;
  
  constructor( 
    private formBuilder: FormBuilder,
    private router: Router,
    private sampleService:SamplesService,
    private url:ActivatedRoute
    ) {
      this.addForm = this.formBuilder.group({
        id:[],
        name: ['', Validators.required],  
        state: ['', [Validators.required]],  
        zip: ['', [Validators.required]] ,       
        amount: ['', Validators.required],    
        qty: ['', Validators.required],    
        item: ['', Validators.required],    
      
      }
      )
     }

          
  msg=false;

  ngOnInit(): void {
    this.id = this.url.snapshot.params['id'];
    if (this.id>0) {
      this.sampleService.getSingleSample(this.id).subscribe((
        (data:any)=>{
          this.addForm.patchValue(data.data);
          
        }
      ))
    }
  }

 onEdit(){
    this.sampleService.editSample(this.addForm.value).subscribe(
      (data:any)=>{
        console.log(data);
		this.msg=true;
        this.router.navigate(['/']);  
      },  
     error => {  
       alert(error);
     });
  }
}
