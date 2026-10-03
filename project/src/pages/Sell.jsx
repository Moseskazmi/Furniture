import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { categories } from '../data/products';

const Sell = () => {
  const navigate = useNavigate();
  const { user, addListing } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    originalPrice: '',
    description: '',
    condition: 'New',
    material: '',
    location: '',
    contactNumber: '',
    images: [],
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="card p-8">
          <svg className="w-16 h-16 text-primary-300 dark:text-primary-700 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <h2 className="text-xl font-serif font-bold text-charcoal dark:text-white mb-2">
            Sign In to Sell
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            You need an account to list furniture for sale.
          </p>
          <Link to="/login" className="btn-primary inline-block">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddImageUrl = () => {
    if (imageUrl && formData.images.length < 4) {
      setFormData({ ...formData, images: [...formData.images, imageUrl] });
      setImageUrl('');
    }
  };

  const handleRemoveImage = (idx) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== idx),
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Product name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.material) newErrors.material = 'Material is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.contactNumber) newErrors.contactNumber = 'Contact number is required';
    if (formData.images.length === 0) newErrors.images = 'At least one image is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const price = Number(formData.price);
    const originalPrice = Number(formData.originalPrice) || price;
    const discount = originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

    addListing({
      name: formData.name,
      category: formData.category,
      price,
      originalPrice,
      discount,
      images: formData.images,
      description: formData.description,
      dimensions: 'See description',
      material: formData.material,
      condition: formData.condition,
      sellerName: user.name,
      location: formData.location,
      contactNumber: formData.contactNumber,
    });

    setSuccess(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center animate-scale-in">
        <div className="card p-8">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="text-xl font-serif font-bold text-charcoal dark:text-white mb-2">
            Listing Posted Successfully!
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Redirecting to your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-charcoal dark:text-white">
          Sell Your Furniture
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          List your furniture and reach thousands of potential buyers
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card p-6 space-y-5">
          <h3 className="font-serif text-lg font-semibold text-charcoal dark:text-white">
            Product Details
          </h3>

          <div>
            <label className="block text-sm font-medium text-charcoal dark:text-white mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Modern Gray Sectional Sofa"
              className="input-field"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal dark:text-white mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal dark:text-white mb-2">
                Condition *
              </label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="input-field"
              >
                <option value="New">New</option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Used">Used</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal dark:text-white mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 599"
                min="0"
                className="input-field"
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal dark:text-white mb-2">
                Original Price ($) <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                placeholder="e.g. 899"
                min="0"
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal dark:text-white mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Describe your furniture in detail..."
              className="input-field resize-none"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal dark:text-white mb-2">
              Material *
            </label>
            <input
              type="text"
              name="material"
              value={formData.material}
              onChange={handleChange}
              placeholder="e.g. Solid Wood, Fabric Upholstery"
              className="input-field"
            />
            {errors.material && <p className="text-red-500 text-xs mt-1">{errors.material}</p>}
          </div>
        </div>

        <div className="card p-6 space-y-5">
          <h3 className="font-serif text-lg font-semibold text-charcoal dark:text-white">
            Contact Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal dark:text-white mb-2">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. New York, NY"
                className="input-field"
              />
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal dark:text-white mb-2">
                Contact Number *
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="e.g. +1 212-555-0142"
                className="input-field"
              />
              {errors.contactNumber && <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>}
            </div>
          </div>
        </div>

        <div className="card p-6 space-y-5">
          <h3 className="font-serif text-lg font-semibold text-charcoal dark:text-white">
            Product Images
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Add image URLs for your furniture (up to 4 images)
          </p>

          <div className="flex gap-2">
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="input-field flex-1"
            />
            <button
              type="button"
              onClick={handleAddImageUrl}
              disabled={formData.images.length >= 4 || !imageUrl}
              className="btn-secondary !px-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add
            </button>
          </div>

          {errors.images && <p className="text-red-500 text-xs">{errors.images}</p>}

          {formData.images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {formData.images.map((img, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={img}
                    alt={`Product ${idx + 1}`}
                    className="w-full h-24 rounded-lg object-cover border border-gray-200 dark:border-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-outline"
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Post Listing
          </button>
        </div>
      </form>
    </div>
  );
};

export default Sell;
