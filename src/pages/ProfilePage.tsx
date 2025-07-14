
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import { User, Package, CreditCard, Heart, LogOut } from "lucide-react";

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: { pathname: "/profile" } }} />;
  }
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
  };
  
  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Address updated successfully!");
  };
  
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center space-x-3">
                <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
                  <User size={20} />
                </div>
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
            </div>
            
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center px-6 py-3 text-left ${
                  activeTab === "profile"
                    ? "bg-[hsl(var(--brand))] text-white"
                    : "hover:bg-gray-50"
                }`}
              >
                <User size={18} className="mr-3" />
                Profile Information
              </button>
              
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center px-6 py-3 text-left ${
                  activeTab === "orders"
                    ? "bg-[hsl(var(--brand))] text-white"
                    : "hover:bg-gray-50"
                }`}
              >
                <Package size={18} className="mr-3" />
                Order History
              </button>
              
              <button
                onClick={() => setActiveTab("addresses")}
                className={`w-full flex items-center px-6 py-3 text-left ${
                  activeTab === "addresses"
                    ? "bg-[hsl(var(--brand))] text-white"
                    : "hover:bg-gray-50"
                }`}
              >
                <CreditCard size={18} className="mr-3" />
                Addresses
              </button>
              
              <button
                onClick={() => setActiveTab("wishlist")}
                className={`w-full flex items-center px-6 py-3 text-left ${
                  activeTab === "wishlist"
                    ? "bg-[hsl(var(--brand))] text-white"
                    : "hover:bg-gray-50"
                }`}
              >
                <Heart size={18} className="mr-3" />
                Wishlist
              </button>
              
              <button
                onClick={logout}
                className="w-full flex items-center px-6 py-3 text-left text-red-600 hover:bg-red-50"
              >
                <LogOut size={18} className="mr-3" />
                Logout
              </button>
            </nav>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="md:col-span-3">
          {/* Profile Information */}
          {activeTab === "profile" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
              
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      defaultValue={user?.name.split(" ")[0]}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      defaultValue={user?.name.split(" ")[1] || ""}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    defaultValue={user?.email}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    defaultValue=""
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                    placeholder="(123) 456-7890"
                  />
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Password Change</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input
                        id="currentPassword"
                        type="password"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
                        </label>
                        <input
                          id="newPassword"
                          type="password"
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm New Password
                        </label>
                        <input
                          id="confirmPassword"
                          type="password"
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button type="submit" className="btn-brand">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Order History */}
          {activeTab === "orders" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Order History</h2>
              
              <div className="space-y-6">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div className="bg-gray-50 px-6 py-4 border-b flex flex-wrap justify-between items-center gap-4">
                      <div>
                        <div className="font-medium">Order #{1000 + index}</div>
                        <div className="text-sm text-gray-500">
                          Placed on {new Date(Date.now() - index * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="space-x-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          index === 0
                            ? "bg-blue-100 text-blue-800"
                            : index === 1
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {index === 0 ? "Processing" : index === 1 ? "Shipped" : "Delivered"}
                        </span>
                        
                        <button className="btn-outline text-xs py-1 px-2">
                          View Details
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="space-y-4">
                        {[...Array(Math.floor(Math.random() * 3) + 1)].map((_, itemIndex) => (
                          <div key={itemIndex} className="flex gap-4">
                            <div className="h-16 w-16 bg-gray-100 rounded"></div>
                            <div className="flex-grow">
                              <div className="font-medium">Product {itemIndex + 1}</div>
                              <div className="text-sm text-gray-500">Qty: {Math.floor(Math.random() * 3) + 1}</div>
                            </div>
                            <div className="font-medium">
                              ${((Math.random() * 100) + 10).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t mt-4 pt-4 flex justify-between">
                        <span>Total</span>
                        <span className="font-bold">${((Math.random() * 300) + 50).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Addresses */}
          {activeTab === "addresses" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6">My Addresses</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Home Address</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Default</span>
                  </div>
                  <address className="not-italic text-gray-600">
                    John Doe<br />
                    123 Main Street<br />
                    Apartment 4B<br />
                    New York, NY 10001<br />
                    United States<br />
                    (123) 456-7890
                  </address>
                  <div className="flex gap-2 mt-4">
                    <button className="btn-outline text-xs py-1 px-3">Edit</button>
                    <button className="text-xs py-1 px-3 border border-red-500 text-red-500 rounded-md hover:bg-red-50">Delete</button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Work Address</span>
                  </div>
                  <address className="not-italic text-gray-600">
                    John Doe<br />
                    456 Office Road<br />
                    Suite 789<br />
                    San Francisco, CA 94107<br />
                    United States<br />
                    (987) 654-3210
                  </address>
                  <div className="flex gap-2 mt-4">
                    <button className="btn-outline text-xs py-1 px-3">Edit</button>
                    <button className="text-xs py-1 px-3 border border-red-500 text-red-500 rounded-md hover:bg-red-50">Delete</button>
                    <button className="text-xs py-1 px-3 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50">Set as Default</button>
                  </div>
                </div>
              </div>
              
              <button className="btn-outline mt-4" onClick={() => {}}>
                Add New Address
              </button>
              
              <div className="border-t mt-8 pt-6">
                <h3 className="text-lg font-medium mb-4">Add New Address</h3>
                
                <form onSubmit={handleSaveAddress} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="addrName" className="block text-sm font-medium text-gray-700 mb-1">
                        Address Name
                      </label>
                      <input
                        id="addrName"
                        type="text"
                        placeholder="Home, Work, etc."
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="addrPhone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        id="addrPhone"
                        type="tel"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="addrLine1" className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 1
                    </label>
                    <input
                      id="addrLine1"
                      type="text"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="addrLine2" className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 2 (Optional)
                    </label>
                    <input
                      id="addrLine2"
                      type="text"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="addrCity" className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        id="addrCity"
                        type="text"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="addrState" className="block text-sm font-medium text-gray-700 mb-1">
                        State/Province
                      </label>
                      <input
                        id="addrState"
                        type="text"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="addrZip" className="block text-sm font-medium text-gray-700 mb-1">
                        Postal/Zip Code
                      </label>
                      <input
                        id="addrZip"
                        type="text"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="addrCountry" className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <select
                        id="addrCountry"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="addrDefault"
                      type="checkbox"
                      className="h-4 w-4 text-[hsl(var(--brand))] border-gray-300 rounded"
                    />
                    <label htmlFor="addrDefault" className="ml-2 text-sm text-gray-700">
                      Set as default address
                    </label>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <button type="button" className="btn-outline">
                      Cancel
                    </button>
                    <button type="submit" className="btn-brand">
                      Save Address
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          {/* Wishlist */}
          {activeTab === "wishlist" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6">My Wishlist</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* We will show some mock wishlist items */}
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <div className="aspect-square bg-gray-100"></div>
                    <div className="p-4">
                      <h3 className="font-medium mb-2">Wishlist Item {index + 1}</h3>
                      <div className="text-[hsl(var(--brand))] font-bold mb-3">
                        ${((Math.random() * 100) + 10).toFixed(2)}
                      </div>
                      <div className="flex gap-2">
                        <button className="btn-brand flex-1 py-1 text-sm">Add to Cart</button>
                        <button className="btn-outline flex-1 py-1 text-sm text-red-500 border-red-500 hover:bg-red-50">Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Empty state */}
              {false && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart size={24} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                  <p className="text-gray-500 mb-6">
                    You don't have any products in your wishlist yet.
                  </p>
                  <button className="btn-brand">Browse Products</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
