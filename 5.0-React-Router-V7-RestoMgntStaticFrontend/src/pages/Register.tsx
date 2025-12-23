import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SignUp from '../assets/sign-up.svg'
import { Link } from 'react-router'

type RegisterFormValues = {
    first_name: string
    last_name: string
    email: string
    phone_number: string
    password: string
}

const Register: React.FC = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div style={{
                minHeight: '80vh',
                background: '#f8f9fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem 1rem'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '2.5rem',
                    backgroundColor: 'white',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    width: '100%',
                    maxWidth: '1200px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}>
                    {/* Form Section */}
                    <div 
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2rem'
                    }}>
                        <div 
                        style={{
                            width: '100%',
                            maxWidth: '400px',
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            padding: '2rem'
                        }}>
                            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                                <h2 style={{
                                    fontSize: '2.0rem',
                                    fontWeight: 'bold',
                                    color: '#2d5a4a',
                                    marginBottom: '0.2rem',
                                    margin: 0
                                }}>
                                    Join Mathe's EATERY
                                </h2>
                                <p style={{
                                    color: '#6b7280',
                                    fontSize: '1rem',
                                    margin: 0
                                }}>
                                    Create your account
                                </p>
                            </div>

                            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                {/* First Row - First Name & Last Name */}
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{ flex: 1 }}>
                                        <label style={{
                                            display: 'block',
                                            fontSize: '0.875rem',
                                            fontWeight: '500',
                                            color: '#374151',
                                            marginBottom: '0.375rem'
                                        }} htmlFor="first_name">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="first_name"
                                            name="first_name"
                                            placeholder="First Name"
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '8px',
                                                fontSize: '0.875rem',
                                                backgroundColor: 'transparent',
                                                transition: 'all 0.3s ease',
                                                outline: 'none',
                                                boxSizing: 'border-box'
                                            }}
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{
                                            display: 'block',
                                            fontSize: '0.875rem',
                                            fontWeight: '500',
                                            color: '#374151',
                                            marginBottom: '0.375rem'
                                        }} htmlFor="last_name">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="last_name"
                                            name="last_name"
                                            placeholder="Last Name"
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '8px',
                                                fontSize: '0.875rem',
                                                backgroundColor: 'transparent',
                                                transition: 'all 0.3s ease',
                                                outline: 'none',
                                                boxSizing: 'border-box'
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        color: '#374151',
                                        marginBottom: '0.375rem'
                                    }} htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Email address"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '8px',
                                            fontSize: '0.875rem',
                                            backgroundColor: 'transparent',
                                            transition: 'all 0.3s ease',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                </div>

                                {/* Phone Number Field */}
                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        color: '#374151',
                                        marginBottom: '0.375rem'
                                    }} htmlFor="phone_number">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone_number"
                                        name="phone_number"
                                        placeholder="Phone Number"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '8px',
                                            fontSize: '0.875rem',
                                            backgroundColor: 'transparent',
                                            transition: 'all 0.3s ease',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        color: '#374151',
                                        marginBottom: '0.375rem'
                                    }} htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '8px',
                                            fontSize: '0.875rem',
                                            backgroundColor: 'transparent',
                                            transition: 'all 0.3s ease',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    style={{
                                        backgroundColor: '#2d5a4a',
                                        color: 'white',
                                        padding: '1rem',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        marginTop: '0.5rem',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                        width: '100%'
                                    }}
                                >
                                    Create Account
                                </button>

                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.5rem',
                                    textAlign: 'center',
                                    marginTop: '1rem'
                                }}>
                                    <Link to="/" style={{
                                        color: '#2d5a4a',
                                        textDecoration: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.25rem',
                                        fontSize: '0.875rem'
                                    }}>
                                        <span role="img" aria-label="home">🏡</span> Go to HomePage
                                    </Link>
                                    <Link to="/login" style={{
                                        color: '#d97706',
                                        textDecoration: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.25rem',
                                        fontSize: '0.875rem'
                                    }}>
                                        Already have an account? Login
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* Image Section */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #dbeafe 0%, #fce7f3 50%, #ffffff 100%)',
                        padding: '2rem'
                    }}>
                        <img
                            src={SignUp}
                            alt="Register"
                            style={{
                                width: '100%',
                                maxWidth: '400px',
                                borderRadius: '16px',
                                height: 'auto'
                            }}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Register