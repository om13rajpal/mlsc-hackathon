import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { CommitCard } from "@/components/CommitCart";
import { TeamReveal } from "@/components/TeamReveal";
import { Header } from "@/components/Header";
import { AlertHeader } from "@/components/Alert";
import { BASE_URL } from "@/constants/constants";

const Dashboard = () => {
  const [response, setResponse] = useState<any[]>([]);
  const [score, setScore] = useState<number>(0);
  const [team, setTeam] = useState<string[]>([]);

  useEffect(() => {
    getTeamDetails();
    getCommits();
  }, []);

  async function getTeamDetails() {
    const teamId = localStorage.getItem("teamId");
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BASE_URL}/api/team/${teamId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setTeam(response.data.data.membersName);
      setScore(response.data.data.score);
    } catch (error: any) {
      console.error("Error fetching team details:", error.message);
    }
  }

  async function getCommits() {
    try {
      const response = await axios.get(
        "https://api.github.com/repos/om13rajpal/Canard-Frontend/commits",
        {
          headers: {
            Authorization: `Bearer`,
          },
        }
      );
      console.log(response.data[0].html_url);
      setResponse(response.data);
    } catch (error: any) {
      console.error("Error fetching commits:", error.message);
    }
  }

  return (
    <>
      <Navbar score={score} />
      
      <div className="text-3xl font-bold text-center pt-20">
        <Header />
      </div>

      {/* ✅ Pass `team` as prop to fix the error */}
      <TeamReveal team={team} />

      <div className="px-20">
        <AlertHeader />
      </div>
      <div className="pt-5 w-screen flex items-center justify-center">
        <div className="grid grid-cols-3 gap-4 p-4">
          {response.map((commit: any) => (
            <CommitCard
              key={commit.sha}
              link={commit.html_url}
              avatar={commit.committer?.avatar_url || ""}
              avatarFallback=""
              date={commit.commit?.author?.date}
              title={commit.commit?.author?.name}
              description={commit.commit?.message}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
