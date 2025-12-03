import { Instagram, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const instagramPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
    likes: 234,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop",
    likes: 189,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&h=400&fit=crop",
    likes: 312,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
    likes: 267,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
    likes: 198,
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
    likes: 421,
  },
];

const InstagramFeed = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <span className="font-sans text-[10px] sm:text-xs uppercase tracking-luxury text-primary mb-3 sm:mb-4 block">
            Follow Us
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4">
            @laxmisilverofficial
          </h2>
          <p className="font-sans text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Daily reels, exclusive drops, and behind-the-scenes craft. Join 10K+ followers for your daily dose of silver inspiration.
          </p>
          <div className="section-divider mt-4 sm:mt-6" />
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 lg:gap-4 mb-8 sm:mb-10 lg:mb-12">
          {instagramPosts.map((post, index) => (
            <a
              key={post.id}
              href="https://www.instagram.com/laxmisilverofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg sm:rounded-xl img-zoom"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={post.image}
                alt={`Instagram post ${post.id}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                  <Instagram className="w-6 h-6 sm:w-8 sm:h-8 text-background mx-auto mb-1 sm:mb-2" />
                  <p className="font-sans text-xs sm:text-sm text-background">{post.likes} likes</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="https://www.instagram.com/laxmisilverofficial"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="luxury" size="lg" className="gap-2 sm:gap-3 text-sm sm:text-base">
              <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              Follow on Instagram
              <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;