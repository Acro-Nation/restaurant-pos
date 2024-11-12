import NotificationIcon from '@/assets/icons/Notification'

const Notification = () => {
  const err = true
  return (
    <div
      className={`flex bg-white rounded-xl h-[102px] p-2 w-[100%] items-center justify-center ${err ? 'border-l-4 border-red-400' : ''}`}
    >
      <div className="w-[10%] px-2">
        {err ? (
          <NotificationIcon fill="red" />
        ) : (
          <NotificationIcon fill="#00897B" />
        )}
      </div>
      <div className="w-[80%] flex flex-col gap-3">
        <div>
          <span>@Mithun Raj_ Ready for serve for Order (Table: #0020)</span>
        </div>
        <div>Thursday 02:20 PM</div>
      </div>
      <div className="flex-1 w-[10%]">1 Hour ago</div>
    </div>
  )
}

export default Notification
