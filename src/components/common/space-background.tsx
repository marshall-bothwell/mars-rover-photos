'use client';

import { useEffect } from 'react';

interface SpaceBackgroundProps {
	speedFactor?: number;
	backgroundColor?: string;
	starCount?: number;
}

export default function SpaceBackground(props: SpaceBackgroundProps) {
	const { speedFactor = 0.05, backgroundColor = 'black', starCount = 5000 } = props;

	useEffect(() => {
		const canvas = document.getElementById('space') as HTMLCanvasElement;

		if (canvas) {
			const c = canvas.getContext('2d');

			if (c) {
				c.beginPath();

				let windowWidth = window.innerWidth;
				let windowHeight = window.innerHeight;

				const setCanvasExtents = () => {
					canvas.width = windowWidth;
					canvas.height = windowHeight;
				};

				setCanvasExtents();

				window.onresize = () => {
					setCanvasExtents();
				};

				const makeStars = (count: number) => {
					const out = [];
					for (let i = 0; i < count; i++) {
						let color: number[]
						if (Math.random() > .8) {
							color = [255, Math.ceil((Math.random()*55)+200), Math.ceil(Math.random()*255)]
						} else {
							color = [255, 255, 255]
						}
						const s = {
							x: Math.random() * 1600 - 800,
							y: Math.random() * 900 - 450,
							z: Math.random() * 1000,
							color: color
						};
						out.push(s);
					}
					return out;
				};

				let stars = makeStars(starCount);

				const clear = () => {
					c.fillStyle = backgroundColor;
					c.fillRect(0, 0, canvas.width, canvas.height);
				};

				const putPixel = (x: number, y: number, brightness: number, color: number[]) => {
					const rgba = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + brightness + ')';
					c.fillStyle = rgba;
					c.fillRect(x, y, 1, 1);
				};

				const moveStars = (distance: number) => {
					const count = stars.length;
					for (var i = 0; i < count; i++) {
						const s = stars[i];
						s.z -= distance;
						while (s.z <= 1) {
							s.z += 1000;
						}
					}
				};

				let prevTime: number;
				const init = (time: number) => {
					prevTime = time;
					requestAnimationFrame(tick);
				};

				const tick = (time: number) => {
					let elapsed = time - prevTime;
					prevTime = time;

					moveStars(elapsed * speedFactor);

					clear();

					const cx = windowWidth / 2;
					const cy = windowHeight / 2;

					const count = stars.length;
					
					for (var i = 0; i < count; i++) {
						const star = stars[i];
						const d = star.z * 0.001
						const x = cx + star.x / (d);
						const y = cy + star.y / (d);

						if (x < 0 || x >= windowWidth || y < 0 || y >= windowHeight) {
							continue;
						}

						const b = 1 - d * d;

						putPixel(x, y, b, star.color);
					}

					requestAnimationFrame(tick);
				};

				requestAnimationFrame(init);

				window.addEventListener('resize', () => {
					windowWidth = window.innerWidth;
					windowHeight = window.innerHeight;
					setCanvasExtents();
				});

				c.closePath()
			} else {
				console.error('Could not get 2d context from canvas element');
			}
		} else {
			console.error('Could not find canvas element with id "starfield"');
		}

		return () => {
			window.onresize = null;
		};
	}, [backgroundColor, speedFactor, starCount]);

	return (
		<canvas
			id="space"
			className="fixed inset-0 z-[-1] opacity-100 mix-blend-screen pointer-events-none"
		></canvas>
	);
}