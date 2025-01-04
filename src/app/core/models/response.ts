

export interface ResponseSesion{
   token:string
}


export interface ResponseData<T> {
    statusCode:number,
    success:string,
    origen:string,
    result:T,

}
  