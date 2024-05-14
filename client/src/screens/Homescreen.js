import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPizzas } from "../actions/pizzaActions";
import Pizza from "../components/Pizza";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function Homescreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const dispatch = useDispatch();
  const pizzasstate = useSelector((state) => state.getAllPizzasReducer);

  const { pizzas, error, loading } = pizzasstate;

  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);

  const filteredPizzas = pizzas
    .filter((pizza) =>
      pizza.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((pizza) => {
      if (filter === "veg") return pizza.category === "veg";
      if (filter === "nonveg") return pizza.category === "nonveg";
      return true;
    });

  const commonStyle = {
    // height: '38px',
    // padding: '0.375rem 0.75rem',
    boxSizing: 'border-box',
    margin: '0'
  };

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="d-flex">
              <input
                type="text"
                placeholder="Search Pizzas"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control"
                style={{ ...commonStyle, width: "70%" }}
              />
              <select
                className="form-select"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{ ...commonStyle, width: "30%" }}
              >
                <option value="all">All</option>
                <option value="veg">Veg</option>
                <option value="nonveg">Non-Veg</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error error="Something went Wrong" />
        ) : (
          filteredPizzas.map((pizza) => {
            return (
              <div className="col-md-3 m-3" key={pizza._id}>
                <div>
                  <Pizza pizza={pizza} />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
