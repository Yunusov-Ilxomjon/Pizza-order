import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';

function Navbar() {
  const [username, setUsername] = useState('');
  const [usersurname, setUsersurname] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleUsersurname = (e) => {
    setUsersurname(e.target.value);
  };

  const handleNumber = (e) => {
    setNumber(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleOption1 = (e) => {
    setOption1(e.target.value);
  };

  const handleOption2 = (e) => {
    setOption2(e.target.value);
  };

  const saveOrder = (e) => {
    e.preventDefault();

    // Form elementlarini to'ldirishni tekshirish
    if (!username || !usersurname || !number || !email || !option1 || !option2) {
      setMessage('Iltimos, buyurtma bering.');
      return;
    }

    const newOrder = {
      id: orders.length + 1,
      username,
      usersurname,
      number,
      email,
      option1,
      option2,
    };

    setOrders([...orders, newOrder]);
    setMessage(''); // Xabarni tozalang
    resetForm();
  };

  const resetForm = () => {
    setUsername('');
    setUsersurname('');
    setNumber('');
    setEmail('');
    setOption1('');
    setOption2('');
  };

  const deleteOrder = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    const deletedOrder = orders.find((order) => order.id === id);
    setOrders(updatedOrders);

    if (deletedOrder) {
      // Xabar aynan o'chirilgan card o'rnida chiqadi
      setMessage(`${deletedOrder.username} ${deletedOrder.usersurname} buyurtmasini bekor qildi.`);
    }
  };

  return (
    <div className='pizza-container'>
      <div className="pizza-form">
        <h1 style={{ textAlign: 'center' }}>Choose your order</h1>

        <form onSubmit={saveOrder} style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="">Your name:</label>
          <input type="text" placeholder='Name' name='username' value={username} onChange={handleUsername} />

          <label htmlFor="">Your surname:</label>
          <input type="text" placeholder='Surname' name='usersurname' value={usersurname} onChange={handleUsersurname} />

          <label htmlFor="">Your phone:</label>
          <input type="text" placeholder='Phone number' name='number' value={number} onChange={handleNumber} />

          <label htmlFor="">Your email:</label>
          <input type="text" placeholder='...@gmail.com' name='email' value={email} onChange={handleEmail} />

          <label htmlFor="pizza">Pizza:</label>
          <select id="pizza" name="pizza" value={option1} onChange={handleOption1}>
            <option value="">Select an option</option>
            <option value="Margarita">Margarita</option>
            <option value="Pepperoni">Pepperoni</option>
            <option value="Vegan">Vegan</option>
          </select>

          <label htmlFor="pizza">Pizza size:</label>
          <select id="pizza" name="pizza" value={option2} onChange={handleOption2}>
            <option value="">Select an option</option>
            <option value="middle">15 sm</option>
            <option value="normal">20 sm</option>
            <option value="big">30 sm</option>
          </select>

          <button className='btn btn-success'>Order</button>

          {/* Xatolik xabarini faqat tugma ostida ko'rsatish */}
          {message && !orders.length && <div className="alert alert-danger" style={{ marginTop: '10px' }}>{message}</div>}
        </form>
      </div>

      <div className="pizza-order">
        {orders.map((order) => (
          <div className="card" key={order.id}>
            <div className="card-header">
              Order #{order.id}
            </div>
            <div className="card-body">
              <h5 className="card-title">{order.option1} pizza, {order.option2}</h5>
              <p className="card-text">Client: {order.username} {order.usersurname}</p>
              <p className="card-text">Phone: {order.number}</p>
              <p className="card-text">Email: {order.email}</p>
              <button className='btn btn-danger' onClick={() => deleteOrder(order.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
