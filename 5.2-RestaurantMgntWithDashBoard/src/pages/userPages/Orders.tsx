import React from 'react'
import DashboardLayout from '../../dashboardDesign/DashboardLayout'
import { Package, Clock, CheckCircle, XCircle, Truck } from 'lucide-react'
import { orderApi } from '../../features/api/OrderApi'
import { useSelector } from 'react-redux'
import { skipToken } from '@reduxjs/toolkit/query'
import type { RootState } from '../../store/store'
import Swal from 'sweetalert2'

const Orders: React.FC = () => {
    //get user from redux store to fetch orders for the logged-in user
    const { isAuthenticated, user } = useSelector((state: RootState) => state.authSlice);

    //RTK Query logic for fetching orders for the logged-in user would 
    const { data: userOrders, isLoading, error } = orderApi.useGetAllOrderByCustomerIdQuery(
        isAuthenticated ? user!.user_id : skipToken
    )
    // RTK mutation from orderApi to update order status
    const [updateOrderStatus] = orderApi.useUpdateOrderStatusMutation()

    // Helper functions
    const getStatusBadge = (status: string) => {
        const statusConfig = {
            pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pending' },
            confirmed: { color: 'bg-blue-100 text-blue-800', icon: CheckCircle, label: 'Confirmed' },
            preparing: { color: 'bg-purple-100 text-purple-800', icon: Package, label: 'Preparing' },
            completed: { color: 'bg-green-100 text-green-800', icon: Truck, label: 'Completed' },
            cancelled: { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Cancelled' },
        };

        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
        const IconComponent = config.icon;

        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
                <IconComponent size={14} className="mr-1" />
                {config.label}
            </span>
        );
    };

    const getOrderTypeIcon = (orderType: string) => {
        const icons = {
            dine_in: '🏠',
            takeaway: '🥡',
            delivery: '🚚'
        };
        return icons[orderType as keyof typeof icons] || '🏠';
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    //function to handle order cancellation
    const handleCancelOrder = async (order_id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to cancel the order?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#2563eb",
            cancelButtonColor: "#f44336",
            confirmButtonText: "Yes, Cancel it!",
        }).then(async (result) => {
            const updatePayLoad = {
                order_id: order_id,
                status: "cancelled"
            }
            if (result.isConfirmed) {
                try {
                    const res = await updateOrderStatus(updatePayLoad).unwrap()
                    console.log(res)
                    Swal.fire("Updated", res.message, "success")
                } catch (error) {
                    Swal.fire("Something went wrong", "Please Try Again", "error")
                }
            }
        })
    }

    return (
        <DashboardLayout>
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                    <Package className="text-green-600" size={24} />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">My Orders</h1>
            </div>

            {/* Orders Content */}
            {isLoading ? (
                <div className="flex justify-center items-center py-16">
                    <span className="loading loading-spinner loading-lg text-green-600"></span>
                    <span className="ml-3 text-gray-600">Loading your orders...</span>
                </div>
            ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <XCircle className="mx-auto text-red-500 mb-3" size={48} />
                    <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Orders</h3>
                    <p className="text-red-600">Unable to fetch your orders. Please try again later.</p>
                </div>
            ) : !userOrders || userOrders.length === 0 ? (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                    <Package className="mx-auto text-gray-400 mb-4" size={64} />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Orders Yet</h3>
                    <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                    <button
                        onClick={() => window.location.href = '/meals'}
                        className="btn bg-green-800 hover:bg-green-900 text-white"
                    >
                        Browse Menu
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="text-left font-semibold text-gray-700">Order ID</th>
                                    <th className="text-left font-semibold text-gray-700">Menu Item</th>
                                    <th className="text-left font-semibold text-gray-700">Type</th>
                                    <th className="text-left font-semibold text-gray-700">Status</th>
                                    <th className="text-left font-semibold text-gray-700">Amount</th>
                                    <th className="text-left font-semibold text-gray-700">Date</th>
                                    <th className="text-center font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userOrders.map((order: any) => (
                                    <tr key={order.order_id} className="hover:bg-gray-50">
                                        <td className="font-bold text-gray-800">#{order.order_id}</td>
                                        <td>
                                            <div>
                                                <div className="font-semibold text-green-800">{order.menu_item_name}</div>
                                                <div className="text-sm text-gray-500">{order.restaurant_name}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="flex items-center gap-1">
                                                {getOrderTypeIcon(order.order_type)}
                                                {order.order_type.replace('_', ' ').toUpperCase()}
                                            </span>
                                        </td>
                                        <td>{getStatusBadge(order.status)}</td>
                                        <td className="font-bold text-green-600">${order.total_amount}</td>
                                        <td className="text-sm text-gray-600">{formatDate(order.created_at)}</td>
                                        <td className="text-center">
                                            {order.status === 'pending' && (
                                                <button
                                                    onClick={() => handleCancelOrder(order.order_id)}
                                                    className="btn btn-outline btn-error btn-xs">
                                                    Cancel
                                                </button>
                                            )}
                                            {order.status === 'completed' && (
                                                <button className="btn bg-green-800 hover:bg-green-900 text-white btn-xs">
                                                    Reorder
                                                </button>
                                            )}
                                            {(order.status === 'confirmed' || order.status === 'preparing') && (
                                                <span className="text-xs text-gray-500 flex items-center justify-center">
                                                    <Clock size={12} className="mr-1" />
                                                    In Progress
                                                </span>
                                            )}
                                            {order.status === 'cancelled' && (
                                                <span className="text-xs text-red-500 flex items-center justify-center">
                                                    <XCircle size={12} className="mr-1" />
                                                    Cancelled
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}

export default Orders;