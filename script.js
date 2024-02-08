class Paper {
    constructor() {
      this.holdingPaper = false;
      this.mouseTouchX = 0;
      this.mouseTouchY = 0;
      this.mouseX = 0;
      this.mouseY = 0;
      this.prevMouseX = 0;
      this.prevMouseY = 0;
      this.touchStartX = 0;
      this.touchStartY = 0;
      this.touchMoveX = 0;
      this.touchMoveY = 0;
      this.prevTouchMoveX = 0;
      this.prevTouchMoveY = 0;
      this.velX = 0;
      this.velY = 0;
      this.rotation = Math.random() * 30 - 15;
      this.currentPaperX = 0;
      this.currentPaperY = 0;
      this.rotating = false;
      this.paper = null;
      this.text = null;
    }
  
    init(paper) {
      this.paper = paper;
      this.text = paper.querySelector('.text');
      this.paper.addEventListener('mousedown', this.onMouseDown.bind(this));
      this.paper.addEventListener('mousemove', this.onMouseMove.bind(this));
      this.paper.addEventListener('mouseup', this.onMouseUp.bind(this));
      this.paper.addEventListener('touchstart', this.onTouchStart.bind(this));
      this.paper.addEventListener('touchmove', this.onTouchMove.bind(this));
      this.paper.addEventListener('touchend', this.onTouchEnd.bind(this));
    }
  
    onMouseDown(event) {
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      this.mouseTouchX = event.clientX;
      this.mouseTouchY = event.clientY;
      this.prevMouseX = this.mouseTouchX;
      this.prevMouseY = this.mouseTouchY;
      this.paper.style.zIndex = Paper.highestZ++;
    }
  
    onMouseMove(event) {
      if (!this.holdingPaper) return;
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
      this.velX = this.mouseX - this.prevMouseX;
      this.velY = this.mouseY - this.prevMouseY;
      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;
      if (!this.rotating) {
        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;
        this.paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
        this.text.style.transform = `translateX(${-this.currentPaperX}px) translateY(${-this.currentPaperY}px) rotateZ(${-this.rotation}deg)`;
      }
    }
  
    onMouseUp() {
      this.holdingPaper = false;
      this.rotating = false;
    }
  
    onTouchStart(event) {
      if (this.holdingPaper) return;
      const touch = event.touches[0];
      this.touchStartX = touch.clientX;
      this.touchStartY = touch.clientY;
      this.prevTouchMoveX = this.touchStartX;
      this.prevTouchMoveY = this.touchStartY;
      this.paper.style.zIndex = Paper.highestZ++;
    }
  
    onTouchMove(event) {
      if (!this.holdingPaper) return;
      const touch = event.touches[0];
      this.touchMoveX = touch.clientX;
      this.touchMoveY = touch.clientY;
      this.velX = this.touchMoveX - this.prevTouchMoveX;
      this.velY = this.touchMoveY - this.prevTouchMoveY;
      this.prevTouchMoveX = this.touchMoveX;
      this.prevTouchMoveY = this.touchMoveY;
      if (!this.rotating) {
        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;
        this.paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
        this.text.style.transform = `translateX(${-this.currentPaperX}px) translateY(${-this.currentPaperY}px) rotateZ(${-this.rotation}deg)`;
      }
    }
  
    onTouchEnd() {
      this.holdingPaper = false;
      this.rotating = false;
    }
  }
  
  Paper.highestZ = 1;
  
  const papers = document.querySelectorAll('.paper');
  const paperInstances = [];
  
  papers.forEach(paper => {
    const p = new Paper();
    paperInstances.push(p);
    p.init(paper);
  });
  
