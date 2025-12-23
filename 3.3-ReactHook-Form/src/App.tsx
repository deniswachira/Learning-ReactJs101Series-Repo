import { useForm, type SubmitHandler } from 'react-hook-form'
import './App.css'

type FormValues = {
  firstName: string
  lastName: string
  email: string
  DOB: string
}

function App() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>()
 

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data)
   //display a clean way to show form is submitted and clear form

   reset()

  }

  return (
    <div style={{ padding: '30px',background: '#538958ff',borderRadius: '15px'}}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h3 style={{ color: 'white' }}>React Hook Form Demo </h3>
      </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{padding: '10px'}}>
          <div style={{ marginBottom: '20px' }}>
            <input
              {...register("firstName", { required: "First name is required!", minLength: { value: 2, message: "First name must be at least 2 characters!" } })}
              placeholder="👤 First Name"
              style={{
                width: '100%',
                padding: '12px',
                border:  '2px solid #e9ecef',
                borderRadius: '10px',
              }}
            />
            {errors.firstName && (
              <p style={{ color: '#862332ff', margin: '5px 0' }}>
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <input
              {...register("lastName", { required: "Last name is required!" })}
              placeholder="👨‍👩‍👧‍👦 Last Name"
              style={{
                width: '100%',
                padding: '12px',
                border:'2px solid #e9ecef',
                borderRadius: '10px',
              }}
            />
            {errors.lastName && (
              <p style={{ color: '#862332ff', margin: '5px 0' }}>
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div style={{ marginBottom: '25px' }}>
            <input
              {...register("email", {
                required: "Email is required!",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email!"
                }
              })}
              placeholder="📧 Email Address"
              type="email"
              style={{
                width: '100%',
                padding: '12px',
                border:  '2px solid #e9ecef',
                borderRadius: '10px',
              }}
            />
            {errors.email && (
              <p style={{ color: '#862332ff', margin: '5px 0' }}>
                {errors.email.message}
              </p>
            )}
          </div>

          <div style={{ marginBottom: '30px' }}>
            <input
              {...register("DOB", { required: "Date of Birth is required!" })}
              type="date"
              style={{
                width: '100%',
                padding: '12px',
                border:  '2px solid #e9ecef',
                borderRadius: '10px',
              }}
            />
            {errors.DOB && (
              <p style={{ color: '#862332ff', margin: '5px 0' }}>
                {errors.DOB.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              padding: '15px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            🚀 Submit Form
          </button>
        </form>  

      
    </div>
  )
}

export default App
