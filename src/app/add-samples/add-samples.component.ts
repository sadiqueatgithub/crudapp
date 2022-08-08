import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SamplesService } from '../samples.service';

@Component({
  selector: 'app-add-samples',
  templateUrl: './add-samples.component.html',
  styleUrls: ['./add-samples.component.css']
})
export class AddSamplesComponent implements OnInit {
  addForm:any;

  
  vals = ''
 
 
  constructor( 
    private formBuilder: FormBuilder,
    private router: Router,
    private sampleService:SamplesService,
	
	
    ) {

      this.addForm = this.formBuilder.group({
        name: ['', Validators.required],  
        state: ['', [Validators.required]],  
        zip: ['', [Validators.required]] ,       
        amount: ['', Validators.required],    
        qty: ['', Validators.required],    
        item: ['', Validators.required],
      }
      )
     }

     msg = false;

  ngOnInit(): void {
    //this.setAutorized(this.data)
  }

  onSubmit(){
    this.sampleService.createSample(this.addForm.value).subscribe(
      (data:any)=>{
		
		this.msg = true;
        this.router.navigate(['/']);  
      },  
     error => {  
       alert(error);
     });
  }
}
