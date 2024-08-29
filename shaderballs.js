/* // Ascii art credit https://textart.sh/topic/ball

              ████████████
          ████            ████
        ██    ░░▒▒▒▒▒▒░░    ░░██
      ██    ░░▒▒▒▒▒▒▒▒▒▒░░    ░░██
    ██▒▒      ░░▒▒▒▒▒▒▒▒░░    ░░░░██
    ██░░      ░░▒▒▒▒▒▒▒▒      ░░████
  ██▒▒░░░░░░░░▒▒▒▒▒▒▒▒▒▒      ████████
  ██▒▒░░░░▒▒▒▒▒▒▒▒▒▒▒▒░░    ░░████████
  ██▒▒░░░░▒▒▒▒▒▒▒▒▒▒▒▒      ██████████
  ████░░░░▒▒▒▒▒▒▒▒▒▒▒▒    ░░██████████
  ████████▒▒██████▒▒▒▒  ░░████████████
  ██████████░░  ░░████░░██████████████
    ██  ████      ██████████████░░██
    ██    ██░░  ░░██████████    ░░██
      ██░░  ██████            ░░██
        ██░░              ░░░░██
          ████░░░░░░░░░░░░████
              ████████████

       _____ _               _
      /  ___| |             | |
      \ `--.| |__   __ _  __| | ___ _ __
       `--. \ '_ \ / _` |/ _` |/ _ \ '__|
      /\__/ / | | | (_| | (_| |  __/ |
      \____/|_| |_|\__,_|\__,_|\___|_|
                    ______       _ _
                    | ___ \     | | |
                    | |_/ / __ _| | |___
                    | ___ \/ _` | | / __|
                    | |_/ / (_| | | \__ \
                    \____/ \__,_|_|_|___/
*/

const logBalls = ["🪩","⚽️","⚾️","🏀","🏈","🎾","🎱","🏉","🏐","🔮","🥎","🧶"];
const randBall = () => {return logBalls[Math.floor(Math.random() * logBalls.length)]};

console.log(`${randBall()} : Shaderballs is ballin!`);

const injectionPt = document.getElementById("myFullScreen");
const ourButton = document.createElement("img");
ourButton.src = chrome.runtime.getURL("orb.png");
// Doesn't work lmfao => ourButton.style.backgroundImage = `url('${chrome.runtime.getURL("orb.png")}')`;
ourButton.style.width = "20px";
ourButton.style.height = "20px";
ourButton.style.cursor = "pointer";
ourButton.className="uiButton";
injectionPt.parentElement.insertBefore(ourButton, injectionPt);
const shadertoyCanvas = document.getElementById("demogl");
if(injectionPt && shadertoyCanvas) {
    (async () => {
        const srcTHREE = chrome.runtime.getURL("node_modules/three/build/three.module.min.js");
        const srcCameraCtrls = chrome.runtime.getURL("node_modules/camera-controls/dist/camera-controls.module.min.js");
        const THREE = await import(srcTHREE);
        let CameraControls = await import(srcCameraCtrls);
        CameraControls = CameraControls.default;
        // Dev Note : Cannot use vanilla THREE.js camera-controls b/c module-maps are not possible
        // Seee GH issue tradgedy https://github.com/WICG/import-maps/issues/92
        CameraControls.install({THREE: THREE});

        ourButton.addEventListener("mousedown", () => {
            console.log(`${randBall()} : OrbToy Created.`);
            const babyWindow = document.createElement("div");
                babyWindow.className="shaderballs";
                babyWindow.style.position = "absolute";
                babyWindow.style.top = "40px";
                babyWindow.style.left = "50%";
                babyWindow.style.borderRadius = "16px";
                babyWindow.style.backdropFilter = "blur(5px)";
                babyWindow.style.border = "1px solid ivory";
                babyWindow.style.display = "flex";
                babyWindow.style.flexDirection = "column";
                babyWindow.style.overflow = "hidden";
                babyWindow.style.zIndex="69";//lol
                babyWindow.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)";
                babyWindow.style.width = "50vh";//`${shadertoyCanvas.clientHeight}px`;
                babyWindow.style.height = "50vh";//`${shadertoyCanvas.clientHeight}px`;
                babyWindow.tabIndex = 1;
            const header = document.createElement("div");
                header.style.display = "flex";
                header.style.flexDirection = "row";
                header.style.backgroundColor = "#f0f0f0";
                header.style.width = "100%";
            const title = document.createElement("div")
                title.innerText = "Shaderballs";
                title.width = "100%";
                title.style.fontFamily = "Lobster,Tahoma,Arial"
                title.style.fontWeight = "bold";
                title.style.textAlign = "center";
                title.style.padding = "5px";
                title.style.fontSize="16px"
            const close = document.createElement("div");
                close.innerText = "X";
                close.style.fontSize="18px"
                close.style.fontWeight = "bold";
                close.style.cursor = "pointer";
                close.style.padding = "5px";
                close.style.marginLeft = "auto";
                close.style.marginRight = "5px";
                close.fontWeight = "bold";

            const canvas = document.createElement("canvas");
            canvas.style.setProperty('height', '100%', 'important');
            canvas.style.setProperty('width', '100%', 'important');;

            header.appendChild(title);
            header.appendChild(close);
            babyWindow.appendChild(header);
            babyWindow.appendChild(canvas);

            document.body.appendChild(babyWindow);
            const gl = new THREE.WebGLRenderer({
                canvas,
                antialias: true,
                alpha: true,
                preserveDrawingBuffer: true
            });
            gl.setClearColor(0xFFFFFF, 0);
            gl.setPixelRatio(window.devicePixelRatio);
            const height = canvas.clientHeight;
            const width = canvas.clientWidth;
            gl.setSize(width, height);
            // THREE.js assigns absolute PX values that we don't want so we re-assign them.
            canvas.style.setProperty('height', '100%', 'important');
            canvas.style.setProperty('width', '100%', 'important');
            gl.autoClear = false;
            const camera = new THREE.PerspectiveCamera(
                47,
                width / height,
                0.1,
                200000
            );
            camera.position.set(0, 0, 1);
            const ctrls = new CameraControls(camera, canvas)
            const scene = new THREE.Scene();
            const orb = new THREE.Mesh(
                new THREE.SphereGeometry(0.3, 32, 32),
                new THREE.MeshBasicMaterial({ color: 0xFFFFFF, map: new THREE.CanvasTexture(shadertoyCanvas), side: THREE.DoubleSide})
            );
            orb.material.map.colorSpace = THREE.SRGBColorSpace;
            scene.add(orb);

            let frame = null;
            const clock = new THREE.Clock();
            function render(){
                ctrls.update(clock.getDelta());
                orb.material.map.needsUpdate = true;
                gl.clear();
                gl.render(scene, camera);
                frame = requestAnimationFrame(render);
            }
            frame = requestAnimationFrame(render);
            close.addEventListener("mousedown", (e) => {
                e.preventDefault();
                e.stopPropagation();

                // THIS NEEDS TO HAPPEN FIRST (Weird Chrome Bug)
                babyWindow.remove();

                cancelAnimationFrame(frame);
                orb.material.map.dispose();
                orb.material.dispose();
                orb.geometry.dispose();
                console.log(`${randBall()} : Removed Orb Toy`)
            })

            let isDragging = false;
            let offsetX, offsetY;

            header.addEventListener('mousedown', (e) => {
                e.preventDefault();
                e.stopPropagation();
                isDragging = true;
                // Calculate the offset (difference) between the mouse position and the element's top-left corner
                offsetX = e.clientX - babyWindow.getBoundingClientRect().left;
                offsetY = e.clientY - babyWindow.getBoundingClientRect().top;
                header.style.cursor = 'grabbing';
                focusBabyWindow();
            });

            document.addEventListener('mousemove', (e) => {
                if (isDragging) {
                    // Calculate the new position of the element
                    const x = e.clientX - offsetX;
                    const y = Math.max(e.clientY - offsetY,0);
                    // Set the new position of the element
                    babyWindow.style.left = `${x}px`;
                    babyWindow.style.top = `${y}px`;
                }
            });

            window.addEventListener('mouseup', () => {
                isDragging = false;
                header.style.cursor = 'pointer';
            });

            const resizableWindow = document.getElementById('resizableWindow');
            let isResizing = false;
            let originalWidth, originalHeight, originalX, originalY, originalMouseX, originalMouseY;
            let edge;
            canvas.addEventListener('resize', (e) => {})
            babyWindow.addEventListener('mousedown', (e) => {
                const rect = babyWindow.getBoundingClientRect();
                const offset = 10; // Distance from the edge to start resizing

                if (e.clientX >= rect.right - offset && e.clientY >= rect.bottom - offset) {
                    edge = 'bottom-right';
                } else if(e.clientX <= rect.left + offset && e.clientY >= rect.bottom - offset) {
                    edge = 'bottom-left';
                } else if (e.clientX >= rect.right - offset) {
                    edge = 'right';
                } else if (e.clientX <= rect.left + offset) {
                    edge = 'left';
                } else if (e.clientY >= rect.bottom - offset) {
                    edge = 'bottom';
                    console.log("bottoms")
                } else {
                    edge = null;
                }

                if (edge) {
                    e.preventDefault();
                    e.stopPropagation();
                    isResizing = true;
                    originalWidth = parseFloat(getComputedStyle(babyWindow, null).getPropertyValue('width').replace('px', ''));
                    originalHeight = parseFloat(getComputedStyle(babyWindow, null).getPropertyValue('height').replace('px', ''));
                    originalX = babyWindow.getBoundingClientRect().left;
                    originalY = babyWindow.getBoundingClientRect().top;
                    originalMouseX = e.pageX;
                    originalMouseY = e.pageY;
                    window.addEventListener('mousemove', resize);
                    window.addEventListener('mouseup', stopResize);
                }
            });

            function resize(e) {
                if (edge === 'right') {
                    const width = originalWidth + (e.pageX - originalMouseX);
                    if (width > 100) { // Minimum width
                        babyWindow.style.width = width + 'px';
                    }
                } else if (edge === 'left') {
                    const width = originalWidth - (e.pageX - originalMouseX);
                    if (width > 100) { // Minimum width
                        babyWindow.style.width = width + 'px';
                        babyWindow.style.left = originalX + (e.pageX - originalMouseX) + 'px';
                    }
                } else if (edge === 'bottom') {
                    const height = originalHeight + (e.pageY - originalMouseY);
                    if (height > 100) { // Minimum height
                        babyWindow.style.height = height + 'px';
                    }
                } else if (edge === 'bottom-right') {
                    const width = originalWidth + (e.pageX - originalMouseX);
                    const height = originalHeight + (e.pageY - originalMouseY);
                    if (width > 100) { // Minimum width
                        babyWindow.style.width = width + 'px';
                    }
                    if (height > 100) { // Minimum height
                        babyWindow.style.height = height + 'px';
                    }
                } else if (edge === 'bottom-left') {
                    const width = originalWidth - (e.pageX - originalMouseX);
                    const height = originalHeight + (e.pageY - originalMouseY);
                    if (width > 100) { // Minimum width
                        babyWindow.style.width = width + 'px';
                        babyWindow.style.left = originalX + (e.pageX - originalMouseX) + 'px';
                    }
                    if (height > 100) { // Minimum height
                        babyWindow.style.height = height + 'px';
                    }
                }
            }
            function stopResize() {
                isResizing = false;
                window.removeEventListener('mousemove', resize);
                window.removeEventListener('mouseup', stopResize);
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix()
                gl.setSize(canvas.clientWidth, canvas.clientHeight);
                canvas.style.setProperty('height', '100%', 'important');
                canvas.style.setProperty('width', '100%', 'important');
            }
            babyWindow.addEventListener('mousemove', (e) => {
                const rect = babyWindow.getBoundingClientRect();
                const offset = 10; // Distance from the edge to change cursor

                if (e.clientX >= rect.right - offset && e.clientY >= rect.bottom - offset) {
                    babyWindow.style.cursor = 'nwse-resize';
                } else if (e.clientX <= rect.left + offset && e.clientY >= rect.bottom - offset) {
                    babyWindow.style.cursor = 'nesw-resize';
                } else if (e.clientX >= rect.right - offset) {
                    babyWindow.style.cursor = 'ew-resize';
                } else if (e.clientX <= rect.left + offset) {
                    babyWindow.style.cursor = 'ew-resize';
                } else if (e.clientY >= rect.bottom - offset) {
                    babyWindow.style.cursor = 'ns-resize';
                } else {
                    babyWindow.style.cursor = 'default';
                }
            });
            babyWindow.addEventListener('focus', (e) => {
                focusBabyWindow();
            })
            function focusBabyWindow(){
                //const balls = document.getElementsByClassName("shaderballs");
                document.body.appendChild(babyWindow);
            }
        })
    })();

}
