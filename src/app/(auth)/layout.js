import Footer from "@/components/footer/Footer";
import NavBar from "@/components/NavBar";



export default function Layout({ children }) {
  return (
    <>
      <NavBar />
        <main>{children}</main>
      <Footer />
    </>
  );
}