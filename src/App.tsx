import React from 'react';

import './App.css';

import { useQuery, gql } from '@apollo/client';

interface Datatypes {
  country: {
    name: string;
    cases: number;
    deaths: number;
    analysis: any;
    todayCases: number;
    recovered: string | number;
  };
}

const COVID_DATA = gql`
  query GetCovidData {
    country(name: "Hungary") {
      deaths
      cases
      todayCases
      analysis {
        cases
        todayCases
        recovered
      }
    }
  }
`;

function GetCovidData() {
  const { loading, error, data } = useQuery<Datatypes>(COVID_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <div>
          <h1>COVID-19 in Hungary</h1>

          <h3>JSON</h3>
          {JSON.stringify(data)}

          <h3>Status</h3>
          <p>Cases: {data!.country.cases.toLocaleString('uk')}</p>
          <p>Deaths: {data!.country.deaths.toLocaleString('uk')}</p>
          <p>Today cases: {data!.country.todayCases.toLocaleString('uk')}</p>

          <h3>Analysis</h3>
          <h4>Cases</h4>
          <p>Status: {data!.country.analysis.cases.status}</p>
          <p>Percentage: {data!.country.analysis.cases.percentage}</p>

          <h4>Today cases</h4>
          <p>Status: {data!.country.analysis.todayCases.status}</p>
          <p>Percentage: {data!.country.analysis.todayCases.percentage}</p>

          <h4>Recovered</h4>
          <p>Status: {data!.country.analysis.recovered.status}</p>
          <p>Percentage: {data!.country.analysis.recovered.percentage}</p>
          <div className="app__footer">
            <p>
              created by{' '}
              <a href="https://github.com/adam-i-horvath">adam horvath</a>
            </p>
            <p>Used technologies: React, Typescript, Graphql, Apollo</p>
            <span>
              Used API:{' '}
              <a href="https://corona-graphql.herokuapp.com/">
                https://corona-graphql.herokuapp.com/
              </a>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

const App: React.FC = () => {
  return (
    <div className="app">
      <GetCovidData />
    </div>
  );
};

export default App;
