import { useState } from "react";
import { FaThumbsUp, FaReply } from "react-icons/fa";
import { IoIosArrowDown, IoMdSend } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const CommentTemplate = ({
  id,
  username,
  profilePic,
  timestamp,
  text,
  likes,
  replies,
  onReply,
  paddingLeft,
}) => {
  const [replyBoxOpen, setreplyBoxOpen] = useState(false);
  const [repliesShow, setrepliesShow] = useState(false);

  return (
    <>
      <div className="p-4 bg-white text-gray-900 w-full">
        {/* Parent Comment */}
        <div className="flex items-start">
          {/* Profile Image */}
          <img
            src={profilePic}
            alt="Profile"
            className="w-10 h-10 rounded-full mr-4"
          />
          <div className="flex-1">
            {/* Username and Timestamp */}
            <div className="flex flex-wrap items-center text-sm mb-1">
              <span className="font-semibold">{username}</span>
              <span className="text-gray-500 ml-2">{timestamp}</span>
            </div>

            {/* Comment Text */}
            <p className="mb-2 break-words text-sm sm:text-base">{text}</p>

            {/* Actions */}
            <div className="flex flex-wrap items-center space-x-4 text-gray-400 text-sm gap-y-2">
              <button className="flex items-center space-x-1 hover:text-blue-500">
                <FaThumbsUp />
                <span>{likes}</span>
              </button>
              <button
                className="flex items-center space-x-1 hover:underline"
                onClick={() => setreplyBoxOpen(true)}
              >
                <FaReply />
                <span>Reply</span>
              </button>
              <button className="flex items-center space-x-1 text-lg hover:text-red-600">
                <MdDelete />
              </button>
            </div>

            {/* Reply Input Box */}
            {replyBoxOpen && (
              <div className={`mt-4 flex flex-col sm:flex-row gap-3 ${paddingLeft}`}>
                <div className="w-full sm:w-[95%]">
                  <input
                    type="text"
                    className="w-full p-2 rounded bg-gray-200 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Replying to @${username}...`}
                  />
                </div>
                <div className="sm:w-[5%] flex items-center text-2xl text-blue-700">
                  <IoMdSend
                    onClick={() => {
                      setreplyBoxOpen(false);
                    }}
                  />
                </div>
              </div>
            )}

            {/* Show all replies */}
            {replies && replies.length > 0 && (
              <div className="text-blue-700 flex pt-2 items-center gap-1 text-sm cursor-pointer">
                <IoIosArrowDown
                  onClick={() => setrepliesShow(!repliesShow)}
                  className="hover:text-lg"
                />
                <span onClick={() => setrepliesShow(!repliesShow)} className="hover:underline">
                  {replies.length} Replies
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Recursive call for replies */}
        {replies && replies.length > 0 && repliesShow ? (
          <div style={{ paddingLeft: `${paddingLeft + 2}rem` }}>
            {replies.map((reply) => (
              <CommentTemplate
                key={reply.id}
                id={reply.id}
                username={reply.username}
                profilePic={reply.profilePic}
                timestamp={reply.timestamp}
                text={reply.text}
                likes={reply.likes}
                replies={reply.replies}
                paddingLeft={paddingLeft + 0.2}
              />
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
};

const CommentSection = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      username: "MonsterlessonsAcademy",
      profilePic: "https://via.placeholder.com/40",
      timestamp: "1 second ago",
      text: "This is a parent comment.",
      likes: 8,
      dislikes: 1,
      showReplies: false,
      replies: [
        {
          id: 2,
          username: "priyaacharjee6211",
          profilePic: "https://via.placeholder.com/40",
          text: "@MonsterlessonsAcademy kjkkjj",
          timestamp: "1 second ago",
          likes: 0,
          replies: [
            {
              id: 3,
              username: "priyaacharjee6211",
              profilePic: "https://via.placeholder.com/40",
              text: "@MonsterlessonsAcademy kjkkjj",
              timestamp: "1 second ago",
              likes: 0,
              replies: [],
            },
          ],
        },
      ],
    },
  ]);

  return (
    <div className="mt-6 text-gray-700 w-full px-4 sm:px-6 flex justify-center">
      <div className="w-full max-w-xl sm:max-w-2xl lg:max-w-4xl">
        {/* Input Box */}
        <div className="pb-16 w-full">
          <input
            type="text"
            className="border-[3px] border-blue-500 w-full  px-8 py-2 rounded-xl  bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a comment..."
          />
          <button className="mt-2 float-end px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Post
          </button>
        </div>

        {/* Comments List */}
        {comments.map((comment) => (
          <CommentTemplate
            key={comment.id}
            id={comment.id}
            username={comment.username}
            profilePic={comment.profilePic}
            timestamp={comment.timestamp}
            text={comment.text}
            likes={comment.likes}
            replies={comment.replies}
            paddingLeft={0}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
