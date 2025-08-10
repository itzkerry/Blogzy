import { createdAt } from "@/utils/createdAt";
import { extractTextFromContent } from "@/utils/extractTextFromContent";
import { ThumbsUp, MessageCircleMore, Bookmark } from "lucide-react"
import { lazy } from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
    const previewText = extractTextFromContent(blog.content, 120);
    return (
        <div className="max-w-190 mx-auto p-2 overflow-hidden">
            <div className="px-3 sm:px-6 h-full w-full">
                <div className="h-full w-full border-b-2 py-4 overflow-hidden">
                    <div className=" w-full h-full flex flex-col ">

                        {/* user profile  */}
                        <Link to={`/profile/${blog.author.username}`}>
                            <div className="h-5 flex pb-2 items-center justify-start cursor-pointer">
                                <div className="h-5 w-5 overflow-hidden rounded-full bg-sky-200 dark:bg-slate-800">
                                    <img loading={lazy} className="h-full w-full rounded-full object-cover " src={blog.author.avatar?.url || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(blog.author.username)}`} alt="avatar" />
                                </div>
                                <div className="text-gray-500 dark:text-gray-300 text-xs font-light font-serif pl-2">
                                    by {blog.author.username}
                                </div>
                            </div>
                        </Link>


                        <Link to={`/blog/view/${blog._id}`} className="w-full h-full flex flex-col ">
                            {/* blog */}
                            <div className="flex pb-1">
                                {/* blog content  */}
                                <div className="flex flex-col gap-1 w-[70%] font-sohne">
                                    <h1 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white line-clamp-2 sm:line-clamp-3 md:line-clamp-4">
                                        {blog.title}
                                    </h1>
                                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 line-clamp-1 md:line-clamp-2">
                                        {previewText}
                                    </p>

                                </div>
                                {/* blog cover image */}
                                <div className="w-[30%] flex justify-end items-start">
                                    <div className="h-16 sm:h-26 aspect-[160/107] object-cover overflow-hidden ">
                                        <img src={blog?.coverImage?.url}
                                            alt="cover image" loading={lazy} />
                                    </div>
                                </div>
                            </div>

                            {/* footer  */}
                            <div className=" w-[70%] mb-1 flex justify-between font-serif text-gray-600 dark:text-gray-300 font-light text-xs sm:text-sm">
                                {/* like and comment */}
                                <div className="flex gap-5 items-center">
                                    <p className="font-[400] text-[13px] ">{createdAt(blog.createdAt)}</p>
                                    <div className="flex items-center gap-0.5">
                                        <ThumbsUp className="h-4 w-4" />
                                        <p className="">{blog.likes.length !== 0 && blog.likes.length}</p>
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                        <MessageCircleMore className="h-4 w-4" />
                                        <p className="">{blog.comments.length !== 0 && blog.comments.length}</p>
                                    </div>
                                </div>

                                {/* saves  */}
                                <div className="flex items-center gap-0.5">
                                    <Bookmark className="h-4 w-4" />
                                    <p className="">{blog.saves.length !== 0 && blog.saves.length}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogCard;