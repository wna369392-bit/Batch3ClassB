"use client";
import Button from "@/components/button";
import Message from "@/components/message";
import Greeting from "@/components/greeting";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Card from "@/components/card";
import profile from "@/components/profile";
import Profile from "@/components/profile";
import StudentList from "@/components/student-list";
import Modal from "@/components/modal";
import InputExample from "@/components/input-example";
import ToggleMessage from "@/components/toggle-mesage";
import TodoApp from "@/components/todo-app";
export default function Home() {
  const user = {
    name: "John Doe",
    age: 30,
    country: "USA",
  };
  const students = ["Alice", "Su Su"];

  const handleClick = () => {
    alert("Button clicked!");
  };
  return (
    <div>
      <Header />
      <h1>Home Page</h1>
      <TodoApp />
      <InputExample />
      <ToggleMessage />
      <main style={{ padding: "1rem" }}>
        <StudentList students={students} />
        <Profile user={user} />
        <Card
          title="React Basics"
          description="Learn about components and props."
        />
        <Card
          title="Next.js App Router"
          description="Build pages with modern routing."
        />
        <Message />

        <Greeting name="Maria" />
        <Greeting name="Alex" />
        <Button onClick={handleClick} />
        {/* <Modal>
        <h2>Delete account?</h2>
        <p>This account cannot be undone.</p>
        <button style={{marginRight:"10px"}}>Cancel</button>
        <button style={{ backgroundColor: "red" ,color:"white"}}>Delete</button>

      </Modal> */}
      </main>
      <Footer />
    </div>
  );
}
