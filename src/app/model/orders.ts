export interface Orders {
      Orderid: number,
      Requireddate: Date,
      Shippeddate: Date,
      Shipname: string,
      Shipaddress: string,
      Shipcity: string
}

export interface confirm{
      orderid:Number	
      STATUS:boolean	
      MESSAGE:string
}