import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { CommitCard } from "@/components/CommitCart";
import { TeamReveal } from "@/components/TeamReveal";
import { Header } from "@/components/Header";
import { AlertHeader } from "@/components/Alert";
import { BASE_URL, GITHUB_URL } from "@/constants/constants";
import { Rules } from "@/components/Rules";

const Dashboard = () => {
  const [response, setResponse] = useState<any[]>([]);
  const [score, setScore] = useState<number>(0);
  const [team, setTeam] = useState<string[]>([]);

  useEffect(() => {
    getTeamDetails();
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
      if (response.data.status) {
        setTeam(response.data.data.membersName);
        setScore(response.data.data.score);
        const repo = `Team${response.data.data.name}`;

        console.log(import.meta.env.VITE_TOKEN);
        try {
          const url = `${GITHUB_URL}/${repo}/commits`;
          console.log(url);
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
            },
          });
          console.log(response.data);
          setResponse(response.data);
        } catch (error: any) {
          console.error("Error fetching commits:", error.message);
        }
      }
    } catch (error: any) {
      console.error("Error fetching team details:", error.message);
    }
  }

  return (
    <div className="w-screen">
      <Navbar score={score} />
      <div className="mx-20 pt-30">
        <Rules />
      </div>
      <div className="text-3xl font-bold text-center pt-20 mb-5">
        <Header />
      </div>
      {team.length > 0 ? (
        <TeamReveal team={team} />
      ) : (
        <div className="text-3xl pt-20 mb-5 w-screen flex items-center justify-center">
          No Team Found
        </div>
      )}

      <div className="px-20">
        <AlertHeader />
      </div>
      <div className="pt-5 w-screen flex items-center justify-center">
        {response.length > 0 ? (
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
        ) : (
          <div className="text-zinc-700 text-center w-screen">
            No commits yet
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;