export default function NightChecklist() {
    return (
        <div className="mt-6 w-[80%] rounded-2xl border border-foreground-800  p-6 shadow-foreground/10 shadow-xl flex flex-col gap-6 justify-center items-center">
            <header>
                <h2 className="text-lg font-bold tracking-wide">
                    TRUST GOD FOR THE TOMMORROW
                </h2>
            </header>

            <ul className="space-y-4 text-sm leading-relaxed">
                <li className="flex gap-3">
                    <span className="">▢</span>
                    <span>Teeth brushed</span>
                </li>

                <li className="flex gap-3">
                    <span className="">▢</span>
                    <span>
                        Phone stays <span className="font-semibold ">OUT</span> of bedroom
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

            <p className="mt-5 text-xs text-neutral-500 text-center">
                No devices. No negotiation. Just honesty.
            </p>
        </div>
    );
}
