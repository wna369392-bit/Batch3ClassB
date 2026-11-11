import Button from "@/components/button";
import Message from "@/components/message"; 
import Greeting from "@/components/greeting"; 
import Header from "@/components/header"; 
import Footer from "@/components/footer";
import Card from "@/components/card";
export default function Home() {
  return (
    <div>
      <Header />
      <main style={{padding: "1rem"}}>
        <Card
        title="React Basics"
        description="Learn about components and props."
        />
        <Card
        title="Next.js App Router"
        description="Build pages with modern routing."
        />
        <Greeting name="Maria" />
      <Greeting name="Alex" />
      <Message />
      <Button/>
      </main>
      <Footer />
    </div>
  );
} 