import Link from "next/link";
type BlankCardPops = {
  title: string;
  slug: string;
  description: string;
  icon: string;
  onClick?: () => void;
  mode?: "modal" | "page";
  redirectUrl?:string;
};



export default function BlankCard({ title, description,slug, icon,onClick , mode = "page",redirectUrl = ''}: BlankCardPops) {
    const CardContent = (
    <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 line-clamp-3">{description}</p>
    </div>
  );
    if (mode === "modal") {
    return <div onClick={onClick}>{CardContent}</div>;
  }

  // 🔹 Page navigation behavior
  return <Link href={redirectUrl}>{CardContent}</Link>;
}
