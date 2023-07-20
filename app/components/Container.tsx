'use client';


interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
  children,
}) => {

  return (
    // <div className="max-w-[2520px] mx-auto xl:px-40 md:px-40 sm:px-7 px-4" >
    <div className="w-full h-min-screen flex flex-col">
      <div className="flex items-center justify-center pt-20 sm:pt-28 px-10"> 
        {children}
      </div>
    </div>
  )
}

export default Container
