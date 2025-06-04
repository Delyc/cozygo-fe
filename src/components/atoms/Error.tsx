type ErrorProps = {
    error: string
  }
  
const Error = ({ error }: ErrorProps) => {
    return (
      <span className="text-red-500 text-sm">{error}</span>
    )
  }
  
  export default Error
  