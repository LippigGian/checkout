import React, { useState } from 'react';

function PaymentMethod() {
  const [selectedMethod, setSelectedMethod] = useState('card');

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
      <p className="text-sm text-gray-600 mb-4">Add a new payment method to your account.</p>
      
      <div className="flex space-x-4 mb-6">
        <div 
          className={`p-4 border ${selectedMethod === 'card' ? 'border-black' : 'border-gray-300'} rounded-lg cursor-pointer`}
          onClick={() => setSelectedMethod('card')}
        >
          <input 
            type="radio" 
            name="payment" 
            id="card" 
            checked={selectedMethod === 'card'} 
            onChange={() => setSelectedMethod('card')} 
            className="hidden"
          />
          <label htmlFor="card" className="flex flex-col items-center space-y-2">
            <span>💳</span>
            <span>Card</span>
          </label>
        </div>

        <div 
          className={`p-4 border ${selectedMethod === 'paypal' ? 'border-black' : 'border-gray-300'} rounded-lg cursor-pointer`}
          onClick={() => setSelectedMethod('paypal')}
        >
          <input 
            type="radio" 
            name="payment" 
            id="paypal" 
            checked={selectedMethod === 'paypal'} 
            onChange={() => setSelectedMethod('paypal')} 
            className="hidden"
          />
          <label htmlFor="paypal" className="flex flex-col items-center space-y-2">
            <span>💻</span>
            <span>Paypal</span>
          </label>
        </div>

        <div 
          className={`p-4 border ${selectedMethod === 'apple' ? 'border-black' : 'border-gray-300'} rounded-lg cursor-pointer`}
          onClick={() => setSelectedMethod('apple')}
        >
          <input 
            type="radio" 
            name="payment" 
            id="apple" 
            checked={selectedMethod === 'apple'} 
            onChange={() => setSelectedMethod('apple')} 
            className="hidden"
          />
          <label htmlFor="apple" className="flex flex-col items-center space-y-2">
            <span>🍎</span>
            <span>Apple</span>
          </label>
        </div>
      </div>

      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="First Last" 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="card-number">Card number</label>
          <input 
            type="text" 
            id="card-number" 
            name="card-number" 
            placeholder="1234 5678 9012 3456" 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="flex space-x-4">
          <div className="flex-1 mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="expires">Expires</label>
            <select 
              id="expires" 
              name="expires" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option>Month</option>
              <option>01</option>
              <option>02</option>
              {/* Agregar más meses aquí */}
            </select>
          </div>

          <div className="flex-1 mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="year">Year</label>
            <select 
              id="year" 
              name="year" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option>Year</option>
              <option>2024</option>
              <option>2025</option>
              {/* Agregar más años aquí */}
            </select>
          </div>

          <div className="flex-1 mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="cvc">CVC</label>
            <input 
              type="text" 
              id="cvc" 
              name="cvc" 
              placeholder="CVC" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Continue
        </button>
      </form>
    </div>
  );
}

export default PaymentMethod;
