
import Header from "@/components/Header";
import "../globals.css"
import "../phone.scss"

export default function NavGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-black">
      <Header />
      {children}
    </div>
  );
}
