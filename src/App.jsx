import { useEffect, useState } from 'react';
import './App.css';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardSubTitle,
  MDBCardText,
  MDBCardLink,
  MDBInput
} from 'mdb-react-ui-kit';
import axios from 'axios'


function App() {

  const [value, setValue] = useState('');
  const [coutput, setOutput] = useState({});

  const base_url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=2567ade6a8c93f4ff3a5010eaa19ce88&units=metric`

  const handleChange = (e) => {
    setValue(e.target.value);
    FetchData()
  }

  const FetchData = async () => {
    try {
      const result = await axios.get(base_url);
      console.log(result.data);
      setOutput(result.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // You can set an error state or display an error message to the user here
    }
  }

  console.log(coutput);

  useEffect(() => {
    FetchData()
  }, [value])

  return (
    <div className="App">
      <div className="container m-5 text-center text-black">

        <MDBCard className='container' style={{backgroundImage:"url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS03IkldLhx-7NjRsXnkc8MPCOOVM9vq5hRYQ&usqp=CAU')",backgroundRepeat:'no-repeat',backgroundSize:'cover',height:'300px',width:'500px'}}>

          <MDBCardBody>
            <MDBCardTitle>City:{coutput.name}</MDBCardTitle>
            <MDBCardSubTitle>{coutput.main?.temp} °C</MDBCardSubTitle>
            <MDBCardText>
              humidity: {coutput.main?.humidity}
              <h1>{coutput.sys?.country}</h1>
              <br />
              <p>longitude: {coutput.coord?.lon}/latitude: {coutput.coord?.lat}</p>
            </MDBCardText>
          </MDBCardBody>
          <input type="text" onChange={handleChange} className='container text-center ' style={{width:'300px',marginBottom:'20px',borderRadius:'10px'}}/>
        </MDBCard>


      </div>
    </div>
  );
}

export default App;
