
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";
import { ArrowLeft, CreditCard, Check } from "lucide-react";

interface ShippingInfo {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
  });
  
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });
  
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate shipping info
    for (const [key, value] of Object.entries(shippingInfo)) {
      if (!value && key !== "phone") {
        toast.error(`Please enter your ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return;
      }
    }
    
    // Move to payment step
    setStep(2);
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === "credit-card") {
      // Validate card info
      if (!cardInfo.cardNumber || !cardInfo.cardName || !cardInfo.expiry || !cardInfo.cvv) {
        toast.error("Please fill in all card details");
        return;
      }
    }
    
    // Show processing step
    setStep(3);
    
    // Simulate order processing
    setTimeout(() => {
      const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      
      // Clear cart and navigate to confirmation page
      clearCart();
      navigate(`/order-confirmation/${orderId}`);
      
      // In a real app, order data would be saved to the backend
    }, 2000);
  };
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    if (name.startsWith("card")) {
      setCardInfo({
        ...cardInfo,
        [name]: value,
      });
    } else {
      setShippingInfo({
        ...shippingInfo,
        [name]: value,
      });
    }
  };
  
  if (items.length === 0 && step !== 3) {
    navigate("/cart");
    return null;
  }
  
  return (
    <div className="container py-12">
      {/* Checkout Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          <div className={`flex flex-col items-center ${step >= 1 ? "text-[hsl(var(--brand))]" : "text-gray-400"}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-[hsl(var(--brand))] text-white" : "bg-gray-200"}`}>
              1
            </div>
            <span className="mt-2">Shipping</span>
          </div>
          <div className={`w-20 h-1 mx-2 ${step >= 2 ? "bg-[hsl(var(--brand))]" : "bg-gray-200"}`}></div>
          <div className={`flex flex-col items-center ${step >= 2 ? "text-[hsl(var(--brand))]" : "text-gray-400"}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? "bg-[hsl(var(--brand))] text-white" : "bg-gray-200"}`}>
              2
            </div>
            <span className="mt-2">Payment</span>
          </div>
          <div className={`w-20 h-1 mx-2 ${step >= 3 ? "bg-[hsl(var(--brand))]" : "bg-gray-200"}`}></div>
          <div className={`flex flex-col items-center ${step >= 3 ? "text-[hsl(var(--brand))]" : "text-gray-400"}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? "bg-[hsl(var(--brand))] text-white" : "bg-gray-200"}`}>
              3
            </div>
            <span className="mt-2">Confirmation</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Shipping & Payment Forms */}
        <div className="lg:col-span-2">
          {/* Step 1: Shipping Information */}
          {step === 1 && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Shipping Information</h1>
                <Link to="/cart" className="text-[hsl(var(--brand))] hover:underline flex items-center gap-1">
                  <ArrowLeft size={16} />
                  Return to Cart
                </Link>
              </div>
              
              {!isAuthenticated && (
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <p>
                    Already have an account?{" "}
                    <Link to="/login" className="text-[hsl(var(--brand))] hover:underline">
                      Log in
                    </Link>{" "}
                    for a faster checkout experience.
                  </p>
                </div>
              )}
              
              <form onSubmit={handleShippingSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block mb-1 font-medium">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={shippingInfo.firstName}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-4 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block mb-1 font-medium">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={shippingInfo.lastName}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-4 py-2"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="address" className="block mb-1 font-medium">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-4 py-2"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block mb-1 font-medium">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-4 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block mb-1 font-medium">
                      State/Province *
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-4 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block mb-1 font-medium">
                      Postal/Zip Code *
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-4 py-2"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="country" className="block mb-1 font-medium">
                      Country *
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={shippingInfo.country}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-4 py-2"
                      required
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Japan">Japan</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block mb-1 font-medium">
                      Phone Number (optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-4 py-2"
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <button type="submit" className="btn-brand w-full sm:w-auto px-8">
                    Continue to Payment
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Step 2: Payment Information */}
          {step === 2 && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Payment Method</h1>
                <button
                  onClick={() => setStep(1)}
                  className="text-[hsl(var(--brand))] hover:underline flex items-center gap-1"
                >
                  <ArrowLeft size={16} />
                  Return to Shipping
                </button>
              </div>
              
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div className="space-y-3">
                  <label className="block font-medium mb-2">Select Payment Method</label>
                  
                  <div className="flex items-center border rounded-md p-3 mb-3">
                    <input
                      type="radio"
                      id="credit-card"
                      name="paymentMethod"
                      value="credit-card"
                      checked={paymentMethod === "credit-card"}
                      onChange={() => setPaymentMethod("credit-card")}
                      className="mr-3"
                    />
                    <label htmlFor="credit-card" className="flex items-center cursor-pointer">
                      <CreditCard className="mr-2" size={20} />
                      Credit / Debit Card
                    </label>
                  </div>
                  
                  <div className="flex items-center border rounded-md p-3">
                    <input
                      type="radio"
                      id="paypal"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentMethod === "paypal"}
                      onChange={() => setPaymentMethod("paypal")}
                      className="mr-3"
                    />
                    <label htmlFor="paypal" className="cursor-pointer">
                      PayPal
                    </label>
                  </div>
                </div>
                
                {paymentMethod === "credit-card" && (
                  <div className="border rounded-md p-4 space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="block mb-1 font-medium">
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardInfo.cardNumber}
                        onChange={handleInputChange}
                        className="w-full border rounded-md px-4 py-2"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cardName" className="block mb-1 font-medium">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={cardInfo.cardName}
                        onChange={handleInputChange}
                        className="w-full border rounded-md px-4 py-2"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry" className="block mb-1 font-medium">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          id="expiry"
                          name="expiry"
                          placeholder="MM/YY"
                          value={cardInfo.expiry}
                          onChange={handleInputChange}
                          className="w-full border rounded-md px-4 py-2"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block mb-1 font-medium">
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          placeholder="123"
                          value={cardInfo.cvv}
                          onChange={handleInputChange}
                          className="w-full border rounded-md px-4 py-2"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {paymentMethod === "paypal" && (
                  <div className="border rounded-md p-4">
                    <p className="text-gray-600 mb-4">
                      You will be redirected to PayPal to complete your purchase securely.
                    </p>
                    <div className="flex justify-center">
                      <img
                        src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg"
                        alt="PayPal Logo"
                        className="h-12"
                      />
                    </div>
                  </div>
                )}
                
                <div className="pt-4">
                  <button type="submit" className="btn-brand w-full">
                    Place Order
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Step 3: Processing */}
          {step === 3 && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[hsl(var(--brand))] mx-auto mb-4"></div>
              <h2 className="text-2xl font-bold mb-2">Processing your order...</h2>
              <p className="text-gray-600">Please wait while we process your payment.</p>
            </div>
          )}
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            
            <div className="max-h-80 overflow-y-auto space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium line-clamp-1">{item.name}</div>
                    <div className="text-gray-500 text-sm">Qty: {item.quantity}</div>
                  </div>
                  <div className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-2 mb-4 pt-4 border-t">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(totalPrice * 0.07).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${(totalPrice + totalPrice * 0.07).toFixed(2)}</span>
              </div>
            </div>
            
            {step === 1 && (
              <button
                onClick={handleShippingSubmit}
                className="btn-brand w-full"
              >
                Continue to Payment
              </button>
            )}
            
            {step === 2 && (
              <button
                onClick={handlePaymentSubmit}
                className="btn-brand w-full"
              >
                Place Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
