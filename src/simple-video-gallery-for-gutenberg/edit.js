import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	MediaUpload,
	MediaUploadCheck,
	InspectorControls,
} from "@wordpress/block-editor";

import {
	PanelBody,
	RangeControl,
	ToggleControl,
	Button,
	ColorPalette,
	TextControl,
} from "@wordpress/components";

import "./editor.scss";

const ALLOWED_MEDIA_TYPES = ["video"];

export default function Edit({ attributes, setAttributes }) {
	const {
		videos,
		autoplay,
		mute,
		columnsDesktop,
		columnsMobile,
		gapDesktop,
		gapMobile,
	} = attributes;

	// Handle video selection
	const onSelectVideo = (media) => {
		console.log("Selected media:", media); // Debugging

		if (!Array.isArray(media)) {
			media = [media];
		}

		const videoUrls = media
			.filter((file) => file.type === "video") // Ensure only videos
			.map((file) => file.url);

		console.log("Filtered videos:", videoUrls); // Debugging

		if (videoUrls.length > 0) {
			setAttributes({ videos: [...videos, ...videoUrls] });
		} else {
			alert("Please select valid video files.");
		}
	};

	// Remove a specific video
	const removeVideo = (index) => {
		const newVideos = videos.filter((_, i) => i !== index);
		setAttributes({ videos: newVideos });
	};

	return (
		<div {...useBlockProps()}>
			{/* Sidebar Controls */}
			<InspectorControls>
				<PanelBody
					title={__("Grid Settings", "video-gallery-block")}
					initialOpen={true}
				>
					<RangeControl
						label={__("Columns (Desktop)", "video-gallery-block")}
						value={columnsDesktop}
						onChange={(value) => setAttributes({ columnsDesktop: value })}
						min={1}
						max={6}
						__nextHasNoMarginBottom
					/>
					<RangeControl
						label={__("Columns (Mobile)", "video-gallery-block")}
						value={columnsMobile}
						onChange={(value) => setAttributes({ columnsMobile: value })}
						min={1}
						max={3}
						__nextHasNoMarginBottom
					/>
					<RangeControl
						label={__("Gap (Desktop)", "video-gallery-block")}
						value={gapDesktop}
						onChange={(value) => setAttributes({ gapDesktop: value })}
						min={0}
						max={50}
						__nextHasNoMarginBottom
					/>
					<RangeControl
						label={__("Gap (Mobile)", "video-gallery-block")}
						value={gapMobile}
						onChange={(value) => setAttributes({ gapMobile: value })}
						min={0}
						max={50}
						__nextHasNoMarginBottom
					/>
				</PanelBody>

				<PanelBody
					title={__("Video Settings", "video-gallery-block")}
					initialOpen={true}
				>
					<ToggleControl
						label={__("Autoplay", "video-gallery-block")}
						checked={autoplay}
						onChange={(value) => setAttributes({ autoplay: value })}
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={__("Mute", "video-gallery-block")}
						checked={mute}
						onChange={(value) => setAttributes({ mute: value })}
						__nextHasNoMarginBottom
					/>
				</PanelBody>
			</InspectorControls>

			{/* Video Upload */}
			<MediaUploadCheck>
				<MediaUpload
					onSelect={onSelectVideo}
					allowedTypes={ALLOWED_MEDIA_TYPES}
					multiple
					render={({ open }) => (
						<Button variant="primary" onClick={open}>
							{__("Add Videos", "video-gallery-block")}
						</Button>
					)}
				/>
			</MediaUploadCheck>

			{/* Video Gallery */}
			<div
				className="video-gallery"
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
						<Button isDestructive onClick={() => removeVideo(index)}>
							{__("Remove", "video-gallery-block")}
						</Button>
					</div>
				))}
			</div>
		</div>
	);
}
