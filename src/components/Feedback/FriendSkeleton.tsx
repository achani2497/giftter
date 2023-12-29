export function FriendSkeleton() {
    return (
        <div className="shadow-xl bg-slate-200 rounded-md p-4 max-w-sm w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-400 h-10 w-10"></div>
                <div className="flex flex-col gap-2 w-full">
                    <div className="h-2 w-2/3 bg-slate-400 rounded"></div>
                    <div className="flex items-center leading-tight">
                        @<div className="h-2 w-1/3 bg-slate-400 rounded"></div>
                    </div>
                    <div className="h-2 w-1/2 bg-slate-400 rounded"></div>
                </div>
            </div>
        </div>
    )
}