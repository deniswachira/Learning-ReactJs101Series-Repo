import React from 'react'
import AdminDashboardLayout from '../../dashboardDesign/AdminDashboardLayout'
import { Users,Edit, Trash2, UserCheck, Calendar, XCircle } from 'lucide-react'
import { userApi } from '../../features/api/UserApi'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'
import { skipToken } from '@reduxjs/toolkit/query'

const AllCustomers: React.FC = () => {

     const {  isAuthenticated } = useSelector((state: RootState) => state.authSlice)

    //RTK Query Hook to fetch all users
    const { data: allCustomers, isLoading: customerIsLoading, error } = userApi.useGetAllUsersQuery(
        isAuthenticated ? undefined : skipToken
    )
    // console.log("🚀 ~ AllCustomers ~ allCustomers:", allCustomers)

    // RTK mutation to update user details
    const [updateUsersDetails] = userApi.useUpdateUserTypeStatusMutation()

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    // Get user type badge
    const getUserTypeBadge = (userType: string) => {
        const typeConfig = {
            customer: { color: 'bg-blue-100 text-blue-800', label: 'Customer' },
            admin: { color: 'bg-purple-100 text-purple-800', label: 'Admin' },
            staff: { color: 'bg-green-100 text-green-800', label: 'Staff' }
        }

        const config = typeConfig[userType as keyof typeof typeConfig] || typeConfig.customer

        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
                <UserCheck size={14} className="mr-1" />
                {config.label}
            </span>
        )
    }

    // Handle user type update
    const handleUserTypeUpdate = async (userId: number, currentUserType: string, userName: string) => {
        const userTypes = ['customer', 'admin']
        const typeOptions = userTypes.reduce((acc, type) => {
            acc[type] = type.charAt(0).toUpperCase() + type.slice(1)
            return acc
        }, {} as Record<string, string>)

        const { value: newUserType } = await Swal.fire({
            title: `Update User Type for ${userName}`,
            text: `Current type: ${currentUserType.charAt(0).toUpperCase() + currentUserType.slice(1)}`,
            input: 'select',
            inputOptions: typeOptions,
            inputValue: currentUserType,
            showCancelButton: true,
            confirmButtonText: 'Update User Type',
            confirmButtonColor: '#3b82f6',
            cancelButtonColor: '#ef4444',
            inputValidator: (value) => {
                if (!value) {
                    return 'Please select a user type'
                }
                if (value === currentUserType) {
                    return 'Please select a different user type'
                }
            }
        })

        if (newUserType) {
            try {
                const updateData = { user_type: newUserType }
                await updateUsersDetails({ user_id: userId, ...updateData }).unwrap()
                Swal.fire({
                    title: 'Success!',
                    text: `User type updated to ${newUserType}`,
                    icon: 'success',
                    confirmButtonColor: '#10b981'
                })
            } catch (error: any) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to update user type. Please try again.',
                    icon: 'error',
                    confirmButtonColor: '#ef4444'
                })
            }
        }
    }


    return (
        <AdminDashboardLayout>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="text-blue-600" size={24} />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Customer Management</h1>
            </div>

            {/* Loading State */}
            {customerIsLoading ? (
                <div className="flex justify-center items-center py-16">
                    <span className="loading loading-spinner loading-lg text-blue-600"></span>
                    <span className="ml-3 text-gray-600">Loading customers...</span>
                </div>
            ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <XCircle className="mx-auto text-red-500 mb-3" size={48} />
                    <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Customers</h3>
                    <p className="text-red-600">Unable to fetch customers. Please try again later.</p>
                </div>
            ) : !allCustomers || allCustomers.length === 0 ? (
                /* Empty State */
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <Users className="mx-auto mb-4 text-blue-600" size={48} />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Customers Found</h3>
                    <p className="text-gray-500">No customers have registered yet.</p>
                </div>
            ) : (
                /* Customers Table */
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="text-left font-semibold text-gray-700">ID</th>
                                    <th className="text-left font-semibold text-gray-700">Name</th>
                                    <th className="text-left font-semibold text-gray-700">Email</th>
                                    <th className="text-left font-semibold text-gray-700">Phone</th>
                                    <th className="text-left font-semibold text-gray-700">User Type</th>
                                    <th className="text-left font-semibold text-gray-700">Join Date</th>
                                    <th className="text-center font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allCustomers.map((customer: any) => (
                                    <tr key={customer.user_id} className="hover:bg-gray-50">
                                        <td className="font-bold text-gray-800">#{customer.user_id}</td>
                                        <td>
                                            <div className="font-semibold text-gray-800">
                                                {customer.first_name} {customer.last_name}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="text-gray-700">{customer.email}</div>
                                        </td>
                                        <td>
                                            <div className="text-gray-700">{customer.phone_number}</div>
                                        </td>
                                        <td>{getUserTypeBadge(customer.user_type)}</td>
                                        <td>
                                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                                <Calendar size={14} />
                                                {formatDate(customer.created_at)}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleUserTypeUpdate(
                                                        customer.user_id,
                                                        customer.user_type,
                                                        `${customer.first_name} ${customer.last_name}`
                                                    )}
                                                    className="btn btn-ghost btn-xs text-green-600 tooltip"
                                                    data-tip="Update User Type"
                                                >
                                                    <Edit size={14} />
                                                </button>
                                                <button className="btn btn-ghost btn-xs text-red-600 tooltip" data-tip="Delete Customer">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Customer Summary Stats */}
                    <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                        <div className="flex flex-wrap gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <Users size={16} className="text-blue-600" />
                                <span className="text-gray-600">Total Customers: </span>
                                <span className="font-bold">{allCustomers.filter((c: any) => c.user_type === 'customer').length}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <UserCheck size={16} className="text-purple-600" />
                                <span className="text-gray-600">Admin Users: </span>
                                <span className="font-bold">{allCustomers.filter((c: any) => c.user_type === 'admin').length}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users size={16} className="text-green-600" />
                                <span className="text-gray-600">Staff Users: </span>
                                <span className="font-bold">{allCustomers.filter((c: any) => c.user_type === 'staff').length}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-gray-600" />
                                <span className="text-gray-600">Total Users: </span>
                                <span className="font-bold text-blue-600">{allCustomers.length}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminDashboardLayout>
    )
}

export default AllCustomers