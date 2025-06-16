
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";

// interface LayoutProps {
//   children: ReactNode;
// }

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
