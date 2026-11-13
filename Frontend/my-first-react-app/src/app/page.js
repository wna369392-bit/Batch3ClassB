"use client";
import Button from "@/components/button";
import Message from "@/components/message"; 
import Greeting from "@/components/greeting"; 
import Header from "@/components/header"; 
import Footer from "@/components/footer";
import Card from "@/components/card";
import Profile from "@/components/profile";
import StudentList from "@/components/student-list";
import Modal from "@/components/modal";
export default function Home() {
  const user = {
    name: "Aung Aung",
    age: 25,
    country: "Myanmar",
  };
  const students = ["Aung Aung", "Su Su"];
  const handleClick = () => {
    alert("Button Clicked");
  }
  return (
    <div>
      <Header />
      <main style={{padding: "1rem"}}>
        <StudentList students={students}/>
        <Profile user = {user}/>
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
      <Button onClick={handleClick}/>
      <Modal>
        <h2>Delete Account?</h2>
        <p>This action cannot be undone.</p>
        <button style={{marginRight:"10px"}}>Cancel</button>
        <button style={{backgroundColor: "red", color:"white"}}>Delete</button>
      </Modal>
      </main>
      <Footer />
    </div>
  );
} 