export interface UserLogin{
  username:string,
  password:string
}

export interface UserRegister{
  name:string,
  surname:string,
  birthdate:string,
  email:string,
  username:string,
  password:string,
  profilePick:string
}

export interface User {
  id:number,
  docId?:string;
  admin:boolean,
  name:string,
  surname:string,
  birthdate:string,
  email:string,
  username:string,
  password:string,
  profilePick:string
}
