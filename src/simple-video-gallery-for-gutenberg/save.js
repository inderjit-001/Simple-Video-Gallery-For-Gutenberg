/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */

export default function save({ attributes }) {
	const { videos, columns, bgColor, padding, gap, border, autoplay, mute } =
		attributes;

	return (
		<div
			{...useBlockProps.save()}
			style={{
				display: "grid",
				gridTemplateColumns: `repeat(${columns}, 1fr)`,
				gap: `${gap}px`,
				backgroundColor: bgColor,
				padding: `${padding}px`,
				border: border ? "1px solid #000" : "none",
			}}
		>
			{videos.map((video, index) => (
				<div key={index} className="video-item">
					<video
						width="100%"
						height="auto"
						controls
						autoPlay={autoplay}
						muted={mute}
					>
						<source src={video} type="video/mp4" />
					</video>
				</div>
			))}
		</div>
	);
}
