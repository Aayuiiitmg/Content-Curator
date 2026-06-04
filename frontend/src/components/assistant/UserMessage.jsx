export default function UserMessage({ content }) {
  return (
    <div className="flex justify-end max-w-3xl ml-auto">
      <div className="bg-slate-100 text-slate-900 px-4 py-3 rounded-2xl rounded-br-md max-w-[85%]">
        <p className="text-[15px] leading-relaxed">{content}</p>
      </div>
    </div>
  )
}
