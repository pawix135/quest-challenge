const progressSize = 50;
const circleSize = progressSize / 2;
const strokeWIdth = 5;
const radius = (progressSize - strokeWIdth) / 2;
const circumference = radius * Math.PI * 2;

interface Props {
	progress: number;
}

const ProgressSvg: React.FC<Props> = ({ progress }) => {
	const dash = (progress * circumference) / 100;

	return (
		<svg
			width={progressSize}
			height={progressSize}
			viewBox="0 0 50 50"
			className="text-white"
		>
			<circle
				className="bg"
				cx={circleSize}
				cy={circleSize}
				r={radius}
				fill="none"
				stroke="#1d1d1d"
				strokeWidth={strokeWIdth}
			></circle>
			<text
				x={circleSize}
				y={circleSize}
				textAnchor="middle"
				fontSize={"smaller"}
				fontStyle={"normal"}
				fontWeight={"normal"}
				strokeWidth={1}
				stroke="white"
				dy=".3em"
			>
				{progress + "%"}
			</text>
			<circle
				className="origin-[25px_25px] -rotate-90"
				cx={circleSize}
				cy={circleSize}
				r={radius}
				fill="none"
				stroke="#00FF00"
				strokeWidth={strokeWIdth}
				strokeDasharray={dash}
			></circle>
		</svg>
	);
};

export default ProgressSvg;
