const getData = (page,currency) => {
  return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&per_page=20&page=${page}&x_cg_demo_api_key=CG-jRzMLrcekyW36h16nRANMrSu`;
};
const searchinput=(quer)=>{
  return `https://api.coingecko.com/api/v3/search?query=${quer}&x_cg_demo_api_key=CG-jRzMLrcekyW36h16nRANMrSu`
}
const getchart=(id)=>{
  return   `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`
}
export { getData,searchinput,getchart };
