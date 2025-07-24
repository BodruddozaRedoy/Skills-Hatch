"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { IoIosBookmarks, IoIosStar } from 'react-icons/io'
import { LuDot } from 'react-icons/lu'
import { useKindeUser } from '@/hooks/useKindeUser'
import useDbUser from '@/hooks/useDbUser'
import { Button } from '@/components/ui/button'

export default function CourseDetails({ course, setCourse }: any) {
    const { dbUser } = useDbUser()
    const [thumbnail, setThumbnail] = useState("url")
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 items-start w-full gap-5'>
            {/* details  */}
            <div className='space-y-4 col-span-2 w-full'>
                {/* title  */}
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="title">Title</Label>
                    <Input required value={course?.title || ""} onChange={(e: any) => setCourse({ ...course, [e.target.name]: e.target.value })} type="text" name='title' id="title" placeholder="Type here" />
                </div>
                {/* price  */}
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="price">Price</Label>
                    <Input required value={course?.price || ""} onChange={(e: any) => setCourse({ ...course, [e.target.name]: parseInt(e.target.value) })} type="number" name='price' id="price" placeholder="Type here" />
                </div>
                {/* toggle thumbnail  */}
                <div>
                    <h1 className='mb-3'>Choose Thumbnail Method</h1>
                    <Button onClick={() => setThumbnail("url")} size={"sm"} variant={"outline"} className={`ml-3 ${thumbnail === "url" && 'bg-primary text-white'}`}>Thumbnail Url</Button>
                    <Button onClick={() => setThumbnail("upload")} size={"sm"} variant={"outline"} className={`ml-3 ${thumbnail === "upload" && 'bg-primary text-white'}`}>Thumbnail Upload</Button>
                </div>
                {/* thumbnail url  */}
                {
                    thumbnail === "url" && (
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="thumbnail">Thumbnail Url</Label>
                            <Input required value={course?.thumbnail || ""} onChange={(e: any) => setCourse({ ...course, [e.target.name]: (e.target.value) })} type="text" name='thumbnail' id="thumbnail" placeholder="Type here" />
                        </div>
                    )
                }
                {/* thumbnail upload */}
                {
                    thumbnail === "upload" && (
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="thumbnail">Thumbnail Upload</Label>
                            <Input
                                onChange={(e: any) => setCourse({ ...course, thumbnail: (URL.createObjectURL(e.target?.files?.[0])) })}
                                required
                                name='thumbnail'
                                id="thumbnail"
                                type="file"
                            />
                        </div>
                    )
                }
                {/* category  */}
                <div>
                    <Label className='mb-2'>Category</Label>
                    <Select required value={course?.category || ""} onValueChange={(value: any) => setCourse({ ...course, category: value })}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Categories</SelectLabel>
                                <SelectItem value="web-development">Web Development</SelectItem>
                                <SelectItem value="web-design">Web Design</SelectItem>
                                <SelectItem value="graphic-design">Graphic Design</SelectItem>
                                <SelectItem value="language">Language</SelectItem>
                                <SelectItem value="seo">SEO</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                {/* level  */}
                <div>
                    <Label className='mb-2'>Level</Label>
                    <Select required value={course?.level || ""} onValueChange={(value: any) => setCourse({ ...course, level: value })}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Levels</SelectLabel>
                                <SelectItem value="beginner">Beginner</SelectItem>
                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                <SelectItem value="expert">Expert</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                {/* language  */}
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="language">Language</Label>
                    <Input required value={course?.language || ""} onChange={(e: any) => setCourse({ ...course, [e.target.name]: e.target.value })} name='language' type="text" id="language" placeholder="Type here" />
                </div>
                {/* description  */}
                <div className="grid w-full  max-w-sm items-center gap-1.5">
                    <Label htmlFor="description">Description</Label>
                    <textarea required value={course?.description || ""} onChange={(e: any) => setCourse({ ...course, [e.target.name]: e.target.value })} name='description' id="description" className='border rounded-lg h-[200px] py-3 px-3' placeholder="Type here" />
                </div>
            </div>
            {/* preview  */}
            <div className='w-full lg:col-span-1'>
                <h1 className='font-bold text-xl mb-3'>Preview</h1>
                <div className='w-full lg:w-[450px] shadow-md bg-background p-5 rounded-lg '>
                    <div className='h-[250px]  object-center w-full rounded-lg overflow-hidden mb-5'>
                        <img src={course?.thumbnail || "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"} className='w-full h-full object-cover' alt="" />
                    </div>
                    <div className='flex justify-between items-center w-full'>
                        <div>
                            <h1 className='text-xl font-extrabold'>{course?.title || "Title"}</h1>
                            <div className='flex text-gray-400 text-xs items-center'>
                                <p className='mr-1 font-semibold'>{dbUser?.fullName}</p>
                                <p className='flex items-center font-semibold'><LuDot className='text-xl mr-1' /> {(course?.ratings)?.toFixed(1)}<IoIosStar className='text-orange-300' /></p>
                            </div>
                        </div>
                        <p className='font-extrabold text-xl'>{(course?.price) == 0 ? "Free" : <><span className='text-primary'>$</span>{course?.price}</>}</p>
                    </div>
                    <div className='flex items-center justify-between w-full'>
                        <p className='text-background text-xs py-[2px] px-2 bg-primary inline-flex rounded-lg '>{course?.category || "Category"}</p>
                        <p className='text-muted-foreground text-sm'>{course?.language || "Language"}</p>
                    </div>

                    <div className='flex items-center justify-between mt-5'>
                        <div className='flex gap-2 text-gray-400 font-semibold text-sm items-center'>
                            <IoIosBookmarks />
                            <p>{course?.chapters?.length || 0}+ Content</p>
                        </div>
                        <p className='text-muted-foreground font-semibold'>{(course?.level)?.charAt(0).toUpperCase() + course.level?.slice(1) || "Level"}</p>
                    </div>

                </div>
            </div>
        </div >
    )
}
