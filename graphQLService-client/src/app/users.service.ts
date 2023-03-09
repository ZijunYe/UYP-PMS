import { Injectable } from '@angular/core';
import {Apollo, gql} from "apollo-angular";
import {Observable} from "rxjs";
import {ApolloQueryResult, FetchResult} from "@apollo/client/core";
import {Prescription, User} from "./model/user";



@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private apollo: Apollo) {}


  public getUser(): Observable<ApolloQueryResult<any>> {
    return this.apollo
    .query<any>({
      query: gql`   {
        users {
          userId
          username
          password
          role
          licenceId
          firstName
          lastName
          title
          address
          telephoneNumber
          email
          faxNumber
          gender
          dateOfBirth
          allergies
          currentMedications
          insuranceNumber

        }
      }
      `
    });
  }
  public getUserByUsername(username:string):Observable<ApolloQueryResult<any>>{
    return this.apollo
    .query<any>({
      query: gql`
        query($username: String!) {
          userByUsername(username: $username) {
            userId
            username
            password
            role
            licenceId
            firstName
            lastName
            title
            address
            telephoneNumber
            email
            faxNumber
            gender
            dateOfBirth
            allergies
            currentMedications
            insuranceNumber
          }
        }
      `,
      variables: {
        username
      }
    });
  }

  public addPatient(u: User): Observable<FetchResult<User>> {
    return this.apollo.mutate({
        mutation: gql`
          mutation newPatient(

           $username:String,
            $password:String,
            $firstname:String,
            $lastName:String,
            $gender: String,
            $dateOfBirth: String,
            $allergies: String,
            $currentMedications:String,
            $insuranceNumber: String

          ){
            newPatient(
              username:$username,
              password:$password,
              firstname:$firstname,
              lastName:$lastName,
              gender: $gender,
              dateOfBirth:$dateOfBirth,
              allergies: $allergies,
              currentMedications:$currentMedications,
              insuranceNumber:$insuranceNumber) {
              userId
            }
          }
        `,
        variables: {
          username:u.username,
          password:u.password,
          firstname:u.firstName,
          lastName:u.lastName,
          gender: u.gender,
          dateOfBirth:u.dateOfBirth,
          allergies: u.allergies,
          currentMedications:u.currentMedications,
          insuranceNumber:u.insuranceNumber,
        }
      }
    );
  }


  public addAgent(u: User): Observable<FetchResult<User>> {
    return this.apollo.mutate({
        mutation: gql`
          mutation newAgent(
          $username:String,
          $password:String,
          $licenceId: String,
          $firstname:String,
          $lastName:String,
          $title:String,
          $telephoneNumber:String,
          $email:String,
          $faxNumber:String){
            newAgent(
              username:$username,
              password: $password,
              licenceId: $licenceId,
              firstname:$firstname,
              lastName:$lastName,
              title:$title,
              telephoneNumber:$telephoneNumber,
              email:$email,
              faxNumber:$faxNumber) {
                  userId
                  username
                  password
                  role
                  licenceId
                  firstName
                  lastName
                  title
                  address
                  telephoneNumber
                  email
                  faxNumber
                  gender
                  dateOfBirth
                  allergies
                  currentMedications
                  insuranceNumber
            }
          }
        `,
        variables: {
          username:u.username,
          password:u.password,
          licenceId: u.licenceId,
          firstname:u.firstName,
          lastName:u.lastName,
          title:u.title,
          telephoneNumber:u.telephoneNumber,
          email:u.email,
          faxNumber:u.faxNumber,
        }
      }
    );
  }

  public deleteUser(u: User): Observable<FetchResult<User>> {
    return this.apollo.mutate({
        mutation: gql`
          mutation deleteUser($userId:String){
            deleteUser(userId: $userId)
          }
        `,
        variables: {
          userId: u.userId,
        }
      }
    );
  }


  public modifyUser(u: User): Observable<FetchResult<User>> {
    return this.apollo.mutate({
        mutation: gql`
          mutation updateUser(
          $userId:String,
          $username:String,
          $password:String,
            $role:String,
          $licenceId:String,
          $firstName:String,
          $lastName:String,
          $title:String,
          $address:String,
          $telephoneNumber:String,
          $email:String,
          $faxNumber:String,
          $gender:String,
          $dateOfBirth:String,
          $allergies:String,
          $currentMedications:String,
          $insuranceNumber:String){
            updateUser(
              userId:$userId,
              username:$username,
              password: $password,
              role:$role,
              licenceId: $licenceId,
              firstName:$firstName,
              lastName:$lastName,
              title:$title,
              address:$address,
              telephoneNumber:$telephoneNumber,
              email:$email,
              faxNumber:$faxNumber,
              gender:$gender,
              dateOfBirth:$dateOfBirth,
              allergies:$allergies,
              currentMedications:$currentMedications,
              insuranceNumber:$insuranceNumber
            ){
              userId
            }


          }
        `,
        variables: {
          userId:u.userId,
          username:u.username,
          password:u.password,
          role:u.role,
          licenceId: u.licenceId,
          firstName:u.firstName,
          lastName:u.lastName,
          title:u.title,
          address:u.address,
          telephoneNumber:u.telephoneNumber,
          email:u.email,
          faxNumber:u.faxNumber,
          gender:u.gender,
          allergies:u.allergies,
          currentMedications:u.currentMedications,
          insuranceNumber:u.insuranceNumber

        }
      }
    );
  }


  public getPrescription(username: string): Observable<ApolloQueryResult<any>> {
    return this.apollo
    .query<any>({
      query: gql`
        query($username: String!) {
          prescriptions (username: $username){
            prescriptionId
            prescriptionNumber
            username
            prescriptionDate
            medicationStrength
            amountMedication
            methodAdministration
            frequencyOfAdministration
            optionalConsideration
            status
            verified
            drug
          }
      }
      `,
      variables: {
        username
      }
    });
  }

//TODO: add create and update prescription here

  public verifyPrescription(p: Prescription): Observable<FetchResult<Prescription>> {
    return this.apollo.mutate(      {
      mutation: gql` mutation verifyPrescription(
          $id:String
        )
        {
          verifyPrescription (id: $id)
          {
            prescriptionId
            verified
          }
        }

      `,
      variables: {
        id: p.prescriptionId,
      }
    });
  }

  // make sure return type is right here
  public getAllPrescriptions(): Observable<ApolloQueryResult<any>> {
    return this.apollo.query<any>(      {
        query: gql`   {
        allPrescriptions {
            prescriptionId
            username
            prescriptionNumber
            prescriptionDate
            medicationStrength
            amountMedication
            methodAdministration
            frequencyOfAdministration
            optionalConsideration
            status
            verified
            drug
          }
      }
      `
      });
  }

  public createPrescription(p:Prescription): Observable<FetchResult<Prescription>> {
    return this.apollo.mutate({
        mutation: gql`
          mutation newPrescription(
            $username:String
              $prescriptionNumber:Int,
              $prescriptionDate:String,
              $medicationStrength:String,
              $amountMedication:String,
              $methodAdministration:String,
              $frequencyOfAdministration:String,
              $optionalConsideration:String,
              $status:String,
                $verified:String,
              $drug:String ){
            newPrescription(
              username:$username,
              prescriptionNumber:$prescriptionNumber,
              prescriptionDate:$prescriptionDate,
              medicationStrength: $medicationStrength,
              amountMedication: $amountMedication,
              methodAdministration:$methodAdministration,
              frequencyOfAdministration:$frequencyOfAdministration,
              optionalConsideration:$optionalConsideration,
              status:$status,
              verified:$verified,
              drug:$drug
            ){
              prescriptionId
            }


          }
        `,
        variables: {
          username:p.username,
          prescriptionNumber:p.prescriptionNumber,
          prescriptionDate:p.prescriptionDate,
          medicationStrength:p.medicationStrength,
          amountMedication: p.amountMedication,
          methodAdministration:p.methodAdministration,
          frequencyOfAdministration:p.frequencyOfAdministration,
          optionalConsideration:p.optionalConsideration,
          status:p.status,
          verified:p.verified,
          drug:p.drug

        }
      }
    );
  }

  public modifyPrescription(p: Prescription): Observable<FetchResult<Prescription>> {
    return this.apollo.mutate({
        mutation: gql`
          mutation updatePrescription(
          $prescriptionId:String,
          $prescriptionNumber:String,
          $prescriptionDate:String,
          $medicationStrength:String,
          $amountMedication:String,
          $methodAdministration:String,
          $frequencyOfAdministration:String,
          $optionalConsideration:String,
          $status:String,
          $drug:String,) {
            updatePrescription(
              prescriptionId:$prescriptionId,
              prescriptionNumber:$prescriptionNumber,
              prescriptionDate:$prescriptionDate,
              medicationStrength: $medicationStrength,
              amountMedication: $amountMedication,
              methodAdministration:$methodAdministration,
              frequencyOfAdministration:$frequencyOfAdministration,
              optionalConsideration:$optionalConsideration,
              status:$status,
              verified:$verified,
              drug:$drug
            ){
              prescriptionId
            }


          }
        `,
        variables: {
          prescriptionNumber:p.prescriptionNumber,
          prescriptionDate:p.prescriptionDate,
          medicationStrength:p.medicationStrength,
          amountMedication: p.amountMedication,
          methodAdministration:p.methodAdministration,
          frequencyOfAdministration:p.frequencyOfAdministration,
          optionalConsideration:p.optionalConsideration,
          status:p.status,
          verified:p.verified,
          drug:p.drug

        }
      }
    );
  }


  // public getUserByUsername(username:string):Observable<ApolloQueryResult<any>>{
  //   return this.apollo
  //   .query<any>({
  //     query: gql`
  //       query($username: String!) {
  //         userByUsername(username: $username) {
  //           userId
  //           username
  //           password
  //           role
  //           licenceId
  //           firstName
  //           lastName
  //           title
  //           address
  //           telephoneNumber
  //           email
  //           faxNumber
  //           gender
  //           dateOfBirth
  //           allergies
  //           currentMedications
  //           insuranceNumber
  //         }
  //       }
  //     `,
  //     variables: {
  //       username
  //     }
  //   });
  // }











}
