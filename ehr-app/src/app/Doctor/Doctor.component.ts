import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DoctorService } from './Doctor.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Doctor',
	templateUrl: './Doctor.component.html',
	styleUrls: ['./Doctor.component.css'],
  providers: [DoctorService]
})
export class DoctorComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
	private errorMessage;

  
      
          department = new FormControl("", Validators.required);
        
  
      
          salary = new FormControl("", Validators.required);
        
  
      
          ID = new FormControl("", Validators.required);
        
  
      
          title = new FormControl("", Validators.required);
        
  
      
          firstname = new FormControl("", Validators.required);
        
  
      
          lastname = new FormControl("", Validators.required);
        
  


  constructor(private serviceDoctor:DoctorService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          department:this.department,
        
    
        
          salary:this.salary,
        
    
        
          ID:this.ID,
        
    
        
          title:this.title,
        
    
        
          firstname:this.firstname,
        
    
        
          lastname:this.lastname
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceDoctor.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: "composers.participants.Doctor",
      
        
          "department":this.department.value,
        
      
        
          "salary":this.salary.value,
        
      
        
          "ID":this.ID.value,
        
      
        
          "title":this.title.value,
        
      
        
          "firstname":this.firstname.value,
        
      
        
          "lastname":this.lastname.value
        
      
    };

    this.myForm.setValue({
      
        
          "department":null,
        
      
        
          "salary":null,
        
      
        
          "ID":null,
        
      
        
          "title":null,
        
      
        
          "firstname":null,
        
      
        
          "lastname":null
        
      
    });

    return this.serviceDoctor.addParticipant(this.participant)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "department":null,
        
      
        
          "salary":null,
        
      
        
          "ID":null,
        
      
        
          "title":null,
        
      
        
          "firstname":null,
        
      
        
          "lastname":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: "composers.participants.Doctor",
      
        
          
            "department":this.department.value,
          
        
    
        
          
            "salary":this.salary.value,
          
        
    
        
          
        
    
        
          
            "title":this.title.value,
          
        
    
        
          
            "firstname":this.firstname.value,
          
        
    
        
          
            "lastname":this.lastname.value
          
        
    
    };

    return this.serviceDoctor.updateParticipant(form.get("ID").value,this.participant)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteParticipant(): Promise<any> {

    return this.serviceDoctor.deleteParticipant(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceDoctor.getparticipant(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "department":null,
          
        
          
            "salary":null,
          
        
          
            "ID":null,
          
        
          
            "title":null,
          
        
          
            "firstname":null,
          
        
          
            "lastname":null 
          
        
      };



      
        if(result.department){
          
            formObject.department = result.department;
          
        }else{
          formObject.department = null;
        }
      
        if(result.salary){
          
            formObject.salary = result.salary;
          
        }else{
          formObject.salary = null;
        }
      
        if(result.ID){
          
            formObject.ID = result.ID;
          
        }else{
          formObject.ID = null;
        }
      
        if(result.title){
          
            formObject.title = result.title;
          
        }else{
          formObject.title = null;
        }
      
        if(result.firstname){
          
            formObject.firstname = result.firstname;
          
        }else{
          formObject.firstname = null;
        }
      
        if(result.lastname){
          
            formObject.lastname = result.lastname;
          
        }else{
          formObject.lastname = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "department":null,
        
      
        
          "salary":null,
        
      
        
          "ID":null,
        
      
        
          "title":null,
        
      
        
          "firstname":null,
        
      
        
          "lastname":null 
        
      
      });
  }

}
