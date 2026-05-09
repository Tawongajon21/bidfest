
export const baseUrl:String=process.env.NODE_ENV === "development" ? "http://localhost:4000/api/v1/" : 'https://bidfest-api.onrender.com/api/v1/';
export const imageServerUrl:String=process.env.NODE_ENV === "development" ? "http://localhost:4000/" :'https://bidfest-api.onrender.com' 
export const serverUrl=process.env.NODE_ENV === "development" ? "http://localhost:4000/" :'https://bidfest-api.onrender.com/'
export const bidfirstUrl:String= process.env.NODE_ENV ==="development" ? "http://localhost:3000" :'https://bidfirstauctions.co.zw'
