import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('furnishe_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('furnishe_users');
    return saved ? JSON.parse(saved) : [];
  });
  const [listings, setListings] = useState(() => {
    const saved = localStorage.getItem('furnishe_listings');
    return saved ? JSON.parse(saved) : [];
  });
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('furnishe_orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (user) localStorage.setItem('furnishe_user', JSON.stringify(user));
    else localStorage.removeItem('furnishe_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('furnishe_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('furnishe_listings', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('furnishe_orders', JSON.stringify(orders));
  }, [orders]);

  const register = (name, email, password) => {
    if (users.some((u) => u.email === email)) {
      return { success: false, error: 'An account with this email already exists' };
    }
    const newUser = {
      id: `u_${Date.now()}`,
      name,
      email,
      password,
      phone: '',
      location: '',
      joinedDate: new Date().toISOString(),
      avatar: '',
      bio: '',
    };
    setUsers((prev) => [...prev, newUser]);
    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    setUser(userWithoutPassword);
    return { success: true };
  };

  const login = (email, password) => {
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) {
      return { success: false, error: 'Invalid email or password' };
    }
    const userWithoutPassword = { ...found };
    delete userWithoutPassword.password;
    setUser(userWithoutPassword);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, ...updates } : u))
    );
  };

  const addListing = (product) => {
    const newListing = {
      ...product,
      id: `p_${Date.now()}`,
      sellerId: user?.id,
      sellerName: user?.name,
      createdAt: new Date().toISOString(),
      rating: 0,
      reviewCount: 0,
      reviews: [],
      featured: false,
      newArrival: true,
      bestDeal: false,
    };
    setListings((prev) => [newListing, ...prev]);
    return newListing;
  };

  const updateListing = (id, updates) => {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...updates } : l))
    );
  };

  const deleteListing = (id) => {
    setListings((prev) => prev.filter((l) => l.id !== id));
  };

  const myListings = listings.filter((l) => l.sellerId === user?.id);

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: `o_${Date.now()}`,
      userId: user?.id,
      date: new Date().toISOString(),
      status: 'Processing',
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const myOrders = orders.filter((o) => o.userId === user?.id);

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        listings,
        myListings,
        myOrders,
        register,
        login,
        logout,
        updateProfile,
        addListing,
        updateListing,
        deleteListing,
        addOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
