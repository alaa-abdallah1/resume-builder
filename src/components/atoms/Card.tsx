interface CardProps {
  title: string;
  description?: string;
  onClick: () => void;
}

export const Card = ({ title, description, onClick }: CardProps) => {
  return (
    <div
      className="bg-white p-6 rounded-lg shadow-lg w-48 cursor-pointer hover:bg-gray-100 transition duration-200 space-y-2"
      onClick={onClick}
    >
      <h3 className="text-xl font-semibold text-center">{title}</h3>
      {description && <p className="text-sm text-center">{description}</p>}
    </div>
  );
};

export default Card;
