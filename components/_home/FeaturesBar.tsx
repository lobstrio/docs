import { FEATURES } from "./Home.dto";

export default function FeaturesBar() {
    return (
        <div className="border-y border-[#dde1ee] bg-[#f8fafc]">
            <div className="max-w-7xl mx-auto px-10 py-8">
                <div className="flex flex-wrap justify-center items-center gap-10">
                    {FEATURES.map((item, i) => (
                        <div key={i} className="flex items-center justify-between gap-3">
                            <item.icon className="w-5 h-5 text-[#ff0000]" />
                            <span className="text-[18px] font-semibold leading-[1.33]">{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
