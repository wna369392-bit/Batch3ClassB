"use client";

import UserProfile from "../components/user-profile";
import SkillList from "../components/skill-list";
import CustomButton from "../components/custom-button";
import CardWrapper from "../components/card-wrapper";

export default function HomePage() {

  const user = {
    name: "Aung Aung",
    role: "Frontend Developer",
    company: "ABC Company"
  };

  const skills = [
    "React",
    "Next.js",
    "JavaScript",
    "Node.js"
  ];

  const handleClick = () => {
    alert("Hire button clicked!");
  };

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial",
        backgroundColor: "gray",
        minHeight: "100vh"
      }}
    >

      <h1 style={{ textAlign: "center" }}>
        My Portfolio
      </h1>

      <CardWrapper>

        <UserProfile user={user} />

        <SkillList skills={skills} />

        <CustomButton onClick={handleClick} />

      </CardWrapper>

    </div>
  );
}