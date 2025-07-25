// // Basic JavaScript for any future interactivity.
// // For now, it just logs a message to the console.
// document.addEventListener('DOMContentLoaded', () => {
//     console.log('DimendsCAASI website loaded!');

//     // Example of a simple interactive element (if needed later)
//     const viewDetailsButton = document.querySelector('.vintage-card-img button');
//     if (viewDetailsButton) {
//         viewDetailsButton.addEventListener('click', () => {
//             showCustomAlert('View Details clicked!');
//         });
//     }
// });

// // Add a simple alert replacement function if needed
// function showCustomAlert(message) {
//     // In a real application, replace this with a custom modal or message box UI.
//     // For this example, we'll use a simple console log as alerts are discouraged.
//     console.log("Custom Alert:", message);
//     // You would typically create a div, style it, append to body, and show the message.
//     // Example:
//     /*
//     const alertBox = document.createElement('div');
//     alertBox.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; border: 1px solid #ccc; box-shadow: 0 0 10px rgba(0,0,0,0.1); z-index: 1000;';
//     alertBox.innerHTML = `<p>${message}</p><button onclick="this.parentNode.remove()">OK</button>`;
//     document.body.appendChild(alertBox);
//     */
// }


// ==============================================================

    
        // Mobile Menu Toggle
        document.querySelector('.mobile-menu-button').addEventListener('click', function() {
            document.querySelector('.mobile-menu').classList.toggle('active');
        });

       
        document.addEventListener('DOMContentLoaded', () => {
            console.log('DimendsCAASI website loaded!');

           
            const carousel = document.getElementById('ring-carousel');
            const ringInfo = document.getElementById('ring-info');
            
            
            const rings = [
                {
                    name: "Vintage",
                    price: "$3800",
                    offer: "Limited edition vintage piece",
                    code: "VINTAGE10",
                    image: "./images/ring1.jpg"
                },
                {
                    name: "Vintage Antique", 
                    price: "$4500",
                    offer: "Take 20% off for a limited time.",
                    code: "LOVE20",
                    image: "./images/ring2.jpg"
                },
                {
                    name: "Antique",
                    price: "$5200",
                    offer: "Free engraving on antique pieces",
                    code: "ANTIQUE15",
                    image: "./images/ring5.jpg"
                }
            ];
            
           
            rings.forEach((ring, index) => {
                const ringElement = document.createElement('div');
                ringElement.className = 'ring-item absolute rounded-full overflow-hidden cursor-pointer';
                ringElement.dataset.index = index;
                ringElement.style.backgroundImage = `url('${ring.image}')`;
                ringElement.onclick = function() { rotateToIndex(index); };
                carousel.appendChild(ringElement);
            });
            
            // Initial positioning
            let currentIndex = 1;
            positionRings(currentIndex);
            updateDisplay(currentIndex);
            
            function positionRings(centerIndex) {
                const ringItems = document.querySelectorAll('.ring-item');
                const container = carousel.getBoundingClientRect();
                const centerX = container.width / 2;
                const centerY = container.height / 2;
                
                ringItems.forEach((item, index) => {
                    if (index === centerIndex) {
                        // Center item (main position)
                        item.style.width = '50%';
                        item.style.height = '50%';
                        item.style.left = `${centerX}px`;
                        item.style.top = `${centerY * 0.5}px`;
                        item.style.transform = 'translate(-50%, -50%) scale(1.1)';
                        item.style.opacity = '1';
                        item.style.zIndex = '30';
                        item.style.border = '2px solid rgba(255, 255, 255, 0.3)';
                        item.classList.add('center-ring');
                    } else {
                        item.classList.remove('center-ring');
                        if (index === (centerIndex + 1) % ringItems.length) {
                            // Right item
                            item.style.width = '40%';
                            item.style.height = '40%';
                            item.style.left = `${container.width * 0.9}px`;
                            item.style.top = `${container.height * 0.7}px`;
                            item.style.transform = 'translate(-50%, -50%) scale(0.9)';
                            item.style.opacity = '0.8';
                            item.style.zIndex = '20';
                            item.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                        } else {
                            // Left item
                            item.style.width = '40%';
                            item.style.height = '40%';
                            item.style.left = `${container.width * 0.1}px`;
                            item.style.top = `${container.height * 0.7}px`;
                            item.style.transform = 'translate(-50%, -50%) scale(0.9)';
                            item.style.opacity = '0.8';
                            item.style.zIndex = '20';
                            item.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                        }
                    }
                });
            }
            
            function rotateToIndex(targetIndex) {
                if (targetIndex === currentIndex) return;
                
                // Add smooth transition
                document.querySelectorAll('.ring-item').forEach(item => {
                    item.style.transition = 'all 0.7s cubic-bezier(0.33, 1, 0.68, 1)';
                });
                
                // Reposition rings
                positionRings(targetIndex);
                
                // Update display with fade effect
                ringInfo.style.opacity = '0';
                
                setTimeout(() => {
                    currentIndex = targetIndex;
                    updateDisplay(targetIndex);
                    ringInfo.style.opacity = '1';
                }, 300);
            }
            
            function updateDisplay(index) {
                const ring = rings[index];
                document.getElementById('ring-price').textContent = ring.price;
                document.getElementById('ring-offer').textContent = ring.offer;
                document.getElementById('ring-code').innerHTML = `Use Code: <span class="text-yellow-600">${ring.code}</span>`;
                document.getElementById('small-ring-name').textContent = ring.name.toUpperCase();
            }
            
            window.addEventListener('resize', function() {
                positionRings(currentIndex);
            });

            // Diamond Slider
            const sliderTrack = document.getElementById('sliderTrack');
            const items = Array.from(document.querySelectorAll('.diamond-item'));
            const dots = Array.from(document.querySelectorAll('.slider-dot'));
            const totalItems = items.length;
            let currentPositions = Array.from({length: totalItems}, (_, i) => i + 1);
            let currentCenter = 4;
            
            updateDots();
            
            items.forEach(item => {
                const index = parseInt(item.getAttribute('data-index'));
                
                if(index <= 3) {
                    item.addEventListener('click', slideRight);
                } else if(index >= 5) {
                    item.addEventListener('click', slideLeft);
                }
            });
            
            dots.forEach(dot => {
                dot.addEventListener('click', function() {
                    const targetPos = parseInt(this.getAttribute('data-pos'));
                    centerToPosition(targetPos);
                });
            });
            
            function slideRight() {
                const firstPos = currentPositions[0];
                currentPositions = [...currentPositions.slice(1), firstPos];
                currentCenter = currentCenter === 1 ? 7 : currentCenter - 1;
                updatePositions();
                updateDots();
            }
            
            function slideLeft() {
                const lastPos = currentPositions[currentPositions.length - 1];
                currentPositions = [lastPos, ...currentPositions.slice(0, -1)];
                currentCenter = currentCenter === 7 ? 1 : currentCenter + 1;
                updatePositions();
                updateDots();
            }
            
            function centerToPosition(pos) {
                const steps = pos - currentCenter;
                if(steps > 0) {
                    for(let i = 0; i < steps; i++) {
                        const lastPos = currentPositions[currentPositions.length - 1];
                        currentPositions = [lastPos, ...currentPositions.slice(0, -1)];
                    }
                } else if(steps < 0) {
                    for(let i = 0; i < -steps; i++) {
                        const firstPos = currentPositions[0];
                        currentPositions = [...currentPositions.slice(1), firstPos];
                    }
                }
                currentCenter = pos;
                updatePositions();
                updateDots();
            }
            
            function updatePositions() {
                items.forEach((item, index) => {
                    item.setAttribute('data-pos', currentPositions[index]);
                });
            }
            
            function updateDots() {
                dots.forEach(dot => {
                    dot.classList.toggle('active', 
                        parseInt(dot.getAttribute('data-pos')) === currentCenter);
                });
            }
        });
    