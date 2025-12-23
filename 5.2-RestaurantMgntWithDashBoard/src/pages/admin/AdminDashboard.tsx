import React from 'react'
import type { AdminDashboardStats, RecentOrder } from '../../types/Types'
import AdminDashboardLayout from '../../dashboardDesign/AdminDashboardLayout'
import { Clipboard, DollarSign, ShoppingCart, Users, XCircle } from 'lucide-react'
import { dashboardDataApi } from '../../features/api/DataboardDataApi'
import { orderApi } from '../../features/api/OrderApi'
import type { RootState } from '../../store/store'
import { useSelector } from 'react-redux'
import { skipToken } from '@reduxjs/toolkit/query'

const AdminDashboard: React.FC = () => {

    const { user, isAuthenticated } = useSelector((state: RootState) => state.authSlice)

    //RTK QUery Hook
    const { data: dashboardData, isLoading: dataIsLoading, error: dataError } = dashboardDataApi.useGetAdminDashboardDataQuery(
        isAuthenticated ? undefined : skipToken
    )

    //RTK Query Hook for recent orders
    const { data: recentOrdersData, isLoading: ordersDataIsLoading, error: ordersDataError } = orderApi.useGetLatestOrdersQuery(
        isAuthenticated ? undefined : skipToken
    )


    // Format date to simple date and time
    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }


    // const recentOrders: RecentOrder[] = [
    //     { id: 1, customer: "John Doe", amount: 45.50, status: "Delivered", time: "2 hours ago" },
    //     { id: 2, customer: "Jane Smith", amount: 32.75, status: "Preparing", time: "30 min ago" },
    //     { id: 3, customer: "Mike Johnson", amount: 67.25, status: "Ready", time: "15 min ago" },
    //     { id: 4, customer: "Sarah Wilson", amount: 28.90, status: "Delivered", time: "1 hour ago" }
    // ]

    const getStatusColor = (status: string) => {
        switch (status) {
            // pending | confirmed | preparing | cancelled| completed
            case 'pending': return 'badge-warning';
            case 'confirmed': return 'badge-info';
            case 'preparing': return 'badge-primary';
            case 'cancelled': return 'badge-error';
            case 'completed': return 'badge-success';
            default: return 'badge-neutral';
        }
    }

    return (
        <AdminDashboardLayout>
            {/* Dashboard Header */}
            <div className="mb-8 bg-green-700 p-4 rounded-lg">
                <h1 className="text-3xl font-bold text-white">Restaurant Dashboard</h1>
                <p className="text-green-200 mt-2">Welcome to Mathe's Eatery Admin Management Dashboard</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {dataIsLoading ? (
                    <div className="col-span-4 flex justify-center items-center py-16">
                        <span className="loading loading-spinner loading-lg text-green-600"></span>
                    </div>
                ) : dataError ? (
                    <div className="col-span-4 flex flex-col justify-center items-center py-16">
                        <XCircle className="mx-auto text-red-500 mb-3" size={48} />
                        <p className="text-red-600">Error loading dashboard data. Please try again later.</p>
                    </div>
                ) : (
                    // Render dashboard data here
                    <><div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                        <div className="flex items-center">
                            <div className="flex-1">
                                <p className="text-gray-600 text-sm font-medium">Total Orders</p>
                                <p className="text-2xl font-bold text-gray-900">{dashboardData?.totalOrders}</p>
                            </div>
                            <div className="bg-green-100 rounded-full p-3">
                                <ShoppingCart className="text-green-600" size={24} />
                            </div>
                        </div>
                    </div>

                        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
                                    <p className="text-2xl font-bold text-gray-900">${dashboardData?.totalRevenue.toLocaleString()}</p>
                                </div>
                                <div className="bg-orange-100 rounded-full p-3">
                                    <DollarSign className="text-orange-600" size={24} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <p className="text-gray-600 text-sm font-medium">Total Customers</p>
                                    <p className="text-2xl font-bold text-gray-900">{dashboardData?.totalCustomers}</p>
                                </div>
                                <div className="bg-blue-100 rounded-full p-3">
                                    <Users className="text-blue-600" size={24} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <p className="text-gray-600 text-sm font-medium">Menu Items</p>
                                    <p className="text-2xl font-bold text-gray-900">{dashboardData?.totalMenuItems}</p>
                                </div>
                                <div className="bg-purple-100 rounded-full p-3">
                                    <Clipboard className="text-purple-600" size={24} />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Recent Orders Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
                        <button className="btn btn-sm bg-green-800 hover:bg-green-900 text-white border-none">
                            View All
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th className="text-gray-600">Customer</th>
                                    <th className="text-gray-600">Amount</th>
                                    <th className="text-gray-600">Status</th>
                                    <th className="text-gray-600">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ordersDataIsLoading ? (
                                    <tr>
                                        <td colSpan={4} className="text-center text-gray-500">Loading...</td>
                                    </tr>
                                ) : ordersDataError ? (
                                    <tr>
                                        <td colSpan={4} className="text-center">
                                            <XCircle className="mx-auto text-red-500 mb-3" size={48} />
                                            <p className="text-red-600">Error loading orders. Please try again later.</p>
                                        </td>
                                    </tr>
                                ) : recentOrdersData?.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="text-center text-gray-500">No recent orders found.</td>
                                    </tr>
                                ) : (
                                    recentOrdersData?.map((order) => (
                                        <tr key={order.order_id} className="hover:bg-gray-50">
                                            <td className="font-medium text-gray-900">{order.customer_name}</td>
                                            <td className="font-semibold text-green-700">${order.total_amount}</td>
                                            <td>
                                                <span className={`badge ${getStatusColor(order.status)} text-white`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="text-gray-500 text-sm">{formatDateTime(order.created_at)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="btn bg-green-800 hover:bg-green-900 text-white border-none flex flex-col items-center p-6 h-auto">
                            <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Menu Item
                        </button>
                        <button className="btn bg-orange-400 hover:bg-orange-500 text-white border-none flex flex-col items-center p-6 h-auto">
                            <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            New Order
                        </button>
                        <button className="btn bg-blue-600 hover:bg-blue-700 text-white border-none flex flex-col items-center p-6 h-auto">
                            <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            View Reports
                        </button>
                        <button className="btn bg-purple-600 hover:bg-purple-700 text-white border-none flex flex-col items-center p-6 h-auto">
                            <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Settings
                        </button>
                    </div>
                </div>
            </div>
        </AdminDashboardLayout>
    )
}

export default AdminDashboard