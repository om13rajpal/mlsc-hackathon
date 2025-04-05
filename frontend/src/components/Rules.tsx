import { Terminal } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function Rules() {
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Rules</AlertTitle>
      <AlertDescription>
        • Commit your progress regularly on GitHub<br />
        • Any malicious activity (e.g. tampering with another team’s work) will lead to immediate disqualification<br />
        • All work must be original — plagiarism will not be tolerated<br />
        • Every member must actively contribute to their role<br />
        ×××××××××××××××××××××<br /><br />
        Bring your creativity, skills, and strategy.<br />
        Let the best team rise to the top! ☄︎
      </AlertDescription>
    </Alert>
  )
}