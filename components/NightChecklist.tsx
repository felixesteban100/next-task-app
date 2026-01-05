export default function NightChecklist() {
    return (
        <div className="mt-6 w-[80%] rounded-2xl border border-foreground-800  p-6 shadow-foreground/10 shadow-xl flex flex-col gap-6 justify-center items-center">
            <header>
                <h2 className="text-lg tracking-wide">
                    Night Preparation for tomorrow
                </h2>
                <span className="font-bold">TRUST GOD FOR THE TOMMORROW</span>
                <p className="mt-1 text-sm text-foreground-400">
                    8:40 PM → 9:00 PM · PASS / FAIL
                </p>
            </header>

            <ul className="space-y-4 text-sm leading-relaxed">
                <li className="flex gap-3">
                    <span className="">▢</span>
                    <span>
                        PC <span className="font-semibold ">OFF</span> by
                        <span className="font-semibold "> 8:40 PM</span>
                    </span>
                </li>

                <li className="flex gap-3">
                    <span className="">▢</span>
                    <span>
                        Phone stays <span className="font-semibold ">OUT</span> of bedroom
                    </span>
                </li>

                <li className="flex gap-3">
                    <span className="">▢</span>
                    <span>Teeth brushed</span>
                </li>

                <li className="flex gap-3">
                    <span className="">▢</span>
                    <span>
                        Body calm <span className="">
                            (stretch / breathing / knee care)
                        </span>
                    </span>
                </li>

                <li className="flex gap-3">
                    <span className="">▢</span>
                    <span>
                        In bed by <span className="font-semibold ">9:00 PM</span>
                        <span className=""> (no device)</span>
                    </span>
                </li>
            </ul>

            <div className="mt-6 rounded-xl border border-accent-foreground-800 bg-foreground-900 p-4 text-center">
                <p className="text-sm font-medium ">
                    ALL DONE = <span className="text-emerald-400">PASS</span>
                </p>
                <p className="mt-1 text-sm font-medium ">
                    ANY MISSED = <span className="text-red-400">FAIL</span>
                </p>
            </div>

            <p className="mt-5 text-xs text-neutral-500 text-center">
                No devices. No negotiation. Just honesty.
            </p>
        </div>
    );
}
