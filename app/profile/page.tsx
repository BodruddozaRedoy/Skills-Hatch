"use client";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import ProgressActivity from "@/components/ProgressActivity";
import useDbUser from "@/hooks/useDbUser";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { axiosPublic } from "@/lib/axiosPublic";
import toast from "react-hot-toast";
import StateLoading from "@/components/StateLoading";

const chartData = [
  { label: 'Jan', value: 30 },
  { label: 'Feb', value: 80 },
  { label: 'Mar', value: 45 },
  { label: 'Apr', value: 60 },
  { label: 'May', value: 20 },
];

export default function page() {
  const percentage = 70;
  const stroke = 30;
  const radius = 70;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const { dbUser, refetch } = useDbUser()
  const [updatedBio, setUpdatedBio] = useState()
  const [updatedSocials, setUpdatedSocials] = useState({
    title: "",
    link: ""
  })
  const [bioLoading, setBioLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState("")
  const [inputDisable, setInputDisable] = useState("")
  // console.log(updatedSocials)
  // handle update bio
  const handleUpdateBio = async (kindeId: any) => {
    setBioLoading(true)
    try {
      const res = await axiosPublic.patch(`/api/user?id=${kindeId}`, { bio: updatedBio })
      if (res.data.status === 200) {
        toast.success("User Updated")
        refetch()
        setBioLoading(false)
      }
      console.log(res.data)
    } catch (error) {
      console.log(error)
    } finally {
      setBioLoading(false)
    }
  }

  // handle update social links 
  const handleUpdateSocial = async (kindeId: any) => {
    setSocialLoading(inputDisable)
    try {
      const res = await axiosPublic.patch(`/api/user?id=${kindeId}`, { newTitle: updatedSocials.title, newLink: updatedSocials.link })
      if (res.data.status === 200) {
        toast.success("User Updated")
        refetch()
        setSocialLoading("")
        setInputDisable("")
      }
      console.log(res.data)
    } catch (error) {
      console.log(error)
    } finally {
      setSocialLoading("")
    }
  }


  // social links data 
  const facebook = dbUser?.socialLinks?.find((link: any) => link.title === "Facebook") || "";
  const instagram = dbUser?.socialLinks?.find((link: any) => link.title === "Instagram") || "";
  const x = dbUser?.socialLinks?.find((link: any) => link.title === "X") || "";
  const github = dbUser?.socialLinks?.find((link: any) => link.title === "GitHub") || "";


  return (
    <div className="lg:grid items-center grid-cols-1 md:grid-cols-6 gap-10 space-y-10">
      {/* Profile Section */}
      <div className="md:col-span-2 bg-background p-10 rounded-lg flex items-center justify-center flex-col gap-5 w-full">
        <div className="w-50 h-50 rounded-full border-4 overflow-hidden object-cover object-center border-primary">
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
            <p className="text-2xl font-black">{dbUser?.points}</p>
            <p className="text-muted-foreground font-semibold">Points</p>
          </div>
          <div className="bg-muted rounded-lg p-5 flex flex-col items-center justify-center w-full">
            <p className="text-2xl font-black">{dbUser?.completedCourses.length}</p>
            <p className="text-muted-foreground font-semibold">Certificates</p>
          </div>
        </div>
        <div className="space-y-5 flex flex-col items-start w-full">
          <h1 className="text-2xl font-black">Achievements</h1>
          <div className="w-full grid grid-cols-2 lg:grid-cols-4 justify-between gap-3">
            <div className={` flex flex-col items-center shadow-md p-2 rounded-lg ${dbUser?.points >= 0 ? "" : "bg-muted opacity-50"}`}>
              <div className="w-18 h-18 object-cover ">
                <img className="w-full" src="https://img.icons8.com/?size=100&id=Yt084riMRP1m&format=png&color=000000" alt="" />
              </div>
              <p className="font-bold text-muted-foreground">Newbie</p>
            </div>

            <div className={` flex flex-col items-center shadow-md p-2 rounded-lg ${dbUser?.points >= 1000 ? "" : "bg-muted opacity-50"}`}>
              <div className="w-18 h-18 object-cover ">
                <img className="w-full" src="https://img.icons8.com/?size=100&id=kPENNmiEJv3b&format=png&color=000000" alt="" />
              </div>
              <p className="font-bold text-muted-foreground">Apprentice </p>
            </div>

            <div className={` flex flex-col items-center shadow-md p-2 rounded-lg ${dbUser?.points >= 3000 ? "" : "bg-muted opacity-50"}`}>
              <div className="w-18 h-18 object-cover">
                <img className="w-full" src="https://img.icons8.com/?size=100&id=bAfOJAIUNSPM&format=png&color=000000" alt="" />
              </div>
              <p className="font-bold text-muted-foreground">Pro</p>
            </div>

            <div className={` flex flex-col items-center shadow-md p-2 rounded-lg ${dbUser?.points >= 5000 ? "" : "bg-muted opacity-50"}`}>
              <div className="w-18 h-18 object-cover">
                <img className="w-full" src="https://img.icons8.com/?size=100&id=12197&format=png&color=000000" alt="" />
              </div>
              <p className="font-bold text-muted-foreground">Expert</p>
            </div>
          </div>
          <h1 className="text-2xl font-black">Bio</h1>
          <div className="bg-muted p-5 rounded-lg">
            <p className="text-muted-foreground">
              {dbUser?.bio}
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col items-start">
          <h1 className="text-2xl font-black">Social Links</h1>
          <div className="flex gap-3 mt-3">
            {!dbUser?.socialLinks.length && <p className="text-muted-foreground">No social links added</p>}
            {facebook && <a href={facebook?.link} className="w-12" target="_blank"><img src={"https://img.icons8.com/?size=100&id=uLWV5A9vXIPu&format=png&color=000000"} /></a>}
            {instagram && <a href={instagram.link} className="w-12" target="_blank"><img className="w-full" src="https://img.icons8.com/?size=100&id=119026&format=png&color=000000" alt="" /></a>}
            {x && <a href={x.link} className="w-12" target="_blank"><img className="w-full" src="https://img.icons8.com/?size=100&id=fJp7hepMryiw&format=png&color=000000" alt="" /></a>}
            {github && <a href={github.link} className="w-12" target="_blank"><img className="w-full" src="https://img.icons8.com/?size=100&id=AZOZNnY73haj&format=png&color=000000" alt="" /></a>}
          </div>
          <Dialog>
            <DialogTrigger className="w-full"><Button className="mt-5 w-full">Update Profile</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="mb-3 font-black text-2xl">Update Profile</DialogTitle>
                <DialogDescription>
                  <div className="space-y-3">
                    {/* bio */}
                    <div>
                      <h1 className="font-bold text-xl text-foreground">Bio</h1>
                      <hr className="w-full my-2" />
                      <textarea defaultValue={dbUser?.bio} onChange={(e: any) => setUpdatedBio(e.target.value)} name="" cols={70} className="w-full h-40 py-2 px-5 bg-muted rounded-lg shadow-md" placeholder="Type here" id=""></textarea>
                      <Button onClick={() => handleUpdateBio(dbUser?.kindeId)} className="w-full mt-5">{bioLoading ? <StateLoading /> : "Update Bio"}</Button>
                    </div>
                    {/* social links  */}
                    <div className="flex flex-col gap-3">
                      <h1 className="font-bold text-xl text-blue-500">Social Links</h1>
                      <hr className="w-full my-1" />
                      {/* facebook  */}
                      <div className="flex items-center">
                        <h1 className="w-46 font-semibold col-span-1 text-foreground text-lg pl-5 py-1 rounded-l-lg shadow-md bg-muted">Facebook</h1>
                        <input defaultValue={facebook?.link} readOnly={inputDisable !== "facebook"} onChange={(e: any) => setUpdatedSocials({ ...updatedSocials, title: "Facebook", [e.target.name]: e.target.value })} type="url" placeholder="Type here" className="py-2 px-5 bg-muted col-span-3  border-none shadow-md rounded-r-lg w-full" name="link" id="" />
                        {
                          inputDisable === "facebook" ? <Button className="ml-2 col-span-1" onClick={() => handleUpdateSocial(dbUser?.kindeId)}>{socialLoading === "facebook" ? <StateLoading /> : "Save"}</Button> : <Button onClick={() => setInputDisable("facebook")} className="ml-2 col-span-1">Edit</Button>
                        }
                      </div>
                      {/* instagram  */}
                      <div className="flex items-center">
                        <h1 className="w-46 font-semibold col-span-1 text-foreground text-lg pl-5 py-1 rounded-l-lg shadow-md bg-muted">Instagram</h1>
                        <input defaultValue={instagram?.link} readOnly={inputDisable !== "instagram"} onChange={(e: any) => setUpdatedSocials({ ...updatedSocials, title: "Instagram", [e.target.name]: e.target.value })} type="url" placeholder="Type here" className="py-2 px-5 bg-muted col-span-3  border-none shadow-md rounded-r-lg w-full" name="link" id="" />
                        {
                          inputDisable === "instagram" ? <Button className="ml-2 col-span-1" onClick={() => handleUpdateSocial(dbUser?.kindeId)}>{socialLoading === "instagram" ? <StateLoading /> : "Save"}</Button> : <Button onClick={() => setInputDisable("instagram")} className="ml-2 col-span-1">Edit</Button>
                        }
                      </div>
                      {/* X */}
                      <div className="flex items-center">
                        <h1 className="w-46 font-semibold col-span-1 text-foreground text-lg pl-5 py-1 rounded-l-lg shadow-md bg-muted">X</h1>
                        <input defaultValue={x?.link} readOnly={inputDisable !== "x"} onChange={(e: any) => setUpdatedSocials({ ...updatedSocials, title: "X", [e.target.name]: e.target.value })} type="url" placeholder="Type here" className="py-2 px-5 bg-muted col-span-3  border-none shadow-md rounded-r-lg w-full" name="link" id="" />
                        {
                          inputDisable === "x" ? <Button className="ml-2 col-span-1" onClick={() => handleUpdateSocial(dbUser?.kindeId)}>{socialLoading === "x" ? <StateLoading /> : "Save"}</Button> : <Button onClick={() => setInputDisable("x")} className="ml-2 col-span-1">Edit</Button>
                        }
                      </div>
                      {/* Github */}
                      <div className="flex items-center">
                        <h1 className="w-46 font-semibold col-span-1 text-foreground text-lg pl-5 py-1 rounded-l-lg shadow-md bg-muted">GitHub</h1>
                        <input defaultValue={github?.link} readOnly={inputDisable !== "github"} onChange={(e: any) => setUpdatedSocials({ ...updatedSocials, title: "GitHub", [e.target.name]: e.target.value })} type="url" placeholder="Type here" className="py-2 px-5 bg-muted col-span-3  border-none shadow-md rounded-r-lg w-full" name="link" id="" />
                        {
                          inputDisable === "github" ? <Button className="ml-2 col-span-1" onClick={() => handleUpdateSocial(dbUser?.kindeId)}>{socialLoading === "github" ? <StateLoading /> : "Save"}</Button> : <Button onClick={() => setInputDisable("github")} className="ml-2 col-span-1">Edit</Button>
                        }
                      </div>

                    </div>
                  </div>
                  {/* <Button onClick={() => handleUpdateSocial(dbUser?.kindeId)} className="w-full mt-5">{socialLoading ? <StateLoading /> : "Update Social Links"}</Button> */}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="col-span-4">
        <div className="flex gap-10 w-full">
          {/* Courses Completed */}
          <div className="flex flex-col md:flex-row gap-5 md:gap-0 items-center justify-between bg-background rounded-lg p-5 w-full">
            <div className="flex flex-col md:flex-row items-center">
              <img
                className="w-24 h-24"
                src="https://img.icons8.com/?size=100&id=zMwxb5uHonjU&format=png&color=000000"
                alt=""
              />
              <div className="ml-5">
                <h1 className="text-3xl font-black">{dbUser?.completedCourses.length}</h1>
                <p className="text-muted-foreground font-semibold">
                  Courses Completed
                </p>
              </div>
            </div>
            <IoIosArrowForward className="text-primary text-3xl" />
          </div>
          {/* Courses In Progress */}
          <div className="flex flex-col md:flex-row items-center justify-between bg-background rounded-lg p-5 w-full">
            <div className="flex flex-col md:flex-row items-center">
              <img
                className="w-24 h-24"
                src="https://img.icons8.com/?size=100&id=106265&format=png&color=000000"
                alt=""
              />
              <div className="ml-5">
                <h1 className="text-3xl font-black">{dbUser?.currentCourses.length}</h1>
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

          <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full gap-10">
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
