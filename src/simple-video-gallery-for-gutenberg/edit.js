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
		bgColor,
		border,
		autoplay,
		mute,
		columnsDesktop,
		columnsMobile,
		paddingDesktop,
		paddingMobile,
		gapDesktop,
		gapMobile,
		maxWidth,
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
					<TextControl
						label={__("MaxWidth (Desktop)", "video-gallery-block")}
						value={maxWidth}
						onChange={(value) => setAttributes({ maxWidth: value })}
					/>

					<RangeControl
						label={__("Columns (Desktop)", "video-gallery-block")}
						value={columnsDesktop}
						onChange={(value) => setAttributes({ columnsDesktop: value })}
						min={1}
						max={6}
					/>
					<RangeControl
						label={__("Columns (Mobile)", "video-gallery-block")}
						value={columnsMobile}
						onChange={(value) => setAttributes({ columnsMobile: value })}
						min={1}
						max={3}
					/>
					<RangeControl
						label={__("Padding (Desktop)", "video-gallery-block")}
						value={paddingDesktop}
						onChange={(value) => setAttributes({ paddingDesktop: value })}
						min={0}
						max={50}
					/>
					<RangeControl
						label={__("Padding (Mobile)", "video-gallery-block")}
						value={paddingMobile}
						onChange={(value) => setAttributes({ paddingMobile: value })}
						min={0}
						max={50}
					/>
					<RangeControl
						label={__("Gap (Desktop)", "video-gallery-block")}
						value={gapDesktop}
						onChange={(value) => setAttributes({ gapDesktop: value })}
						min={0}
						max={50}
					/>
					<RangeControl
						label={__("Gap (Mobile)", "video-gallery-block")}
						value={gapMobile}
						onChange={(value) => setAttributes({ gapMobile: value })}
						min={0}
						max={50}
					/>
					<ToggleControl
						label={__("Border", "video-gallery-block")}
						checked={border}
						onChange={(value) => setAttributes({ border: value })}
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
					/>
					<ToggleControl
						label={__("Mute", "video-gallery-block")}
						checked={mute}
						onChange={(value) => setAttributes({ mute: value })}
					/>
				</PanelBody>

				<PanelBody
					title={__("Background Color", "video-gallery-block")}
					initialOpen={true}
				>
					<ColorPalette
						value={bgColor}
						onChange={(color) => setAttributes({ bgColor: color })}
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
					backgroundColor: bgColor,
					padding: `${paddingDesktop}px`,
					border: border ? "1px solid #000" : "none",
					maxWidth: `${maxWidth}px`,
					margin: "0 auto",
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
