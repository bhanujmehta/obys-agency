function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});
// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}
function loadingAnimation(){
    var tl = gsap.timeline()
tl.from(".line1 h1", {
    y:150,
    stagger:0.25,
    delay:0.2,
    duration:0.6,
})
tl.from("#line1part1",{
    opacity:0,
    delay:0,
    stagger:0,
    onStart: function() {
        var h5timer = document.querySelector("#line1part1 h5")
var grow = 0
setInterval(function(){
    if(grow<100){
        h5timer.innerHTML = grow++
    }else{
        h5timer.innerHTML = grow
    }
},30)
    }
})
tl.to('.line1 h2',{
    animationName:"anime",
    opacity:1
})
tl.to("#loader",{
    opacity:0,
    duration:0.5,
    delay:3
})
tl.from("#page1",{
    delay:0,
    ease:Power4,
    opacity:0,
    y:1600,
})
tl.to("#loader",{
    display:"none"
})
tl.to("#nav",{
    opacity:1
})
tl.from("#hero1 h1,#hero2 h1,#hero3 h2,#hero3 h3,#hero4 h1",{
    y:120,
    delay:-1,
    stagger:0.06,
})
}
function mouseAnimation(){
    Shery.mouseFollower({
        skew: true,
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 1,
      });

      Shery.makeMagnet("#navpart2 h4");

      var videoContainer = document.querySelector("#videocontainer")
      var vdo = document.querySelector("#videocontainer video")
      videoContainer.addEventListener("mouseenter",function(){
        videoContainer.addEventListener("mousemove",function(dets){
            gsap.to(".mousefollower",{
                opacity:0,
            })
            gsap.to("#videocrsr",{
                left:dets.x - 570,
                y:dets.y - 300,
            })
        })
      })
      videoContainer.addEventListener("mouseleave",function(){
        gsap.to(".mousefollower",{
            display:"initial",
        })
        gsap.to("#videocrsr",{
            top:"-15%",
        })
        gsap.to("#videocrsr",{
            left:"70%",
        })
        gsap.to(".mousefollower",{
            opacity:1,
        })
      })

      var flag = 0
      videoContainer.addEventListener("click",function(){
        if(flag == 0){
            vdo.play()
            vdo.style.opacity = 1
            document.querySelector("#videocrsr").innerHTML = '<i class="ri-pause-mini-line"></i>'
            gsap.to("#videocrsr",{
                scale:0.5,
            })
            flag = 1
        }else{
            vdo.pause()
            vdo.style.opacity = 0
            document.querySelector("#videocrsr").innerHTML = '<i class="ri-play-fill"></i>'
            gsap.to("#videocrsr",{
                scale:1,
            })
            flag = 0
        }
    })
}
loadingAnimation()
mouseAnimation()
locomotiveAnimation()
function sheryAnimation(){
    Shery.imageEffect(".image-div",{
        style:5,
        gooey:true,
    })
}
sheryAnimation()
document.addEventListener("mousemove",function(dets){
    gsap.to("#flag",{
        x:dets.x,
        y:dets.y,
    })
})
document.querySelector("#hero3").addEventListener("mouseenter",function(){
    gsap.to("#flag",{
        opacity:1
    })
})
document.querySelector("#hero3").addEventListener("mouseleave",function(){
    gsap.to("#flag",{
        opacity:0,
    })
})