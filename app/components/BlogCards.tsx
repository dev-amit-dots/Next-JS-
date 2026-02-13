type BlogProps = {
  title: string;
  description: string;
  id: string;
  onClick: () => void;
};



export default function BlogCards({ title, description,id,onClick }: BlogProps) {
  return (
    <div key={id} onClick={onClick} className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
       <p className="text-gray-600 line-clamp-3">
        {description}
      </p>

      <span className="mt-3 inline-block text-blue-600 font-medium">
        Read more →
      </span>
    </div>
  );
}
