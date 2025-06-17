import Footer from "@/components/footer/Footer";
import Navbar from "@/components/Navbar";


export default function Layout({ children } : {children: React.ReactNode}) {
  return (
    <>
      <Navbar />
        <main>{children}</main>
      <Footer />
    </>
  );
}
