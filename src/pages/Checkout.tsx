
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process the order here
    console.log('Order submitted with:', formData, 'Payment method:', paymentMethod);
    clearCart();
    navigate('/order-confirmation');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Order Summary */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b">
                  <span>{item.name} ({item.quantity})</span>
                  <span>${item.price * item.quantity}</span>
                </div>
              ))}
              <div className="flex items-center justify-between py-2 font-semibold">
                <span>Total:</span>
                <span>${getCartTotal()}</span>
              </div>
            </div>

            {/* Checkout Form */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Shipping Information</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Your Address"
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Your City"
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="Your Zip Code"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <Label>Payment Method</Label>
                  <RadioGroup defaultValue="card" className="flex flex-col space-y-1.5" onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card">Credit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal">PayPal</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button type="submit" className="w-full">Place Order</Button>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
