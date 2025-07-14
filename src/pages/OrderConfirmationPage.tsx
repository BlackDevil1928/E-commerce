
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Check, Package, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  
  useEffect(() => {
    // In a real app, this would fetch order details from an API
    toast.success("Order placed successfully!");
  }, []);
  
  return (
    <div className="container py-16 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <div className="bg-green-50 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={48} className="text-green-500" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-xl text-gray-600">
          Thank you for your purchase. Your order has been received.
        </p>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-8 mb-8">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div>
            <h3 className="text-sm text-gray-500 mb-1">Order Number</h3>
            <p className="font-semibold">{orderId}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500 mb-1">Order Date</h3>
            <p className="font-semibold">{new Date().toLocaleDateString()}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500 mb-1">Payment Method</h3>
            <p className="font-semibold">Credit Card</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 p-3 rounded-full">
              <Package className="text-blue-500" size={24} />
            </div>
            <div>
              <h3 className="font-semibold">Your order is confirmed</h3>
              <p className="text-gray-600">
                We've accepted your order and are processing it.
              </p>
            </div>
          </div>
          
          <div className="border-t border-b py-4">
            <h3 className="font-semibold mb-4">Estimated Delivery</h3>
            <div className="flex justify-between">
              <span>
                {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()} -{" "}
                {new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </span>
              <span className="text-green-600 font-medium">On schedule</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-xl font-bold mb-6">Order Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-3">Shipping Address</h3>
            <p className="text-gray-600">
              John Doe<br />
              123 Main Street<br />
              Apartment 4B<br />
              New York, NY 10001<br />
              United States
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Payment Information</h3>
            <p className="text-gray-600">
              Credit Card<br />
              **** **** **** 1234<br />
              Expiry: 12/25
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-10 text-center">
        <p className="mb-6 text-gray-600">
          We've sent a confirmation email to your registered email address.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/" className="btn-brand flex items-center justify-center gap-2">
            Continue Shopping <ArrowRight size={16} />
          </Link>
          <Link to="/orders" className="btn-outline flex items-center justify-center gap-2">
            View Order History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
