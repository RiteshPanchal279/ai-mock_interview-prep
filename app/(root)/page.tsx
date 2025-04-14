import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { getCurrentUser} from "@/lib/actions/auth.action";
import {getInterviewByUserId, getLatestInterview} from "@/lib/actions/general.action"
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async () => {

  const user = await getCurrentUser();
// more optimise way to fetch data 
// parallel way to fetch data
  const [userInterviews,latestInterviews] = await Promise.all([
    await getInterviewByUserId(user?.id!),
    await getLatestInterview({userId:user?.id!})
  ])


  console.log("userInterviews",userInterviews)
  console.log("latestInterviews",latestInterviews)
  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = latestInterviews?.length! > 0;

  return (
    <>
      <section className="card-cta gap-3">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback </h2>
          <p className="text-lg">
            Practice on real interview questions & get instant feedback
          </p>
          <Button asChild className="btn-primary">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt="robo-img"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>
        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>You haven&apos;t taken any interviews yet</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8 ">
        <h2>Take an interview</h2>
        <div className="interviews-section">
        {hasUpcomingInterviews ? (
            latestInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>There are no interviews avilable</p>
          )}
        </div>
      </section>
    </>
  );
};

export default page;
