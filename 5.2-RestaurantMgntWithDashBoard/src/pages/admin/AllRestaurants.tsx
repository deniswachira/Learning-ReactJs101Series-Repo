import React from 'react'
import AdminDashboardLayout from '../../dashboardDesign/AdminDashboardLayout'
import { Store, StoreIcon, MapPin, Phone, Mail,  ChefHat, Edit, Trash2, Plus, XCircle } from 'lucide-react'
import { restaurantApi } from '../../features/api/RestaurantApi'
import Swal from 'sweetalert2'
import type { RootState } from '../../store/store'
import { useSelector } from 'react-redux'
import { skipToken } from '@reduxjs/toolkit/query'

const AllRestaurants: React.FC = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.authSlice)

    // RTK query hooks to fetch all restaurants
    const { data: allRestaurants, error, isLoading: isRestaurantLoading } = restaurantApi.useGetAllRestaurantsQuery(
        isAuthenticated ? undefined : skipToken
    )
    const [updateRestaurantStatus] = restaurantApi.useUpdateRestaurantStatusMutation()

    // Format time from timestamp
    const formatTime = (timeString: string) => {
        return new Date(timeString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })
    }

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    // Get status badge
    const getStatusBadge = (isActive: boolean, status?: string) => {
        // If we have a specific status, use it; otherwise fall back to active/inactive
        const actualStatus = status || (isActive ? 'active' : 'inactive')

        const statusConfig = {
            'active': { color: 'bg-green-100 text-green-800', label: 'Active', icon: Store },
            'inactive': { color: 'bg-red-100 text-red-800', label: 'Inactive', icon: Store },
            'maintenance': { color: 'bg-yellow-100 text-yellow-800', label: 'Maintenance', icon: Store },
            'closed': { color: 'bg-gray-100 text-gray-800', label: 'Closed', icon: Store }
        }

        const config = statusConfig[actualStatus as keyof typeof statusConfig] || statusConfig.active
        const IconComponent = config.icon

        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
                <IconComponent size={14} className="mr-1" />
                {config.label}
            </span>
        )
    }    // Handle restaurant status toggle
    const handleStatusToggle = async (restaurant_id: number, currentStatus: boolean, restaurantName: string) => {
        const statusOptions = {
            'active': 'Active',
            'inactive': 'Inactive'
        }

        const currentStatusValue = currentStatus ? 'active' : 'inactive'

        const { value: newStatus } = await Swal.fire({
            title: `Update Status for "${restaurantName}"`,
            text: `Current status: ${statusOptions[currentStatusValue as keyof typeof statusOptions]}`,
            input: 'select',
            inputOptions: statusOptions,
            inputValue: currentStatusValue,
            showCancelButton: true,
            confirmButtonText: 'Update Status',
            confirmButtonColor: '#f97316',
            cancelButtonColor: '#6b7280',
            inputValidator: (value) => {
                if (!value) {
                    return 'Please select a status'
                }
                if (value === currentStatusValue) {
                    return 'Please select a different status'
                }
            }
        })

        if (newStatus) {
            try {
                await updateRestaurantStatus({
                    restaurant_id,
                    restaurant_status: newStatus
                }).unwrap()
                Swal.fire({
                    title: 'Success!',
                    text: `Restaurant "${restaurantName}" status updated to ${statusOptions[newStatus as keyof typeof statusOptions]}.`,
                    icon: 'success',
                    confirmButtonColor: '#10b981'
                })
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error updating the restaurant status. Please try again.',
                    icon: 'error',
                    confirmButtonColor: '#ef4444'
                })
            }
        }
    }

    return (
        <AdminDashboardLayout>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                        <StoreIcon className="text-orange-600" size={24} />
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Restaurant Management</h1>
                </div>
                <button className="btn bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-2">
                    <Plus size={16} />
                    Add New Restaurant
                </button>
            </div>

            {/* Loading State */}
            {isRestaurantLoading ? (
                <div className="flex justify-center items-center py-16">
                    <span className="loading loading-spinner loading-lg text-orange-600"></span>
                    <span className="ml-3 text-gray-600">Loading restaurants...</span>
                </div>
            ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                   <XCircle className="mx-auto text-red-500 mb-3" size={48} />
                    <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Restaurants</h3>
                    <p className="text-red-600">Unable to fetch restaurants. Please try again later.</p>
                </div>
            ) : !allRestaurants || allRestaurants.length === 0 ? (
                /* Empty State */
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <Store className="mx-auto mb-4 text-orange-600" size={48} />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Restaurants Found</h3>
                </div>
            ) : (
                /* Restaurants Table */
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="text-left font-semibold text-gray-700">Restaurant</th>
                                    <th className="text-left font-semibold text-gray-700">Location</th>
                                    <th className="text-left font-semibold text-gray-700">Contact</th>
                                    <th className="text-left font-semibold text-gray-700">Cuisine</th>
                                    <th className="text-left font-semibold text-gray-700">Status</th>
                                    <th className="text-center font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allRestaurants.map((restaurant: any) => (
                                    <tr key={restaurant.restaurant_id} className="hover:bg-gray-50">
                                        <td>
                                            <div>
                                                <div className="font-bold text-gray-800 flex items-center gap-2">
                                                    <Store size={16} className="text-orange-600" />
                                                    {restaurant.name}
                                                </div>
                                                <div className="text-sm text-gray-500 mt-1">
                                                    {restaurant.description}
                                                </div>
                                                <div className="text-xs text-gray-400 mt-1">
                                                    Added: {formatDate(restaurant.created_at)}
                                                </div>
                                                <div className="text-xs text-green-400 mt-1">
                                                    Opening hrs: {formatTime(restaurant.opening_time)} - {formatTime(restaurant.closing_time)}
                                                </div>

                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <div className="flex items-center gap-1 text-sm text-gray-700">
                                                    <MapPin size={14} />
                                                    {restaurant.address}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {restaurant.city}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-1 text-sm text-gray-700">
                                                    <Phone size={14} />
                                                    {restaurant.phone_number}
                                                </div>
                                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                                    <Mail size={14} />
                                                    {restaurant.email}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="flex items-center gap-1 text-sm">
                                                <ChefHat size={14} className="text-orange-600" />
                                                {restaurant.cuisine_type}
                                            </span>
                                        </td>
                                        <td>{getStatusBadge(restaurant.is_active)}</td>
                                        <td>
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="btn btn-ghost btn-xs text-green-600 tooltip" data-tip="Edit Restaurant">
                                                    <Edit size={14} />
                                                </button>
                                                <button
                                                    onClick={() => handleStatusToggle(
                                                        restaurant.restaurant_id,
                                                        restaurant.is_active,
                                                        restaurant.name
                                                    )}
                                                    className={`btn btn-ghost btn-xs tooltip ${restaurant.is_active
                                                        ? 'text-red-600'
                                                        : 'text-green-600'
                                                        }`}
                                                    data-tip={restaurant.is_active ? "Deactivate" : "Activate"}
                                                >
                                                    <Store size={14} />
                                                </button>
                                                <button className="btn btn-ghost btn-xs text-red-600 tooltip" data-tip="Delete Restaurant">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Restaurant Summary Stats */}
                    <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                        <div className="flex flex-wrap gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <Store size={16} className="text-green-600" />
                                <span className="text-gray-600">Active Restaurants: </span>
                                <span className="font-bold">{allRestaurants.filter((r: any) => r.is_active).length}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Store size={16} className="text-red-600" />
                                <span className="text-gray-600">Inactive Restaurants: </span>
                                <span className="font-bold">{allRestaurants.filter((r: any) => !r.is_active).length}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ChefHat size={16} className="text-orange-600" />
                                <span className="text-gray-600">Cuisine Types: </span>
                                <span className="font-bold">{new Set(allRestaurants.map((r: any) => r.cuisine_type)).size}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={16} className="text-blue-600" />
                                <span className="text-gray-600">Total Restaurants: </span>
                                <span className="font-bold text-orange-600">{allRestaurants.length}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminDashboardLayout>
    )
}

export default AllRestaurants