import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Async } from "react-async";

const apiKey = process.env.REACT_APP_API_KEY;
const weatherDetails = (data) => {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${data.capital[0].toLowerCase()}&appid=${apiKey}&units=metric`
    )
    .then((res) => {
      return res.data;
    });
};

const ShowWeather = ({ countryData }) => {
  return (
    <Async promiseFn={() => weatherDetails(countryData)}>
      {({ data, err, isLoading }) => {
        if (isLoading) return <p>Loading...</p>;
        if (err) return <p>Something went wrong: {err.message}</p>;

        if (data)
          return (
            <>
              <h1>Weather in {countryData.capital[0]} </h1>
              <p>
                temperature: <strong>{data.main.temp}</strong> <i>Celsius</i>
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              />
              <p>
                wind: <strong>{Number(data.wind.speed) / 2.23} </strong>
                <i>mph - </i>
                <small>
                  direction <strong>{data.wind.deg}</strong> <i>degree</i>
                </small>
              </p>
            </>
          );
      }}
    </Async>
  );
};

function App() {
  const [datas, setDatas] = useState([]);
  const [input, setInput] = useState("");
  const [validDatas, setValidDatas] = useState([]);

  const inputHandler = (e) => {
    setInput(e.target.value);
    setValidDatas(
      datas.filter((data) =>
        data.name.common.toLowerCase().includes(input.toLowerCase())
      )
    );
  };
  const showHandler = (e) => {
    setInput(e.target.value);
    console.log(e.target.value);
    setValidDatas(
      datas.filter(
        (data) => data.name.common.toLowerCase() == e.target.value.toLowerCase()
      )
    );
  };

  const showDetails = (countryData) => {
    const languages = [];
    for (const language in countryData.languages) {
      languages.push(countryData.languages[language]);
    }
    return (
      <>
        <h1>{countryData.name.common}</h1>
        {countryData.capital.map((capital) => (
          <p>
            capital <strong>{capital}</strong>
          </p>
        ))}
        <p>
          population <strong>{countryData.population}</strong>
        </p>
        <h2>Languages</h2>
        <ul>
          {languages.map((language) => (
            <li>{language}</li>
          ))}
        </ul>
        <img src={`${countryData.flags.png}`} />
        <ShowWeather countryData={countryData} />
      </>
    );
  };

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setDatas(res.data));
  }, []);

  return (
    <div className="container">
      find countries: <input onChange={inputHandler} value={input}></input>
      {validDatas.length > 10 ? (
        <p>
          <strong>Too many matches, specify another filter</strong>
        </p>
      ) : validDatas.length == 1 ? (
        showDetails(validDatas[0])
      ) : (
        validDatas.map((data) => (
          <p key={data.name.common}>
            <strong>{data.name.common} </strong>
            <button onClick={showHandler} value={data.name.common}>
              show
            </button>
          </p>
        ))
      )}
    </div>
  );
}

export default App;
