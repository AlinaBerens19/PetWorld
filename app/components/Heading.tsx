'use client';

interface HeadingProps {
    title: string;
    subtitle: string;
    center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
    title,
    subtitle,
    center = false,
}) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <div className="text-2xl text-bold">
        {title}
        <div className="font-light text-neutral-500 mt-2">
            {subtitle}
        </div>
      </div>
    </div>
  )
}

export default Heading