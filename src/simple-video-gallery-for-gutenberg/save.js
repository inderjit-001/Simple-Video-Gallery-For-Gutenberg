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
	const {
		videos,
		bgColor,
		border,
		autoplay,
		mute,
		columnsDesktop,
		columnsMobile,
		gapDesktop,
		gapMobile,
	} = attributes;

	return (
		<div
			{...useBlockProps.save({
				className: "video-gallery",
			})}
			style={{
				display: "grid",
				gridTemplateColumns: `repeat(${columnsDesktop}, 1fr)`,
				gap: `${gapDesktop}px`,
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
