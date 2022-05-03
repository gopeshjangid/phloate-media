import axios from 'axios';
import configData from "../config/config.json"; 
export default {

  
  postJoinus: async function(data) {
	  
	 // console.log(configData.TOKEN);
	 // console.log(configData.API_URL);
     try {     
       let  url =configData.API_URL;
		const response = await axios.post(url, data, {headers: {'Authorization': `Bearer ${configData.TOKEN}` } } );
		//const response = await axios.get(url, {headers: {'Authorization': `Bearer ${configData.TOKEN}` } } );
		//console.log(response.records);
		return response.data;
		}catch(error) {
		 console.log(error.response.status)
		if(error.response.status===401){
			return error.response.data;
		}
		//throw error;
	   } 
  }
}