export default function CommentItem({ comment }) {

  return (
    <div className="group bg-white p-3 rounded-xl flex flex-col">
      <div>
        <span className="bg-emerald-100 text-sm p-1 rounded-lg">
          {comment.user.username}
        </span>
        <h3 className="mt-4 text-sm text-gray-700">{comment.comment_date}</h3>
      </div>
      <div className="flex justify-between mt-auto">
        <div className="text-lg font-medium text-gray-900">
          {comment.text}
        </div>
      </div>
    </div>
  );
}
