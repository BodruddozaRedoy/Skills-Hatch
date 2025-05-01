"use client";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import LearningActivity from "@/components/LearningActivity";
import ProgressActivity from "@/components/ProgressActivity";
import CustomLineChart from "@/components/CustomLineChart";
import BarChart from "@/components/CustomLineChart";
import LineChart from "@/components/CustomLineChart";
import useDbUser from "@/hooks/useDbUser";

export default function page() {
  const percentage = 70;
  const stroke = 30;
  const radius = 70;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const { user } = useKindeAuth();
  const { dbUser } = useDbUser()
  // console.log(dbUser?.fullName)



  const chartData = [
    { label: 'Jan', value: 30 },
    { label: 'Feb', value: 80 },
    { label: 'Mar', value: 45 },
    { label: 'Apr', value: 60 },
    { label: 'May', value: 20 },
  ];

  return (
    <div className="grid grid-cols-6 gap-10">
      {/* Profile Section */}
      <div className="col-span-2 bg-background p-10 rounded-lg flex items-center justify-center flex-col gap-5">
        <div className="w-60 h-60 rounded-full border-4 overflow-hidden object-cover object-center border-primary">
          <img
            className="w-full"
            src={
              dbUser?.picture ||
              "https://img.icons8.com/?size=100&id=98957&format=png&color=000000"
            }
            alt=""
          />
        </div>
        <h1 className="text-2xl font-black">
          {dbUser?.fullName}
        </h1>
        <p className="text-muted-foreground font-semibold">
          Member Since {new Date(dbUser?.createdAt).getFullYear()}
        </p>
        <div className="flex gap-5 items-center w-full">
          <div className="bg-muted rounded-lg p-5 flex flex-col items-center justify-center w-full">
            <p className="text-2xl font-black">10</p>
            <p className="text-muted-foreground font-semibold">Points</p>
          </div>
          <div className="bg-muted rounded-lg p-5 flex flex-col items-center justify-center w-full">
            <p className="text-2xl font-black">10</p>
            <p className="text-muted-foreground font-semibold">Certificates</p>
          </div>
        </div>
        <div className="space-y-5">
          <h1 className="text-2xl font-black">Achievements</h1>
          <div>icons</div>
          <h1 className="text-2xl font-black">Bio</h1>
          <div className="bg-muted p-5 rounded-lg"> 
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
            dolorem tempore suscipit consectetur fugit culpa vel quisquam
            provident omnis commodi.
          </p>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="col-span-4">
        <div className="flex gap-10 w-full">
          <div className="flex items-center justify-between bg-background rounded-lg p-5 w-full">
            <div className="flex items-center">
              <img
                className="w-24 h-24"
                src="https://img.icons8.com/?size=100&id=zMwxb5uHonjU&format=png&color=000000"
                alt=""
              />
              <div className="ml-5">
                <h1 className="text-3xl font-black">100</h1>
                <p className="text-muted-foreground font-semibold">
                  Courses Completed
                </p>
              </div>
            </div>
            <IoIosArrowForward className="text-primary text-3xl" />
          </div>

          <div className="flex items-center justify-between bg-background rounded-lg p-5 w-full">
            <div className="flex items-center">
              <img
                className="w-24 h-24"
                src="https://img.icons8.com/?size=100&id=106265&format=png&color=000000"
                alt=""
              />
              <div className="ml-5">
                <h1 className="text-3xl font-black">100</h1>
                <p className="text-muted-foreground font-semibold">
                  Courses In Progress
                </p>
              </div>
            </div>
            <IoIosArrowForward className="text-secondary text-3xl" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-black my-5">Current Courses</h1>
            <Link
              href={"/courses"}
              className="text-primary font-semibold flex items-center gap-3"
            >
              View all{" "}
              <IoIosArrowForward className="text-primary text-xl" />
            </Link>
          </div>

          <div className="flex items-center w-full gap-10">
            {/* Progress Card 1 */}
            <div className="bg-background w-full flex items-center gap-5 rounded-lg p-5">
              <div className="w-[160px] h-[160px] flex items-center justify-center relative">
                <svg
                  height="100%"
                  width="100%"
                  viewBox="0 0 200 200"
                  className="transform -rotate-90"
                >
                  <circle
                    stroke="#e5e7eb"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx="100"
                    cy="100"
                  />
                  <circle
                    stroke="rgb(144, 198, 124)"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    r={normalizedRadius}
                    cx="100"
                    cy="100"
                  />
                </svg>
                <div className="absolute  w-[65px] shadow-2xl text-primary h-[65px] flex items-center justify-center rounded-full text-2xl font-extrabold">
                  {percentage}%
                </div>
              </div>
              <div>
                <p className="text-muted-foreground font-semibold">Class</p>
                <h1 className="text-xl font-bold mb-5">Web Development</h1>
                <p className="text-muted-foreground font-semibold">Total Content</p>
                <h1 className="text-xl font-bold mb-5">90/110</h1>
              </div>
            </div>


            {/* Progress Card 2 */}
            <div className="bg-background w-full flex items-center gap-5 rounded-lg p-5">
              <div className="w-[160px] h-[160px] flex items-center justify-center relative">
                <svg
                  height="100%"
                  width="100%"
                  viewBox="0 0 200 200"
                  className="transform -rotate-90"
                >
                  <circle
                    stroke="#e5e7eb"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx="100"
                    cy="100"
                  />
                  <circle
                    stroke="rgb(245, 196, 94)"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    r={normalizedRadius}
                    cx="100"
                    cy="100"
                  />
                </svg>
                <div className="absolute  w-[65px] shadow-2xl text-secondary h-[65px] flex items-center justify-center rounded-full text-2xl font-extrabold">
                  {percentage}%
                </div>
              </div>
              <div>
                <p className="text-muted-foreground font-semibold">Class</p>
                <h1 className="text-xl font-bold mb-5">Web Development</h1>
                <p className="text-muted-foreground font-semibold">Total Content</p>
                <h1 className="text-xl font-bold mb-5">90/110</h1>
              </div>
            </div>

          </div>
        </div>

        {/* progress chart  */}
        <div className="mt-10">
          <ProgressActivity title={"Progress"} />
        </div>
      </div>
    </div>
  );
}
