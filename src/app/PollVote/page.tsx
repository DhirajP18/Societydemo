"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { CheckCircle2, Vote } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

/* ---------------- POLL DATA (ADMIN CREATED) ---------------- */
const POLL = {
  id: 1,
  title: "Should we install CCTV cameras on each floor?",
  description:
    "Admin wants to improve security. Please vote so decision can be taken based on majority.",
  options: [
    { id: 1, text: "Yes, install CCTV", votes: 42 },
    { id: 2, text: "No, not required", votes: 18 },
    { id: 3, text: "Install only at entrances", votes: 25 },
  ],
};

export default function PollVotePage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [voted, setVoted] = useState(false);

  const totalVotes = POLL.options.reduce((s, o) => s + o.votes, 0);

  const voteNow = () => {
    if (!selected) {
      toast.error("Please select an option");
      return;
    }
    setVoted(true);
    toast.success("Vote submitted successfully");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 flex justify-center px-3 py-6">
      <Toaster />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl"
      >
        <Card className="rounded-2xl shadow-xl dark:bg-slate-800">

          {/* HEADER */}
          <CardHeader className="space-y-2">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Community Poll
              </h2>
              <Badge variant="secondary">Admin</Badge>
            </div>

            <p className="text-base font-medium text-indigo-600">
              {POLL.title}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {POLL.description}
            </p>
          </CardHeader>

          {/* CONTENT */}
          <CardContent className="space-y-4">

            {POLL.options.map((opt) => {
              const percent = Math.round(
                (opt.votes / totalVotes) * 100
              );

              return (
                <motion.div
                  key={opt.id}
                  whileHover={{ scale: !voted ? 1.02 : 1 }}
                  className={`border rounded-xl p-3 cursor-pointer transition
                  ${
                    selected === opt.id
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30"
                      : "dark:border-slate-700"
                  }`}
                  onClick={() => !voted && setSelected(opt.id)}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {opt.text}
                    </span>

                    {voted && (
                      <span className="text-xs font-semibold text-gray-500">
                        {percent}%
                      </span>
                    )}
                  </div>

                  {voted && (
                    <Progress
                      value={percent}
                      className="mt-2 h-2"
                    />
                  )}
                </motion.div>
              );
            })}

            {/* ACTION */}
            {!voted ? (
              <Button
                onClick={voteNow}
                className="w-full mt-3 bg-indigo-600 hover:bg-indigo-700"
              >
                <Vote className="w-4 h-4 mr-2" />
                Submit Vote
              </Button>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center justify-center gap-2 text-green-600 font-medium"
              >
                <CheckCircle2 />
                Thank you for voting!
              </motion.div>
            )}

            {/* FOOTER */}
            <p className="text-center text-xs text-gray-500 mt-2">
              Total Votes: {totalVotes}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
