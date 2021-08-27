import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import html2canvas from 'html2canvas';

function App() {
	useEffect(() => {
		const script = document.createElement('script');
		script.innerHTML = `
		var video = document.querySelector("#videoElement");

		if (navigator.mediaDevices.getUserMedia) {
		  navigator.mediaDevices.getUserMedia({ video: true })
			.then(function (stream) {
			  video.srcObject = stream;
			})
			.catch(function (err0r) {
			  console.log("Something went wrong!");
			});
		}`;

		document.body.appendChild(script);
		html2canvas(document.body).then(function (canvas) {
			canvas.style = 'display: none';
			document.body.appendChild(canvas);
		});
	});
	const handleWebCamScreenshot = (e) => {
		let video = document.getElementsByTagName('video')[0];
		let canvas = document.getElementsByTagName('canvas')[0];
		let ctx = canvas.getContext('2d');

		// ctx.drawImage(video, 0, 0, 1280, 720);
		ctx.drawImage(video, 1300, 200); //소스, 위치 설정
		video.style.backgroundImage = 'url(' + canvas.toDataURL() + ')';
		canvas.toBlob((blob) => {
			var a = document.createElement('a');
			document.body.appendChild(a);
			a.style = 'display: none';

			var url = window.URL.createObjectURL(blob);
			a.href = url;
			a.download = 'blob';
			a.click();
			window.URL.revokeObjectURL(url);

			// navigator.clipboard.writeText([new Clipboard({ 'image/png': blob })]);
		});
	};
	return (
		<div className="App">
			<header className="App-header">
				<video
					autoPlay={true}
					id="videoElement"
					style={
						{
							// position: 'absolute',
							// backgroundColor: 'black',
							// width: '200px',
							// margin: '6% 0 0 85%',
							// zIndex: '99',
						}
					}
				></video>
				<p>some text</p>
				<button
					onClick={() => {
						handleWebCamScreenshot();
					}}
				>
					screenShot
				</button>
			</header>
		</div>
	);
}

export default App;
