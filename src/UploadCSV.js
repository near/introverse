import React from "react";
import CSVReader from "react-csv-reader";

const parseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
};

const reader = props => {

  const handleForce = (data, fileName) => {
    // console.log(parseNames(data));
    props.handleData(parseNames(data));
  };

  const parseNames = data => {
    return data.map(line => {
      let firstName = line.first_name;
      let lastName = line.last_name;
      return  `${firstName} ${lastName}`
    });
  }

  return (
    <div className="container">
      <CSVReader
        cssClass="react-csv-input"
        label="Upload some sht"
        onFileLoaded={handleForce}
        parserOptions={parseOptions}
      />
    </div>
  )
};

export default reader;
