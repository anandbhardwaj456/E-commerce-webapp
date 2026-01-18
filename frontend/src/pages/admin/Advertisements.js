import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import { FiPlus, FiX, FiImage, FiSave } from 'react-icons/fi';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import AdvertisementCard from '../../components/advertisements/AdvertisementCard';
import Skeleton from '../../components/ui/Skeleton';

const AdminAdvertisements = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAd, setEditingAd] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'banner',
    link: '',
    isActive: true,
    order: 0,
  });
  const [imageUrl, setImageUrl] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const fetchAdvertisements = async () => {
    try {
      const res = await api.get('/advertisements/all');
      setAdvertisements(res.data || []);
    } catch (error) {
      console.error('Error fetching advertisements:', error);
      toast.error('Failed to fetch advertisements');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const validateImageUrl = (url) => {
    if (!url.trim()) return false;
    if (url.startsWith('data:')) return true;
    try {
      const u = new URL(url);
      return u.protocol === 'http:' || u.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const applyImageUrl = () => {
    const trimmed = imageUrlInput.trim();
    if (!validateImageUrl(trimmed)) {
      toast.error('Please enter a valid http(s) or data URL.');
      setErrors((prev) => ({ ...prev, image: 'Invalid URL format' }));
      return;
    }
    setImageUrl(trimmed);
    setErrors((prev) => ({ ...prev, image: '' }));
    toast.success('Image URL set successfully');
  };

  const clearImageUrl = () => {
    setImageUrl('');
    setImageUrlInput('');
    setErrors((prev) => ({ ...prev, image: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!imageUrl) {
      newErrors.image = 'Image URL is required';
    } else if (!validateImageUrl(imageUrl)) {
      newErrors.image = 'Invalid image URL format';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error('Please fix the errors in the form');
      return;
    }

    const payload = { ...formData, image: imageUrl };

    try {
      if (editingAd) {
        await api.put(`/advertisements/${editingAd}`, payload);
        toast.success('Advertisement updated successfully');
      } else {
        await api.post('/advertisements', payload);
        toast.success('Advertisement created successfully');
      }
      fetchAdvertisements();
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save advertisement');
    }
  };

  const handleEdit = (ad) => {
    setEditingAd(ad._id);
    setFormData({
      title: ad.title || '',
      description: ad.description || '',
      type: ad.type || 'banner',
      link: ad.link || '',
      isActive: ad.isActive !== undefined ? ad.isActive : true,
      order: ad.order || 0,
    });
    const existing = ad.image || '';
    setImageUrl(existing);
    setImageUrlInput(existing);
    setShowForm(true);
    setErrors({});
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this advertisement?')) {
      try {
        await api.delete(`/advertisements/${id}`);
        toast.success('Advertisement deleted successfully');
        fetchAdvertisements();
      } catch (error) {
        toast.error('Failed to delete advertisement');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: 'banner',
      link: '',
      isActive: true,
      order: 0,
    });
    setImageUrl('');
    setImageUrlInput('');
    setEditingAd(null);
    setShowForm(false);
    setErrors({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Manage Advertisements
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Create and manage promotional banners and sliders
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="flex items-center gap-2"
          >
            <FiPlus />
            <span>Add Advertisement</span>
          </Button>
        </motion.div>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={resetForm}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
              <Card className="p-6 sm:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {editingAd ? 'Edit Advertisement' : 'Create New Advertisement'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    aria-label="Close"
                  >
                    <FiX className="text-xl" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      error={errors.title}
                      placeholder="Enter advertisement title"
                      required
                    />

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Type
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      >
                        <option value="banner">Banner</option>
                        <option value="slider">Slider</option>
                      </select>
                    </div>

                    <Input
                      label="Link (optional)"
                      name="link"
                      value={formData.link}
                      onChange={handleChange}
                      placeholder="/products or https://example.com"
                    />

                    <Input
                      label="Display Order"
                      type="number"
                      name="order"
                      value={formData.order}
                      onChange={handleChange}
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Enter advertisement description"
                      className="w-full px-4 py-2.5 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Image URL
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        value={imageUrlInput}
                        onChange={(e) => setImageUrlInput(e.target.value)}
                        placeholder="https://example.com/banner.jpg or data:image/..."
                        className={`flex-1 px-4 py-2.5 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                          errors.image ? 'border-red-500 focus:ring-red-500' : ''
                        }`}
                      />
                      <Button
                        type="button"
                        onClick={applyImageUrl}
                        variant="secondary"
                        size="md"
                      >
                        Set URL
                      </Button>
                      {imageUrl && (
                        <Button
                          type="button"
                          onClick={clearImageUrl}
                          variant="ghost"
                          size="md"
                        >
                          Clear
                        </Button>
                      )}
                    </div>
                    {errors.image && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.image}
                      </p>
                    )}
                    {imageUrl && (
                      <div className="mt-4">
                        <div className="relative inline-block">
                          <img
                            src={
                              imageUrl.startsWith('http') || imageUrl.startsWith('data:')
                                ? imageUrl
                                : `${process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000'}${imageUrl}`
                            }
                            alt="Preview"
                            className="w-48 h-48 object-cover rounded-lg border-2 border-slate-200 dark:border-slate-700 shadow-md"
                            onError={() => {
                              setErrors((prev) => ({
                                ...prev,
                                image: 'Failed to load image',
                              }));
                            }}
                          />
                          {validateImageUrl(imageUrl) && (
                            <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                              Valid
                            </div>
                          )}
                        </div>
                        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 break-all">
                          {imageUrl.length > 100 ? `${imageUrl.substring(0, 100)}...` : imageUrl}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isActive"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500 dark:border-slate-600 dark:bg-slate-700"
                    />
                    <label
                      htmlFor="isActive"
                      className="ml-2 block text-sm text-slate-700 dark:text-slate-300"
                    >
                      Active (visible on website)
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="flex-1 flex items-center justify-center gap-2"
                    >
                      <FiSave />
                      <span>{editingAd ? 'Update' : 'Create'} Advertisement</span>
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      size="lg"
                      onClick={resetForm}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Advertisements Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <Skeleton className="h-48 w-full mb-4" variant="rectangular" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <Skeleton className="h-10 w-full" />
            </Card>
          ))}
        </div>
      ) : advertisements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advertisements
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((ad) => (
              <AdvertisementCard
                key={ad._id}
                advertisement={ad}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isAdmin={true}
              />
            ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <FiImage className="mx-auto h-16 w-16 text-slate-400 dark:text-slate-600 mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
            No Advertisements
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Get started by creating your first advertisement
          </p>
          <Button onClick={() => setShowForm(true)}>
            <FiPlus className="mr-2" />
            Create Advertisement
          </Button>
        </Card>
      )}
    </div>
  );
};

export default AdminAdvertisements;
