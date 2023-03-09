export class User{
  constructor(
    public userId: string,
    public username: string,
    public password: string,
    public role:String,
    public licenceId:String,
    public firstName:String,
    public lastName: String,
    public title:String,
    public telephoneNumber: String,
    public email: String,
    public faxNumber: String,
    public address: String,
    public gender: String,
    public dateOfBirth: String,
    public allergies: String,
    public currentMedications:String,
    public insuranceNumber: String,

  ) {}

}

export class Prescription {
  constructor(
    public prescriptionId:string,
    public username:string,
    public prescriptionNumber: number,
    public prescriptionDate: string,
    public medicationStrength: string,
    public amountMedication: string,
    public methodAdministration: string,
    public frequencyOfAdministration: string,
    public optionalConsideration: string,
    public status:string,
    public verified: string,
    public drug:string
  ) {}
}
