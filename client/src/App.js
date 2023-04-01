import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './mystyle.css';

// create navbar for UI
function Navbar() {
  return (
    <nav style={{ backgroundColor: 'orange', color: '#fff', height: '40px' }}>
      <h2>Ecommerce Shipping</h2>
      {/* <a href="">Home</a> */}
    </nav>
  );
}

function App() {
  const [myData, setMyData] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().substr(0, 10)
  );

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:3000/mydata');
      setMyData(response.data);
    }
    fetchData();
  }, []);

  const handleDateSelect = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleAddClick = (productId, maxBusinessDaysToShip, shipOnWeekends) => {
    let calculatedDate = 0;
    // check for shippping available on weekdays / weekends
    if (shipOnWeekends === 'false') {
      let daysToAdd = 1;
      let currentDate = new Date(selectedDate);

      while (daysToAdd < maxBusinessDaysToShip - 1) {
        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
          daysToAdd++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
      currentDate.setDate(currentDate.getDate());
      calculatedDate = currentDate.toISOString().substr(0, 10);
    } else {
      let currentDate = new Date(selectedDate);
      currentDate.setDate(currentDate.getDate() + maxBusinessDaysToShip - 1);
      calculatedDate = currentDate.toISOString().substr(0, 10);
    }

    // update product shipping date
    const updatedProducts = myData.map((item) => {
      if (item.productId === productId) {
        return {
          ...item,
          calculatedShippingDate: calculatedDate,
        };
      } else {
        return item;
      }
    });

    setSelectedProducts([...selectedProducts, productId]);
    setMyData(updatedProducts);
  };

  return (
    <div>
      <Navbar />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            {/* <th>Quantity</th> */}
            <th>ShipOnWeekends</th>
            <th>MaxDaysToShip</th>

            <th>OrderDate</th>

            <th></th>
            <th>Shipping Date</th>
          </tr>
        </thead>
        <tbody>
          {myData.map((item) => (
            <tr key={item.productId}>
              <td>{item.productId}</td>
              <td>{item.productName}</td>
              {/* <td>{item.inventoryQuantity}</td> */}
              <td>{item.shipOnWeekends.toString()}</td>
              <td>{item.maxBusinessDaysToShip}</td>

              <td>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().substr(0, 10)}
                  onChange={handleDateSelect}
                />
              </td>
              <td>
                <button
                  onClick={() =>
                    handleAddClick(
                      item.productId,
                      item.maxBusinessDaysToShip,
                      item.shipOnWeekends.toString()
                    )
                  }
                >
                  Check Shipping Date
                </button>
              </td>
              <td>{item.calculatedShippingDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
