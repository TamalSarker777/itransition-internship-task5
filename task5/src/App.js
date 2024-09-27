import React, { useState, useEffect, useCallback } from "react";
import { FaShuffle } from "react-icons/fa6";
import { Navbar } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./App.css";
import { generateUserData, applyErrors } from "./components/dataGenerators";
import Table from "react-bootstrap/Table";

function App() {
  const [seletedCountry, setSelectedCountry] = useState("usa");
  const [sliderValue, setSliderValue] = useState(0);
  const [seedValue, setSeedValue] = useState(42);
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const newUsers = generateUserData(seletedCountry, seedValue, pageNumber); // Initially page is 1
    const usersWithErrors = applyErrors(newUsers, sliderValue);
    if (pageNumber === 1) {
      setUsers(usersWithErrors);
    } else {
      setUsers((prevUsers) => [...prevUsers, ...usersWithErrors]);
    }
  }, [seletedCountry, seedValue, sliderValue, pageNumber]);

  const getSelectedRegion = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleSlider = (event) => {
    const value = Number(event.target.value);
    if (value > 1000 || value < 0) {
      alert("The value should be from 0 to 1000");
    } else {
      setSliderValue(event.target.value);
      const usersWithErrors = applyErrors(users, sliderValue);
      setUsers(usersWithErrors);
    }
  };

  const handleSeed = (event) => {
    setSeedValue(event.target.value);
  };

  function randomSeed() {
    setSeedValue(Math.floor(Math.random() * 10000) + 1);
  }

  const loadMore = useCallback(() => {
    setPageNumber((prevPage) => prevPage + 1); // Increment page number
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight
      ) {
        loadMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
  }, [loadMore]);

  // ---------------------------------------------------------------

  return (
    <>
      <Navbar expand="lg" className="bg-dark">
        <Navbar.Brand href="#" className="text-white">
          Task 5
        </Navbar.Brand>
      </Navbar>
      <br />
      <br />
      <div class="container">
        <div class="column">
          <label for="cars">
            <strong>Region: </strong>
          </label>
          <select
            name="region"
            id="region"
            onChange={getSelectedRegion}
            value={seletedCountry}
          >
            <option value="usa">USA</option>
            <option value="poland">Poland</option>
            <option value="georgia">Georgia</option>
          </select>
        </div>

        <div class="column">
          <label htmlFor="sldier">
            <strong>Error: </strong>
          </label>
          <input
            type="range"
            name="slider"
            id="slider"
            min="0"
            max="10"
            value={sliderValue}
            onChange={handleSlider}
          />
          <input
            type="number"
            id="errorInput"
            value={sliderValue}
            min="0"
            max="1000"
            onChange={handleSlider}
          />
        </div>
        <div class="column">
          <label for="seed">
            <strong>Seed: </strong>
          </label>
          <input
            type="number"
            name="seed"
            id="seed"
            value={seedValue}
            onChange={handleSeed}
          />
          <Button
            type="button"
            value={seedValue}
            onClick={randomSeed}
            variant="info"
          >
            <FaShuffle />
          </Button>
        </div>
        <div class="column">
          <Button type="button" variant="success">
            Export
          </Button>
        </div>
      </div>
      <br />
      {/* -------------------------------------------------------- */}

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Identifier</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.randomIdent}</td>
              <td>{user.name}</td>
              <td>{user.address}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default App;
