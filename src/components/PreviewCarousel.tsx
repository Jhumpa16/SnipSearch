import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Image from 'next/image'

const clips = [
  {
    title: 'Guardians Of The Galaxy',
    subtitle: 'A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe.',
    image: '/guardians.jpg',
  },
  {
    title: 'Thor: Ragnarok',
    subtitle: 'Thor must escape the alien planet Sakaar in time to save Asgard from Hela.',
    image: '/thor.jpg',
  },
  {
    title: 'The Dark Knight',
    subtitle: 'Batman faces the Joker, a criminal mastermind who wants to plunge Gotham into anarchy.',
    image: '/batman.jpg',
  },
  {
    title: 'Inception',
    subtitle: 'A thief who steals corporate secrets through dream-sharing technology is given an impossible task.',
    image: '/inception.jpg',
  },
  {
    title: 'Interstellar',
    subtitle: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity&apos;s survival.',
    image: '/interstellar.jpg',
  },
]

export default function PreviewCarousel() {
  return (
    <section className="py-16 bg-[#232a36] text-white text-center">
      <h2 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
        🎬 Preview the Possibilities
      </h2>
      <p className="text-lg mb-8 text-gray-300">
        Get a glimpse of the moments you can discover
      </p>
      <div className="w-full max-w-4xl mx-auto relative flex flex-col items-center">
        <div className="relative w-full flex items-center justify-center">
          {/* Swiper navigation arrows (custom position) */}
          <div className="swiper-button-prev !left-0 !top-1/2 !-translate-y-1/2 !z-20 !w-10 !h-10 flex items-center justify-center bg-zinc-800/80 hover:bg-zinc-700 text-white rounded-full shadow-lg transition absolute" />
          <Swiper
            modules={[Autoplay, EffectCoverflow, Navigation, Pagination]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            loop={false}
            navigation={true}
            pagination={{ clickable: true }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 200,
              modifier: 2.5,
              scale: 0.85,
              slideShadows: false,
            }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1 },
              900: { slidesPerView: 3 },
              1280: { slidesPerView: 3 },
            }}
            className="w-full"
          >
            {clips.map((clip, i) => (
              <SwiperSlide key={i} className="flex items-center justify-center">
                <div className="relative w-[320px] h-[180px] md:w-[420px] md:h-[236px] rounded-2xl overflow-hidden shadow-2xl group transition-transform duration-300 hover:scale-105 flex flex-col items-center justify-center mx-auto">
                  <Image
                    src={clip.image}
                    alt={clip.title}
                    fill
                    className="object-cover"
                  />
                  {/* Overlay for text */}
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                    <h3 className="font-bold text-lg md:text-2xl text-white mb-1 text-left drop-shadow-lg">
                      {clip.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-200 text-left line-clamp-2">
                      {clip.subtitle}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-button-next !right-0 !top-1/2 !-translate-y-1/2 !z-20 !w-10 !h-10 flex items-center justify-center bg-zinc-800/80 hover:bg-zinc-700 text-white rounded-full shadow-lg transition absolute" />
        </div>
      </div>
    </section>
  )
}