import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Heart, MessageCircle, Share2, Volume2, VolumeX, ChevronUp, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

// Placeholder videos - will be replaced with real content
const videos = [
  {
    id: 1,
    src: "https://assets.mixkit.co/videos/preview/mixkit-woman-showing-off-earrings-34582-large.mp4",
    poster: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80",
    title: "New Arrival: Chandbali Earrings",
    description: "Handcrafted 92.5 silver jhumkas with intricate detailing",
    likes: 234,
    comments: 18,
  },
  {
    id: 2,
    src: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-woman-holding-a-gold-necklace-39881-large.mp4",
    poster: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80",
    title: "Customer Review: Bridal Set",
    description: "Thank you for the love! ❤️ Pure silver bridal collection",
    likes: 892,
    comments: 45,
  },
  {
    id: 3,
    src: "https://assets.mixkit.co/videos/preview/mixkit-jewelry-on-display-34584-large.mp4",
    poster: "https://images.unsplash.com/photo-1618173745201-8bb10527a4f0?w=400&q=80",
    title: "Behind the Scenes",
    description: "Watch our artisans create magic with silver",
    likes: 567,
    comments: 32,
  },
  {
    id: 4,
    src: "https://assets.mixkit.co/videos/preview/mixkit-woman-with-gold-jewelry-34581-large.mp4",
    poster: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&q=80",
    title: "Daily Wear Collection",
    description: "Elegant pieces for everyday grace",
    likes: 421,
    comments: 27,
  },
  {
    id: 5,
    src: "https://assets.mixkit.co/videos/preview/mixkit-woman-showing-off-earrings-34582-large.mp4",
    poster: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80",
    title: "Trending: Oxidized Bangles",
    description: "Traditional meets modern in our oxidized collection",
    likes: 678,
    comments: 41,
  },
];

const VideoFeed = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Play current video, pause others
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [currentIndex]);

  const goToVideo = (direction: "up" | "down") => {
    if (direction === "up" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === "down" && currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleScroll = (e: React.WheelEvent) => {
    if (e.deltaY > 0 && currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (e.deltaY < 0 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleTouchStart = useRef(0);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = handleTouchStart.current - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < videos.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (diff < 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  const toggleLike = (id: number) => {
    const newLiked = new Set(liked);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLiked(newLiked);
  };

  return (
    <>
      <Helmet>
        <title>Video Feed — Laxmi Silver</title>
        <meta name="description" content="Watch our latest jewelry videos, behind-the-scenes content, and customer reviews." />
      </Helmet>

      <div
        ref={containerRef}
        className="fixed inset-0 bg-black z-50"
        onWheel={handleScroll}
        onTouchStart={(e) => { handleTouchStart.current = e.touches[0].clientY; }}
        onTouchEnd={handleTouchEnd}
      >
        {/* Close Button */}
        <Link
          to="/"
          className="absolute top-4 left-4 z-50 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </Link>

        {/* Mute Toggle */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>

        {/* Videos Container */}
        <div 
          className="relative h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateY(-${currentIndex * 100}%)` }}
        >
          {videos.map((video, index) => (
            <div key={video.id} className="absolute w-full h-full" style={{ top: `${index * 100}%` }}>
              {/* Video */}
              <video
                ref={(el) => { videoRefs.current[index] = el; }}
                src={video.src}
                poster={video.poster}
                muted={isMuted}
                loop
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

              {/* Content */}
              <div className="absolute bottom-20 left-0 right-16 p-4">
                <h3 className="text-white font-serif text-lg mb-1">{video.title}</h3>
                <p className="text-white/70 text-sm">{video.description}</p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-white/60 text-xs">@laxmisilverofficial</span>
                </div>
              </div>

              {/* Side Actions */}
              <div className="absolute right-4 bottom-24 flex flex-col gap-5">
                <button
                  onClick={() => toggleLike(video.id)}
                  className="flex flex-col items-center gap-1"
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                    liked.has(video.id) ? "bg-red-500" : "bg-white/10 backdrop-blur-sm"
                  )}>
                    <Heart className={cn(
                      "w-5 h-5",
                      liked.has(video.id) ? "text-white fill-white" : "text-white"
                    )} />
                  </div>
                  <span className="text-white text-xs">{video.likes + (liked.has(video.id) ? 1 : 0)}</span>
                </button>

                <button className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white text-xs">{video.comments}</span>
                </button>

                <button className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <Share2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white text-xs">Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Desktop */}
        <div className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 flex-col gap-2 z-40">
          <button
            onClick={() => goToVideo("up")}
            disabled={currentIndex === 0}
            className={cn(
              "w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-colors",
              currentIndex === 0 ? "opacity-30" : "hover:bg-white/20"
            )}
          >
            <ChevronUp className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => goToVideo("down")}
            disabled={currentIndex === videos.length - 1}
            className={cn(
              "w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-colors",
              currentIndex === videos.length - 1 ? "opacity-30" : "hover:bg-white/20"
            )}
          >
            <ChevronDown className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-40">
          {videos.map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-1 rounded-full transition-all duration-300",
                index === currentIndex ? "h-6 bg-white" : "h-1.5 bg-white/40"
              )}
            />
          ))}
        </div>

        {/* Bottom Gradient for Mobile Nav */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </div>
    </>
  );
};

export default VideoFeed;
