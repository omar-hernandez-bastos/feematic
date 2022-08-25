const Loader = () => {
  const circleCommonClasses = 'h-2.5 w-2.5 bg-cyan-900 rounded-full'
  return (
    <div className="flex justify-center items-center space-x-2 w-full h-full">
      <div className="flex">
        <div className={`${circleCommonClasses} mr-1 animate-bounce`} />
        <div className={`${circleCommonClasses} mr-1 animate-bounce200`} />
        <div className={`${circleCommonClasses} animate-bounce400`} />
      </div>
    </div>
  )
}

export default Loader
