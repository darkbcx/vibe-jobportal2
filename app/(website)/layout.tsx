import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      {children}
      <Footer />
    </div>
  )
}